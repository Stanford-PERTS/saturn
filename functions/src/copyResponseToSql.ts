import * as functions from 'firebase-functions';

import isResponseDoc, { isExportableResponseDoc } from './util/isResponseDoc';
import { insertResponseBackup, insertResponse } from './sql/response';
import { ExportableResponseDoc, ResponseDoc } from './index.d';
import { ANSWERS_COLLECTION } from './index';

// Writing Cloud Firestore-triggered functions
// https://firebase.google.com/docs/firestore/extend-with-functions#writing-triggered_functions

// Takes all responses being written to the Firestore that are valid for
// storage in our Cloud SQL tables and inserts them.
const copyResponseToSql = functions.firestore
  // Listen to all documents in the answers collection.
  .document(`${ANSWERS_COLLECTION}/{responseId}`)
  // onWrite combines onCreate, onUpdate, and onDelete.
  .onWrite(async (change, context) => {
    // What are change and context?
    // https://firebase.google.com/docs/reference/functions/providers_firestore_.documentbuilder.html#onwrite

    try {
      const doc = change.after.data();
      const docId = change.after.id;

      // Get an object with the current document value.
      // If the document does not exist, it has been deleted.
      if (!change.after.exists) {
        return Promise.resolve(null);
      }

      // Rather than mere type assertion, do some runtime checking first.
      if (!isResponseDoc(doc)) {
        throw new Error(
          `Doc not compatible with type ResponseDoc: ${JSON.stringify(doc)}`,
        );
      }
      const response = doc as ResponseDoc;

      await writeResponseToSql(response, docId);
    } catch (error) {
      // CM: I think we don't want to actually let error go uncaught, just like
      // a "real" server, so log-and-catch.
      console.error(error);
    }

    return Promise.resolve(null);
  });

export const writeResponseToSql = async (
  response: ResponseDoc,
  responseDocumentId: string,
) => {
  // Responses that are exportable are inserted into the `response` table.
  if (isExportableResponseDoc(response)) {
    await insertResponse(response as ExportableResponseDoc, responseDocumentId);
  }

  // Any response should go into the `response_backup` table.
  await insertResponseBackup(response, responseDocumentId);
};

export default copyResponseToSql;
