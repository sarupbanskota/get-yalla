import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return [{
      name: 'Dotnet',
      count: 12,
      description: 'parsing and normalizing'
    }, {
      name: 'Ruby',
      count: 4,
      description: 'backend'
    }, {
      name: 'Frontend',
      count: 4,
      description: 'building interfaces'
    }, {
      name: 'Management',
      count: 6,
      description: 'strategy and stuff'
    }];
  }
});
