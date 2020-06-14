import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useResponseContext } from 'services/responseContext';
import { Block, Page, UpdateParticipantData } from 'components';

type Props = {
  children: any;
  // The `label` of the first page of the survey.
  firstPage: string;
};

const Pages: React.FC<Props> = ({ children, firstPage, ...props }) => {
  const history = useHistory();
  const { surveyLabel, responseId, pageLabel } = useParams();
  const response = useResponseContext();

  if (!pageLabel) {
    if (response && response.page) {
      // If this response has recorded some previous progress through the survey
      // then redirect the user to the last recorded page.
      history.replace(`/surveys/${surveyLabel}/${responseId}/${response.page}`);
    } else {
      // Use `replace` and not `push` so that the user doesn't come back to this
      // route on a browser back press and just get redirected to the firstPage
      // again. This will make it difficult for the user to actually go back to
      // where they probably want to go.
      history.replace(`/surveys/${surveyLabel}/${responseId}/${firstPage}`);
    }
  }

  // When the participant gets to the first page of the survey, we want to
  // save the responseId to Neptune's ParticipantData table.
  const updateParticipantDataResponseId = pageLabel === firstPage;

  return (
    <div className="Pages">
      {React.Children.map(children, child => {
        // Always display `Block` components. They will handle route matching.
        const isChildABlock = child.type === Block;

        // Only display `Page` components where the `label` matches the
        // `:pageLabel` of the route.
        const doesPageMatchRoute =
          child.type === Page && child.props && child.props.label === pageLabel;

        const shouldDisplayChild = isChildABlock || doesPageMatchRoute;

        return shouldDisplayChild && React.cloneElement(child);
      })}

      {updateParticipantDataResponseId && typeof responseId === 'string' && (
        <UpdateParticipantData pdKey="responseId" pdValue={responseId} />
      )}
    </div>
  );
};
export default Pages;
