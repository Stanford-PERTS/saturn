import faker from 'faker';

export default function createClassroomCode() {
  return `${faker.commerce.color()} ${faker.lorem.word()}`.toLowerCase();
}
