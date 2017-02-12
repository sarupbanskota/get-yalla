import DS from 'ember-data';

const { Model, attr } = DS;

export default Model.extend({
  authId    : attr('string'),
  email     : attr('string'),
  country   : attr('string'),
  avatar    : attr('string'),
  firstName : attr('string'),
  lastName  : attr('string'),
  timezone  : attr('string')
});
