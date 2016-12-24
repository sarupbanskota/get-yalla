import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    if (!this.features.isEnabled('calendar')) {
      this.transitionTo('/');
    }
  }
});
