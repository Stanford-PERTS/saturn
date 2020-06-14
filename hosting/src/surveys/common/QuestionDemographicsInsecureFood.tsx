import React from 'react';
import { Field, FieldProps } from 'formik';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';

const fieldName = 'food_insecure';

const QuestionDemographicsInsecureFood: React.FC = () => (
  <FormControl component="fieldset">
    <FormLabel component="legend">
      In the last 12 months, was the following situation often true, sometimes
      true, or never true for you? &ldquo;I worried whether my food would run
      out before I got money to buy more.&rdquo;
    </FormLabel>

    <Field name={fieldName}>
      {({ field: { onChange }, form: { isSubmitting } }: FieldProps) => (
        <RadioGroup aria-label={fieldName} name={fieldName}>
          <FormControlLabel
            value="1"
            label="Often True"
            control={<Radio onChange={onChange} disabled={isSubmitting} />}
            disabled={isSubmitting}
          />

          <FormControlLabel
            value="2"
            label="Sometimes True"
            control={<Radio onChange={onChange} disabled={isSubmitting} />}
            disabled={isSubmitting}
          />

          <FormControlLabel
            value="3"
            label="Never True"
            control={<Radio onChange={onChange} disabled={isSubmitting} />}
            disabled={isSubmitting}
          />
        </RadioGroup>
      )}
    </Field>
  </FormControl>
);

export default QuestionDemographicsInsecureFood;
