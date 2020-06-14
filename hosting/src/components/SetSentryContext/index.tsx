// Provides extra info to Sentry to help diagnose errors.
// https://docs.sentry.io/enriching-error-data/context/?platform=javascript

import React from 'react';
import * as Sentry from '@sentry/browser';
import { ResponseDoc } from 'index.d';

type Props = {
  response: ResponseDoc;
};

const SetSentryContext: React.FC<Props> = ({ response }) => {
  if (!response) {
    return null;
  }

  Sentry.configureScope(scope => {
    scope.setTag('survey', response.surveyLabel);
    scope.setTag('code', response.meta.code);
    scope.setTag('participant_id', response.meta.participant_id);
    scope.setTag('survey_id', response.meta.survey_id);
  });

  return null;
};

export default SetSentryContext;
