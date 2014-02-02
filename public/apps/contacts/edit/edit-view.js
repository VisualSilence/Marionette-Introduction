(function() {
    ContactManager.module('ContactsApp.Edit', function(Edit, ContactManager, Backbone, Marionette, $, _) {
        Edit.Contact = Marionette.ItemView.extend({
            template: Handlebars.compile($('#contact-form').html()),

            events: {
                'click #cancel': 'cancel',
                'click #submit': 'submit'
            },

            cancel: function(e) {
                e.preventDefault();
                e.stopPropagation();

                window.history.back();
            },

            submit: function(e) {
                e.preventDefault();
                this.trigger('contact:save', Backbone.Syphon.serialize(this));
            },

            onContactSaveInvalid: function(errors) {
                var $view = this.$el;
                var self = this;

                var clearErrors = function() {
                    var $form = $view.find('form');

                    $form.find('.error-message').remove();
                    $form.find('.form-group').removeClass('has-error');
                };

                var markErrors = function(value, key) {
                    var $controlGroup = self.$el.find('#contact-' + key).parent().parent();
                    var $errorEl = $('<span>', { class: 'control-label error-message', text: value});
                    $controlGroup.append($errorEl).addClass('has-error');
                };

                clearErrors();
                _.each(errors, markErrors);
            }
        });
    });
})();