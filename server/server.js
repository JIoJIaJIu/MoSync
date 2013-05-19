var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    fs = require('fs'),
    io = require('socket.io').listen(server),
    handlers = require('./handlers'),
    ioHandlers = require('./handlers.io.js');

var config = {
    port: 3000,
    host: 'localhost',
};

app
    .set('views',__dirname + '/views')
    .set('view engine', 'jade')
    .use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }))
    .use(function(req, res, next){
        console.log('%s %s', req.method, req.url);
        next();
    })
    .use(express.cookieParser(' '))
    .use(express.cookieSession(' '))
    .use(express.bodyParser())
    .use('/static', express.static('static'))

    .get('/', handlers.index);


io
    .set('log level', 1)
    .sockets.on('connection', ioHandlers.push);

server.listen(config.port);
console.log('Server works at http://' + config.host + ':' + config.port);
