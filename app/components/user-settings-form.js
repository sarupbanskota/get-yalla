import Ember from 'ember';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  countriesService : service(),
  timezonesService : service(),

  didInsertElement() {
    this.get('countriesService').all().then((countries) => {
      this.set('countries', countries);
    });
    this.get('timezonesService').all().then((timezones) => {
      this.set('timezones', timezones);
    });
  }
});
