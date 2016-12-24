import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location : config.locationType,
  rootURL  : config.rootURL
});

Router.map(function() {
  // this.route('teams');
  this.route('requests', function() {
    this.route('new');
  });
  // this.route('users');
  this.route('calendar');
});

export default Router;
