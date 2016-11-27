import DS from 'ember-data';

export default DS.Model.extend({
  requestedBy: DS.attr('string'),
  requestedByAvatar: DS.attr('string'),
  from: DS.attr('string'),
  to: DS.attr('string'),
  description: DS.attr('string'),
  status: DS.attr('string'),
  type: DS.attr('string')
});
