var lastGameId = 0;

var game = {
    create: function (server, req, res) {
        this._activeGames[lastGameId] = [req.body.uid];
        res.send(lastGameId);
        lastGameId++;
    },

    join: function (server, req, res) {
        for (var k in this._activeGames) {
            this._activeGames[k].push(req.body.uid);
            break;
        };
        res.send(k); 
    },

    _activeGames: {},
    _readyGames: {},

    setReady: function(gid, uid) {
        this._readyGames[uid] = this._readyGames[uid] || [];
        this._readyGames[uid].push(gid);
        if (this._readyGames[uid].length === 2)
            return true;
        return false;
    }
};

module.exports = game;
