import React from 'react';
import { TextFieldOther } from 'components';
import { Field, FieldProps } from 'formik';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';

const fieldName = 'fidelity_honest';

type Props = {
  // Required when using within a RandomOne component to track which Question
  // is being/has been displayed to the survey participant.
  label?: string;
};

const QuestionFidelityHonest: React.FC<Props> = ({ label }) => (
  <FormControl component="fieldset">
    <FormLabel component="legend">
      Do you feel comfortable answering these questions honestly? (If no, why
      not?)
    </FormLabel>

    <Field name={fieldName}>
      {({ field: { onChange }, form: { isSubmitting } }: FieldProps) => (
        <RadioGroup aria-label={fieldName} name={fieldName}>
          <FormControlLabel
            value="1"
            label="Yes"
            control={<Radio onChange={onChange} disabled={isSubmitting} />}
            disabled={isSubmitting}
          />

          <FormControlLabel
            value="0"
            label="No"
            control={<Radio onChange={onChange} disabled={isSubmitting} />}
            disabled={isSubmitting}
          />
        </RadioGroup>
      )}
    </Field>

    <Field
      name="fidelity_why_not"
      component={TextFieldOther}
      label="Why not?"
      margin="normal"
      variant="outlined"
      linkedFieldName={fieldName}
      linkedFieldTest="0"
    />
  </FormControl>
);

export default QuestionFidelityHonest;
