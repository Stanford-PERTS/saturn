// SelectMultiple (Formik Field component) links multiple checkboxes together to
// allow for selecting multiple choices in one question.
//
// Example usage:
//
// <Field
//   name="selectMultipleExample"
//   component={SelectMultiple}
//   label="Select up to 2 choices"
//   options={[
//     { label: 'Option 1', value: 'option_1' },
//     { label: 'Option 2', value: 'option_2' },
//     { label: 'Option 3', value: 'option_3' },
//     { label: 'Option 4', value: 'option_4' },
//   ]}
// />
//
// Because the selected checkbox values are saved as an array of strings, you
// can use a Yup validation rule to validate the field:
//
// schema: Yup.object({
//   selectMultipleExample: Yup.array().max(2, 'Please select at most 2.'),
// }),

import React from 'react';
import { FieldProps } from 'formik';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';

type FormValues = {
  name: string;
};

type Props = {
  label?: string;
  options: [
    {
      label: string;
      value: string;
    },
  ];
} & FieldProps;

const SelectMultiple: React.FC<Props> = props => {
  const { label, options } = props;
  const { onChange, name, value } = props.field;

  const error = props.form.errors[name];
  const isChecked = (v: string) => Array.isArray(value) && value.includes(v);

  return (
    <div className="Field SelectMultiple">
      <FormControl component="fieldset" error={Boolean(error)}>
        {label && <FormLabel component="legend">{label}</FormLabel>}

        <FormGroup>
          {options.map(option => (
            <FormControlLabel
              key={option.value}
              control={
                <Checkbox
                  checked={isChecked(option.value)}
                  onChange={onChange}
                  name={name}
                  value={option.value}
                />
              }
              label={option.label}
            />
          ))}
        </FormGroup>
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </div>
  );
};

export default SelectMultiple;
