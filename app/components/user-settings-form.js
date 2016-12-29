import Ember from 'ember';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  countriesService : service(),
  timezonesService : service(),

  didInsertElement() {
    this.get('countriesService').all().then((countries) => {
      this.set('countries', countries.map((country) => {
        return { name: country[0], code: country[1] };
      }));
    });
    this.get('timezonesService').all().then((timezones) => {
      this.set('timezones', timezones.map((timezone) => {
        return { name: timezone[0], code: timezone[1]}
      }));
    });
  }
});
