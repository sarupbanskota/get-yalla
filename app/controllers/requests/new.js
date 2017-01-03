import Ember from 'ember';
const { inject: { service }, computed } = Ember;

const { Controller } = Ember;

export default Controller.extend({
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
        description : this.get('description')
      }).save().then(() => {
        this.set('from', new Date());
        this.set('to', new Date());
        this.set('description', undefined);
        window.location.reload(true);
      }, () => {
        alert("didn't save :(");
      });
    }
  },

  extraPickadateOptions: {
    clear  : '',
    format : 'd mmm'
  }
});
