// Internet Explorer 11 Support
// https://github.com/facebook/create-react-app/tree/master/packages/react-app-polyfill
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import 'perts-ui/build/styles/alignVertically.css';
import 'perts-ui/build/styles/bodyPadding.css';
import 'perts-ui/build/styles/boxSizingReset.css';
import './styles/app.css';
import './styles/colors.css';
import './styles/fonts.css';
import './styles/materialUiFixes.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as Sentry from '@sentry/browser';
import isDevelopment from 'utils/isDevelopment';

if (!isDevelopment()) {
  Sentry.init({
    dsn: 'https://b7d1c85077d74ef3818c2c21989c214d@sentry.io/1855637',
  });
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
