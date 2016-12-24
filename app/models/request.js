import DS from 'ember-data';
import moment from 'moment';
import computed from 'ember-computed';

export default DS.Model.extend({
  requestedBy       : DS.attr('string'),
  requestedByAvatar : DS.attr('string'),
  from              : DS.attr('string'),
  to                : DS.attr('string'),
  description       : DS.attr('string'),
  status            : DS.attr('string'),
  type              : DS.attr('string'),
  username          : DS.attr('string'),
  statusClass       : computed('status', function() {
    switch (this.get('status')) {
      case 'Pending': return 'primary';
      case 'Accepted': return 'success';
      case 'Rejected': return 'danger';
    }
  }),
  duration: computed('from', 'to', function() {
    const fromMoment = moment(this.get('from'));
    const toMoment = moment(this.get('to'));
    const difference = Math.abs(fromMoment.diff(toMoment, 'days'));
    return difference === 0 ?  '1 day' : `${difference + 1} days`;
  })
});
