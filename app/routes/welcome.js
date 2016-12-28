import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, inject: { service } } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  session: service(),
  beforeModel() {

  },
  model() {
    const currentUserID = this.get('session.session.content.authenticated.profile.user_id');
    this.store.query('user', { auth_id: currentUserID }).get('firstObject');

  }
});
