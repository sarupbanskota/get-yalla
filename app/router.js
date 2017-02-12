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
  this.route('calendar');
  this.route('welcome');
  this.route('users');
  this.route('user', { path: '/user/:id' });
});

export default Router;
