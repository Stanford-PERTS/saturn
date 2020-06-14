import React from 'react';
import styled, { css } from 'styled-components';
import theme from 'components/theme';
import { Show } from 'components';
import iconArtifactSrc from './IconArtifact.png';

type Props = {
  // By default, we want to display a "(opens in new tab)" message for users,
  // for accessibility purposes. https://www.w3.org/TR/WCAG20-TECHS/H83.html
  // Setting this to true disables this message so that you can include your
  // own custom text instead.
  accessibilityOverride?: boolean;
  // href attribute.
  href?: string;
  // Activate inverted color theming.
  invertColors?: boolean;
};

const ArtifactLinkStyled = styled.a<Props>`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  margin-top: 40px;
  padding: 0 20px;

  min-height: 70px;

  border-radius: ${theme.units.borderRadius};
  background: ${theme.colors.primary};
  color: ${theme.colors.white};

  ${props =>
    props.invertColors &&
    css`
      border: 1px dashed ${theme.colors.primary};
      background: transparent;
      color: ${theme.colors.primary};
    `};

  font-weight: bold;
  text-decoration: none;
`;

const ArtifactLinkTextStyled = styled.span`
  padding: 8px;
  padding-right: 120px;
  text-align: center;
`;

const ArtifactLinkIcon = styled.img`
  position: absolute;
  right: 20px;
  top: -26px;

  height: 110px;
  width: 110px;
`;

const ArtifactLink: React.FC<Props> = props => (
  <ArtifactLinkStyled {...props} target="_blank" rel="noopener noreferrer">
    <ArtifactLinkTextStyled>
      <div>{props.children}</div>

      <Show when={!props.accessibilityOverride}>
        <div>(opens in new tab)</div>
      </Show>
    </ArtifactLinkTextStyled>
    <ArtifactLinkIcon src={iconArtifactSrc} alt="" />
  </ArtifactLinkStyled>
);

export default ArtifactLink;
