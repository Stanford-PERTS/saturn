import React, { useState } from 'react';
import { Button, Show } from 'components';
import { PageNavigationStyled } from 'components/PageNavigation';
import TakeYourTime from './TakeYourTime';
import { FaChevronCircleRight } from 'react-icons/fa';

type Props = {
  // This prop should most likely match the prop that is provided to the
  // matching `PageNavigation` component.
  disabled?: boolean;
  // This prop should most likely match the prop that is provided to the
  // matching `PageNavigation` component.
  next?: string;
};

const PageNavigationTimed: React.FC<Props> = ({
  children,
  disabled = false,
  next = '',
}) => {
  // We won't display the "take your time" message unless the user clicks the
  // Next button before the timer has run down so that we don't bother users
  // that are naturally taking their time with unnecessary UI.
  const [showTakeYourTime, setShowTakeYourTime] = useState(false);

  return (
    <>
      <PageNavigationStyled className="PageNavigationTimed">
        <Button
          disabled={!next || disabled || showTakeYourTime}
          icon={<FaChevronCircleRight />}
          onClick={() => setShowTakeYourTime(true)}
        >
          Next Page
        </Button>

        <Show when={showTakeYourTime}>
          <TakeYourTime>{children}</TakeYourTime>
        </Show>
      </PageNavigationStyled>
    </>
  );
};
export default PageNavigationTimed;
