import React, { useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { parse as parseQueryString } from 'query-string';
import { addResponse } from 'services';
import * as firebase from 'firebase/app';

const SurveyNewAdding = () => <div>Welcome. Your survey is being setup.</div>;

const SurveyNewError = () => (
  <div>
    We&rsquo;re sorry. There was a problem preparing your survey. Please reload
    to try again.
  </div>
);

const ResponsesNew = () => {
  const history = useHistory();
  const location = useLocation();
  const { surveyLabel } = useParams();
  const [state, setState] = useState('ADDING');

  // TODO validate surveyLabel from available surveys.

  if (state === 'ADDING') {
    // We want to parse any, optional, query string key/value pairs so that we
    // can store these in the responses collection document that we will create.
    const queryParams = parseQueryString(location.search);

    addResponse({ surveyLabel, meta: queryParams })
      .then(responseId => {
        setState('SUCCESS');
        return responseId;
      })
      .then(responseId => {
        // https://firebase.google.com/docs/analytics/events?platform=web
        firebase.analytics().logEvent('survey_new', { surveyLabel });

        // Use `replace` and not `push` so that the user doesn't create another
        // new survey entry if they press the browser back button.
        history.replace(`/surveys/${surveyLabel}/${responseId}`);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log('Problem adding new response.', error);
        setState('ERROR');
      });
  }

  return state === 'ADDING' || state === 'SUCCESS' ? (
    <SurveyNewAdding />
  ) : (
    <SurveyNewError />
  );
};

export default ResponsesNew;
