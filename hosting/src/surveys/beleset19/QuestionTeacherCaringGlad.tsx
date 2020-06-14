import React from 'react';
import { Field, LikertScale } from 'components';

export default () => (
  <Field
    name="tc2_2"
    label={<>I feel like my teacher is glad that I am in their class.</>}
    component={LikertScale}
    likertN={7}
  />
);
