import difference from 'lodash/difference';

// Check if a document coming from Firestore (which has no fixed schema)
// is compatible with our ExportableResponseDoc type. This is necessarily a runtime
// process.
// @taptapdan [this blog][1] suggests there are libraries that can help us
// with this and reduce redundancy, e.g. https://github.com/gcanti/io-ts, but
// they seem pretty hard to understand.
// [1]: https://lorefnon.tech/2018/03/25/typescript-and-validations-at-runtime-boundaries/
const isResponseDoc = (x: any): boolean => {
  const expectedKeys = [
    'answers',
    'createdOn',
    'meta',
    'modifiedOn',
    'page',
    'progress',
    'questionsSeen',
    'surveyLabel',
  ];
  try {
    const keys = Object.keys(x);
    const extraKeys = difference(keys, expectedKeys);
    const keysValid =
      keys.length === expectedKeys.length && extraKeys.length === 0;

    if (!keysValid) {
      console.log(
        `isResponseDoc() bad match: ${JSON.stringify(keys)} ${JSON.stringify(
          extraKeys,
        )}`,
      );
      return false;
    }
  } catch (error) {
    console.error(`isResponseDoc() caught: ${error}`);
    return false;
  }

  return true;
};

export default isResponseDoc;

// Slight more strict: requires code and participant ID.
export const isExportableResponseDoc = (x: any): boolean => {
  if (!isResponseDoc(x)) {
    return false;
  }

  if (!x.meta.code) {
    console.log('isExportableResponseDoc() missing meta.code');
    return false;
  }
  if (!x.meta.participant_id) {
    console.log('isExportableResponseDoc() missing meta.participant_id');
    return false;
  }

  return true;
};
