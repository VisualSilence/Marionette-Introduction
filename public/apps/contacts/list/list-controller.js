(function() {
	ContactManager.module('ContactsApp.List', function(List, ContactManager, Backbone, Marionette, $, _) {
		List.Controller = {
			listContacts: function() {
                /*
                var contacts = ContactManager.request('contact:entities');
				var contactsListView = new List.Contacts({
					collection: contacts
				});

                contactsListView.on('itemview:contact:delete', function(childView, model) {
                    model.destroy();
                });

                contactsListView.on('itemview:contact:show', function(childView, model) {
                    // Trigger controller event
                    ContactManager.trigger('contact:show', model.get('_id'));
                });

				ContactManager.mainRegion.show(contactsListView);*/

                var fetchingContacts = ContactManager.request('contact:entities');
                $.when(fetchingContacts).done(function(models) {
                    var view = new List.Contacts({
                        collection: models
                    });

                    view.on('itemview:contact:delete', function(childView, model) {
                        model.destroy();
                    });

                    view.on('itemview:contact:show', function(childView, model) {
                        ContactManager.trigger('contact:show', model.get('_id'));
                    });

                    ContactManager.mainRegion.show(view);
                });
			}
		};
	});
})();