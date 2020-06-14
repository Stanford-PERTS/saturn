import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import isEmpty from 'lodash/isEmpty';
import noop from 'lodash/noop';
import * as firebase from 'firebase/app';

import {
  ResponseDocContextValue,
  ResponseDocUpdateable,
  SurveyAnswers,
} from 'index.d';
import { updateResponse } from 'services';
import { useResponseContext } from 'services/responseContext';
import { validationSchema } from 'surveys';
import {
  Debug,
  PageNavigation,
  PageNavigationTimed,
  PageTitle,
  RandomOne,
  Show,
} from 'components';
import UpdateParticipantDataProgress from 'components/UpdateParticipantDataProgress';

const DEFAULT_WAIT_BEFORE_NEXT_TIME = 3; // seconds

export type Props = {
  children: any;
  label: string;
  // `label` of next Page
  next?: string;
  // optional marker to indicate survey progress
  progress?: number;
  // optional criterion function
  //   (response) => true | false
  //   when true, the Page displays
  //   when false, the Page is skipped
  showWhen?: (response: ResponseDocContextValue) => boolean | null;
  // optional criterion function
  //   (response) => true | false
  //   when false, the Page displays
  //   when true, the Page is skipped
  hideWhen?: (response: ResponseDocContextValue) => boolean | null;
  // the title that will appear at the top of the page
  title?: string;
  // optional, displays the provided JSX in the heading
  heading?: React.ReactNode;
  // optional, wrap child Page(s) in RandomOne component. The Page's `label`
  // prop will be passed through to the RandomOne component.
  randomOne?: boolean;
  // optional enforcement of time before the Next button can be pressed
  //   <Page waitBeforeNext> default: DEFAULT_WAIT_BEFORE_NEXT_TIME seconds
  //   <Page waitBeforeNext={20}> specify the amount of time in seconds
  waitBeforeNext?: boolean | number;
  // optional text that will be displayed when the user is told to wait
  waitBeforeNextText?: any;
};

const showWhenDefault = () => true;
const hideWhenDefault = () => false;

