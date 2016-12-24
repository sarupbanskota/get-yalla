import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  beforeModel() {
    if (!this.features.isEnabled('calendar')) {
      this.transitionTo('/');
    }
  }
});
