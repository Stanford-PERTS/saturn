import React from 'react';

import {
  Block,
  Page,
  Pages,
  Question,
  UpdateParticipantData,
} from 'components';
import sawDemographics from 'utils/sawDemographics';
import whenLearningCondition from 'utils/whenLearningCondition';
import QuestionIntro from './QuestionIntro';
import QuestionBelongingClassmates from './QuestionBelongingClassmates';
import QuestionBelongingTeacher from './QuestionBelongingTeacher';
import QuestionBelongingThoughts from './QuestionBelongingThoughts';
import QuestionCompetenceProud from './QuestionCompetenceProud';
import QuestionCompetenceLearned from './QuestionCompetenceLearned';
import QuestionCompetenceOthers from './QuestionCompetenceOthers';
import QuestionFeedbackGrowthChallenged from './QuestionFeedbackGrowthChallenged';
import QuestionFeedbackGrowthThought from './QuestionFeedbackGrowthThought';
import QuestionFeedbackGrowthSuggestions from './QuestionFeedbackGrowthSuggestions';
import QuestionMeaningfulWorkMatter from './QuestionMeaningfulWorkMatter';
import QuestionMeaningfulWorkSucceed from './QuestionMeaningfulWorkSucceed';
import QuestionMeaningfulWorkHelpOthers from './QuestionMeaningfulWorkHelpOthers';
import QuestionStudentVoiceChoice from './QuestionStudentVoiceChoice';
import QuestionStudentVoiceIdea from './QuestionStudentVoiceIdea';
import QuestionStudentVoiceSuggestions from './QuestionStudentVoiceSuggestions';
import QuestionTeacherCaringRespect from './QuestionTeacherCaringRespect';
import QuestionTeacherCaringGlad from './QuestionTeacherCaringGlad';
import QuestionTeacherCaringCares from './QuestionTeacherCaringCares';
import QuestionFidelityClassBetter from 'surveys/common/QuestionFidelityClassBetter';
import QuestionFidelityHonest from 'surveys/common/QuestionFidelityHonest';
import QuestionGender from 'surveys/common/QuestionGender';
import QuestionRace from 'surveys/common/QuestionRace';
import SurveyComplete from 'surveys/common/SurveyComplete';

