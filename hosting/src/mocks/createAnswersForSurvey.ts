// TODO handle RandomOne questions
// TODO handle open response questions
// TODO handle linked fields

import {
  ExportableResponseDoc,
  FirestoreMap,
  SurveyConfig,
  SurveyConfigBlock,
  SurveyConfigPage,
  SurveyConfigQuestion,
  SurveyConfigAnswerOption,
} from '../index.d';
import openResponseFieldName from '../utils/openResponseFieldName';
import whenOpenResponse from '../utils/whenOpenResponse';
import faker from 'faker';
import sample from 'lodash/sample';

// eslint-disable-next-line complexity
export default function generateAnswersForSurvey(
  surveyConfig: SurveyConfig,
  response: ExportableResponseDoc,
): FirestoreMap {
  const answers: FirestoreMap = {};

  // Gather all questions into a lookup object to make it easier to get and
  // traverse the questions in order.
  type PageBlockPair = {
    block: SurveyConfigBlock;
    page: SurveyConfigPage;
  };

  type PagesLookup = {
    [pageLabel: string]: PageBlockPair;
  };
  const pagesLookup: PagesLookup = {};

  surveyConfig.questions.forEach((block: SurveyConfigBlock) => {
    block.children.forEach((page: SurveyConfigPage) => {
      pagesLookup[page.label] = {
        block,
        page,
      };
    });
  });

  // Traverse pages and answer questions.
  let currentPageLabel: string | undefined = surveyConfig.firstPage;

  while (currentPageLabel) {
    const currentPage: PageBlockPair = pagesLookup[currentPageLabel];
    // 1) Determine if we should skip this question.

    // Assumption. The React app will throw an error if both a showWhen and
    // hideWhen prop are provided. Here we are assuming that the survey configs
    // have been set up properly and aren't checking/throwing in that case.

    // Important: Page comes before block because, when rendered, if both
    // components have a showWhen prop, the page component's version will take
    // precedence.

    const showWhen = currentPage.page.showWhen || currentPage.block.showWhen;

    if (typeof showWhen === 'function' && !showWhen(response)) {
      // Skip this page.
      currentPageLabel = currentPage.page.next;
      continue;
    }

    // Important: Page comes before block because, when rendered, if both
    // components have a hideWhen prop, the page component's version will take
    // precedence.

    const hideWhen = currentPage.page.hideWhen || currentPage.block.hideWhen;

    if (typeof hideWhen === 'function' && hideWhen(response)) {
      // Skip this page.
      currentPageLabel = currentPage.page.next;
      continue;
    }

    // 2) Generate answers to questions on each page.
    // Note: Sometimes we only display one question on a page.
    const questionsToAnswer = currentPage.page.randomOne
      ? // Assumption: We have correctly set up our survey config file and there
        // will always be questions to sample from.
        [sample(currentPage.page.children) as SurveyConfigQuestion]
      : currentPage.page.children;

    questionsToAnswer.forEach(question => {
      // Assumption: We have correctly set up our survey config file and there
      // will always be answer options to sample from.
      const sampledAnswer = sample(
        question.answerOptions,
      ) as SurveyConfigAnswerOption;

      answers[question.name] = sampledAnswer.value;

      // Generate an answer to the marked open response question(s).
      // Question(s) is/are flagged by the survey's transform function.
      const orFieldName = openResponseFieldName(question.name);
      if (whenOpenResponse(orFieldName)(response)) {
        // Answer with 3 lorem ipsum style sentences.
        answers[orFieldName] = faker.lorem.sentences(3);
      }

      // Generate answers for linked fields.
      const { linkedQuestion } = question;
      // If there's a linkedQuestion...
      if (linkedQuestion) {
        const { linkedFieldName, linkedFieldTest } = linkedQuestion;
        // And the linkedField has been answered...
        if (linkedFieldName && linkedFieldName in answers) {
          const linkedAnswer = answers[linkedFieldName];
          // And the answer matches the linkedFieldTest value...
          if (linkedAnswer === linkedFieldTest) {
            // Then answer with 2 lorem ipsum style sentences.
            answers[linkedQuestion.name] = faker.lorem.sentences(2);
          }
        }
      }
    });

    // 3) Traverse to next page.
    currentPageLabel = currentPage.page.next;
  }

  return answers;
}
