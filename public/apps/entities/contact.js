(function() {
	ContactManager.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _) {
		Entities.BaseModel = Backbone.Model.extend({
            idAttribute: '_id'
        });

        Entities.Contact = Entities.BaseModel.extend({
            urlRoot: '/services/v1/contacts',
			defaults: {
				firstName: '',
				lastName: '',
				phoneNumber: ''
			}
		});

		Entities.Contacts = Backbone.Collection.extend({
            url: '/services/v1/contacts',
			model: Entities.Contact,
			comparator: 'firstName'
		});

		var contacts = null;
		var initializeContacts = function() {
            contacts = new Entities.Contacts();
            contacts.fetch();
		};

		var API = {
			getContactEntities: function() {
				if (!contacts) {
					initializeContacts();
				}

				return contacts;
			}
		};

		ContactManager.reqres.setHandler('contact:entities', function() {
			return API.getContactEntities();
		});
	});
})();