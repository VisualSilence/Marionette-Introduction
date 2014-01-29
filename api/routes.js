Routes = (function() {
    return {
        index: function(req, res) {
            res.render('index', { title: '' });
        },

        services: {
            respond: function(req, res) {
                res.json(req.payload.data, req.payload.code);
            }
        }
    };
})();

module.exports = Routes;