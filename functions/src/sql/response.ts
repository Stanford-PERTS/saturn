import {
  ExportableResponseDoc,
  ExportableResponseRow,
  ResponseDoc,
  ResponseRow,
} from '../index.d';
import mysqlConnect from './mysqlConnect';
import firestoreTimestampToSqlDateTime from '../util/firestoreTimestampToSqlDateTime';

// Keep up to date with type ResponseRow in index.d.ts
export const createTableResponseQuery = `
  CREATE TABLE IF NOT EXISTS response (

    # Firestore IDs should always be 20 characters. 50 for safety.
    # https://github.com/firebase/firebase-js-sdk/blob/73a586c92afe3f39a844b2be86086fddb6877bb7/packages/firestore/src/util/misc.ts#L36
    firestore_id varchar(50)
      CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '',

    uid varchar(50)
      CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '',

    created datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
      ON UPDATE CURRENT_TIMESTAMP,

    # While it might make sense to want to look at stored responses even when
    # they are missing either code or participant, we can use Firestore for
    # that. Only keep fully qualified responses in this table.
    code varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    participant_id varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,

    survey_label varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    meta text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
    answers text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
    progress tinyint(4) unsigned NOT NULL DEFAULT 0,
    page varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    PRIMARY KEY (firestore_id),
    UNIQUE INDEX uid (uid),
    INDEX survey_code_created (survey_label, code, created),
    INDEX survey_code (survey_label, code),
    INDEX survey (survey_label)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;

export const createTableBackupQuery = `
  CREATE TABLE response_backup (
    id int(11) unsigned NOT NULL AUTO_INCREMENT,

    # Firestore IDs should always be 20 characters. 50 for safety.
    # https://github.com/firebase/firebase-js-sdk/blob/73a586c92afe3f39a844b2be86086fddb6877bb7/packages/firestore/src/util/misc.ts#L36
    firestore_id varchar(50)
      CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '',

    uid varchar(50)
      CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '',

    created datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    # No 'modified' here b/c we'll never run an UPDATE on this table.

    # This table attempts to back up everything in the firestore, whether or
    # not it has these conventional properties.
    code varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    participant_id varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,

    survey_label varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    meta text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
    answers text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
    progress tinyint(4) unsigned NOT NULL DEFAULT 0,
    page varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    PRIMARY KEY (id),
    INDEX firestore_id (firestore_id)  # NOT unique!
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;

export const insertResponseQuery = `
  INSERT INTO response (
    firestore_id,
    uid,
    created,
    modified,
    code,
    participant_id,
    survey_label,
    meta,
    answers,
    progress,
    page
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE
    # Assumes the code, participant_id, and survey_label of a response
    # never changes.
    # By never updating those, the db is refusing corrupted data.
    meta = ?,
    answers = ?,
    progress = ?,
    page = ?;
`;

export const insertResponseBackupQuery = `
  INSERT INTO response_backup (
    firestore_id,
    uid,
    code,
    participant_id,
    survey_label,
    meta,
    answers,
    progress,
    page
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
`;

export type SqlParams = (string | number | null)[];

export const insertResponseQueryParams = (row: ResponseRow): SqlParams => [
  row.firestore_id,
  row.uid,
  row.created,
  row.modified,
  row.code,
  row.participant_id,
  row.survey_label,
  row.meta,
  row.answers,
  row.progress,
  row.page,
  row.meta,
  row.answers,
  row.progress,
  row.page,
];

export const insertResponseBackupQueryParams = (
  row: ResponseRow,
): SqlParams => [
  row.firestore_id,
  row.uid,
  row.code,
  row.participant_id,
  row.survey_label,
  row.meta,
  row.answers,
  row.progress,
  row.page,
];

// Transforms a `response` document object into an object that we can insert
// into our `response` SQL table. For responses with type ResponseDoc.
export const responseToSql = (
  response: ResponseDoc,
  id: string,
): ResponseRow => ({
  firestore_id: id,
  uid: `Response_${id}`,
  created: firestoreTimestampToSqlDateTime(response.createdOn),
  modified: firestoreTimestampToSqlDateTime(response.modifiedOn),
  answers: JSON.stringify(response.answers),
  code: response.meta.code || null,
  participant_id: response.meta.participant_id || null,
  meta: JSON.stringify(response.meta),
  page: response.page,
  progress: response.progress,
  survey_label: response.surveyLabel,
});

// Transforms a `response` document object into an object that we can insert
// into our `response` SQL table. For responses with type ExportableResponseDoc.
export const exportableResponseToSql = (
  response: ExportableResponseDoc,
  id: string,
): ExportableResponseRow => ({
  firestore_id: id,
  uid: `Response_${id}`,
  created: firestoreTimestampToSqlDateTime(response.createdOn),
  modified: firestoreTimestampToSqlDateTime(response.modifiedOn),
  answers: JSON.stringify(response.answers),
  code: response.meta.code,
  participant_id: response.meta.participant_id,
  meta: JSON.stringify(response.meta),
  page: response.page,
  progress: response.progress,
  survey_label: response.surveyLabel,
});

// Creates the `response` table.
export const createTableResponse = async () => {
  const pool = await mysqlConnect();
  await pool.query(createTableResponseQuery);
  await pool.end();
};

// Inserts the `response` into the `response` table.
export const insertResponse = async (
  response: ExportableResponseDoc,
  responseDocumentId: string,
) => {
  const pool = await mysqlConnect();
  const responseForSql = exportableResponseToSql(response, responseDocumentId);
  await pool.query(
    insertResponseQuery,
    insertResponseQueryParams(responseForSql),
  );
  await pool.end();
};

// Inserts the `response` into the `response_backup` table.
export const insertResponseBackup = async (
  response: ResponseDoc,
  responseDocumentId: string,
) => {
  const pool = await mysqlConnect();
  const responseForSql = responseToSql(response, responseDocumentId);
  await pool.query(
    insertResponseBackupQuery,
    insertResponseBackupQueryParams(responseForSql),
  );
  await pool.end();
};
