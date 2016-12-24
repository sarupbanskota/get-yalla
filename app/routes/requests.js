import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  queryParams: {
    status: {
      refreshModel: true
    },
    sortedBy: {
      refreshModel: true
    },
    username: {
      refreshModel : true,
      replace      : true
    }
  },
  model(params) {
    return this.get('store').query('request', params);
  }
});
