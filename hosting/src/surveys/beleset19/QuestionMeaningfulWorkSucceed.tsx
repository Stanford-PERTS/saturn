import React from 'react';
import { Field, LikertScale } from 'components';

export default () => (
  <Field
    name="mw2_2"
    label={
      <>
        This week, I learned skills in class that will help me succeed later in
        life.
      </>
    }
    component={LikertScale}
    likertN={7}
  />
);
