import Ember from 'ember';
import moment from 'moment';
const { inject: { service } } = Ember;

export default Ember.Controller.extend({
  session: service(),
  from: new Date(),
  to: new Date(),
  description: undefined,
  extraPickadateOptions: {
    clear: '',
    format: "d mmm"
  },
  actions: {
    createNewRequest() {
      moment(this.get('fromDate')).format('DD-MM-YYYY')
      this.get('store').createRecord('request', {
        from: moment(this.get('fromDate')).format('DD-MM-YYYY'),
        to: moment(this.get('toDate')).format('DD-MM-YYYY'),
        status: 'Pending',
        description: this.get('description'),
        username: this.get('session.session.content.authenticated.profile.name')
      }).save();
    }
  }
});
