import { firestore, ANSWERS_COLLECTION, RESPONSES_COLLECTION } from './index';
import { AnswerDoc, ResponseDoc } from 'index.d';
import isDevelopment from 'utils/isDevelopment';
import moment from 'moment';

import { default as transformBeleSet19 } from 'surveys/beleset19/transform';
import { default as transformCSet19 } from 'surveys/cset19/transform';
import { default as transformMSet19 } from 'surveys/mset19/transform';

// Survey transform functions allow the initial, new response document that is
// saved to be altered dependent on the needs of the program. For example, if
// a program needs to have randomly selected open response questions chosen
// based on query params, the transform function can do this.
type TransformFunctions = {
  [surveyLabel: string]: Function;
};

// Add all survey transform functions here. The key should match the survey's
// `surveyLabel` and the function should be imported at the top of this file.
const transformFunctions: TransformFunctions = {
  cset19: transformCSet19,
  beleset19: transformBeleSet19,
  mset19: transformMSet19,
};

const whichTransformFunction = (surveyLabel: string) =>
  transformFunctions[surveyLabel]
    ? transformFunctions[surveyLabel]
    : (x: ResponseDoc) => x;

function addResponse({ surveyLabel = '', meta = {} }) {
  const batch = firestore.batch();

  // Create a `responses` and `answers` document with matching document ID.
  // - `responses` will be the client readable version with boolean `answers`.
  // - `answers` will be the full version that contains `answers`.
  const responsesRef = firestore.collection(RESPONSES_COLLECTION).doc();
  const answersRef = firestore
    .collection(ANSWERS_COLLECTION)
    .doc(responsesRef.id);

  // https://firebase.google.com/docs/firestore/manage-data/add-data#server_timestamp
  // const createdOn = firebase.firestore.FieldValue.serverTimestamp();

  // Note: We stopped using the above because we were having difficulty
  // importing firebase/firebase-admin packages into rserve_test and instead are
  // recreating the timestamp functionality ourselves.
  const createdOn = {
    seconds: moment().unix(),
    nanoseconds: 0,
  };

  const transformResponse = whichTransformFunction(surveyLabel);

  const newResponse = transformResponse({
    createdOn,
    modifiedOn: createdOn,
    surveyLabel,
    // Optional query string parameters that can be set for new responses.
    meta,
    // Between 0 and 100. Survey pages will be able to set progress. This
    // won't always be an precise indicator of % because of branching.
    progress: 0,
    // Page label to allow continuing surveys.
    page: null,
    // Track which RandomOne questions have been seen.
    questionsSeen: {},
    // The user's key/value responses.
    // Important! See https://github.com/PERTS/saturn/issues/65 We are
    // initializing this to `null` and not an empty object so that we can
    // disallow empty objects on document updates. Huh? Firestore rules check
    // the state of the entire document as it would be after the write. If we
    // initialize to an empty object, then some future updates might be
    // prevented from writing since the object will be empty.
    answers: null,
  });

  batch.set(answersRef, newResponse as AnswerDoc);
  batch.set(responsesRef, newResponse as ResponseDoc);

  return batch.commit().then(() => {
    isDevelopment() &&
      // eslint-disable-next-line no-console
      console.log(
        'Successfully added new response.',
        responsesRef.id,
        newResponse,
      );

    return responsesRef.id;
  });
}

export default addResponse;
