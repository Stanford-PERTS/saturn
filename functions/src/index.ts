import * as admin from 'firebase-admin';
admin.initializeApp();

export const ANSWERS_COLLECTION = 'answers';
export const RESPONSES_COLLECTION = 'responses';

export { default as helloWorld } from './helloWorld';

export { default as copyResponseToSql } from './copyResponseToSql';
export { default as insertFakeResponses } from './insertFakeResponses';
