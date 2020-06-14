import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from 'theme';
import DevNavigation from 'scenes/DevNavigation';
import LoadTestDb from 'scenes/LoadTestDb';
import RedirectToPortal from 'scenes/RedirectToPortal';
import Responses from 'scenes/Responses';
import SurveyNew from 'scenes/SurveyNew';
import Survey from 'scenes/Survey';
import { AppContainer } from 'components';
import isDevelopment from 'utils/isDevelopment';

const App: React.FC = () => (
  <AppContainer>
    <ThemeProvider theme={theme}>
      <Router>
        <DevNavigation />

        <Switch>
          {/* @todo(chris): remove this when load testing is complete */}
          <Route exact path="/loadTestDb">
            <LoadTestDb />
          </Route>

          {isDevelopment() && (
            <Route path="/responses">
              <Responses />
            </Route>
          )}

          <Route exact path="/surveys/:surveyLabel">
            <SurveyNew />
          </Route>

          <Route exact path="/surveys/:surveyLabel/:responseId">
            <Survey />
          </Route>

          <Route exact path="/surveys/:surveyLabel/:responseId/:pageLabel">
            <Survey />
          </Route>

          <Route path="/">
            <RedirectToPortal />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  </AppContainer>
);
export default App;
