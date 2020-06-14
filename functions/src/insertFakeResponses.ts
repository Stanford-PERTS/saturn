import * as functions from 'firebase-functions';

import isDeployed from './util/isDeployed';
import { createTableResponse, insertResponse } from './sql/response';
import createFirestoreId from './mocks/createFirestoreId';
import createResponsesForFaker from './mocks/createResponsesForFaker';

// NOTE: this only puts data in SQL tables, NOT in firestore. In the future
// this should be expanded.
const insertFakeResponses = functions.https.onRequest(async (req, res) => {
  if (isDeployed()) {
    res.status(405).send('Faker not available when deployed.');
    return;
  }

  try {
    await createTableResponse();

    for (const response of createResponsesForFaker()) {
      await insertResponse(response, createFirestoreId());
    }

    res.send('done');
  } catch (error) {
    res.status(500).send(String(error));
  }
});

export default insertFakeResponses;
