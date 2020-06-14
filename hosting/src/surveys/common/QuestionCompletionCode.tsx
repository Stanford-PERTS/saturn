import React from 'react';
import styled from 'styled-components';
import { Question } from 'components';

type Props = {
  codeSuffix: string;
};

const QuestionCompletionCode: React.FC<Props> = ({ codeSuffix }) => {
  // https://github.com/PERTS/saturn/issues/81
  // The completion code is generated like this:
  //     Math.floor(Math.random() * Math.pow(10, 6)) + "4131"
  // and is essentially a human-verifiable signed token. Students will give
  // these to instructors who will check that the last four digits are as
  // expected, then give students credit for completing the survey.

  const codePrefix = Math.floor(Math.random() * Math.pow(10, 6));
  const code = `${codePrefix}${codeSuffix}`;

  return (
    <Question
      title="If your instructors requested a completion code for this survey,
        please copy the following code and send it to them."
      titleCentered
    >
      <CompletionCodeCentered>
        <CompletionCode>{code}</CompletionCode>
      </CompletionCodeCentered>
    </Question>
  );
};

const CompletionCodeCentered = styled.div`
  text-align: center;
`;

const CompletionCode = styled.div`
  display: inline-block;

  margin: 16px auto;
  padding: 10px;

  border: 1px dashed #f50057;
  border-radius: 5px;

  font-size: 36px;
  white-space: nowrap;
`;

export default QuestionCompletionCode;
