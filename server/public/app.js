var uid = new Date().valueOf(),
    gid = null;


$(function () {

    $('.create-server').click(function () {
        $.ajax({
            method: 'POST',
            url: '/create_game',
            data: {uid: uid},
            success: function (gid) {
                gid = gid;
            });
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
