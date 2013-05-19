var lastGameId = 0;

var game = {
    create: function (server, req, res) {
        this._activeGames[lastGameId] = res;
        lastGameId++;
    },

    join: function (server, req, res) {
        for (var k in this._activeGames) {
            var sres = this._activeGames[k];
            break;
        };
        res.send(k); 
        sres.send(k);

        this._activeGames[k] = null;
    },

    _activeGames: {},

};

module.exports = game;
