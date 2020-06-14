// The `UpdateParticipantDataProgress` component ensures that we're only
// rendering the `UpdateParticipantData` component when needed: when the
// progress is incrementing.

import React from 'react';
import { useResponseContext } from 'services/responseContext';
import { UpdateParticipantData } from 'components';

type Props = {
  progress?: number;
};

const UpdateParticipantDataProgress: React.FC<Props> = ({ progress }) => {
  const response = useResponseContext();

  // If there's no `progress` or a `response` to update, then don't render.
  if (!progress || !response) {
    return null;
  }

  if (!response.progress || progress > response.progress) {
    return (
      <UpdateParticipantData pdKey="progress" pdValue={progress.toString()} />
    );
  }

  return null;
};

export default UpdateParticipantDataProgress;
