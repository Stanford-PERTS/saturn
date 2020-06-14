import React from 'react';

import {
  AnswerDocUpdateable,
  SurveyAnswers,
  SurveyLabel,
  SurveyMeta,
} from 'index.d';
import { addResponse, updateResponse } from 'services';

const LoadTestDb = () => {
  const surveyLabel: SurveyLabel = 'loadTestingSurvey';
  const textResponse =
    'Lorem ipsum amet in laborum esse laboris pariatur dolor veniam tempor ut sed ut incididunt ullamco et fugiat proident dolor quis occaecat consequat consequat deserunt cillum id pariatur aute elit cupidatat labore excepteur aliquip et in.';
  const answers: SurveyAnswers = {
    q1: '1',
    q2: '1',
    q3: '1',
    q4: '1',
    q5: '1',
    q6: '1',
    q7: '1',
    q8: '1',
    q9: '1',
    text1: textResponse,
    text2: textResponse,
    text3: textResponse,
    text4: textResponse,
    text5: textResponse,
  };
  const meta: SurveyMeta = {
    code: 'testing lizard',
    participant_id: 'Participant_001',
  };
  const answerDoc: AnswerDocUpdateable = {
    page: 'last',
    progress: 100,
    questionsSeen: {},
    answers,
  };

  addResponse({ surveyLabel, meta }).then(responseId => {
    updateResponse(responseId, answerDoc);
  });

  return <div>Adding 'testing lizard' response.</div>;
};

export default LoadTestDb;
