import Ember from 'ember';
import BaseAuthorizer from 'ember-simple-auth/authorizers/base';
const { isEmpty } = Ember;

export default BaseAuthorizer.extend({
  authorize(sessionData, block) {
    let tokenAttributeName = 'jwt';
    let userToken = sessionData[tokenAttributeName];
    if (!isEmpty(userToken)) {
      block('Authorization', `Bearer ${userToken}`);
    }
  }
});
