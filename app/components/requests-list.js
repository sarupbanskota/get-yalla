import Ember from 'ember';
const { computed, inject: { service } } = Ember;

export default Ember.Component.extend({
  store          : service(),
  session        : service(),
  possibleStatus : ['Pending', 'Accepted', 'Rejected'],
  isOwner        : computed('session', function() {
    return this.get('session.data.authenticated.profile.role') === 'owner';
  }),

  actions: {
    updateRequestStatus(request, newStatus) {
      let updatedRequest = this.get('store').peekRecord('request', request.id);
      updatedRequest.set('status', newStatus);
      updatedRequest.save();
    }
  }
});
