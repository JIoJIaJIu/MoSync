function append (html) {
    $('.c').append(html);
}

function html (html) {
    $('.c').html(html);
}
function h1 (text) {
    html('<h1>' + text + '</h1>');
}

function newGameForm () {
    html('<input class="game-name"><div class="create-game">Создать</div>');
}

function pistolet () {
    html ('<img width="80%" class="pistolet" src="/pistolet.png">');

    $('.pistolet').on('click', function () {
        append('<img class="bang" src="/bang.png">');
        if (appCore.accelerometer.isBangPosition()) {
            $.post( '/client_bang', {uid: uid, gid: gid})
        } else {
            $.post( '/client_miss', {uid: uid, gid: gid});
        };
    });
}

function lose () {
    html('<img src="/potracheno.png" class="potracheno">');
}
function win () {
    html('<img src="/win.jpg" class="win">');
}

var uid = new Date().valueOf(),
    gid = null,
    accEnabled = false;

function process() {
    appCore.accelerometer.inStartPosition(function () {
        $.post('/client_ready', {uid: uid, gid: gid}, function () {
            h1('5 4 3 2 1');
            var timeout;
            accEnabled = true;
            mosync.bridge.send(["Custom", "Vibrate", 5000]);
            mosync.bridge.send(["Custom", "Beep"]);

            $.post('/client_pending', {uid: uid, gid: gid}, function (status) {
                accEnabled = false;
                switch (status) {
                    case 'reject':
                        clearTimeout(timeout);
                        h1('Противник поторопился');
                        break;
                    case 'win':
                        win();
                        break;
                    case 'lose':
                        lose();
                        break;
                    default:
                        break;
                };
            });

            appCore.accelerometer.inBadPosition(function () {
                if (!accEnabled)
                    return;
                $.post( '/client_reject', {uid: uid, gid: gid});
                h1('Фальтстарт');
                accEnabled = false;
            });

            timeout = setTimeout(function() {
                accEnabled = false;
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
