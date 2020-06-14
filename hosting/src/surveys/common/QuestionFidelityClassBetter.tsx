import React from 'react';
import { Field, LikertScale } from 'components';

export default () => (
  <Field
    name="fidelity_class_better"
    label={
      <>
        My instructor will try to use my answers to this survey to make class
        better for me.
      </>
    }
    component={LikertScale}
    likertN={5}
  />
);
