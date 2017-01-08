import Ember from 'ember';

const {
  getOwner, $: { ajax },
  Service, inject: { service },
  RSVP: { Promise: RSVPPromise }
} = Ember;

export default Service.extend({
  store: service(),
  all() {
    const adapter = getOwner(this).lookup('adapter:application');
    const options = adapter.ajaxOptions();
    options.url = `${adapter.urlPrefix()}/requests/calendar_events`;
    options.type = 'GET';

    return new RSVPPromise((resolve) => {
      ajax(options).then((data) => {
        resolve(data);
      }, (jqXHR) => {
        reject(null);
      });
    });
  }
});
