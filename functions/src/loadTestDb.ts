import * as functions from 'firebase-functions';

import { writeResponseToSql } from './copyResponseToSql';
import createFirestoreId from './mocks/createFirestoreId';

const loadTestDb = functions.https.onRequest(async (req, res) => {
  const textResponse =
    'Lorem ipsum amet in laborum esse laboris pariatur dolor veniam tempor ut sed ut incididunt ullamco et fugiat proident dolor quis occaecat consequat consequat deserunt cillum id pariatur aute elit cupidatat labore excepteur aliquip et in.';
  const answers = {
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
  const meta = {
    code: 'testing lizard',
    participant_id: 'Participant_001',
  };
  const response = {
    answers,
    createdOn: { seconds: 1, nanoseconds: 0 },
    meta,
    modifiedOn: { seconds: 1, nanoseconds: 0 },
    page: 'last',
    progress: 100,
    questionsSeen: {},
    surveyLabel: 'loadTestingSurvey',
  };

  const docId = createFirestoreId();
  await writeResponseToSql(response, docId);

  res.send(docId);
});

export default loadTestDb;
