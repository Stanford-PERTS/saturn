import React from 'react';
import { Field, LikertScale } from 'components';

export default () => (
  <Field
    name="mw1_2"
    label={<>This week in class, I learned skills that matter for my life.</>}
    component={LikertScale}
    likertN={7}
  />
);
