import {
  ExportableResponseDoc,
  FirestoreMap,
  SurveyConfig,
  TimestampObject,
} from '../index.d';
import createUid from './createUid';
import createAnswersForSurveys from './createAnswersForSurvey';
import createClassroomCode from './createClassroomCode';
import faker from 'faker';
import moment from 'moment';

const dateToFirestoreTimestampObject = (d: Date): TimestampObject => ({
  seconds: moment(d).unix(),
  nanoseconds: 0,
});

export default function createResponseToSurvey(
  surveyConfig: SurveyConfig,
  overrideProps: FirestoreMap = {},
  forcedAnswers: FirestoreMap = {},
): ExportableResponseDoc {
  const surveyLabel = surveyConfig.label;
  const firestore_id = faker.random.alphaNumeric(20);

  // Format optional createdOn and modifiedOn overrideProps.
  const dateCreatedOn = overrideProps.createdOn
    ? new Date(overrideProps.createdOn)
    : new Date();
  const dateModifiedOn = overrideProps.modifiedOn
    ? new Date(overrideProps.modifiedOn)
    : new Date();

  const createdOn = dateToFirestoreTimestampObject(dateCreatedOn);
  const modifiedOn = dateToFirestoreTimestampObject(dateModifiedOn);

  // We already handled createdOn and modifiedOn, so we remove them.
  delete overrideProps.createdOn;
  delete overrideProps.modifiedOn;

  const page = surveyConfig.firstPage;
  const progress = 1;
  const questionsSeen = {};

  // Pull `meta` from the optionally provided overrideProps.
  const overrideMeta = overrideProps.meta || {};
  delete overrideProps.meta;

  const meta = {
    // Required for proper interaction with Neptune ParticipantData:
    code: createClassroomCode(),
    participant_id: createUid('Participant'),
    survey_id: createUid('Survey'),

    // Optional, but commonly provided:
    // first_login: false,
    // learning_conditions: [],
    // open_response_lcs: [],
    // show_validation: true,
    // testing: true,

    // And the optional meta supplied via arguments:
    ...overrideMeta,
  };

  const answers = {};

  const response = surveyConfig.transform({
    surveyLabel,
    firestore_id,
    createdOn,
    modifiedOn,
    meta,
    page,
    progress,
    questionsSeen,
    answers,
    ...overrideProps,
  });

  response.answers = {
    ...createAnswersForSurveys(surveyConfig, response),
    ...forcedAnswers,
  };

  return response;
}
