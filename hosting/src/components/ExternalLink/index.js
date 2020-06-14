import React from 'react';
import styled from 'styled-components';
import Link from 'components/Link';

const ExternalLinkStyled = styled(Link)`
  // https://www.w3.org/TR/WCAG20-TECHS/G201.html
  &:after {
    margin-left: 5px;
    content: '(opens in new window)';
  }
`;

const ExternalLink = props => (
  <ExternalLinkStyled {...props} rel="noopener noreferrer" />
);

export default ExternalLink;
