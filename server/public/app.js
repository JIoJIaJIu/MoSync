var uid = new Date().valueOf(),
    gid = null;
var accEnabled = false;

function process() {
    appCore.accelerometer.inStartPosition(function () {
        $.post('/client_ready', {uid: uid, gid: gid}, function () {
            $('.wrap').html('5 4 3 2 1');
            var timeout;
            accEnabled = true;
            mosync.bridge.send(["Custom", "Vibrate", 5000]);
            mosync.bridge.send(["Custom", "Beep"]);

            $.post('/client_pending', {uid: uid, gid: gid}, function (status) {
                accEnabled = false;
                switch (status) {
                    case 'reject':
                        clearTimeout(timeout);
                        $("body").html('Противник поторопился');
                        accEnabled = false;
                        break;
                    case 'win':
                        $('body').html('WIN!!!!');
                        break;
                    case 'lose':
                        $('body').html('LOOSE!!!!!');
                        break;
                    default:
                        break;
                };
            });

            appCore.accelerometer.inBadPosition(function () {
                if (!accEnabled)
                    return;
                $.post( '/client_reject', {uid: uid, gid: gid});
                $("body").html('Фальтстарт');
                accEnabled = false;
            });

            timeout = setTimeout(function() {
                accEnabled = false;
                $('.wrap').html('<div class="pistolet">это пистолет</div>');

                $('.pistolet').on('click', function () {
                    if (appCore.accelerometer.isBangPosition()) {
                        $.post( '/client_bang', {uid: uid, gid: gid})
                    } else {
                        $.post( '/client_miss', {uid: uid, gid: gid});
                    };
                });
            }, 3000);

        });

    });
};

$(function () {

    $('.create-server').click(function () {
        $.post('/create_game', {uid: uid}, function (_gid) {
           gid = _gid;
           process();
        });
    });

    $('.find-server').click(function () {
        $.post('/join_game', {uid: uid}, function (_gid) {
            gid = _gid;
            process();
        });
    });

});
