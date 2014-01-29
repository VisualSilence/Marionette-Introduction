(function() {
    ContactManager.module('ContactsApp', function(ContactsApp, ContactManager, Backbone, Marionette, $, _) {
        ContactsApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                'contacts': 'listContacts',
                'contacts/:id': 'showContact'
            }
        });

        var API = {
            listContacts: function() {
                ContactManager.ContactsApp.List.Controller.listContacts();
            },
            showContact: function(id) {
                ContactManager.ContactsApp.Show.Controller.showContact(id);
            }
        };

        // Navigate to contacts list. Triggered on app start when empty routes are detected
        ContactManager.on('contacts:list', function() {
            ContactManager.navigate('contacts');
            API.listContacts();
        });

        ContactManager.on('contact:show', function(id) {
            ContactManager.navigate('contact/' + id);
            API.showContact(id);
        });

        ContactManager.addInitializer(function() {
            new ContactsApp.Router({
                controller: API
            });
        });
    });
})();