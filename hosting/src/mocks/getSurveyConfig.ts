import beleset19 from '../surveys/beleset19/config';

type SurveyConfigs = {
  [surveyLabel: string]: any;
};

const surveyConfigs: SurveyConfigs = {
  beleset19: beleset19(),
};

export default function getSurveyConfig(surveyLabel: string) {
  return surveyLabel in surveyConfigs && surveyConfigs[surveyLabel];
}
