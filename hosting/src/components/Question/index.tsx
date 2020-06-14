import React from 'react';
import styled from 'styled-components';
import { QuestionTitle } from 'components';

type Props = {
  children: any;
  // Required when using within a RandomOne component to track which Question
  // is being/has been displayed to the survey participant.
  label?: string;
  title?: any;
  // `true` if you'd like the QuestionTitle to be centered
  titleCentered?: boolean;
};

const Question: React.FC<Props> = ({ title, titleCentered, children }) => (
  <QuestionStyled className="Question">
    {title && <QuestionTitle centered={titleCentered}>{title}</QuestionTitle>}
    {children}
  </QuestionStyled>
);

const QuestionStyled = styled.div`
  padding: 18px;

  /*
    Setting margin-top and margin-bottom so that the spacing set by the above
    padding is consistent regardless of the first/last element used.
  */
  > :first-child {
    margin-top: 0;
  }

  > :last-child {
    margin-bottom: 0;
  }

  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 5px;
`;

export default Question;
