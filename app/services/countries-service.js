import Ember from 'ember';

const { Service, RSVP: { Promise: RSVPPromise } } = Ember;

export default Service.extend({
  all() {
    return new RSVPPromise((resolve) => {
      resolve(['Singapore', 'Germany']);
    });
  }
});
