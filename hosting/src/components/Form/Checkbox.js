import React from 'react';
import styled from 'styled-components';
import theme from 'components/theme';

const Checkbox = ({ className, checked, ...props }) => (
  <CheckboxContainer className={className}>
    <HiddenCheckbox checked={checked} {...props} />
    <StyledCheckbox checked={checked}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
);

export default Checkbox;

const CheckboxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 3px;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  /*
    Hide the browser default input UI. Don't use 'display: hidden' or
    'visibility: hidden' because then the input fields will be removed from the
    flow of the page and ignored by screen readers.
  */
  opacity: 0;
  /*
    Absolute so the hidden radio fields doesn't displace other elements.
  */
  position: absolute;
`;

const StyledCheckbox = styled.div`
  width: ${theme.units.checkboxSize};
  height: ${theme.units.checkboxSize};
  background: ${props =>
    props.checked ? theme.colors.primary : theme.colors.white};
  border: 2px solid ${theme.colors.primary};
  border-radius: ${theme.units.borderRadius};
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 5px ${theme.colors.primaryLight};
  }

  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')};
  }
`;
