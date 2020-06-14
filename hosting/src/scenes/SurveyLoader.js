import React from 'react';
import { withRouter } from 'react-router-dom';

// Dynamically and lazily import survey config files. Previously, we were using
// React.lazy, but that only works with React components and we are now moving
// to storing our surve config files as plain JavaScript objects.
async function importSurveyConfigModule(surveyLabel) {
  // To allow a new survey configuration file to be reachable, add its label
  // and await import statement here. Unfortunately, import paths cannot be
  // dynamic (import(`surveys/${surveyLabel}`) does not work) because the build
  // process needs to prepare everything ahead of time.
  const surveyConfigurations = {
    beleset19: await import('surveys/beleset19'),
    cset19: await import('surveys/cset19'),
    mset19: await import('surveys/mset19'),
  };

  // If the requested survey label does not exist.
  if (surveyLabel in surveyConfigurations === false) {
    return null;
  }

  // Access via the `default` prop since it's the default export.
  return surveyConfigurations[surveyLabel].default;
}

// Transforms the plain JavaScript object to React JSX.
const transformConfigToReact = nodes => {
  // Single nodes, strings, etc., don't need to be traversed.
  if (!Array.isArray(nodes)) {
    return nodes;
  }

  // Map over the array of components.
  const rendering = nodes.map(node => {
    // The React component that will be used to render this node.
    const ComponentToRender = node.component;

    // Since we're piecing together the React component tree ourselves, React is
    // less forgiving about the `key` prop. So let's do something sensible so we
    // don't need to manually specify every `key` in our config files. This will
    // also help us to label all survey components with a unique label.
    const key = node.props.key || node.props.label;

    // Traverse down into any children nodes.
    let children = null;

    if (node.props && node.props.children) {
      children = transformConfigToReact(node.props.children);
    }

    return <ComponentToRender {...node.props} key={key} children={children} />;
  });

  return rendering;
};

// Loads a survey config files, transforms it to React/JSX.
// Returns survey as React component.
async function loadSurvey(surveyLabel) {
  const surveyConfig = await importSurveyConfigModule(surveyLabel);

  if (!surveyConfig) {
    return () => <h2>That survey does not exist.</h2>;
  }

  return () => transformConfigToReact(surveyConfig);
}

// Component to display while the survey config is loading.
const SurveyLoading = () => <div>Retrieving your survey.</div>;

class SurveyLoader extends React.Component {
  // Using a React.Component vs React.FC and useState hook because React would
  // not render the SurveyComponent component when provided to useState.
  constructor() {
    super();
    this.state = {
      SurveyComponent: SurveyLoading,
    };
  }

  async componentDidMount() {
    const { surveyLabel } = this.props.match.params;
    const SurveyComponent = await loadSurvey(surveyLabel);
    this.setState({ SurveyComponent });
  }

  render() {
    const { SurveyComponent } = this.state;
    return <SurveyComponent />;
  }
}

export default withRouter(SurveyLoader);
