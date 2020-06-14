import React from 'react';
import { Field, LikertScale } from 'components';

export default () => (
  <Field
    name="mw3_2"
    label={
      <>
        This week in class, I learned skills I could use to help other people.
      </>
    }
    component={LikertScale}
    likertN={7}
  />
);
