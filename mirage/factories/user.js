import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  firstName: faker.name.firstName,
  lastName: faker.name.lastName,
  email: faker.internet.email,
  avatar: faker.internet.avatar,
  country: faker.address.country,
  countryFlag: "lol",
  DOJ: faker.date.past,
  contractType: faker.list.random("Remote", "Singapore")
});
