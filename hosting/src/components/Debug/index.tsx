import React from 'react';
import StyledDebug from './StyledDebug';
import isDevelopment from 'utils/isDevelopment';

const Debug: React.FC = ({ children }) =>
  isDevelopment() && <StyledDebug className="Debug">{children}</StyledDebug>;

export default Debug;
