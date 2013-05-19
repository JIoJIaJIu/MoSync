function initializeSockets () {
    client.on('connect', function(connection) {
        console.log('WebSocket client connected');
        connection.on('error' + gid + '-' + uid, function(error) {
            console.log("Connection Error: " + error.toString());
        });
        connection.on('close' + gid + '-' + uid, function() {
            console.log('echo-protocol Connection Closed');
        });
        connection.on('message' + gid + '-' + uid, function(message) {
            if (message.type === 'utf8') {
                console.log("Received: '" + message.utf8Data + "'");
            }
        });

        connection.sendUTF(JSON.stringify({gid: gid, status: 'ready'}));
    });
}

$(function {
    var uid = new Date().valueOf(),
        gid = null;

client.connect('ws://localhost:8080/', 'echo-protocol');
    $('.create-server').click(function () {
        $.ajax({
            method: 'POST',
            url: '/create_server',
            data: {uid: uid},
            success: function (id) {
                gameId = id;
            }
        });
        initializeSockets();
    });
    $('.find-server').click(function () {
        $.ajax({
            method: 'POST',
            url: '/join_game',
            data: {uid: uid},
            success: function (id) {
                gameId = id;
            }
        });
        initializeSockets();
    });

});

