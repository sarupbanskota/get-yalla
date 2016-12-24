import Ember from 'ember';
const { inject: { service }, computed } = Ember;

export default Ember.Controller.extend({
  session     : service(),
  from        : new Date(),
  to          : new Date(),
  description : undefined,

  fromValid         : computed.empty('from'),
  toValid           : computed.empty('to'),
  descriptionValid  : computed.empty('description'),
  incompleteRequest : computed.or('fromValid', 'toValid', 'descriptionValid'),

  actions: {
    createNewRequest() {
      this.get('store').createRecord('request', {
        from        : this.get('from'),
        to          : this.get('to'),
        status      : 'Pending',
        description : this.get('description'),
        username    : this.get('session.session.content.authenticated.profile.name')
      }).save();
      this.set('from', new Date());
      this.set('to', new Date());
      this.set('description', undefined);
    }
  },

  extraPickadateOptions: {
    clear  : '',
    format : 'd mmm'
  }
});
