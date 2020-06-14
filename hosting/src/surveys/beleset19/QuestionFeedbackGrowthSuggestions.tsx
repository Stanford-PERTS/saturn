import React from 'react';
import { Field, LikertScale } from 'components';

export default () => (
  <Field
    name="fg3_2"
    label={
      <>
        This week in class, I got specific suggestions about how to improve my
        skills.
      </>
    }
    component={LikertScale}
    likertN={7}
  />
);
