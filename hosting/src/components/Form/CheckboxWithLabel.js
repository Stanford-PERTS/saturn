import React from 'react';
import styled from 'styled-components';
import theme from 'components/theme';
import { Checkbox } from 'components';

const CheckboxWithLabel = props => {
  const { label } = props;
  const { onChange, name, value } = props.field;

  return (
    <CheckboxWithLabelContainer className="CheckboxWithLabel">
      <CheckboxLabel>
        <Checkbox
          checked={value}
          onChange={onChange}
          name={name}
          value={value}
        />
        <CheckboxLabelText>{label}</CheckboxLabelText>
      </CheckboxLabel>
    </CheckboxWithLabelContainer>
  );
};

export default CheckboxWithLabel;

const CheckboxWithLabelContainer = styled.div``;
const CheckboxLabel = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;

  cursor: pointer;

  > :not(:first-child) {
    margin-left: ${theme.units.fieldPadding};
  }
`;
const CheckboxLabelText = styled.div`
  font-size: ${theme.units.fontSizeBase};
`;
