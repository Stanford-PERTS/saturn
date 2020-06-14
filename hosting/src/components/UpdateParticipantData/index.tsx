// The UpdateParticipantData component allows you to update ParticipantData for
// the current participant/survey with the provided pdKey:pdValue pair. For
// example, you can use this to mark that a participant `saw_baseline`.
//
// Example usage (see surveys/ep):
//
//   <Page>
//     <UpdateParticipantData pdKey="saw_baseline" pdValue="true" />
//   </Page>

import React from 'react';
import uri from 'urijs';
import isDevelopment from 'utils/isDevelopment';
import { useResponseContext } from 'services/responseContext';

type Props = {
  pdKey: string;
  pdValue: string;
};

const UpdateParticipantData: React.FC<Props> = ({ pdKey, pdValue }) => {
  const response = useResponseContext();

  if (!response) {
    return null;
  }

  const { participant_id, survey_id } = response.meta;

  if (!participant_id || !survey_id) {
    return null;
  }

  const domain = isDevelopment()
    ? 'http://localhost:8080'
    : 'https://neptune.perts.net';

  const baseUrl = `${domain}/api/participants/${participant_id}/data/cross_site.gif`;

  const crossSiteGif = uri(baseUrl)
    .addSearch('survey_id', survey_id)
    .addSearch('key', pdKey)
    .addSearch('value', pdValue)
    // The testing flag is set by the Neptune Portal whenever someone bypasses
    // readiness, e.g. by prefixing the participation code with "testing only".
    // Record this state with any saved pd so we can filter it easily.
    .addSearch(response.meta.testing ? { testing: 'true' } : {})
    .toString();

  isDevelopment() &&
    // eslint-disable-next-line no-console
    console.log(
      `Updating ParticipantData. (participant_id:${participant_id},survey_id:${survey_id},${pdKey}:${pdValue})`,
    );

  return <img src={crossSiteGif} alt="" />;
};

export default UpdateParticipantData;
