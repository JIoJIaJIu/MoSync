var uid = new Date().valueOf(),
    gid = null;

function initializeSockets () {
    var socket = new WebSocket('ws://localhost:8080/');

    socket.onopen = function () {
    };


    socket.onmessage = function (message) {
        switch(message) {
            case 'send':
                break;
        }
    };

    socket.onclose = function () {
        gid = null;
    };

    return socket;
}

$(function () {

    $('.create-server').click(function () {
        $.ajax({
            method: 'POST',
            url: '/create_server',
            data: {uid: uid},
            success: function (gid) {
                var socket = initializeSockets();
                gid = gid;
                socket.send(JSON.stringify({
                    uid: uid,
                    gid: gid,
                    message: "client-ready"
                }));
            }
        });

    });
    $('.find-server').click(function () {
        $.ajax({
            method: 'POST',
            url: '/join_game',
            data: {uid: uid},
            success: function (id) {
                gid = id;
            }
        });
        initializeSockets();
    });

});
