import DS from 'ember-data';
import computed from 'ember-computed';

const { Model, attr } = DS;

export default Model.extend({
  authId       : attr('string'),
  email        : attr('string'),
  country      : attr('string'),
  countryFlag  : attr('string'),
  DOJ          : attr('string'),
  contractType : attr('string'),
  avatar       : attr('string'),
  firstName    : attr('string'),
  lastName     : attr('string'),

  splitName: computed('email', function() {
    console.log('triggered');
    let email = this.get('email');
    let [name]  = email.split('@');
    let [firstName, lastName] = name.split('.');
    this.set('firstName', firstName);
    this.set('lastName', lastName);
  })
});
