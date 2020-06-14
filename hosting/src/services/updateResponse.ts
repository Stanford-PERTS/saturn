import { firestore, ANSWERS_COLLECTION, RESPONSES_COLLECTION } from './index';
import {
  AnswerDocUpdateable,
  ResponseDocId,
  ResponseDocUpdateable,
} from '../index.d';
import transformAnswers from 'utils/transformAnswers';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';

function updateResponse(
  responseId: ResponseDocId,
  updatedResponse: AnswerDocUpdateable,
): Promise<string> {
  // Ensure there's at least one property being updated.
  if (Object.keys(updatedResponse).length === 0) {
    return Promise.reject(
      new Error('At least one response property is required to be updated.'),
    );
  }

  const document = firestore.collection(RESPONSES_COLLECTION).doc(responseId);

  return new Promise((resolve, reject) => {
    try {
      document.get().then(doc => {
        if (doc.exists) {
          // Only update `progress` if the progress provided is greater than the
          // currently saved `progress`.
          const docData = doc.data();
          if (
            docData &&
            updatedResponse.progress &&
            docData.progress >= updatedResponse.progress
          ) {
            delete updatedResponse.progress;
          }

          // Only update `answers` if some key/value answers are provided.
          if (isEmpty(updatedResponse.answers)) {
            delete updatedResponse.answers;
          }

          // If there are now no updates to make to the response, then don't.
          if (isEmpty(updatedResponse)) {
            resolve(`Document not updated. No updated keys. (${doc.id})`);
          }

          // Update the `modifiedOn` field
          // https://firebase.google.com/docs/firestore/manage-data/add-data#server_timestamp
          // const timestamp = firebase.firestore.FieldValue.serverTimestamp();
          // updatedResponse.modifiedOn = timestamp;

          // Note: We stopped using the above because we were having difficulty
          // importing firebase/firebase-admin packages into rserve_test and
          // instead are recreating the timestamp functionality ourselves.
          updatedResponse.modifiedOn = {
            seconds: moment().unix(),
            nanoseconds: 0,
          };

          // Save the updated data to the response & answers documents.
          const batch = firestore.batch();

          const answersRef = firestore
            .collection(ANSWERS_COLLECTION)
            .doc(doc.id);
          const responsesRef = firestore
            .collection(RESPONSES_COLLECTION)
            .doc(doc.id);

          batch.set(answersRef, updatedResponse, { merge: true });

          // Convert the answers key:value pairs to key:true pairs.
          const responseDocUpdated: ResponseDocUpdateable = transformAnswers(
            updatedResponse,
            (/* answer */) => true,
          );

          batch.set(responsesRef, responseDocUpdated, {
            merge: true,
          });

          batch.commit().then(() => {
            resolve(`Document update successful. (${doc.id})`);
          });
        } else {
          reject(Error('Unable to retrieve document for update.'));
        }
      });
    } catch (err) {
      reject(Error(err));
    }
  });
}

export default updateResponse;
