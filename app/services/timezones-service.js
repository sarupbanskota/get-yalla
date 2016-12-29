import Ember from 'ember';

const {
  getOwner, $: { ajax },
  Service, inject: { service },
  RSVP: { Promise: RSVPPromise }
} = Ember;

export default Service.extend({
  store: service(),
  all() {
    let adapter = getOwner(this).lookup('adapter:application');
    let options = adapter.ajaxOptions();
    options.url = `${adapter.urlPrefix()}/timezones`;
    options.type = 'GET';

    return new RSVPPromise((resolve, reject) => {
      ajax(options).then((data) => {
        resolve(data);
      }, () => {
        reject(null);
      });
    });
  }
});
