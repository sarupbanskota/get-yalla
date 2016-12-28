import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { Route } = Ember;

export default Route.extend(ApplicationRouteMixin, {

  actions: {
    login() {
      let lockOptions = { authParams: { scope: 'openid' } };
      this.get('session').authenticate('simple-auth-authenticator:lock', lockOptions).then(() => {
        this.store.query('user', { auth_id: currentUserID });
        // manipulate this user's email
        // go to welcome page
        // allow setting timezone and country
      }, () => {
        alert("couldn't login :(")
      });
    },

    logout() {
      this.get('session').invalidate();
    }
  }
});
