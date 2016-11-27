import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  requestedBy: faker.name.firstName,
  requestedByAvatar: faker.internet.avatar,
  from: faker.date.future,
  to: faker.date.future,
  description: faker.list.random("Vacation!", "Dentist", "Taking a break"),
  status: faker.list.random("Pending", "Accepted" ,"Rejected"),
  type: faker.list.random("Medical", "Conference" ,"Childcare", "Unpaid")
});
