Db = (function() {
    var mongoose = require('mongoose')
        , schema = require('mongoose').Schema
        , ObjectId = mongoose.Types.ObjectId
        , connection = 'mongodb://service:pa$$w0rd@localhost:27017/cm';

    //
    // Manages forwarding of fetched data payloads
    var forwardDataPayload = function(req, next, query) {
        query.exec(function(error, data) {
            if (error) {
                return next(error);
            }

            req.payload = {
                data: data || {},
                code: data ? 200 : 404
            };

            next();
        });
    };

    var ContactSchema = schema({
        firstName     :{type:String, required: true},
        lastName      :{type:String, required: true},
        phoneNumber   :{type:String, required: true}
    });

    var Contact = mongoose.model('Contact', ContactSchema, 'contacts');

    return {
        connect: function() {
            mongoose.connect(connection);

            var db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error:'));
            db.on('open', function() {
                console.log('Connection established to the database located at: ' + connection);
            });
        },

        contacts: {
            fetchAll: function(req, res, next) {
                forwardDataPayload(req, next, Contact.find());
            },

            fetchById: function(req, res, next) {
                if (!req.params.id) {
                    return next(new Error('Invalid request'));
                }

                forwardDataPayload(req, next, Contact.findById(new ObjectId(req.params.id)));
            },

            add: function(req, res, next) {
                if (!req.body) {
                    return next(new Error('Invalid request'));
                }

                forwardDataPayload(req, next, Contact.create(req.body));
            },

            update: function(req, res, next) {
                if (!req.body) {
                    return next(new Error('Invalid request'));
                }

                var data = req.body;
                delete data._id;
                forwardDataPayload(req, next, Contact.findByIdAndUpdate({_id:req.params.id}, { $set: data }));
            },

            remove: function(req, res, next) {
                if (!req.params.id) {
                    return next(new Error('Invalid request'));
                }

                var query = Contact.remove({_id:req.params.id});
                query.exec(function(error) {
                    if (error) {
                        return next(error);
                    }

                    req.payload = {
                        data: req.params.id,
                        code: 200
                    };
                    next();
                });
            }
        }
    };
})();

module.exports = Db;