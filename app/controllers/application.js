import Ember from 'ember';
import computed from 'ember-computed';

const { Controller, inject } = Ember;

export default Controller.extend({
  session: inject.service(),

  userRole: computed('session.data.authenticated.profile.role', function() {
    return this.get('session.data.authenticated.profile.role') === 'owner' ? 'owner' : 'user';
  })
});
