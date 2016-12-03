import DS from 'ember-data';
import computed from 'ember-computed';

export default DS.Model.extend({
  requestedBy: DS.attr('string'),
  requestedByAvatar: DS.attr('string'),
  from: DS.attr('string'),
  to: DS.attr('string'),
  description: DS.attr('string'),
  status: DS.attr('string'),
  type: DS.attr('string'),
  username: DS.attr('string'),
  statusClass: computed('status', function() {
    switch(this.get('status')) {
      case 'Pending': return 'secondary';
      case 'Accepted': return 'success';
      case 'Rejected': return 'danger';
    };
  })
});
