import React from 'react';

const RedirectToPortal = () => {
  const redirectTo = 'https://perts.me';
  window.location.href = redirectTo;

  return (
    <div>
      Redirecting to <a href={redirectTo}>{redirectTo}</a>
    </div>
  );
};

export default RedirectToPortal;
