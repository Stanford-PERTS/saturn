import transform from './transform';
// import validationSchema from './validationSchema';
import whenLearningCondition from '../../utils/whenLearningCondition';
import sawDemographics from '../../utils/sawDemographics';

// TODO figure out how to get imports from imported files working.
// import { Block, Page, Question, LikertScale } from 'components';
const Block = () => null;
const Page = () => null;
const Question = () => null;
const LikertScale = () => null;
const Checkbox = () => null;
const Radio = () => null;
const TextField = () => null;

// likertNOptions(7) >> ['1', '2', '3', '4', '5', '6', '7']
const likertNOptions = n => {
  const arr = new Array(n);
  for (let i = 0; i < arr.length; i += 1) {
    arr[i] = { value: `${i + 1}`, label: 'TODO add labels' };
  }
  return arr;
};

const checkboxBooleanOptions = () => [
  {
    value: true,
    label: '',
  },
  {
    value: false,
    label: '',
  },
];

// NOTE
// - learning condition separator is `-` (hyphen)
// - question label separator is `_` (underscore)

export default () => {
  const label = 'beleset19';

  const learningConditions = [
    'student-voice',
    'classroom-belonging',
    'teacher-caring',
    'feedback-for-growth',
    'meaningful-work',
    'cultural-competence',
  ];

  return {
    label,
    learningConditions,
    validationSchema: {},
    transform,
    firstPage: 'introduction',
    questions: [
      {
        component: Block,
        label: 'introduction',
        showWhen: () => true,
        waitBeforeNext: true,
        children: [
          {
            component: Page,
            label: 'introduction',
            next: 'cb1',
            progress: 1,
            children: [],
          },
        ],
      },
      {
        component: Block,
        label: 'classroom-belonging',
        showWhen: whenLearningCondition('classroom-belonging'),
        waitBeforeNext: true,
        children: [
          {
            component: Page,
            label: 'cb1',
            next: 'cb2',
            children: [
              {
                component: Question,
                componentRender: LikertScale,
                name: 'c_belonging_classmates',
                label: 'This week I had the opportunity to get to...',
                likertN: 7,
                answerOptions: likertNOptions(7),
              },
            ],
          },
          {
            component: Page,
            label: 'cb2',
            next: 'cb3',
            children: [
              {
                component: Question,
                componentRender: LikertScale,
                name: 'c_belonging_teacher',
                label: 'I feel like my teacher accepts...',
                likertN: 7,
                answerOptions: likertNOptions(7),
              },
            ],
          },
          {
            component: Page,
            label: 'cb3',
            next: 'cc1',
            children: [
              {
                component: Question,
                componentRender: LikertScale,
                name: 'c_belonging_thoughts',
                label: 'This week I felt comfortable sharing...',
                likertN: 7,
                answerOptions: likertNOptions(7),
              },
            ],
          },
        ],
      },
      {
        component: Block,
        label: 'cultural-competence',
        showWhen: whenLearningCondition('cultural-competence'),
        waitBeforeNext: true,
        children: [
          {
            component: Page,
            label: 'cc1',
            next: 'cc2',
            children: [
              {
                component: Question,
                componentRender: LikertScale,
                name: 'cc1_1',
                label: 'In this class, I feel proud...',
                likertN: 7,
                answerOptions: likertNOptions(7),
              },
            ],
          },
          {
            component: Page,
            label: 'cc2',
            next: 'cc3',
            children: [
              {
                component: Question,
                componentRender: LikertScale,
                name: 'cc2_1',
                label: 'In this class, I&rsquo;ve learned...',
                likertN: 7,
                answerOptions: likertNOptions(7),
              },
            ],
          },
          {
            component: Page,
            label: 'cc3',
            next: 'ffg1',
            children: [
              {
                component: Question,
                componentRender: LikertScale,
                name: 'cc3_1',
                label: 'In this class, I have the chance...',
                likertN: 7,
                answerOptions: likertNOptions(7),
              },
            ],
          },
        ],
      },
      {
        component: Block,
        label: 'feedback-for-growth',
        showWhen: whenLearningCondition('feedback-for-growth'),
        waitBeforeNext: true,
        children: [
          {
            component: Page,
            label: 'ffg1',
            next: 'ffg2',
            children: [
              {
                component: Question,
                componentRender: LikertScale,
                name: 'fg1_2',
                label: 'This week, my teacher challenged...',
                likertN: 7,
                answerOptions: likertNOptions(7),
              },
            ],
          },
          {
            component: Page,
            label: 'ffg2',
            next: 'ffg3',
            children: [
              {
                component: Question,
                componentRender: LikertScale,
                name: 'fg2_2',
                label: 'This week in class, I thought...',
                likertN: 7,
                answerOptions: likertNOptions(7),
              },
            ],
          },
          {
            component: Page,
            label: 'ffg3',
            next: 'mw1',
            children: [
              {
                component: Question,
                componentRender: LikertScale,
                name: 'fg3_2',
                label: 'This week in class, I got specific...',
                likertN: 7,
                answerOptions: likertNOptions(7),
              },
            ],
          },
        ],
      },
      {
        component: Block,
        label: 'meaningful-work',
        showWhen: whenLearningCondition('meaningful-work'),
        waitBeforeNext: true,
        children: [
          {
            component: Page,
            label: 'mw1',
            next: 'mw2',
            children: [
              {
                component: Question,
                componentRender: LikertScale,
                name: 'mw1_2',
                label: 'This week in class, I learned skills...',
                likertN: 7,
                answerOptions: likertNOptions(7),
              },
            ],
          },
          {
            component: Page,
            label: 'mw2',
            next: 'mw3',
            children: [
              {
                component: Question,
                componentRender: LikertScale,
                name: 'mw2_2',
                label: 'This week in class, I thought...',
                likertN: 7,
                answerOptions: likertNOptions(7),
              },
            ],
          },
          {
            component: Page,
            label: 'mw3',
            next: 'sv1',
            children: [
              {
                component: Question,
                componentRender: LikertScale,
                name: 'mw3_2',
                label: 'This week in class, I learned skills...',
                likertN: 7,
                answerOptions: likertNOptions(7),
              },
            ],
          },
        ],
      },
      {
        component: Block,
        label: 'student-voice',
        showWhen: whenLearningCondition('student-voice'),
        waitBeforeNext: true,
        children: [
          {
            component: Page,
            label: 'sv1',
            next: 'sv2',
            children: [
              {
                component: Question,
                componentRender: LikertScale,
                name: 'voice_choice',
                label: 'This week in class, I had the opportunity...',
                likertN: 7,
                answerOptions: likertNOptions(7),
              },
            ],
          },
          {
            component: Page,
            label: 'sv2',
            next: 'sv3',
            children: [
              {
                component: Question,
                componentRender: LikertScale,
                name: 'voice_idea',
                label: 'This week in class, I felt like an idea...',
                likertN: 7,
                answerOptions: likertNOptions(7),
              },
            ],
          },
          {
            component: Page,
            label: 'sv3',
            next: 'tc1',
            children: [
              {
                component: Question,
                componentRender: LikertScale,
                name: 'voice_suggestions',
                label: 'This week, my teacher responded to...',
                likertN: 7,
                answerOptions: likertNOptions(7),
              },
            ],
          },
        ],
      },
      {
        component: Block,
        label: 'teacher-caring',
        showWhen: whenLearningCondition('teacher-caring'),
        waitBeforeNext: true,
        children: [
          {
            component: Page,
            label: 'tc1',
            next: 'tc2',
            children: [
              {
                component: Question,
                componentRender: LikertScale,
                name: 'tc1_2',
                label: 'This week, my teacher treated me with respect.',
                likertN: 7,
                answerOptions: likertNOptions(7),
              },
            ],
          },
          {
            component: Page,
            label: 'tc2',
            next: 'tc3',
            children: [
              {
                component: Question,
                componentRender: LikertScale,
                name: 'tc2_2',
                label: 'I feel like my teacher is glad that I am in their...',
                likertN: 7,
                answerOptions: likertNOptions(7),
              },
            ],
          },
          {
            component: Page,
            label: 'tc3',
            next: 'fidelity',
            children: [
              {
                component: Question,
                componentRender: LikertScale,
                name: 'tc4_2',
                label: 'I feel like my teacher cares what I think.',
                likertN: 7,
                answerOptions: likertNOptions(7),
              },
            ],
          },
        ],
      },
      {
        component: Block,
        label: 'fidelity',
        waitBeforeNext: true,
        children: [
          {
            component: Page,
            label: 'fidelity',
            next: 'demographics1',
            randomOne: true,
            children: [
              {
                component: Question,
                componentRender: LikertScale,
                name: 'fidelity_class_better',
                label: 'My instructor will try to use my answers...',
                likertN: 5,
                answerOptions: likertNOptions(5),
              },
              {
                component: Question,
                componentRender: Radio,
                name: 'fidelity_honest',
                label: 'Do you feel comfortable answering...',
                answerOptions: [
                  {
                    value: '1',
                    label: 'Yes',
                  },
                  {
                    value: '0',
                    label: 'No',
                  },
                ],
                // Note: Placing this here, as a child of the Question, to make
                // it easier to traverse for rserve_test. It won't be rendered
                // as a child component to the Question, so this might move.
                linkedQuestion: {
                  component: Question,
                  componentRender: TextField,
                  name: 'fidelity_why_not',
                  label: 'Why not?',
                  linkedFieldName: 'fidelity_honest',
                  linkedFieldTest: '0',
                },
              },
            ],
          },
        ],
      },
      {
        component: Block,
        label: 'demographics',
        hideWhen: sawDemographics,
        waitBeforeNext: true,
        children: [
          {
            component: Page,
            label: 'demographics1',
            next: 'demographics2',
            children: [
              {
                component: Question,
                componentRender: Radio,
                name: 'gender',
                answerOptions: [
                  {
                    value: 'female',
                    label: 'Female',
                  },
                  {
                    value: 'male',
                    label: 'Male',
                  },
                  {
                    value: 'other',
                    label: 'Non-Binary/Other',
                  },
                ],
              },
            ],
          },
          {
            component: Page,
            label: 'demographics2',
            next: 'thankyou',
            children: [
              {
                component: Question,
                componentRender: Checkbox,
                name: 'race_amindian',
                label: 'American Indian or Alaskan Native',
                answerOptions: checkboxBooleanOptions(),
              },
              {
                component: Question,
                componentRender: Checkbox,
                name: 'race_e_asian',
                label:
                  'East Asian (e.g., Chinese, Japanese, Korean, Taiwanese)',
                answerOptions: checkboxBooleanOptions(),
              },

              {
                component: Question,
                componentRender: Checkbox,
                name: 'race_se_asian',
                label:
                  'Southeast Asian (e.g., Filipino, Indonesian, Vietnamese)',
                answerOptions: checkboxBooleanOptions(),
              },
              {
                component: Question,
                componentRender: Checkbox,
                name: 'race_s_asian',
                label:
                  'South Asian (e.g., Pakistani, Indian, Nepalese, Sri Lankan)',
                answerOptions: checkboxBooleanOptions(),
              },
              {
                component: Question,
                componentRender: Checkbox,
                name: 'race_o_asian',
                label: 'Other Asian',
                answerOptions: checkboxBooleanOptions(),
              },
              {
                component: Question,
                componentRender: Checkbox,
                name: 'race_mex',
                label: 'Mexican American/Chicano',
                answerOptions: checkboxBooleanOptions(),
              },
              {
                component: Question,
                componentRender: Checkbox,
                name: 'race_puerto_rican',
                label: 'Puerto Rican',
                answerOptions: checkboxBooleanOptions(),
              },
              {
                component: Question,
                componentRender: Checkbox,
                name: 'race_central_american',
                label: 'Central American',
                answerOptions: checkboxBooleanOptions(),
              },
              {
                component: Question,
                componentRender: Checkbox,
                name: 'race_o_latino',
                label: 'Other Hispanic or Latino',
                answerOptions: checkboxBooleanOptions(),
              },
              {
                component: Question,
                componentRender: Checkbox,
                name: 'race_african_american',
                label: 'African American/Black',
                answerOptions: checkboxBooleanOptions(),
              },
              {
                component: Question,
                componentRender: Checkbox,
                name: 'race_african',
                label: 'African',
                answerOptions: checkboxBooleanOptions(),
              },
              {
                component: Question,
                componentRender: Checkbox,
                name: 'race_caribbean',
                label: 'Caribbean',
                answerOptions: checkboxBooleanOptions(),
              },
              {
                component: Question,
                componentRender: Checkbox,
                name: 'race_o_black',
                label: 'Other Black',
                answerOptions: checkboxBooleanOptions(),
              },
              {
                component: Question,
                componentRender: Checkbox,
                name: 'race_european',
                label: 'European/European American',
                answerOptions: checkboxBooleanOptions(),
              },
              {
                component: Question,
                componentRender: Checkbox,
                name: 'race_middle_eastern',
                label: 'Middle Eastern/Middle Eastern American',
                answerOptions: checkboxBooleanOptions(),
              },
              {
                component: Question,
                componentRender: Checkbox,
                name: 'race_o_white',
                label: 'Other White',
                answerOptions: checkboxBooleanOptions(),
              },
              {
                component: Question,
                componentRender: Checkbox,
                name: 'race_pac_isl',
                label: 'Native Hawaiian or Other Pacific Islander',
                answerOptions: checkboxBooleanOptions(),
              },
              {
                component: Question,
                componentRender: Checkbox,
                name: 'race_other',
                label: 'Other Group (Please specify)',
                answerOptions: checkboxBooleanOptions(),
                linkedQuestion: {
                  component: Question,
                  componentRender: TextField,
                  name: 'race_text',
                  linkedFieldName: 'race_other',
                  linkedFieldTest: 'true',
                },
              },
            ],
          },
        ],
      },
      {
        component: Block,
        label: 'thankyou',
        waitBeforeNext: true,
        children: [
          {
            component: Page,
            label: 'thankyou',
            children: [],
          },
        ],
      },
    ],
  };
};
