import React from 'react';
import styled from 'styled-components';
import imageStarSrc from './iStock-840535330.png';

const presentationImagesAlt = '';

const ImageStar = () => (
  <ImageStarStyled src={imageStarSrc} alt={presentationImagesAlt} />
);

const ImageStarStyled = styled.img`
  max-height: 400px;
  max-width: 400px;
`;

export default ImageStar;
