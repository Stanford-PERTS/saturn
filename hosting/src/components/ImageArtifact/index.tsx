import React from 'react';
import styled from 'styled-components';
import imageSrc from './iStock-1069228604.png';

const presentationImagesAlt = '';

const Image = () => <ImageStyled src={imageSrc} alt={presentationImagesAlt} />;

const ImageStyled = styled.img`
  max-height: 400px;
  max-width: 400px;
`;

export default Image;
