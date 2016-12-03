import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createNewRequest() {
      this.get('store').createRecord('request', {
        from: '01-01-2016',
        to: '05-01-2016',
        status: 'pending',
        description: 'hello vacations'
      }).save();
    }
  }
});
