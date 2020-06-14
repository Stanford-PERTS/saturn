import React from 'react';
import styled from 'styled-components';
import { ImageStar, Question } from 'components';

const SurveyComplete = () => (
  <Question title="Thank you!" titleCentered>
    <SurveyCompleteStyled>
      <ImageStar />
      <p>
        You&rsquo;re all done. Leave this screen open in case your teacher wants
        to check it.
      </p>
    </SurveyCompleteStyled>
  </Question>
);

const SurveyCompleteStyled = styled.div`
  margin-left: auto;
  margin-right: auto;

  text-align: center;

  > * {
    margin-top: 20px;
  }
`;

export default SurveyComplete;
