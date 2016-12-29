import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { Route, inject: { service } } = Ember;

export default Route.extend(ApplicationRouteMixin, {

  session            : service(),
  currentUserService : service(),

  actions: {
    login() {
      let lockOptions = { authParams: { scope: 'openid' } };
      this.get('session').authenticate('simple-auth-authenticator:lock', lockOptions).then(() => {
        this.get('currentUserService')._syncCurrentUser({});
      }, () => {
        alert("couldn't login :(");
      });
    },

    logout() {
      this.get('session').invalidate();
    }
  }
});
