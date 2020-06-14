import React from 'react';
import styled from 'styled-components';
import theme from 'components/theme';
import { useResponseContext } from 'services/responseContext';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { QuestionTitle, Show } from 'components';
import whenOpenResponse from '../../utils/whenOpenResponse';

type Props = {
  fieldName: string;
};

const FieldOpenResponse: React.FC<Props> = props => {
  const response = useResponseContext();
  const { fieldName } = props;

  return (
    <Show when={whenOpenResponse(fieldName)(response)}>
      <OpenResponseQuestionStyled>
        <QuestionTitle>
          Please explain how you chose your answer. You can also add anything
          else about your answer that you would like your teacher to know.
        </QuestionTitle>

        <OpenResponseFieldStyled>
          <Field
            name={fieldName}
            component={TextField}
            label="Please explain"
            multiline
            rows="4"
            variant="outlined"
            fullWidth
          />
        </OpenResponseFieldStyled>
      </OpenResponseQuestionStyled>
    </Show>
  );
};

const OpenResponseQuestionStyled = styled.div`
  margin-top: ${theme.units.fieldPadding};
`;

const OpenResponseFieldStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default FieldOpenResponse;
