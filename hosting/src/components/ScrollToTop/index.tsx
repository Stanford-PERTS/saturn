// Scrolls to top on changes to the specified route params.
// Note: This components needs to appear within the app's Router so that it has
// access to the route params.

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const { surveyLabel, responseId, pageLabel } = useParams();

  useEffect(
    function scrollToTopOnPageChange() {
      window && window.scrollTo(0, 0);
    },
    [surveyLabel, responseId, pageLabel],
  );

  return null;
};

export default ScrollToTop;
