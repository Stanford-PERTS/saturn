// TextFieldOther is a TextField that is disabled unless the field, specified by
// the `linkedFieldName` prop is checked (value of true) or equal to the value
// provided via the `linkedFieldTest` prop.
//
// Example usage, to match a checkbox being checked:
//
// <Field
//   name="transfer_status_text"
//   component={TextFieldOther}
//   label="Please specify"
//   margin="normal"
//   variant="outlined"
//   linkedFieldName="transfer_status_4"
// />
//
// Example usage, to match a radio button value:
//
// <Field
//   name="fidelity_why_not"
//   component={TextFieldOther}
//   label="Why not?"
//   margin="normal"
//   variant="outlined"
//   linkedFieldName={fieldName}
//   linkedFieldTest="no"
// />

import React, { useEffect, useState } from 'react';
import { FieldProps, useFormikContext } from 'formik';
import TextField from '@material-ui/core/TextField';

type Props = {
  label: string;
  linkedFieldName: string;
  linkedFieldTest?: any;
} & FieldProps;

const TextFieldOther: React.FC<Props> = props => {
  const { label, linkedFieldName, linkedFieldTest = true } = props;
  const { onChange, name, value } = props.field;
  const { setFieldValue } = props.form;
  const { values: formValues } = useFormikContext();

  const error = props.form.errors[name];

  // When the linked field is NOT checked (false for radio/checkbox) then this
  // field should be disabled.
  const isLinkedFieldChecked = formValues[linkedFieldName] === linkedFieldTest;
  const [isDisabled, setIsDisabled] = useState(!isLinkedFieldChecked);

  useEffect(() => {
    // When this field is disabled, clear its value so that the user can't
    // submit a value for it when its linked field is unchecked.
    if (!isLinkedFieldChecked) {
      setFieldValue(name, '');
    }

    setIsDisabled(!isLinkedFieldChecked);
  }, [formValues, isLinkedFieldChecked, linkedFieldName, name, setFieldValue]);

  return (
    <div className="Field TextFieldOther">
      <TextField
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        variant="outlined"
        disabled={isDisabled}
        error={Boolean(error)}
        helperText={error}
      />
    </div>
  );
};

export default TextFieldOther;
