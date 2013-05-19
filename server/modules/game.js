var lastGameId = 0;

var game = {
    create: function (server, req, res) {
        this._activeGames[lastGameId++] = [req.body.uuid];
        res.post(lastGameId);
    },

    join: function (server, req, res) {
        for (var k in this._activeGames) {
            this._activeGames[k].push(req.body.uid);
            return k;   
        };
    },

    _activeGames: {}
};

module.exports = game;
