module.exports = function (app, express) {
    _ROUTES_.forEach(function (record) {
        app.post(record[0], function (req, res) {
            var module = record[1];
            var cb = record[2];
            if (typeof module[cb] === 'function') {
               module[cb].apply(module, [app].concat(Array.prototype.slice.apply(arguments))); 
            };
        }); 
    });
};

var _ROUTES_ = [
    [ "/create_game", require("./modules/game.js"), "create" ],
    [ "/join_game", require("./modules/game.js"), "join" ],
    [ "/client_ready", require("./modules/game.js"), "ready" ],
    [ "/client_reject", require("./modules/game.js"), "reject" ],
    [ "/client_pending", require("./modules/game.js"), "pending" ],
    [ "/client_bang", require("./modules/game.js"), "bang" ],
    [ "/client_miss", require("./modules/game.js"), "miss" ],
]
