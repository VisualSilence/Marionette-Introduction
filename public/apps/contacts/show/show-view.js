(function() {
    ContactManager.module('ContactsApp.Show', function(Show, ContacManager, Backbone, Marionette, $, _) {
        Show.Contact = Marionette.ItemView.extend({
            template: Handlebars.compile($('#contact-view').html()),

            events: {
                'click #back': 'back',
                'click #edit': 'edit'
            },

            back: function(e) {
                e.preventDefault();
                e.stopPropagation();

                this.trigger('contacts:list');
                //window.history.back();
            },

            edit: function(e) {
                e.preventDefault();
                e.stopPropagation();

                this.trigger('contact:edit', this.model);
            }
        });

        Show.MissingContact = Marionette.ItemView.extend({
            template: Handlebars.compile($('#missing-contact-view').html())
        });
    });
})();
