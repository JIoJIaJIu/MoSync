module.exports = function (app, express) {
    _ROUTES_.forEach(function (record) {
        app.post(record[0], function (req, res) {
            var module = record[1];
            var cb = record[2];
            if (typeof module[cb] === 'function') {
               module[cb].apply(module, [app].concat(arguments)); 
            };
        }); 
    });
};

var _ROUTES_ = [
    [ "create_game", require("./modules/game.js"), "create" ],
    [ "join_game", require("./modules/game.js"), "join" ]
]
