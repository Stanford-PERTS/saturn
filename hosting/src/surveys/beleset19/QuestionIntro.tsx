import React from 'react';
import { UnorderedList, ListItem } from 'perts-ui';

export default () => (
  <>
    <p>
      Your teacher wants to know how to make this class a better place for you
      to learn. This survey is a chance for you to provide honest, private
      feedback. It will only take a few minutes.
    </p>

    <UnorderedList>
      <ListItem icon="check">
        This survey is only about{' '}
        <strong>this class that you&rsquo;re in right now.</strong>
      </ListItem>
      <ListItem icon="check">
        <strong>To protect your privacy</strong>, we will not share your name
        with your teacher in connection with your answers. Teachers get reports
        that group students&rsquo; answers together. You can{' '}
        <a href="http://perts.net/engage/report">view this sample report</a> as
        an example.
      </ListItem>
      <ListItem icon="check">
        Please be honest. There are no right or wrong answers.
      </ListItem>
      <ListItem icon="check">
        If you don&rsquo;t understand a question, ask your teacher for help.
      </ListItem>
    </UnorderedList>
  </>
);
