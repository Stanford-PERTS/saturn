import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/performance';
import 'firebase/firestore';
import isLocalhost from 'utils/isLocalhost';
import isTesting from 'utils/isTesting';

export const RESPONSES_COLLECTION = 'responses';
export const ANSWERS_COLLECTION = 'answers';

export { default as addResponse } from './addResponse';
export { default as getResponseAndListen } from './getResponseAndListen';
export { default as updateResponse } from './updateResponse';

firebase.initializeApp({
  apiKey: 'AIzaSyAudJ2p7SbDTx8ZUe-9bJBd_gG8BOtXwis',
  authDomain: 'saturn-perts.firebaseapp.com',
  databaseURL: 'https://saturn-perts.firebaseio.com',
  projectId: 'saturn-perts',
  storageBucket: 'saturn-perts.appspot.com',
  messagingSenderId: '557127412102',
  appId: '1:557127412102:web:574b5fb49f26f74eaea407',
  measurementId: 'G-V9141VX3NG',
});

// Initialize Performance Monitoring
// https://firebase.google.com/docs/perf-mon/get-started-web
firebase.performance();

export const firestore = firebase.firestore();

if (isLocalhost()) {
  // Don't log these messages when running tests, it's annoying.
  if (isTesting()) {
    // eslint-disable-next-line no-console
    console.log('Connecting Firebase to local emulators.');
    // eslint-disable-next-line no-console
    console.log('Firestore emulator clears database contents when shut down.');
  }

  // Tell the Firebase app to connect to local emulators.
  // https://firebase.google.com/docs/emulator-suite/connect_and_prototype
  firestore.settings({
    // Firestore emulator emits the following message: 'Support for WebChannel
    // on a separate port (8081) is DEPRECATED and will go away soon. Please use
    // port above instead (8080).' Unfortunately, this does not work with
    // @firebase/testing when used in Jest tests. For now, leaving this 8081.
    host: 'localhost:8080',
    ssl: false,
  });
}
