import React from 'react';
import { Field, LikertScale } from 'components';

export default () => (
  <Field
    name="tc4_2"
    label={<>I feel like my teacher cares what I think.</>}
    component={LikertScale}
    likertN={7}
  />
);
