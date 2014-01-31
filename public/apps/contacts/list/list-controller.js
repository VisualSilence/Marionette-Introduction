(function() {
	ContactManager.module('ContactsApp.List', function(List, ContactManager, Backbone, Marionette, $, _) {
		List.Controller = {
			listContacts: function() {
                ContactManager.mainRegion.show(new ContactManager.Common.Views.Loading({
                    loadHeading: 'Loading',
                    loadMessage: 'Loading contacts, please wait...'
                }));

                var fetchingContacts = ContactManager.request('contact:entities');
                $.when(fetchingContacts).done(function(models) {
                    var view = models && models.length > 0
                        ? new List.Contacts({ collection: models })
                        : new List.EmptyContacts();

                    view.on('itemview:contact:delete', function(childView, model) {
                        model.destroy();
                    });

                    view.on('itemview:contact:show', function(childView, model) {
                        ContactManager.trigger('contact:show', model.get('_id'));
                    });

                    view.on('itemview:contact:edit', function(childView, model) {
                        ContactManager.trigger('contact:edit', model.get('_id'));
                    });

                    ContactManager.mainRegion.show(view);
                });
			}
		};
	});
})();