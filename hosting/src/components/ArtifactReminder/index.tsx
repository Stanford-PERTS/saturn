// Displays a reminder that the survey question displayed is in reference to an
// artifact. If an artifact_url is present, it will provide a link to the
// artifact so that the user can reopen it if they've closed it.
// https://github.com/PERTS/triton/issues/1678

import React from 'react';
import styled from 'styled-components';
import { ArtifactLink, Show } from 'components';
import { useResponseContext } from 'services/responseContext';

// Custom margin to accommodate the artifact graphic's height.
const MarginAfter = styled.div`
  margin-bottom: 9px;
`;

const ArtifactReminder: React.FC = () => {
  const response = useResponseContext();
  const artifactUrl = response && response.meta && response.meta.artifact_url;

  return (
    <MarginAfter>
      <ArtifactLink href={artifactUrl} invertColors accessibilityOverride>
        Imagine you encountered the artifact because it&rsquo;s applicable to
        you. How would you respond to the question below?{' '}
        <Show when={artifactUrl}>(Click to reopen artifact in a new tab.)</Show>
      </ArtifactLink>
    </MarginAfter>
  );
};

export default ArtifactReminder;
