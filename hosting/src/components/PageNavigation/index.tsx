import React from 'react';
import styled from 'styled-components';
import { Button } from 'components';
import { FaChevronCircleRight } from 'react-icons/fa';

type Props = {
  disabled?: boolean;
  next?: string;
  onClickNext: (event: React.TouchEvent | React.MouseEvent) => void;
  submitting?: boolean;
};

const PageNavigation: React.FC<Props> = ({
  disabled = false,
  next = '',
  onClickNext,
  submitting = false,
}) => (
  <PageNavigationStyled className="PageNavigation">
    {next && (
      <Button
        disabled={disabled}
        loading={submitting}
        icon={<FaChevronCircleRight />}
        onClick={onClickNext}
      >
        Next Page
      </Button>
    )}
  </PageNavigationStyled>
);

export const PageNavigationStyled = styled.div`
  padding: 10px 0;
  text-align: center;
`;

export default PageNavigation;
