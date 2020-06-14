import React from 'react';
import styled from 'styled-components';

const FormGroupLabel = ({ children }) => (
  <FormGroupLabelContainer className="FormGroupLabel">
    {children}
  </FormGroupLabelContainer>
);

export default FormGroupLabel;

const FormGroupLabelContainer = styled.h4`
  color: #666;
  margin-bottom: 4px;
`;
