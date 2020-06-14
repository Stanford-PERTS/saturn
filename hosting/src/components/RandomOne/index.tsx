// Renders a single, random child of all provided `children`. The initial child
// rendered will be the same child rendered on all subsequent renders for the
// same response.
//
// Example usage:
//   <RandomOne label="fidelity">
//     <Question label="fidelity_class_better">
//       <Field />
//     </Question>
//     <Question label="fidelity_honest">
//       <Field />
//       <Field />
//     </Question>
//   </RandomOne>

import React from 'react';
import { useParams } from 'react-router-dom';
import { useResponseContext } from 'services/responseContext';
import { updateResponse } from 'services';
import sample from 'lodash/sample';

type Props = {
  children: any[];
  // The key to be used when saving to the response questionsSeen object.
  label: string;
};

const RandomOne: React.FC<Props> = ({ children, label: seenKey }) => {
  const response = useResponseContext();
  const { responseId } = useParams();

  if (!response || typeof responseId !== 'string') {
    return null;
  }

  const questionToDisplayLabel = response.questionsSeen[seenKey];

  const questionToRender = sample(
    React.Children.map(children, child => {
      // Utilizing map to convert to array so that we can use `.filter` and
      // while we're at it let's go ahead and validate usage:
      //
      // Since `label` becomes a non-optional prop of Question only when we're
      // wrapping them within this RandomOne component, enforce the requirement
      // here.
      if (!child.props || !child.props.label) {
        throw Error(
          'All Question components within a RandomOne must have a `label` prop',
        );
      }

      return child;
    }).filter(child => {
      // If the response already has an entry for which Question to display,
      // then filter down to just that Question/child.
      if (questionToDisplayLabel) {
        return child.props.label === questionToDisplayLabel;
      }

      // If the response doesn't already have an entry, then let's return all of
      // the Questions/children and let lodash's `sample` randomly select one.
      return true;
    }),
  );

  // Compare the existing Question label to the Question label we are rendering.
  // If they don't match up, then we know we've randomly selected one for the
  // first time and so we need to update the response and save this selection.
  if (questionToDisplayLabel !== questionToRender.props.label) {
    const questionsSeen = {
      [seenKey]: questionToRender.props.label,
    };

    updateResponse(responseId, { questionsSeen })
      .then(success => {
        // eslint-disable-next-line no-console
        console.log(
          `Updated questionsSeen [${seenKey}:${questionToRender.props.label}]`,
          success,
        );
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log('Problem updating questionsSeen.', error);
      });
  }

  return <>{questionToRender}</>;
};

export default RandomOne;
