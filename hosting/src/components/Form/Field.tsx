// Wrapper for formik's Field component. This component renders the formik Field
// component and additionally renders the matching open response question.

import React from 'react';
import { Field as FormikField } from 'formik';
import FieldOpenResponse from './FieldOpenResponse';
import openResponseFieldName from '../../utils/openResponseFieldName';

type Props = {
  [propName: string]: any;
};

const Field: React.FC<Props> = props => {
  // The field labels for these items should follow the convention of placing
  // the prefix `or_` before the label of the corresponding scale item. E.g.,
  // the open-ended text field for the item `mw1_2` should be `or_mw1_2`.
  // (This follows the same convention we had with Qualtrics)
  const orFieldName = openResponseFieldName(props.name);

  return (
    <>
      <FormikField {...props} />
      <FieldOpenResponse fieldName={orFieldName} />
    </>
  );
};

export default Field;
