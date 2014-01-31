(function() {

    /*Backbone.Marionette.TemplateCache.prototype.loadTemplate = function (templateId, callback) {
        var tmpId = templateId.replace("#", ""),
            url = "/templates/" + tmpId + ".html";

        $.get(url, function (templateHtml) {
            compiledTemplate = Handlebars.compile($(templateHtml).html())
            callback.call(this, compiledTemplate);
        });
    };

    Backbone.Marionette.Renderer.renderTemplate = function (templateId, data) {
        var renderer = $.Deferred();
        Backbone.Marionette.TemplateCache.get(templateId, function(template){
            var html = template(data);
            renderer.resolve(html);
        });
        return renderer.promise();
    };*/

	// Create Marionette application
    ContactManager = new Marionette.Application();

	// Add regions
	ContactManager.addRegions({
		mainRegion: '#main-region'
	});

    // Attach history initialization to the application
    ContactManager.initHistory = function() {
        if (Backbone.history) {
            Backbone.history.start();

            if (this.isRootRoute()) {
                ContactManager.trigger('contacts:list');
            }
        }
    };

    // Attach navigation handling to the application
    ContactManager.navigate = function(route, options) {
        options || (options = {});
        Backbone.history.navigate(route, options);
    };

    // Attach route fetching mechanism to the application
    ContactManager.getCurrentRoute = function() {
        return Backbone.history.fragment;
    };

    // Attach root route detection callback to the application
    ContactManager.isRootRoute = function() {
        return this.getCurrentRoute() === '';
    }

	// Post-initialization handler
	ContactManager.on('initialize:after', function() {
		this.initHistory();
	});
})();