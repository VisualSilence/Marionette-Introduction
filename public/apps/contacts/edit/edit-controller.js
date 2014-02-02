(function() {
    ContactManager.module('ContactsApp.Edit', function(Edit, ContactManager, Backbone, Marionette, $, _) {
        Edit.Controller = {
            editContact: function(id) {
                ContactManager.mainRegion.show(new ContactManager.Common.Views.Loading({
                    loadHeading: 'Loading',
                    loadMessage: 'Loading contact for edit, please wait...'
                }));

                var fetchingContact = ContactManager.request('contact:entity', id);
                $.when(fetchingContact).done(function(model) {
                    var view = model
                        ? new Edit.Contact({ model: model })
                        : new ContactManager.ContactsApp.Show.MissingContact();
                    ContactManager.mainRegion.show(view);

                    view.on('contact:save', function(data) {
                        if (model.save(data)) {
                            ContactManager.mainRegion.show(new ContactManager.Common.Views.Loading({
                                loadHeading: 'Saving',
                                loadMessage: ContactManager.Utils.stringFormat('Please wait while the contact information for {0} is updated...', [model.get('firstName')])
                            }));

                            ContactManager.trigger('contact:show', model.get('_id'));
                        } else {
                            view.triggerMethod('contact:save:invalid', model.validationError);
                        }
                    });

                });
            }
        };
    });
})();