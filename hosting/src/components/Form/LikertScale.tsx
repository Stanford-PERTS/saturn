// LikertScale (Formik Field component) displays a Likert Scale input field.
// https://en.wikipedia.org/wiki/Likert_scale
//
// Example usage:
//
// <Field
//   name="like_icecream"
//   label="I like ice cream."
//   component={LikertScale}
//   likertN={6}
// />
//
// Example usage, reverse likert option values with `likertReverse`:
//
// <Field
//   name="like_icecream"
//   label="I dislike ice cream."
//   component={LikertScale}
//   likertN={6}
//   likertReverse
// />

import React from 'react';
import { FieldProps } from 'formik';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

type Props = {
  label: string;
  likertN: number;
  likertReverse?: boolean;
} & FieldProps;

const LikertScale: React.FC<Props> = props => {
  const { label, likertN, likertReverse = false } = props;
  const { onChange, name, value } = props.field;
  const { errors, isSubmitting } = props.form;

  if (!likertScaleOptions[likertN]) {
    throw Error(`That Likert Scale option (likertN) does not exist.`);
  }

  // If the `likertReverse` prop is set, then reverse the `values` of the Likert
  // Scale options. For example: if `likertN={2}` and `likertReverse` then
  // `Disagree` would receive a value of `2` and `Agree` would receive a value
  // of `1`.
  const likertOptions = likertReverse
    ? likertScaleOptions[likertN].map(o => ({
        label: o.label,
        // This assumes that the default option values start at 1 and increment
        // by 1 and in ascending order. Example: 1, 2, 3, 4, 5, 6.
        value: likertScaleOptions[likertN].length - o.value + 1,
      }))
    : likertScaleOptions[likertN];

  const error = errors[name];
  const isChecked = (v: number) => value === v.toString();

  return (
    <div className="Field LikertScale">
      <FormControl component="fieldset" error={Boolean(error)}>
        {label && <FormLabel component="legend">{label}</FormLabel>}

        <RadioGroup aria-label={name} name={name}>
          {likertOptions.map(option => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio onChange={onChange} disabled={isSubmitting} />}
              label={option.label}
              disabled={isSubmitting}
              checked={isChecked(option.value)}
            />
          ))}
        </RadioGroup>

        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </div>
  );
};

type LikertScaleOptions = {
  [key: number]: {
    label: string;
    value: number;
  }[];
};

const likertScaleOptions: LikertScaleOptions = {
  2: [
    { label: 'Disagree', value: 1 },
    { label: 'Agree', value: 2 },
  ],
  3: [
    { label: 'Disagree', value: 1 },
    { label: 'Neither Agree Nor Disagree', value: 2 },
    { label: 'Agree', value: 3 },
  ],
  4: [
    { label: 'Strongly Disagree', value: 1 },
    { label: 'Disagree', value: 2 },
    { label: 'Agree', value: 3 },
    { label: 'Strongly Agree', value: 4 },
  ],
  5: [
    { label: 'Strongly Disagree', value: 1 },
    { label: 'Disagree', value: 2 },
    { label: 'Neither Agree Nor Disagree', value: 3 },
    { label: 'Agree', value: 4 },
    { label: 'Strongly Agree', value: 5 },
  ],
  6: [
    { label: 'Strongly Disagree', value: 1 },
    { label: 'Disagree', value: 2 },
    { label: 'Slightly Disagree', value: 3 },
    { label: 'Slightly Agree', value: 4 },
    { label: 'Agree', value: 5 },
    { label: 'Strongly Agree', value: 6 },
  ],
  7: [
    { label: 'Strongly Disagree', value: 1 },
    { label: 'Disagree', value: 2 },
    { label: 'Slightly Disagree', value: 3 },
    { label: 'Neither Agree Nor Disagree', value: 4 },
    { label: 'Slightly Agree', value: 5 },
    { label: 'Agree', value: 6 },
    { label: 'Strongly Agree', value: 7 },
  ],
};

export default LikertScale;
