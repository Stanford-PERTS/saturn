import styled, { css } from 'styled-components';

export type Props = {
  center?: boolean;
};

const P = styled.p<Props>`
  ${props =>
    props.center &&
    css`
      text-align: center;
    `};
`;

export default P;
