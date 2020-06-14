import React from 'react';
import {
  CheckboxWithLabel,
  FormGroup,
  FormGroupLabel,
  TextFieldOther,
} from 'components';
import { Field } from 'formik';
import { FormControl, FormLabel } from '@material-ui/core';

const QuestionRace = () => (
  <FormControl component="fieldset">
    <FormLabel component="legend">
      With what group(s) do you identify? Please select the box(es) that apply.
    </FormLabel>

    <FormGroup>
      <FormGroupLabel>Native American</FormGroupLabel>

      <Field
        name="race_amindian"
        label="American Indian or Alaskan Native"
        component={CheckboxWithLabel}
        value={true}
      />
    </FormGroup>

    <FormGroup>
      <FormGroupLabel>Asian/Asian American</FormGroupLabel>

      <Field
        name="race_e_asian"
        label="East Asian (e.g., Chinese, Japanese, Korean, Taiwanese)"
        component={CheckboxWithLabel}
        value={true}
      />

      <Field
        name="race_se_asian"
        label="Southeast Asian (e.g., Filipino, Indonesian, Vietnamese)"
        component={CheckboxWithLabel}
        value={true}
      />

      <Field
        name="race_s_asian"
        label="South Asian (e.g., Pakistani, Indian, Nepalese, Sri Lankan)"
        component={CheckboxWithLabel}
        value={true}
      />

      <Field
        name="race_o_asian"
        label="Other Asian"
        component={CheckboxWithLabel}
        value={true}
      />
    </FormGroup>

    <FormGroup>
      <FormGroupLabel>Hispanic/Latino</FormGroupLabel>

      <Field
        name="race_mex"
        label="Mexican American/Chicano"
        component={CheckboxWithLabel}
        value={true}
      />

      <Field
        name="race_puerto_rican"
        label="Puerto Rican"
        component={CheckboxWithLabel}
        value={true}
      />

      <Field
        name="race_central_american"
        label="Central American"
        component={CheckboxWithLabel}
        value={true}
      />

      <Field
        name="race_o_latino"
        label="Other Hispanic or Latino"
        component={CheckboxWithLabel}
        value={true}
      />
    </FormGroup>

    <FormGroup>
      <FormGroupLabel>Black</FormGroupLabel>

      <Field
        name="race_african_american"
        label="African American/Black"
        component={CheckboxWithLabel}
        value={true}
      />

      <Field
        name="race_african"
        label="African"
        component={CheckboxWithLabel}
        value={true}
      />

      <Field
        name="race_caribbean"
        label="Caribbean"
        component={CheckboxWithLabel}
        value={true}
      />

      <Field
        name="race_o_black"
        label="Other Black"
        component={CheckboxWithLabel}
        value={true}
      />
    </FormGroup>

    <FormGroup>
      <FormGroupLabel>White</FormGroupLabel>

      <Field
        name="race_european"
        label="European/European American"
        component={CheckboxWithLabel}
        value={true}
      />

      <Field
        name="race_middle_eastern"
        label="Middle Eastern/Middle Eastern American"
        component={CheckboxWithLabel}
        value={true}
      />

      <Field
        name="race_o_white"
        label="Other White"
        component={CheckboxWithLabel}
        value={true}
      />
    </FormGroup>

    <FormGroup>
      <FormGroupLabel>Pacific Islander</FormGroupLabel>

      <Field
        name="race_pac_isl"
        label="Native Hawaiian or Other Pacific Islander"
        component={CheckboxWithLabel}
        value={true}
      />
    </FormGroup>

    <FormGroup>
      <FormGroupLabel>Other</FormGroupLabel>

      <Field
        name="race_other"
        label="Other Group (Please specify)"
        component={CheckboxWithLabel}
        value={true}
      />

      <Field
        name="race_text"
        component={TextFieldOther}
        linkedFieldName="race_other"
        label="Please specify"
        margin="normal"
        variant="outlined"
      />
    </FormGroup>
  </FormControl>
);

export default QuestionRace;
