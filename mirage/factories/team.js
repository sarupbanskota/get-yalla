import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name: faker.name.jobArea,
  count: faker.random.number,
  description: faker.name.jobDescriptor
});
