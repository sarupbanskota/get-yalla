import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  showingCategoryForm : false,
  categoryName        : null,
  categoryColor       : null,
  buttonMessage       : computed('showingNewCategoryForm', function() {
    return this.get('showingNewCategoryForm') ? 'Close' : 'Add new category';
  }),

  actions: {
    toggleCategoryForm(id) {
      if (id) {
        let category = this.store.peekRecord('category', id);
        this.set('showingCategoryForm', true);
        this.set('editingCategoryId', id);
        this.set('categoryName', category.get('name'));
        this.set('categoryColor', category.get('color'));
      } else {
        this.toggleProperty('showingCategoryForm');
      }
    },
    createOrEditCategory(id) {
      if (id) {
        this.store.findRecord('category', id).then((category) => {
          category.set('name', this.get('categoryName'));
          category.set('color', this.get('categoryColor'));
          category.save().then(() => {
            this.set('categoryName', null);
            this.set('categoryColor', null);
            this.send('toggleCategoryForm');
          }).catch((error) => {
            console.log("Couldn't edit category");
            console.log(error);
          });
        });
      } else {
        this.store.createRecord('category', {
          name  : this.get('categoryName'),
          color : this.get('categoryColor')
        }).save().then(() => {
          this.set('categoryName', null);
          this.set('categoryColor', null);
          this.send('toggleCategoryForm');
        }).catch((error) => {
          console.log("Couldn't create new category");
          console.log(error);
        });
      }
    }
  }
});
