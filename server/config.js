module.exports = function (app, express) { 
    app.use(express.logger());
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.static(__dirname + '/public'));

    app.set('views',__dirname + '/views')
    app.set('view engine', 'jade')
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));

    app.use(function(req, res, next){
        console.log('%s %s', req.method, req.url);
        next();
    });
};
