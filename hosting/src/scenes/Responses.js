import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { firestore, ANSWERS_COLLECTION, RESPONSES_COLLECTION } from 'services';
import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
  flex-direction: row;
`;

const Column = styled.div`
  flex-grow: 1;
  padding: 0 10px;
`;

const Responses = () => {
  const [responses, setResponses] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(
    () =>
      firestore.collection(RESPONSES_COLLECTION).onSnapshot(snapshot => {
        const allResponses = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setResponses(allResponses);
      }),
    [],
  );

  useEffect(
    () =>
      firestore.collection(ANSWERS_COLLECTION).onSnapshot(snapshot => {
        const allAnswers = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAnswers(allAnswers);
      }),
    [],
  );

  return (
    <>
      <p>
        Note: If you&rsquo;d like to view the `answers` collection for
        development, you&rsquo;ll need to modify the firestore.rules.
      </p>

      <Flex>
        <Column>
          <h2>responses</h2>
          {responses.map(response => (
            <div key={response.id}>
              <Link to={`/surveys/${response.surveyLabel}/${response.id}`}>
                Continue This Survey
              </Link>
              <pre>{JSON.stringify(response, null, 2)}</pre>
              <hr />
            </div>
          ))}
        </Column>
        <Column>
          <h2>answers</h2>
          {answers.map(answer => (
            <div key={answer.id}>
              <Link to={`/surveys/${answer.surveyLabel}/${answer.id}`}>
                Continue This Survey
              </Link>
              <pre>{JSON.stringify(answer, null, 2)}</pre>
              <hr />
            </div>
          ))}
        </Column>
      </Flex>
    </>
  );
};

Responses.propTypes = {
  path: PropTypes.string,
};

export default Responses;
