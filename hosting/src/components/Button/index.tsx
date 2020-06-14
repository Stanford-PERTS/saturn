import React from 'react';
import styled, { css } from 'styled-components';
import theme from 'components/theme';
import { Spin } from 'components';
import { FaSpinner } from 'react-icons/fa';

type Props = {
  disabled?: boolean;
  icon?: any;
  loading?: boolean;
  onClick?: (event: React.TouchEvent | React.MouseEvent) => void;
};

const Button: React.FC<Props> = props => {
  const { children, icon, disabled } = props;

  const showIcon = icon && !props.loading;
  const showLoading = props.loading;

  return (
    <ButtonStyled disabled={disabled}>
      <ButtonText>{children}</ButtonText>

      <ButtonIcon>
        {showIcon && icon}
        {showLoading && (
          <Spin>
            <FaSpinner />
          </Spin>
        )}
      </ButtonIcon>
    </ButtonStyled>
  );
};

const ButtonText = styled.div`
  flex-grow: 1;
`;

const ButtonIcon = styled.div`
  flex-basis: 48px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonStyled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;

  width: 100%;
  line-height: 48px;

  font-size: 16px;
  font-weight: bold;

  color: ${theme.colors.white};
  background-color: ${theme.colors.primary};

  border: 0;
  border-radius: ${theme.units.borderRadius};

  cursor: pointer;

  ${props =>
    props.disabled &&
    css`
      background-color: ${theme.colors.disabled};
      cursor: not-allowed;
    `};

  &:focus {
    outline: 3px solid ${theme.colors.focus};
  }
`;

export default Button;
