// Spin the children.
//
// This component uses CSS animation to rotate its child components. This is
// useful so we can rotate a static icon image/component, like the Font Awesome
// spinner icon.
//
// Example usage:
//   import { Spin } from 'components';
//   import { FaSpinner } from 'react-icons/fa';
//
//   return (
//     <Spin>
//       <FaSpinner />
//     </Spin>
//   );

import styled from 'styled-components';

const Spin = styled.div`
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    100% {
      -webkit-transform: rotate(359deg);
      transform: rotate(359deg);
    }
  }

  @keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    100% {
      -webkit-transform: rotate(359deg);
      transform: rotate(359deg);
    }
  }

  -webkit-animation: spin 1.5s linear infinite;
  animation: spin 1.5s linear infinite;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Spin;
