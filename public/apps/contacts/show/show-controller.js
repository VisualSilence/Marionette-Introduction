(function() {
    ContactManager.module('ContactsApp.Show', function(Show, ContactManager, Backbone, Marionette, $, _) {
        Show.Controller = {
            showContact: function(id) {
                ContactManager.mainRegion.show(new ContactManager.Common.Views.Loading({
                    loadHeading: 'Loading',
                    loadMessage: 'Loading contact, please wait...'
                }));

                var fetchingContact = ContactManager.request('contact:entity', id);
                $.when(fetchingContact).done(function(model) {
                    var view = model
                        ? new Show.Contact({ model: model }) : new Show.MissingContact();
                    ContactManager.mainRegion.show(view);

                    view.on('contacts:list', function() {
                        ContactManager.trigger('contacts:list');
                    });

                    view.on('contact:edit', function(model) {
                        ContactManager.trigger('contact:edit', model.get('_id'));
                    });
                });
            }
        };
    });
})();
