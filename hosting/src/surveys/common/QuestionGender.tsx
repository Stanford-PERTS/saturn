import React from 'react';
import { Field, FieldProps } from 'formik';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';

const fieldName = 'gender';

const QuestionGender: React.FC = () => (
  <FormControl component="fieldset">
    <FormLabel component="legend">What is your gender?</FormLabel>

    <Field name={fieldName}>
      {({ field: { onChange }, form: { isSubmitting } }: FieldProps) => (
        <RadioGroup aria-label={fieldName} name={fieldName}>
          <FormControlLabel
            value="female"
            label="Female"
            control={<Radio onChange={onChange} disabled={isSubmitting} />}
            disabled={isSubmitting}
          />

          <FormControlLabel
            value="male"
            label="Male"
            control={<Radio onChange={onChange} disabled={isSubmitting} />}
            disabled={isSubmitting}
          />

          <FormControlLabel
            value="other"
            label="Non-Binary/Other"
            control={<Radio onChange={onChange} disabled={isSubmitting} />}
            disabled={isSubmitting}
          />
        </RadioGroup>
      )}
    </Field>
  </FormControl>
);

export default QuestionGender;
