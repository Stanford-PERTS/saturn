// `getResponseAndListen` will listen to the responses collection document
// requested and will call the `successCallback` on the document's data every
// time the contents of the document changes.
//
// https://firebase.google.com/docs/firestore/query-data/listen

import { firestore, RESPONSES_COLLECTION } from './index';
import noop from 'lodash/noop';

function getResponseAndListen(
  responseId,
  successCallback,
  failureCallback = noop,
) {
  return firestore
    .collection(RESPONSES_COLLECTION)
    .doc(responseId)
    .onSnapshot(doc => {
      if (doc.exists) {
        // eslint-disable-next-line no-console
        console.log(`Received update for document. (${responseId})`);
        successCallback(doc.data());
      } else {
        failureCallback();
      }
    });
}

export default getResponseAndListen;
