import faker from 'faker';

export default function createFirestoreId() {
  return faker.random.alphaNumeric(20);
}
