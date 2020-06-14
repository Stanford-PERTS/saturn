import React from 'react';
import { Field, LikertScale } from 'components';

export default () => (
  <Field
    name="tc1_2"
    label={<>This week, my teacher treated me with respect.</>}
    component={LikertScale}
    likertN={7}
  />
);
