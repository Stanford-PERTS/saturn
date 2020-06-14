// Helpful resource related to testing Firestore:
// - https://github.com/firebase/quickstart-nodejs
// - https://www.youtube.com/watch?v=Rx4pVS1vPGY
// - https://firebase.google.com/docs/rules/unit-tests#differences_between_the_emulator_and_production

const firebase = require('@firebase/testing');
const fs = require('fs');

module.exports.setup = async (auth, data) => {
  // Ensure a unique projectId.
  const projectId = `rules-spec-${Date.now()}`;

  const app = await firebase.initializeTestApp({
    projectId,
    auth,
  });

  const db = app.firestore();

  // Write mock documents before rules
  if (data) {
    for (const key in data) {
      const ref = db.doc(key);
      await ref.set(data[key]);
    }
  }

  // Apply security rules
  await firebase.loadFirestoreRules({
    projectId,
    rules: fs.readFileSync('firestore.rules'),
  });

  return db;
};

module.exports.teardown = async () => {
  // Look for all firebase apps that were created during test run and delete
  // them once the tests have completed.
  Promise.all(firebase.apps().map(app => app.delete()));
};
