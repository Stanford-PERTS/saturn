import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { getResponseAndListen } from 'services';
import { ResponseContext } from 'services/responseContext';
import SurveyLoader from 'scenes/SurveyLoader';
import { ScrollToTop, SetSentryContext } from 'components';

const Survey = () => {
  const history = useHistory();
  const { surveyLabel, responseId } = useParams();
  const [response, setResponse] = useState({});
  const [state, setState] = useState('LOADING');

  useEffect(
    () =>
      getResponseAndListen(
        responseId,
        responseDocData => {
          setResponse(responseDocData);
          setState('SUCCESS');
        },
        () => setState('ERROR'),
      ),
    [responseId],
  );

  useEffect(() => {
    // Redirect to `response.surveyLabel` if it doesn't match route.
    // https://github.com/PERTS/saturn/issues/25
    if (response && response.surveyLabel) {
      if (response.surveyLabel !== surveyLabel) {
        history.replace(`/surveys/${response.surveyLabel}/${responseId}`);
      }
    }
  }, [history, surveyLabel, response, responseId]);

  if (state === 'LOADING') {
    return <div>Retrieving your survey.</div>;
  }

  if (state === 'ERROR') {
    return <div>We&rsquo;re sorry. We could not find your survey.</div>;
  }

  return (
    <div className="Survey">
      <ScrollToTop />
      <ResponseContext.Provider value={response}>
        <SetSentryContext response={response} />
        <SurveyLoader />
      </ResponseContext.Provider>
    </div>
  );
};

Survey.propTypes = {
  path: PropTypes.string,
  surveyLabel: PropTypes.string,
  responseId: PropTypes.string,
};

export default Survey;
