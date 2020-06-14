// Helpful resource related to testing Firestore:
// - https://github.com/firebase/quickstart-nodejs
// - https://www.youtube.com/watch?v=Rx4pVS1vPGY
// - https://firebase.google.com/docs/rules/unit-tests#differences_between_the_emulator_and_production

const { setup, teardown } = require('./firestoreHelpers');
const { assertFails, assertSucceeds } = require('@firebase/testing');

// TODO babel this
// const { RESPONSES_COLLECTION } = require('../hosting/src/services');
const ANSWERS_COLLECTION = 'answers';
const RESPONSES_COLLECTION = 'responses';

describe('Firestore rules', () => {
  let db;

  beforeEach(async () => {
    db = await setup();
  });

  afterEach(async () => {
    await teardown();
  });

  test('unauthorized collection > fails when READING', async () => {
    const ref = db.collection('nonexistent-collection');
    const failedRead = await assertFails(ref.get());
    expect(failedRead);
  });

  test('unauthorized collection > fails when WRITING', async () => {
    const ref = db.collection('nonexistent-collection');
    const failedWrite = await assertFails(ref.add({}));
    expect(failedWrite);
  });

  test('answers collection > succeeds when WRITING', async () => {
    const ref = db.collection(ANSWERS_COLLECTION);
    const successfulWrite = await assertSucceeds(ref.add({}));
    expect(successfulWrite);
  });

  test('answers collection > fails when READING', async () => {
    const responseId = `responseTest-${Date.now()}`;
    const response = {
      answers: {
        q1: 'a1',
        q2: 'a2',
      },
      createdOn: 123456789,
      meta: {},
      modifiedOn: 123456789,
      page: null,
      progress: 0,
      surveyLabel: 'ep',
    };

    db = await setup(null, {
      [`${ANSWERS_COLLECTION}/${responseId}`]: response,
    });

    const ref = db.collection(ANSWERS_COLLECTION);

    const failedRead = await assertFails(ref.doc(responseId).get());
    expect(failedRead);
  })

  test('responses collection > succeeds when CREATING', async () => {
    const ref = db.collection(RESPONSES_COLLECTION);
    const successfulWrite = await assertSucceeds(ref.add({}));
    expect(successfulWrite);
  });

  test('responses collection > succeeds when READING', async () => {
    const responseId = `responseTest-${Date.now()}`;
    const response = {
      answers: {
        q1: true,
        q2: true,
      },
      createdOn: 123456789,
      meta: {},
      modifiedOn: 123456789,
      page: null,
      progress: 0,
      surveyLabel: 'ep',
    };

    db = await setup(null, {
      [`${RESPONSES_COLLECTION}/${responseId}`]: response,
    });

    const ref = db.collection(RESPONSES_COLLECTION);

    // Basic read success check
    const successfulRead = await assertSucceeds(ref.doc(responseId).get());
    expect(successfulRead);

    // Verify that the read doc data matches
    const readDocData = await successfulRead.data();
    expect(readDocData).toEqual(response);
  });

  test(
    'responses collection > fails when UPDATING empty answers object',
    async () => {
      const responseId = `responseTest-${Date.now()}`;
      const response = {
        answers: {
          q1: 'a1',
          q2: 'a2',
        },
        createdOn: 123456789,
        meta: {},
        modifiedOn: 123456789,
        page: null,
        progress: 0,
        surveyLabel: 'ep',
      };

      db = await setup(null, {
        [`${RESPONSES_COLLECTION}/${responseId}`]: response,
      });

      const ref = db.collection(RESPONSES_COLLECTION);

      const updatedResponse = {
        answers: {}, // we don't want to allow empty answers
      };

      const failedWrite = await assertFails(
        ref.doc(responseId).set(updatedResponse),
      );
      expect(failedWrite);
  });

  test(
    'responses collection > fails when UPDATING disallowed fields',
    async () => {
      const responseId = `responseTest-${Date.now()}`;
      const response = {
        answers: {
          q1: 'a1',
          q2: 'a2',
        },
        createdOn: 123456789,
        meta: {},
        modifiedOn: 123456789,
        page: null,
        progress: 0,
        surveyLabel: 'ep',
      };

      db = await setup(null, {
        [`${RESPONSES_COLLECTION}/${responseId}`]: response,
      });

      const ref = db.collection(RESPONSES_COLLECTION);

      const updatedResponse = {
        createdOn: 987654321,
      };

      const failedWrite = await assertFails(
        ref.doc(responseId).set(updatedResponse),
      );
      expect(failedWrite);
    }
  );

  test(
    'responses collection > succeeds when UPDATING allowed fields',
    async () => {
      const responseId = `responseTest-${Date.now()}`;
      const response = {
        answers: {
          q1: 'a1',
          q2: 'a2',
        },
        createdOn: 123456789,
        meta: {},
        modifiedOn: 123456789,
        page: null,
        progress: 0,
        surveyLabel: 'ep',
      };

      db = await setup(null, {
        [`${RESPONSES_COLLECTION}/${responseId}`]: response,
      });

      const ref = db.collection(RESPONSES_COLLECTION);

      const updatedResponse = {
        answers: {
          q3: 'q3',
          q4: 'q4',
        },
        page: 'page2',
        progress: 50,
      };

      const successfulWrite = await assertSucceeds(
        ref.doc(responseId).set(updatedResponse, { merge: true }),
      );
      expect(successfulWrite);
    }
  );

  test('responses collection > fails when progress decrements', async () => {
    const responseId = `responseTest-${Date.now()}`;
    const response = {
      answers: {
        q1: 'a1',
        q2: 'a2',
      },
      createdOn: 123456789,
      meta: {},
      modifiedOn: 123456789,
      page: null,
      progress: 70,
      surveyLabel: 'ep',
    };

    db = await setup(null, {
      [`${RESPONSES_COLLECTION}/${responseId}`]: response,
    });

    const ref = db.collection(RESPONSES_COLLECTION);

    const updatedResponse = {
      progress: 50,
    };

    const failedWrite = await assertFails(
      ref.doc(responseId).set(updatedResponse, { merge: true }),
    );
    expect(failedWrite);
  });
});
