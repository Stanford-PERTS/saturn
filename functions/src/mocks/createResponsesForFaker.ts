// This function is used by the Google Function `insertFakeResponses`.

import {
  ExportableMetaMap,
  ExportableResponseDoc,
  FirestoreMap,
} from '../index.d';
import createClassroomCode from './createClassroomCode';
import createUid from './createUid';
import faker from 'faker';
import random from 'lodash/random';
import sample from 'lodash/sample';

export const createResponse = (code?: string): ExportableResponseDoc => {
  const createdDaysAgo = random(1, 100);
  const modifiedDaysAfter = random(1, createdDaysAgo);
  const jitterSeconds = random(1, 60 * 60 * 23);
  const now = Math.floor(Number(new Date()) / 1000);

  const createdSeconds = now - createdDaysAgo * 24 * 60 * 60 + jitterSeconds;
  const modifiedSeconds = createdSeconds + modifiedDaysAfter * 24 * 60 * 60;

  const meta: ExportableMetaMap = {
    // Assume meta always includes the participation code.
    code: code || createClassroomCode(),
    participant_id: createUid('Participant'),
  };

  const r = {
    answers: {} as FirestoreMap,
    createdOn: {
      seconds: createdSeconds,
      nanoseconds: jitterSeconds,
    },
    meta,
    modifiedOn: {
      seconds: modifiedSeconds,
      nanoseconds: jitterSeconds,
    },
    page: faker.random.word(),
    progress: sample([0, 33, 66, 100]) || 0,
    questionsSeen: {},
    surveyLabel: 'ep',
  };

  // Simulate arbitrary data from the user and platform settings.
  for (let x = 0; x < random(1, 10); x += 1) {
    r.answers[faker.lorem.slug()] = faker.lorem.words();
  }
  for (let x = 0; x < random(1, 3); x += 1) {
    r.meta[faker.lorem.slug()] = faker.lorem.words();
  }

  console.log(r)

  return r;
};

export default function createResponsesForFaker(): ExportableResponseDoc[] {
  const responses: ExportableResponseDoc[] = [];
  const codes = [...Array(10)].map(() => createClassroomCode());

  codes.forEach(code => {
    const numOfResponsesToCreate = random(20, 100);

    for (let n = 1; n <= numOfResponsesToCreate; n += 1) {
      const response = createResponse(code);
      responses.push(response);
    }
  });

  return responses;
}
