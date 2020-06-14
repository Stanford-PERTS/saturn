import React from 'react';
import styled from 'styled-components';

const PageTitle: React.FC = ({ children }) => (
  <PageTitleStyled className="PageTitle">{children}</PageTitleStyled>
);

const PageTitleStyled = styled.h1`
  font-size: 28px;
`;

export default PageTitle;
