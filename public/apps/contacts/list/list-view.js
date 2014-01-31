(function() {
	ContactManager.module('ContactsApp.List', function(List, ContactManager, Backbone, Marionette, $, _) {
		List.Contact = Marionette.ItemView.extend({
			template: Handlebars.compile($('#contact-list-item').html()),
			tagName: 'tr',

			events: {
				'click .delete': 'delete',
                'click .show': 'show',
                'click .edit': 'edit'
			},

			delete: function(e) {
                e.stopPropagation();
				e.preventDefault();
                this.trigger('contact:delete', this.model);
			},

            remove: function() {
                var self = this;
                this.$el.fadeOut(function() {
                    Marionette.ItemView.prototype.remove.call(self);
                });
            },

            show: function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.trigger('contact:show', this.model);
            },

            edit: function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.trigger('contact:edit', this.model);
            }
		});

        List.Contacts = Marionette.CompositeView.extend({
			template: Handlebars.compile($('#contact-list').html()),
			tagName: 'table',
			className: 'table table-hover',
			itemView: List.Contact,
			itemViewContainer: 'tbody',

            onItemviewContactDelete: function() {
                // Fire an action when a contact deletion is bubbled up to the
                // composite view
            }
		});

        List.EmptyContacts = Marionette.ItemView.extend({
            template: Handlebars.compile($('#empty-contact-list').html())
        });
	});
})();