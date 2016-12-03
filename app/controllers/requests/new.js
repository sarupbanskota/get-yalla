import Ember from 'ember';
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
      this.get('store').createRecord('request', {
        from: this.get('from'),
        to: this.get('to'),
        status: 'Pending',
        description: this.get('description'),
        username: this.get('session.session.content.authenticated.profile.name')
      }).save();
    }
  }
});
