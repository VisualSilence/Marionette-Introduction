(function() {
    ContactManager.module('ContactsApp.Show', function(Show, ContactManager, Backbone, Marionette, $, _) {
        Show.Controller = {
            showContact: function(id) {
                var fetchingContact = ContactManager.request('contact:entity', id);
                $.when(fetchingContact).done(function(model) {
                    var view = model
                        ? new Show.Contact({ model: model }) : new Show.MissingContact();
                    ContactManager.mainRegion.show(view);
                });
            }
        };
    });
})();
