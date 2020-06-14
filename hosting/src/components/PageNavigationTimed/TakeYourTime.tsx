import React from 'react';
import styled from 'styled-components';

const TakeYourTime: React.FC = ({ children }) => (
  <TakeYourTimeStyled className="TakeYourTime">
    {children ? children : 'Please take time to read this carefully.'}
  </TakeYourTimeStyled>
);

const TakeYourTimeStyled = styled.div`
  margin: 10px;
`;

export default TakeYourTime;
