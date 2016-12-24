import DS from 'ember-data';

const { Model, attr } = DS;

export default Model.extend({
  name        : attr('string'),
  count       : attr('number'),
  description : attr('string')
});
