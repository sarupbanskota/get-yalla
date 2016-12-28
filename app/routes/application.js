import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { Route, inject: { service } } = Ember;

export default Route.extend(ApplicationRouteMixin, {

  session: service(),

  actions: {
    login() {
      let lockOptions = { authParams: { scope: 'openid' } };
      this.get('session').authenticate('simple-auth-authenticator:lock', lockOptions).then(() => {
        this._syncCurrentUser();
      }, () => {
        alert("couldn't login :(");
      });
    },

    logout() {
      this.get('session').invalidate();
    }
  },

  _syncCurrentUser() {
    let currentUserAuthID  = this.get('session.session.content.authenticated.profile.user_id');
    let currentUserEmail   = this.get('session.session.content.authenticated.profile.email');
    let currentUserPicture = this.get('session.session.content.authenticated.profile.picture');
    this.store.query('user', { auth_id: currentUserAuthID }).then((users) => {
      users.forEach((user) => {
        if (user.get('data.authId') === currentUserAuthID) {
          user.set('avatar', currentUserPicture);
          user.set('email', currentUserEmail);
          user.save().then(() => {
            console.log('saved');
          }, () => {
            console.log('didnt save');
          });
        }
      });
    });
  }
});
