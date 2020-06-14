import React from 'react';
import { Field } from 'formik';
import { FormControl, FormLabel } from '@material-ui/core';
import { CheckboxWithLabel } from 'formik-material-ui';

const QuestionDemographicsInsecureFinancial: React.FC = () => (
  <FormControl component="fieldset">
    <FormLabel component="legend">
      In the past 12 months, did you experience any of the following:
    </FormLabel>

    <Field
      name="fin_insecure_1"
      Label={{
        label: (
          <>
            Not pay or underpay the full tuition and fees bill from your school
            because of financial problems?
          </>
        ),
      }}
      component={CheckboxWithLabel}
      value={true}
    />

    <Field
      name="fin_insecure_2"
      Label={{
        label: (
          <>
            Not pay or under pay your rent or mortgage or housing bill because
            of financial problems?
          </>
        ),
      }}
      component={CheckboxWithLabel}
      value={true}
    />

    <Field
      name="fin_insecure_3"
      Label={{
        label: (
          <>
            Move in with other people, even for a little while, because of
            financial problems?
          </>
        ),
      }}
      component={CheckboxWithLabel}
      value={true}
    />

    <Field
      name="fin_insecure_4"
      Label={{
        label: <>Been homeless?</>,
      }}
      component={CheckboxWithLabel}
      value={true}
    />
  </FormControl>
);

export default QuestionDemographicsInsecureFinancial;
