(function() {
    ContactManager.module('ContactsApp', function(ContactsApp, ContactManager, Backbone, Marionette, $, _) {
        ContactsApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                'contacts': 'listContacts',
                'contacts/:id': 'showContact',
                'contacts/edit/:id': 'editContact'
            }
        });

        // Controller wrapper
        var controller = {
            listContacts: function() {
                ContactManager.ContactsApp.List.Controller.listContacts();
            },
            showContact: function(id) {
                ContactManager.ContactsApp.Show.Controller.showContact(id);
            },
            editContact: function(id) {
                ContactManager.ContactsApp.Edit.Controller.editContact(id)
            }
        };

        // Navigate to contacts list. Triggered on app start when empty routes are detected
        ContactManager.on('contacts:list', function() {
            ContactManager.navigate('contacts');
            controller.listContacts();
        });

        ContactManager.on('contact:show', function(id) {
            ContactManager.navigate('contacts/' + id);
            controller.showContact(id);
        });

        ContactManager.on('contact:edit', function(id) {
            ContactManager.navigate('contacts/edit/' + id);
            controller.editContact(id);
        });

        ContactManager.addInitializer(function() {
            new ContactsApp.Router({
                controller: controller
            });
        });
    });
})();