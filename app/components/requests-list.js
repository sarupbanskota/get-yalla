import Ember from 'ember';
const { inject: { service } } = Ember;

export default Ember.Component.extend({
  store: service(),

  actions: {
    updateRequestStatus: function(request) {
      let updatedRequest = this.get('store').peekRecord('request', request.id);
      updatedRequest.set('status', 'Accepted');
      updatedRequest.save();
    }
  }
});
