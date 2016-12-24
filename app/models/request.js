import DS from 'ember-data';
import moment from 'moment';
import computed from 'ember-computed';

const { Model, attr } = DS;

export default Model.extend({
  requestedBy       : attr('string'),
  requestedByAvatar : attr('string'),
  from              : attr('string'),
  to                : attr('string'),
  description       : attr('string'),
  status            : attr('string'),
  type              : attr('string'),
  username          : attr('string'),
  statusClass       : computed('status', function() {
    switch (this.get('status')) {
      case 'Pending': return 'primary';
      case 'Accepted': return 'success';
      case 'Rejected': return 'danger';
    }
  }),
  duration: computed('from', 'to', function() {
    let fromMoment = moment(this.get('from'));
    let toMoment = moment(this.get('to'));
    let difference = Math.abs(fromMoment.diff(toMoment, 'days'));
    return difference === 0 ?  '1 day' : `${difference + 1} days`;
  })
});
