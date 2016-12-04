import Ember from 'ember';
const { computed, inject: { service } } = Ember;

export default Ember.Controller.extend({
  session: service(),
  isOwner: computed('session', function() {
    return this.get('session.data.authenticated.profile.role') === 'owner';
  }),
  requestsListTitle: computed('isOwner', function() {
    if (this.get('isOwner')) return 'Listing requests across the entire organisation';
    else return 'Listing requests from you';
  })
});
