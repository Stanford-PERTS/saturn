import React from 'react';
import styled from 'styled-components';
import theme from 'components/theme';

const FormGroup = props => {
  const { children, className } = props;

  return (
    <FormGroupContainer className={className}>{children}</FormGroupContainer>
  );
};

export default FormGroup;

const FormGroupContainer = styled.div`
  border: 1px solid ${theme.colors.grayMedium};
  border-radius: ${theme.units.borderRadius};
  margin-bottom: ${theme.units.fieldPadding};
  padding: 0;

  /* Remove any margins set by individual components/elements. */
  > * {
    margin: 0;
  }

  /*
    Border between each input within a FormGroup.
    https://github.com/PERTS/saturn/issues/114
  */
  > :not(:last-child) {
    border-bottom: 1px solid ${theme.colors.grayMedium};
  }

  /* Add consistent spacing to components/elements within the FormGroup. */
  .CheckboxWithLabel {
    label {
      padding: ${theme.units.fieldPadding};
    }
  }

  .Field {
    .MuiFormControl-root {
      width: 100%;
    }

    &.TextFieldOther {
      padding: ${theme.units.fieldPadding};
    }
  }

  .FormGroupLabel {
    padding: ${theme.units.fieldPadding};
  }
`;
