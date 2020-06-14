import React from 'react';
import { Field, LikertScale } from 'components';

export default () => (
  <Field
    name="fg1_2"
    label={<>This week, my teacher challenged me to learn as much as I can.</>}
    component={LikertScale}
    likertN={7}
  />
);
