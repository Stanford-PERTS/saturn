export type FirestoreMap = {
  [key: string]: string;
};

export type FirestoreMapBoolean = {
  [key: string]: boolean;
};

export type ExportableMetaMap = FirestoreMap & {
  code: string;
  participant_id: string;
};

export type TimestampObject = {
  seconds: number,
  nanoseconds: number,
};

// Should match firestore document.
export type ResponseDoc = {
  answers: FirestoreMap,
  createdOn: TimestampObject,
  meta: FirestoreMap,
  modifiedOn: TimestampObject,
  page: string | null,
  progress: number,
  questionsSeen: FirestoreMap,
  surveyLabel: string,
};

export type ExportableResponseDoc = ResponseDoc & {
  meta: ExportableMetaMap;
};

// Matches `response` sql table.
export type ResponseRow = {
  firestore_id: string;
  uid: string;
  created: string;
  modified: string;
  survey_label: string;
  code: string | null;
  participant_id: string | null;
  meta: string;
  answers: string;
  progress: number;
  page: string | null;
};

export type ExportableResponseRow = ResponseRow & {
  code: string;
  participant_id: string;
};
