import Ember from 'ember';
const { inject: { service } } = Ember;

export default Ember.Component.extend({
  store: service(),
  possibleStatus: ['Pending', 'Accepted', 'Rejected'],

  actions: {
    updateRequestStatus: function(request, newStatus) {
      let updatedRequest = this.get('store').peekRecord('request', request.id);
      updatedRequest.set('status', newStatus);
      updatedRequest.save();
    }
  }
});
