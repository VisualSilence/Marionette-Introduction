(function() {
    ContactManager.module('Common.Views', function(Views, ContactManager, Backbone, Marionette, $, _) {
        Views.Loading = Marionette.ItemView.extend({
            template: Handlebars.compile($('#loading-view').html()),

            initialize: function(options) {
                var options = options || {};
                this.loadHeading = options.loadHeading || 'Loading';
                this.loadMessage = options.loadMessage || 'Please wait while content is fetched...';
            },

            serializeData: function() {
                return {
                    loadHeading: this.loadHeading,
                    loadMessage: this.loadMessage
                };
            },

            onShow: function() {
                $('#spinner').spin({
                    lines: 13, // The number of lines to draw
                    length: 10, // The length of each line
                    width: 1, // The line thickness
                    radius: 15, // The radius of the inner circle
                    corners: 1, // Corner roundness (0..1)
                    rotate: 0, // The rotation offset
                    direction: 1, // 1: clockwise, -1: counterclockwise
                    color: "#4a4a4a", // #rgb or #rrggbb
                    speed: 2, // Rounds per second
                    trail: 30, // Afterglow percentage
                    shadow: false, // Whether to render a shadow
                    hwaccel: true, // Whether to use hardware acceleration
                    className: "spinner", // The CSS class to assign to the spinner
                    zIndex: 2e9, // The z-index (defaults to 2000000000)
                    top: "10px", // Top position relative to parent in px
                    left: "auto" // Left position relative to parent in px
                });
            }
        });
    });
})();