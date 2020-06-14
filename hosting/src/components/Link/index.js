import styled from 'styled-components';
import theme from 'components/theme';

const Link = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px dashed ${theme.colors.primary};
  border-radius: ${theme.units.borderRadius};

  font-weight: bold;
  text-decoration: none;
  line-height: 48px;
`;

export default Link;
