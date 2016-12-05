import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  queryParams: {
    status: {
      refreshModel: true
    },
    sortedBy: {
      refreshModel: true
    },
    username: {
      refreshModel: true,
      replace: true
    }
  },
  model(params) {
    return this.get('store').query('request', params);
  }
});
