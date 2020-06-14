// Duplicate from `/hosting/src/index.d.ts`. Keep synced.
//
// TODO research placing these definitions in a repo.
// https://stackoverflow.com/questions/23210437/npm-install-private-github-repositories-by-dependency-in-package-json

export type FirestoreMap = {
  [key: string]: any;
};

export type FirestoreMapBoolean = {
  [key: string]: boolean;
};

export type ResponseDocId = string;
export type SurveyAnswers = FirestoreMap | null;
export type SurveyMeta = FirestoreMap;
export type SurveyPage = string | null;
export type SurveyProgress = number;
export type SurveyLabel = string;
export type TimestampObject = {
  seconds: number;
  nanoseconds: number;
};

type DocumentBase = {
  createdOn: TimestampObject;
  meta: SurveyMeta;
  modifiedOn: TimestampObject;
  page: SurveyPage;
  progress: SurveyProgress;
  // Track which RandomOne questions have been seen.
  questionsSeen: FirestoreMap;
  surveyLabel: SurveyLabel;
};

export type AnswerDoc = DocumentBase & {
  answers: FirestoreMap | null;
};

export type ResponseDoc = DocumentBase & {
  answers: FirestoreMapBoolean | null;
};

type UpdateableDocumentBase = {
  modifiedOn?: TimestampObject;
  page?: SurveyPage;
  progress?: SurveyProgress;
  questionsSeen?: FirestoreMap;
};

export type AnswerDocUpdateable = UpdateableDocumentBase & {
  answers?: FirestoreMap | null;
};

export type ResponseDocUpdateable = UpdateableDocumentBase & {
  answers?: FirestoreMapBoolean | null;
};

export type ResponseDocContextValue = ResponseDoc | null;

// Survey Config types
export type SurveyConfig = {
  label: string;
  validationSchema: object;
  transform: Function;
  firstPage: string;
  questions: [SurveyConfigBlock];
};

export type SurveyConfigBlock = {
  label: string;
  children: [SurveyConfigPage];
} & SurveyConfigCommonMeta;

export type SurveyConfigPage = {
  component: any;
  label: string;
  next?: string;
  progress?: number;
  randomOne?: boolean;
  children: [SurveyConfigQuestion];
} & SurveyConfigCommonMeta;

export type SurveyConfigCommonMeta = {
  showWhen?: Function;
  hideWhen?: Function;
  waitBeforeNext?: boolean | number;
};

export type SurveyConfigAnswerOption = {
  value: string;
  label: string;
};

export type SurveyConfigQuestion = {
  name: string;
  answerOptions: SurveyConfigAnswerOption[];
  linkedQuestion?: SurveyConfigQuestion;
  linkedFieldName?: string;
  linkedFieldTest?: string;
};

// Duplicate from `saturn/functions/index.d`
export type ResponseDoc = {
  answers: FirestoreMap;
  createdOn: TimestampObject;
  meta: FirestoreMap;
  modifiedOn: TimestampObject;
  page: string | null;
  progress: number;
  questionsSeen: FirestoreMap;
  surveyLabel: string;
};

// Duplicate from `saturn/functions/index.d`
export type ExportableResponseDoc = ResponseDoc & {
  meta: ExportableMetaMap;
};
