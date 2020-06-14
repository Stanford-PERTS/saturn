import React from 'react';
import { Field, FieldProps } from 'formik';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { TextFieldOther } from 'components';

const fieldName = 'gen_status';

const QuestionDemographicsGenStatus: React.FC = () => (
  <FormControl component="fieldset">
    <FormLabel component="legend">
      What is the highest level of education completed by either of your parents
      (or those who raised you)?
    </FormLabel>

    <Field name={fieldName}>
      {({ field: { onChange }, form: { isSubmitting } }: FieldProps) => (
        <RadioGroup aria-label={fieldName} name={fieldName}>
          <FormControlLabel
            value="1"
            label="Did not finish high school"
            control={<Radio onChange={onChange} disabled={isSubmitting} />}
            disabled={isSubmitting}
          />

          <FormControlLabel
            value="2"
            label="High school diploma or G.E.D."
            control={<Radio onChange={onChange} disabled={isSubmitting} />}
            disabled={isSubmitting}
          />

          <FormControlLabel
            value="3"
            label="Attended college but did not complete degree"
            control={<Radio onChange={onChange} disabled={isSubmitting} />}
            disabled={isSubmitting}
          />

          <FormControlLabel
            value="4"
            label="Associate's degree"
            control={<Radio onChange={onChange} disabled={isSubmitting} />}
            disabled={isSubmitting}
          />

          <FormControlLabel
            value="5"
            label="Bachelor's degree"
            control={<Radio onChange={onChange} disabled={isSubmitting} />}
            disabled={isSubmitting}
          />

          <FormControlLabel
            value="6"
            label="Master's degree"
            control={<Radio onChange={onChange} disabled={isSubmitting} />}
            disabled={isSubmitting}
          />

          <FormControlLabel
            value="7"
            label="Doctoral or professional degree (PhD., J.D., M.D., etc.)"
            control={<Radio onChange={onChange} disabled={isSubmitting} />}
            disabled={isSubmitting}
          />

          <FormControlLabel
            value="8"
            label="Other"
            control={<Radio onChange={onChange} disabled={isSubmitting} />}
            disabled={isSubmitting}
          />

          <Field
            name={`${fieldName}_text`}
            component={TextFieldOther}
            label="Please specify"
            margin="normal"
            variant="outlined"
            linkedFieldName={fieldName}
            linkedFieldTest="8"
          />
        </RadioGroup>
      )}
    </Field>
  </FormControl>
);

export default QuestionDemographicsGenStatus;
