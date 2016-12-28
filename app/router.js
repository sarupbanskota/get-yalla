import Ember from 'ember';
import config from './config/environment';

const { Router: EmberRouter } = Ember;

const Router = EmberRouter.extend({
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
  this.route('welcome');
});

export default Router;
