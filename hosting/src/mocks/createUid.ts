import capitalize from 'capitalize';
import faker from 'faker';

export default function createUid(type = '') {
  const uid = faker.random.alphaNumeric(12);
  return `${capitalize(type)}_${uid}`;
};
