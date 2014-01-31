(function() {
    ContactManager.module('ContactsApp.Edit', function(Edit, ContactManager, Backbone, Marionette, $, _) {
        Edit.Contact = Marionette.ItemView.extend({
            template: Handlebars.compile($('#contact-form').html()),

            events: {
                'click #cancel': 'cancel',
                'click #submit': 'submit'
            },

            cancel: function(e) {
                e.preventDefault();
                e.stopPropagation();

                window.history.back();
            },

            submit: function(e) {
                e.preventDefault();
                this.trigger('contact:save', Backbone.Syphon.serialize(this));
            }
        });
    });
})();