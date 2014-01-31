(function() {
	ContactManager.module('Utils', function(Utils, ContactManager, Backbone, Marionette, $, _) {
		
		// String format
		Utils.stringFormat = function(format, args) { 
			var result = _.clone(format);
            var index = args.length;
            while (index--) {
                result = result.replace(new RegExp("\\{" + index + "\\}", "gm"), args[index]);
            }

            return result;
		};

		// Template loader
		Utils.fetchTemplate = function(path, done) { 
			var jsTemplate = window.jsTemplate = window.jsTemplate || {};
            var deferred = new $.Deferred();
			if (jsTemplate[path]) {
                if (_.isFunction(done)) {
                    done(jsTemplate[path]);
                }

                return deferred.resolve(jsTemplate[path]);
            }

            $.ajax({
                url: path,
                type: 'GET',
                dataType: 'text',
                cache: false,
                global: false,
                success: function(content) {
                    jsTemplate[path] = _.template(content);

                    // Set jsTemplate cache and return the template
                    if (_.isFunction(done)) {
                        done(jsTemplate[path]);
                    }

                    // Resolve deferred template
                    deferred.resolve(jsTemplate[path]);
                }
            });

            return deferred.promise();
		};
	});
})();