const config = [
  {
    component: Pages,
    props: {
      label: 'survey',
      firstPage: 'introduction',
      children: [
        // INTRODUCTION
        {
          component: Page,
          props: {
            label: 'introduction',
            next: 'cb1',
            progress: 1,
            children: [
              {
                component: Question,
                props: {
                  label: 'intro_your_opinion',
                  title: 'Your opinion matters!',
                  children: <QuestionIntro />,
                },
              },
            ],
          },
        },

        // BLOCK: CLASSROOM BELONGING
        {
          component: Block,
          props: {
            showWhen: whenLearningCondition('classroom-belonging'),
            waitBeforeNext: true,
            children: [
              // PAGE: BELONGING CLASSMATES
              {
                component: Page,
                props: {
                  label: 'cb1',
                  next: 'cb2',
                  children: [
                    {
                      component: Question,
                      props: {
                        label: 'c_belonging_classmates',
                        children: <QuestionBelongingClassmates />,
                      },
                    },
                  ],
                },
              },
              // PAGE: BELONGING TEACHER
              {
                component: Page,
                props: {
                  label: 'cb2',
                  next: 'cb3',
                  children: [
                    {
                      component: Question,
                      props: {
                        label: 'c_belonging_teacher',
                        children: <QuestionBelongingTeacher />,
                      },
                    },
                  ],
                },
              },
              // PAGE: BELONGING THOUGHTS
              {
                component: Page,
                props: {
                  label: 'cb3',
                  next: 'cc1',
                  children: [
                    {
                      component: Question,
                      props: {
                        label: 'c_belonging_thoughts',
                        children: <QuestionBelongingThoughts />,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },

        // BLOCK: CULTURAL COMPETENCE
        {
          component: Block,
          props: {
            showWhen: whenLearningCondition('cultural-competence'),
            waitBeforeNext: true,
            children: [
              // PAGE: CULTURAL COMPETENCE PROUD
              {
                component: Page,
                props: {
                  label: 'cc1',
                  next: 'cc2',
                  children: [
                    {
                      component: Question,
                      props: {
                        label: 'cc1_1',
                        children: <QuestionCompetenceProud />,
                      },
                    },
                  ],
                },
              },
              // PAGE: CULTURAL COMPETENCE LEARNED
              {
                component: Page,
                props: {
                  label: 'cc2',
                  next: 'cc3',
                  children: [
                    {
                      component: Question,
                      props: {
                        label: 'cc2_1',
                        children: <QuestionCompetenceLearned />,
                      },
                    },
                  ],
                },
              },
              // PAGE: CULTURAL COMPETENCE OTHERS
              {
                component: Page,
                props: {
                  label: 'cc3',
                  next: 'ffg1',
                  children: [
                    {
                      component: Question,
                      props: {
                        label: 'cc3_1',
                        children: <QuestionCompetenceOthers />,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },

        // BLOCK: FEEDBACK FOR GROWTH
        {
          component: Block,
          props: {
            showWhen: whenLearningCondition('feedback-for-growth'),
            waitBeforeNext: true,
            children: [
              // PAGE: FEEDBACK FOR GROWTH CHALLENGED
              {
                component: Page,
                props: {
                  label: 'ffg1',
                  next: 'ffg2',
                  children: [
                    {
                      component: Question,
                      props: {
                        label: 'fg1_2',
                        children: <QuestionFeedbackGrowthChallenged />,
                      },
                    },
                  ],
                },
              },
              // PAGE: FEEDBACK FOR GROWTH THOUGHT
              {
                component: Page,
                props: {
                  label: 'ffg2',
                  next: 'ffg3',
                  children: [
                    {
                      component: Question,
                      props: {
                        label: 'fg2_2',
                        children: <QuestionFeedbackGrowthThought />,
                      },
                    },
                  ],
                },
              },
              // PAGE: FEEDBACK FOR GROWTH SUGGESTIONS
              {
                component: Page,
                props: {
                  label: 'ffg3',
                  next: 'mw1',
                  children: [
                    {
                      component: Question,
                      props: {
                        label: 'fg3_2',
                        children: <QuestionFeedbackGrowthSuggestions />,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },

        // BLOCK: MEANINGFUL WORK
        {
          component: Block,
          props: {
            showWhen: whenLearningCondition('meaningful-work'),
            waitBeforeNext: true,
            children: [
              // PAGE: MEANINGFUL WORK MATTER
              {
                component: Page,
                props: {
                  label: 'mw1',
                  next: 'mw2',
                  children: [
                    {
                      component: Question,
                      props: {
                        label: 'mw1_2',
                        children: <QuestionMeaningfulWorkMatter />,
                      },
                    },
                  ],
                },
              },
              // PAGE: MEANINGFUL WORK SUCCEED
              {
                component: Page,
                props: {
                  label: 'mw2',
                  next: 'mw3',
                  children: [
                    {
                      component: Question,
                      props: {
                        label: 'mw2_2',
                        children: <QuestionMeaningfulWorkSucceed />,
                      },
                    },
                  ],
                },
              },
              // PAGE: MEANINGFUL WORK HELP OTHERS
              {
                component: Page,
                props: {
                  label: 'mw3',
                  next: 'sv1',
                  children: [
                    {
                      component: Question,
                      props: {
                        label: 'mw3_2',
                        children: <QuestionMeaningfulWorkHelpOthers />,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },

        // BLOCK: STUDENT VOICE
        {
          component: Block,
          props: {
            showWhen: whenLearningCondition('student-voice'),
            waitBeforeNext: true,
            children: [
              // PAGE: STUDENT VOICE CHOICE
              {
                component: Page,
                props: {
                  label: 'sv1',
                  next: 'sv2',
                  children: [
                    {
                      component: Question,
                      props: {
                        label: 'voice_choice',
                        children: <QuestionStudentVoiceChoice />,
                      },
                    },
                  ],
                },
              },
              // PAGE: STUDENT VOICE IDEA
              {
                component: Page,
                props: {
                  label: 'sv2',
                  next: 'sv3',
                  children: [
                    {
                      component: Question,
                      props: {
                        label: 'voice_idea',
                        children: <QuestionStudentVoiceIdea />,
                      },
                    },
                  ],
                },
              },
              // PAGE: STUDENT VOICE SUGGESTIONS
              {
                component: Page,
                props: {
                  label: 'sv3',
                  next: 'tc1',
                  children: [
                    {
                      component: Question,
                      props: {
                        label: 'voice_suggestions',
                        children: <QuestionStudentVoiceSuggestions />,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },

        // BLOCK: TEACHER CARING
        {
          component: Block,
          props: {
            showWhen: whenLearningCondition('teacher-caring'),
            waitBeforeNext: true,
            children: [
              // PAGE: TEACHER CARING RESPECT
              {
                component: Page,
                props: {
                  label: 'tc1',
                  next: 'tc2',
                  children: [
                    {
                      component: Question,
                      props: {
                        label: 'tc1_2',
                        children: <QuestionTeacherCaringRespect />,
                      },
                    },
                  ],
                },
              },
              // PAGE: TEACHER CARING GLAD
              {
                component: Page,
                props: {
                  label: 'tc2',
                  next: 'tc3',
                  children: [
                    {
                      component: Question,
                      props: {
                        label: 'tc2_2',
                        children: <QuestionTeacherCaringGlad />,
                      },
                    },
                  ],
                },
              },
              // PAGE: TEACHER CARING CARES
              {
                component: Page,
                props: {
                  label: 'tc3',
                  next: 'fidelity',
                  children: [
                    {
                      component: Question,
                      props: {
                        label: 'tc4_2',
                        children: <QuestionTeacherCaringCares />,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },

        // BLOCK: FIDELITY
        {
          component: Block,
          props: {
            waitBeforeNext: true,
            children: [
              // PAGE: FIDELITY
              {
                component: Page,
                props: {
                  label: 'fidelity',
                  next: 'demographics1',
                  randomOne: true,
                  children: [
                    {
                      component: Question,
                      props: {
                        label: 'fidelity_class_better',
                        children: <QuestionFidelityClassBetter />,
                      },
                    },
                    {
                      component: Question,
                      props: {
                        label: 'fidelity_honest',
                        children: <QuestionFidelityHonest />,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },

        // BLOCK: DEMOGRAPHICS
        {
          component: Block,
          props: {
            hideWhen: sawDemographics,
            waitBeforeNext: true,
            children: [
              // PAGE: GENDER
              {
                component: Page,
                props: {
                  label: 'demographics1',
                  next: 'demographics2',
                  children: [
                    {
                      component: Question,
                      props: {
                        label: 'demographics_gender',
                        children: <QuestionGender />,
                      },
                    },
                  ],
                },
              },
              // PAGE: RACE
              {
                component: Page,
                props: {
                  label: 'demographics2',
                  next: 'thankyou',
                  children: [
                    {
                      component: Question,
                      props: {
                        label: 'demographics_race',
                        children: <QuestionRace />,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },

        // PAGE: SURVEY COMPLETE
        {
          component: Page,
          props: {
            label: 'thankyou',
            progress: 100,
            children: [
              {
                component: Question,
                props: {
                  label: 'surveycomplete',
                  children: <SurveyComplete />,
                },
              },
              {
                // Updating saw_demographics here to ensure the participant has
                // seen all demographics Page questions.
                component: UpdateParticipantData,
                props: {
                  label: 'update_participant_date',
                  pdKey: 'saw_demographics',
                  pdValue: 'true',
                },
              },
            ],
          },
        },
      ],
    },
  },
];

export default config;
