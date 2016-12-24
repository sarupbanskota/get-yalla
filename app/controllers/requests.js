import Ember from 'ember';
const { computed, inject: { service } } = Ember;

const { Controller } = Ember;

export default Controller.extend({
  queryParams: ['status', 'username', {
    sortedBy: 'sorted_by'
  }],
  status                     : null,
  username                   : null,
  sortedBy                   : null,
  previouslySelectedUsername : null,
  session                    : service(),
  possibleSorts              : ['creation date', 'urgency', 'duration'],
  displayedSelectedUser      : computed('username', function() {
    return !this.get('username') ? 'everyone' : this.get('username');
  }),
  selectedStatus: computed('status', function() {
    return !this.get('status') ? 'All' : this.get('status');
  }),
  selectedUsername: computed('username', function() {
    let selectedUserTag = !this.get('username') ? 'everyone' : this.get('username');
    if (this.get('isOwner')) {
      return `${selectedUserTag}`;
    } else {
      return 'you';
    }
  }),
  selectedSort: computed('sortedBy', function() {
    return !this.get('sortedBy') ? 'creation date' : this.get('sortedBy');
  }),
  possibleStatus : ['Pending', 'Accepted', 'Rejected', 'All'],
  statusClass    : computed('status', function() {
    switch (this.get('status')) {
      case 'Pending': return 'primary';
      case 'Accepted': return 'success';
      case 'Rejected': return 'danger';
      default: return 'default';
    }
  }),
  isOwner: computed('session', function() {
    return this.get('session.data.authenticated.profile.role') === 'owner';
  }),
  actions: {
    updateStatusFilter(status) {
      if (status === 'All') {
        status = '';
      }
      this.set('status', status);
    },
    updateSortedBy(sort) {
      this.set('sortedBy', sort);
    },
    rollbackSelectedUser() {
      this.set('username', this.get('previouslySelectedUsername'));
      this.toggleProperty('isEditingSelectedUser');
    },
    updateSelectedUser(value) {
      this.set('previouslySelectedUsername', this.get('username'));
      this.set('username', value);
      this.toggleProperty('isEditingSelectedUser');
    },
    editSelectedUser() {
      this.toggleProperty('isEditingSelectedUser');
    }
  }
});