const Page: React.FC<Props> = ({
  children,
  label,
  next,
  progress,
  showWhen = showWhenDefault,
  hideWhen = hideWhenDefault,
  title,
  randomOne = false,
  waitBeforeNext = false,
  waitBeforeNextText,
  heading,
}) => {
  const history = useHistory();
  const { surveyLabel, responseId, pageLabel } = useParams();
  const response = useResponseContext();

  const [showTimedNavigation, setShowTimedNavigation] = useState(
    Boolean(waitBeforeNext),
  );

  const baseRoute = `/surveys/${surveyLabel}/${responseId}`;
  const nextRoute = next && `${baseRoute}/${next}`;

  // To avoid confusing logic, don't allow both showWhen and hideWhen
  if (showWhen !== showWhenDefault && hideWhen !== hideWhenDefault) {
    throw Error(
      "You can't use both showWhen and hideWhen. Use one or the other.",
    );
  }

  // Determine if this page should be displayed. If not, redirect to next page.
  const shouldShow = showWhen(response);
  const shouldHide = hideWhen(response);

  if ((!shouldShow || shouldHide) && nextRoute) {
    history.replace(nextRoute);
  }

  useEffect(
    function updateResponseProgressValue() {
      // The Page `progress` prop is optional. Note: We're also checking typeof
      // because react-router provides this type as `string | undefined`.
      if (progress && typeof responseId === 'string') {
        updateResponse(responseId, { progress })
          .then(success => {
            // eslint-disable-next-line no-console
            console.log(`Progress update successful. ${success}`);
          })
          .catch(err => {
            // eslint-disable-next-line no-console
            console.log('Progress update error.', err);
          });
      }
    },
    [progress, responseId],
  );

  useEffect(
    function analyticsLogEventComplete() {
      if (progress === 100) {
        firebase.analytics().logEvent('survey_complete', { surveyLabel });
      }
    },
    [surveyLabel, progress],
  );

  useEffect(
    // This effect sets a timer to remove the "timed" button. The timed button
    // can be used to prevent survey participants from rushing past a page. It
    // replaces the Next button with a Timed button that looks identical to the
    // Next button, but it will not take the user to the next page when clicked.
    // Instead, it will display a message that asks the user to wait.
    function timerForTimedButton() {
      const displayTimedButtonFor =
        typeof waitBeforeNext === 'number' && waitBeforeNext > 0
          ? waitBeforeNext * 1000 // seconds
          : DEFAULT_WAIT_BEFORE_NEXT_TIME * 1000; // seconds

      const buttonTimer = setTimeout(() => {
        setShowTimedNavigation(false);
      }, displayTimedButtonFor);

      return () => clearTimeout(buttonTimer);
    },
    [pageLabel, waitBeforeNext],
  );

  // The following sets up a keyboard shortcut to submit the form.
  // This allows us to bypass the timed button page config.
  let formikSubmitForm: Function = () => noop;
  const bindSubmitForm = (fn: Function) => (formikSubmitForm = fn);

  const submitFormOnCtrlY = useCallback((e: KeyboardEvent) => {
    if (e.ctrlKey && e.code === 'KeyY') {
      formikSubmitForm();
    }
  }, []);

  useEffect(
    function addSubmitFormKeyboardShortcut() {
      document.addEventListener('keydown', submitFormOnCtrlY);

      // Remove the event listener when we switch pages so that we don't end up
      // adding multiple event listeners that trigger multiple form submissions.
      return () => {
        document.removeEventListener('keydown', submitFormOnCtrlY);
      };
    },
    [pageLabel, submitFormOnCtrlY],
  );

  const onClickNext = (answers: SurveyAnswers) =>
    // Like redux-forms, to properly track `isSubmitting` status, the `onSubmit`
    // handler should return a promise that resolves/rejects.
    new Promise((resolve, reject) => {
      const updatedResponse: ResponseDocUpdateable = {
        ...(answers ? { answers } : {}),
        ...(next ? { page: next } : {}),
      };

      updateResponse(responseId as string, updatedResponse)
        .then(success => {
          nextRoute && history.push(nextRoute);
          // eslint-disable-next-line no-console
          console.log(`Response update successful. ${success}`);
          resolve();
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log('Response update error.', err);
          reject(err);
        });
    });

  const initialValues = {
    // For student privacy, we never display a user's previous answers.
    //
    // TODO If we don't set all of the field names here in initialValues, then
    // React reports a warning: `A component is changing an uncontrolled input
    // of type text to be controlled.` But we don't want initialValues and we
    // don't know all of the possible fields names ahead of time since this is
    // set in the `surveys/{programName}/` config. The form still seems to work,
    // so leaving this as a TODO to come back to.
  };

  return (
    <div className="Page">
      <Formik
        initialValues={initialValues}
        onSubmit={onClickNext}
        validationSchema={validationSchema}
      >
        {({ errors, handleSubmit, isSubmitting, submitForm, values }) => {
          bindSubmitForm(submitForm);

          return (
            <Form>
              {title && <PageTitle>{title}</PageTitle>}

              <Show when={heading}>{heading}</Show>

              <Show when={randomOne}>
                <RandomOne label={label}>{children}</RandomOne>
              </Show>

              <Show when={!randomOne}>{children}</Show>

              {/*
              In addition to updating our response document's response value,
              which happens in a `useEffect` above, we also need to update the
              value in Neptune's ParticipantData table.
            */}
              <UpdateParticipantDataProgress progress={progress} />

              <Show when={showTimedNavigation}>
                <PageNavigationTimed
                  disabled={isSubmitting || !isEmpty(errors)}
                  next={next}
                >
                  {waitBeforeNextText}
                </PageNavigationTimed>
              </Show>

              <Show when={!showTimedNavigation}>
                <PageNavigation
                  disabled={isSubmitting || !isEmpty(errors)}
                  submitting={isSubmitting}
                  next={next}
                  onClickNext={() => {
                    handleSubmit();
                  }}
                />
              </Show>

              <Debug>{JSON.stringify(values, null, 2)}</Debug>
              <Debug>{JSON.stringify(errors, null, 2)}</Debug>
              <Debug>{JSON.stringify(response, null, 2)}</Debug>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Page;
