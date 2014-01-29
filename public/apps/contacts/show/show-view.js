(function() {
    ContactManager.module('ContactsApp.Show', function(Show, ContacManager, Backbone, Marionette, $, _) {
        Show.Contact = Marionette.ItemView.extend({
            template: Handlebars.compile($('#contact-view').html())
        });

        Show.MissingContact = Marionette.ItemView.extend({
            template: Handlebars.compile($('#missing-contact-view').html())
        });
    });
})();
