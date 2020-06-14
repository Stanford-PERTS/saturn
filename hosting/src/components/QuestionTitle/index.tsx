import React from 'react';
import styled, { css } from 'styled-components';

type Props = {
  centered?: boolean;
};

const QuestionTitle: React.FC<Props> = ({ children, centered }) => (
  <QuestionTitleStyled className="QuestionTitle" centered={centered}>
    {children}
  </QuestionTitleStyled>
);

const QuestionTitleStyled = styled.h3<Props>`
  margin: 0;
  margin-bottom: 12px;
  line-height: 1.4em;

  ${props =>
    props.centered &&
    css`
      text-align: center;
    `};
`;

export default QuestionTitle;
