import Ember from 'ember';
const { computed, inject: { service } } = Ember;

export default Ember.Controller.extend({
  queryParams: ['status', 'username'],
  status: null,
  username: null,
  session: service(),
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
  requestsListTitle: computed('isOwner', 'status', function() {
    const status = !this.get('status') ? 'All' : this.get('status');
    const statusTag = `<span class='tag tag-${this.get('statusClass')}'> ${status} </span>`;

    const username = !this.get('username')
                       ? 'across the entire organisation'
                       : `<span class='tag tag-warning'> "${this.get('username')}" </span>`;
    if (this.get('isOwner')) {
      return `You asked for <span class='h4'> ${statusTag} </span> requests from <span class='h4'> ${username} </span>`;
    } else {
      return `You asked for <span class='h4'> ${statusTag} </span> requests from you`;
    }
  })
});
