// Helper `showWhen` function to match learning conditions.
//
// Example:
//   /surveys/ep?learning_conditions=["teacher-caring"]
//
// Would be matched by:
//   <Page showWhen={whenLearningCondition('teacher-caring')}>

import { ResponseDocContextValue } from '../index.d';

const whenLearningCondition = (condition: string) => (
  response: ResponseDocContextValue,
): boolean | null => {
  if (!response || !response.meta || !response.meta.learning_conditions) {
    return false;
  }

  try {
    const learningConditions = JSON.parse(response.meta.learning_conditions);

    if (!(learningConditions instanceof Array)) {
      console.error(
        'learning_conditions query param should be a',
        'JSON-encoded array of strings',
      );
      return false;
    }

    return learningConditions.includes(condition);
  } catch (e) {
    console.error(
      'Could not parse learning_conditions query param.',
      'Should be an array of strings.',
      response.meta.learning_conditions,
    );
    return false;
  }
};

export default whenLearningCondition;
