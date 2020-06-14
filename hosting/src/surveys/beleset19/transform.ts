// BELE-Set Learning Conditions:
// https://docs.google.com/spreadsheets/d/15UEbSR9pfTeWxMLZtE8h1_X5JE04YdaQTgnHExXGHKE/edit?folder=0AKTqgM4c4mJYUk9PVA#gid=0
// https://docs.google.com/spreadsheets/d/1s2yzAQbZVS2avP3noGFIeMjL9eFFwPN4StFjckmwR-Y/edit

import { ResponseDoc } from '../../index.d';
import sample from 'lodash/sample';

const pickOneRandomOpenResponse = (openResponseOptions: string[]) =>
  sample(openResponseOptions);

const addOpenResponse = (
  response: ResponseDoc,
  learningCondition: string,
  openResponseOptions: string[],
) =>
  response &&
  response.meta &&
  response.meta.open_response_lcs &&
  response.meta.open_response_lcs.includes(learningCondition)
    ? [pickOneRandomOpenResponse(openResponseOptions)]
    : [];

export default function(response: ResponseDoc) {
  return {
    ...response,
    meta: {
      ...response.meta,
      // Neptune portal will provide learning conditions to Saturn using the
      // `open_response_lcs` query param. At the time a new response is created
      // we will choose one question from each of these selected learning
      // conditions to display an open response question for.
      showOpenResponses: [
        // Cultural Compentence
        ...addOpenResponse(response, 'cultural-competence', [
          'or_cc1_1',
          'or_cc2_1',
          'or_cc3_1',
        ]),
        // Classroom Belonging
        ...addOpenResponse(response, 'classroom-belonging', [
          'or_c_belonging_classmates',
          'or_c_belonging_teacher',
          'or_c_belonging_thoughts',
        ]),
        // Feedback for Growth
        ...addOpenResponse(response, 'feedback-for-growth', [
          'or_fg1_2',
          'or_fg2_2',
          'or_fg3_2',
        ]),
        // Meaningful Work
        ...addOpenResponse(response, 'meaningful-work', [
          'or_mw1_2',
          'or_mw2_2',
          'or_mw3_2',
        ]),
        // Student Voice
        ...addOpenResponse(response, 'student-voice', [
          'or_voice_choice',
          'or_voice_idea',
          'or_voice_suggestions',
        ]),
        // Teacher Caring
        ...addOpenResponse(response, 'teacher-caring', [
          'or_tc1_2',
          'or_tc2_2',
          'or_tc4_2',
        ]),
      ],
    },
  };
}
