(function() {
    ContactManager.module('ContactsApp.Show', function(Show, ContactManager, Backbone, Marionette, $, _) {
        Show.Controller = {
            showContact: function(id) {
                // Fetch the contact model
                var contacts = ContactManager.request('contact:entities');
                var model = contacts.get(id);

                var view = model ? new Show.Contact({ model: model }) : new Show.MissingContact();

                ContactManager.mainRegion.show(view);
            }
        };
    });
})();
