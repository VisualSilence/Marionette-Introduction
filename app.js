
/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./api/routes')
    , db = require('./api/db')
    , http = require('http')
    , path = require('path');

var app = express();

// all environments
app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.json({limit: '50mb'}));
    app.use(express.urlencoded({limit: '50mb'}));
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session());
    app.use(app.router);
    app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
    app.use(express.static(path.join(__dirname, 'public')));

    db.connect();
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/services/v1/contacts', db.contacts.fetchAll, routes.services.respond);
app.get('/services/v1/contacts/:id', db.contacts.fetchById, routes.services.respond);
app.del('/services/v1/contacts/:id', db.contacts.remove, routes.services.respond);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
