import {
  FirestoreMap,
  FirestoreMapBoolean,
  ResponseDocUpdateable,
} from 'index.d';

type TransformFunction = (answer: any) => any;

const transformValues = (obj: FirestoreMap, transformFn: TransformFunction) => {
  if (obj === null || Object.keys(obj).length === 0) {
    return null;
  }

  const convertedObj: FirestoreMapBoolean = {};

  for (const prop in obj) {
    convertedObj[prop] = transformFn(obj[prop]);
  }

  return convertedObj;
};

// Takes a transform function `transformFn` and invokes that on all values
// within the `response.answers` object, replacing the values with the returned
// value.

const transformAnswers = (
  response: ResponseDocUpdateable,
  transformFn: TransformFunction,
) => ({
  ...response,
  ...(response.answers
    ? { answers: transformValues(response.answers, transformFn) }
    : {}),
});

export default transformAnswers;
