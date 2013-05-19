function initializeSockets () {
    var socket = new WebSocket('ws://localhost:8080/');

    socket.onopen = function () {
    };

    socket.onmessage = function () {
    };

    socket.onclose = function () {
    };
}

$(function () {
    var uid = new Date().valueOf(),
        gid = null;

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
