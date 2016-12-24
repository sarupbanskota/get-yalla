import DS from 'ember-data';

const { Model, attr } = DS;

export default Model.extend({
  firstName    : attr('string'),
  lastName     : attr('string'),
  email        : attr('string'),
  country      : attr('string'),
  countryFlag  : attr('string'),
  DOJ          : attr('string'),
  contractType : attr('string'),
  avatar       : attr('string')
});
