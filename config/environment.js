/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'get-yalla',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  ENV['ember-simple-auth'] = {
    authenticationRoute: 'index',
    routeAfterAuthentication: 'protected',
    routeIfAlreadyAuthenticated: 'protected'
  };

  ENV['auth0-ember-simple-auth'] = {
    clientID: "LunQANruAcF7AWimiau8FxwvEf94UqXO",
    domain: "getyalla.eu.auth0.com"
  }

  ENV['contentSecurityPolicy'] = {
    'font-src': "'self' data: https://cdn.auth0.com",
    'style-src': "'self' 'unsafe-inline'",
    'script-src': "'self' 'unsafe-eval' 'unsafe-inline' https://cdn.auth0.com",
    'connect-src': "'self' http://localhost:* getyalla.eu.auth0.com"
  };

  return ENV;
};
