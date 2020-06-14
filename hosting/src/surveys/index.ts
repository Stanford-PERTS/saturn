// See https://jaredpalmer.com/formik/docs/next/api/formik#validationschema-schema-schema
// See https://github.com/jquense/yup for validation documentation.

import { useState } from 'react';
import isDevelopment from '../utils/isDevelopment';
import * as Yup from 'yup';

export { default as QuestionCompletionCode } from './common/QuestionCompletionCode';
export { default as QuestionFidelityHonest } from './common/QuestionFidelityHonest';
export { default as QuestionGender } from './common/QuestionGender';
export { default as QuestionRace } from './common/QuestionRace';
export { default as SurveyComplete } from './common/SurveyComplete';

export type ValidationSchemaConfig = {
  label: string;
  schema: Yup.ObjectSchema;
};

// Default empty validationSchema to be used by surveys.
export let validationSchema = Yup.object();

// Use this hook to set the validationSchema that is being used by the
// Page form rendered. This allows us to dynamically switch schema depending
// on the survey being displayed.
//
// Example usage:
//
//   import { useValidationSchema } from 'surveys';
//   import validationSchema from './validationSchema';
//
//   const SurveyEp = () => {
//     useValidationSchema(validationSchema);
//   };
//
export function useValidationSchema({ label, schema }: ValidationSchemaConfig) {
  const [surveyLabel, setSurveyLabel] = useState();

  if (surveyLabel !== label) {
    // eslint-disable-next-line no-console
    isDevelopment && console.log(`Setting validationSchema to ${label}`);
    validationSchema = schema;
    setSurveyLabel(label);
  }
}
