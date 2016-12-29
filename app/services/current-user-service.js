import Ember from 'ember';

const { Service, inject: { service } } = Ember;

export default Service.extend({
  session : service(),
  store   : service(),

  _syncCurrentUser({authID, email, pic, country, timezone} = {null, null, null, null, null}) {
    pic    = this.get('session.session.content.authenticated.profile.picture');
    email  = this.get('session.session.content.authenticated.profile.email');
    authID = this.get('session.session.content.authenticated.profile.user_id');
    this.get('store').query('user', { auth_id: authID }).then((users) => {
      users.forEach((user) => {
        if (user.get('data.authId') === authID) {
          user.set('email', email);
          user.set('avatar', pic);
          user.set('country', country);
          user.set('timezone', timezone);
          user.save().then(() => {
            alert('updated!');
          }, () => {
            alert('couldnt update :(');
          });
        }
      });
    });
  }
});
