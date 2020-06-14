// The Block component allows you to group Page components that should all
// receive a common set of props. Most commonly, this will allow us to provide
// the same `showWhen` / `hideWhen` prop for filtering pages based on portal
// provided parameters like `saw_demographics` or `learning_conditions`.
//
// Example usage:
//
// <Pages>
//   <Block hideWhen={sawDemographics}>
//     <Page label="demographics1" next="demographics2" />
//     <Page label="demographics2" next="conclusion" />
//   </Block>
// </Pages>

import React, { cloneElement } from 'react';
import { useParams } from 'react-router-dom';
import { Page } from 'components';

type Props = {
  children: any;
  // Allow Block to provide any props to children Page components.
  [key: string]: any;
};

const Block: React.FC<Props> = ({ children, ...blockProvidedProps }) => {
  const { pageLabel } = useParams();

  return (
    <>
      {React.Children.map(children, child => {
        // The simplest way for Block to pass-through props down to its child
        // Page components is for Pages to render all Block components (along
        // with their Page children).
        //
        // Because we are doing this, the route matching that is occurring for
        // Page components in Pages is not happening. So, we're duplicating the
        // display logic from components/Pages here.

        // Only display `Page` components where the `label` matches the
        // `:pageLabel` of the route.
        const shouldDisplayPage =
          child.type === Page && child.props && child.props.label === pageLabel;

        return shouldDisplayPage && cloneElement(child, blockProvidedProps);
      })}
    </>
  );
};

export default Block;
