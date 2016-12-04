import Ember from 'ember';
const { computed, inject: { service } } = Ember;

export default Ember.Controller.extend({
  queryParams: ['status', 'username'],
  status: null,
  username: null,
  session: service(),
  selectedStatus: computed('status', function() {
    return !this.get('status') ? 'All' : this.get('status');
  }),
  selectedUsername: computed('username', function() {
    const selectedUserTag = !this.get('username') ? 'everyone' : this.get('username');
     if (this.get('isOwner')) return `${selectedUserTag}`;
     else return `you`;
  }),
  possibleStatus: ['Pending', 'Accepted', 'Rejected', 'All'],
  statusClass: computed('status', function() {
    switch(this.get('status')) {
      case 'Pending': return 'primary';
      case 'Accepted': return 'success';
      case 'Rejected': return 'danger';
      default: return 'default';
    };
  }),
  isOwner: computed('session', function() {
    return this.get('session.data.authenticated.profile.role') === 'owner';
  }),
  actions: {
    updateStatusFilter(status) {
      if (status === 'All') status = '';
      this.set('status', status);
    }
  }
});
