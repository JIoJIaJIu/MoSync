var WebSocketServer = require('websocket').server;

module.exports = function (server, express) { 
    wsServer = new WebSocketServer({
        httpServer: server,
        // You should not use autoAcceptConnections for production
        // applications, as it defeats all standard cross-origin protection
        // facilities built into the protocol and the browser.  You should
        // *always* verify the connection's origin and decide whether or not
        // to accept it.
        autoAcceptConnections: false
    });

    wsServer.on('request', function(request) {
        if (!originIsAllowed(request.origin)) {
          // Make sure we only accept requests from an allowed origin
          request.reject();
          console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
          return;
        }

        var connection = request.accept('echo-protocol', request.origin);
        console.log((new Date()) + ' Connection accepted.');

        connection.on('message', function(message) {
            console.log('Received Message: ' + message.utf8Data);

            var obj = JSON.parse(message.utf8Data());
            switch (obj.message) {
                'client-ready':
                    var game = require("./modules/game.js");
                    if (game.setReady(obj.gid, obj.uid))    
                        connection.sendUTF({
                            gid: obj.gid,
                            uid: obj.uid,
                            message: 'game-ready' 
                        });
                    break;
                default:
                    break;
            };
        });

        connection.on('close', function(reasonCode, description) {
            console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
        });
    });
}
