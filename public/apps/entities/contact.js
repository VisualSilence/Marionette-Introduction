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
			},
            validate: function(attrs, options) {
                var errors = {};
                if (!attrs.firstName) { errors.firstName = 'First name is required'; }
                if (!attrs.lastName) { errors.lastName = 'Last name is required'; }
                if (!attrs.phoneNumber) { errors.phoneNumber = 'Phone number is required'; }

                if (!_.isEmpty(errors)) {
                    return errors;
                }
            }
		});

		Entities.Contacts = Backbone.Collection.extend({
            url: '/services/v1/contacts',
			model: Entities.Contact,
			comparator: 'firstName'
		});

		var API = {
			getContactEntities: function() {
                var contacts = new Entities.Contacts();
                var deferred = $.Deferred();
                setTimeout(function() {
                    contacts.fetch({
                        success: function(data) {
                            deferred.resolve(data);
                        },
                        error: function(data) {
                            deferred.resolve(data);
                        }
                    });
                }, 500);

                return deferred.promise();
			},

            getContactEntity: function(id) {
                var contact = new Entities.Contact({ _id:id });
                var deferred = $.Deferred();
                setTimeout(function() {
                    contact.fetch({
                        success: function(data) {
                            deferred.resolve(data);
                        },
                        error: function(data) {
                            deferred.resolve(null);
                        }
                    });
                }, 500);

                return deferred.promise();
            },

            saveContact: function(model, data) {
                var deferred = $.Deferred();
                setTimeout(function() {
                    if (!model.save(data, {
                        success: function(data){
                            console.log('SUCCESS Saving');
                            deferred.resolve(data);
                        },
                        error: function(data){
                            deferred.resolve(null);
                        }
                    })) {
                        deferred.resolve(null);
                    }
                }, 500);

                return deferred.promise();
            }
		};

		ContactManager.reqres.setHandler('contact:entities', function() {
			return API.getContactEntities();
		});

        ContactManager.reqres.setHandler('contact:entity', function(id) {
            return API.getContactEntity(id);
        });

        ContactManager.reqres.setHandler('contact:save', function(model, data) {
            return API.saveContact(model, data);
        });
	});
})();