import React from 'react';
import { TextFieldOther } from 'components';
import { Field } from 'formik';
import { FormControl, FormLabel } from '@material-ui/core';
import { CheckboxWithLabel } from 'formik-material-ui';

const QuestionDemographicsTransferStatus: React.FC = () => (
  <FormControl component="fieldset">
    <FormLabel component="legend">
      Since graduating from high school, which of the following types of
      colleges or universities have you attended other than the school(s) you
      attend currently? (Select all that apply)
    </FormLabel>

    <Field
      name="transfer_status_1"
      Label={{
        label: <>Community or junior college</>,
      }}
      component={CheckboxWithLabel}
      value={true}
    />

    <Field
      name="transfer_status_2"
      Label={{
        label: <>4-year college or university other than this one</>,
      }}
      component={CheckboxWithLabel}
      value={true}
    />

    <Field
      name="transfer_status_3"
      Label={{
        label: <>None</>,
      }}
      component={CheckboxWithLabel}
      value={true}
    />

    <Field
      name="transfer_status_4"
      Label={{
        label: <>Other</>,
      }}
      component={CheckboxWithLabel}
      value={true}
    />

    <Field
      name="transfer_status_text"
      component={TextFieldOther}
      label="Please specify"
      margin="normal"
      variant="outlined"
      linkedFieldName="transfer_status_4"
    />
  </FormControl>
);

export default QuestionDemographicsTransferStatus;
