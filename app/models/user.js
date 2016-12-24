import DS from 'ember-data';

export default DS.Model.extend({
  firstName    : DS.attr('string'),
  lastName     : DS.attr('string'),
  email        : DS.attr('string'),
  country      : DS.attr('string'),
  countryFlag  : DS.attr('string'),
  DOJ          : DS.attr('string'),
  contractType : DS.attr('string'),
  avatar       : DS.attr('string')
});
