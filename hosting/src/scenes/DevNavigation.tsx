import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavLink = styled(Link)`
  margin-right: 6px;
  padding: 6px;
  line-height: 40px;

  border: 1px solid blue;
  border-radius: 5px;

  color: black;
  text-decoration: none;
`;

export default () => {
  const [showDevNavigation, setShowDevNavigation] = useState(false);

  useEffect(
    function addShowDevelopmentNavigationKeyboardShortcut() {
      document.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.ctrlKey && e.shiftKey && e.code === 'KeyD') {
          setShowDevNavigation(!showDevNavigation);
        }
      });
    },
    [showDevNavigation],
  );

  return showDevNavigation ? (
    <div>
      <NavLink to="/">Go to perts.me</NavLink>
      <NavLink to="/responses">View Responses</NavLink>{' '}
      <NavLink to="/surveys/cset19?code=calm-peach&participant_id=Participant_KX8gZkPaubGZ037a&survey_id=Survey_O1JwZAWj">
        Start C-SET19
      </NavLink>
      <NavLink to="/surveys/cset19?saw_demographics=true&code=calm-peach&participant_id=Participant_KX8gZkPaubGZ037a&survey_id=Survey_O1JwZAWj">
        Start C-SET19 (saw_demographics)
      </NavLink>
      <NavLink to="/surveys/beleset19?code=calm-peach&participant_id=Participant_KX8gZkPaubGZ037a&survey_id=Survey_O1JwZAWj">
        Start BELE-SET19
      </NavLink>
      <NavLink to="/surveys/beleset19?saw_demographics=true&code=calm-peach&participant_id=Participant_KX8gZkPaubGZ037a&survey_id=Survey_O1JwZAWj">
        Start BELE-SET19 (saw_demographics)
      </NavLink>
    </div>
  ) : null;
};
