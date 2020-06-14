// Renders the `children` in a random order.
//
// Example usage:
//   <RandomOrder>
//     <Question>Question 1</Question>
//     <Question>Question 2</Question>
//     <Question>Question 3</Question>
//   </RandomOrder>

import React from 'react';
import shuffle from 'lodash/shuffle';

const RandomOrder: React.FC = ({ children }) => (
  <>{shuffle(React.Children.toArray(children))}</>
);

export default RandomOrder;
