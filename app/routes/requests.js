import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return [{
      id: 1,
      requestedBy: 'Sarup Banskota',
      from: '11-01-2016',
      to: '18-01-2016',
      reason: 'Meeting friends',
      type: 'Paid',
      status: 'Pending'
    }, {
      id: 2,
      requestedBy: 'Rupert Klopper',
      from: '12-01-2016',
      to: '13-01-2016',
      reason: 'Dentist appointment',
      type: 'Medical',
      status: 'Approved'
    }, {
      id: 2,
      requestedBy: 'Martin Pickrodt',
      from: '02-02-2016',
      to: '02-03-2016',
      reason: 'Getting hitched',
      type: 'Medical',
      status: 'Approved'
    }];
  }
});
