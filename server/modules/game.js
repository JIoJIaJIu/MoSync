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

        this._activeGames[k] = {};
        this._activeGames[k].length = 0;
    },

    ready: function (server, req, res) {
        var k = req.body.gid;
        var resList = this._activeGames[k];
        resList = resList || {};
        resList.length = resList.length || 0;

        resList[req.body.uid] = res;
        resList.length++;
        console.log(resList.length);

        if (resList.length == 2) {
            for (var _uid in resList) {
                if (_uid === 'length')
                    continue;
                resList[_uid].send(k);
             };
            this._activeGames[k] = {};
        };
    },

    pending: function (server, req, res) {
        var k = req.body.gid;
        var uid = req.body.uid;

        var resList = this._activeGames[k];
        resList[uid] = res;
    },

    reject: function (server, req, res) {
        var k = req.body.gid;
        var uid = req.body.uid;
        var resList = this._activeGames[k];

        for (var _uid in resList) {
            if (_uid !== uid)
                resList[_uid].send('reject'); 
        };

        res.send();
    },

    bang: function (server, req, res) {
        var k = req.body.gid;
        var uid = req.body.uid;
        var resList = this._activeGames[k];
        console.log("BANG", uid);

        for (var _uid in resList) {
            console.log(_uid);
            if (uid == _uid) {
                console.log("win");
                resList[_uid].send('win');
            } else {
                resList[_uid].send('lose');
            };
        };
    },

    miss: function (server, req, res) {
        res.send();
    },

    _activeGames: [] 

};

module.exports = game;
