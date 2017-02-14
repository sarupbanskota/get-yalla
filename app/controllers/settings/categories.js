import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  showingNewCategoryForm: false,
  newCategoryName: null,
  newCategoryColor: null,
  buttonMessage: computed('showingNewCategoryForm', function() {
    return this.get('showingNewCategoryForm') ? 'Close' : 'Add new category';
  }),

  actions: {
    toggleNewCategoryForm() {
      this.toggleProperty('showingNewCategoryForm');
    },
    createNewCategory() {
      this.store.createRecord('category', {
        name  : this.get('newCategoryName'),
        color : this.get('newCategoryColor')
      }).save().then(() => {
        this.set('newCategoryName', null);
        this.set('newCategoryColor', null);
        this.send('toggleNewCategoryForm');
      }).catch((error) => {
        console.log("Couldn't create new category");
        console.log(error);
      });
    }
  }
});
