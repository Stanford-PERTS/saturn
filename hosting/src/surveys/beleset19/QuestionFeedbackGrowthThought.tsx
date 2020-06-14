import React from 'react';
import { Field, LikertScale } from 'components';

export default () => (
  <Field
    name="fg2_2"
    label={
      <>
        This week in class, I thought about ways to improve the quality of my
        work.
      </>
    }
    component={LikertScale}
    likertN={7}
  />
);
