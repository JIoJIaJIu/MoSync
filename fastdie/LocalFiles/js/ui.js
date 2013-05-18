function onSuccess () {
    $('body').html(JSON.stringify(arguments));
}

function onError (argument) {
    $('body').html(JSON.stringify(arguments));
}

$(function () {
    $('body').html('');
    $('body').html('LOL');
    $('body').prepend('1<br>');
    setInterval(function() {
        appCore.accelerometer.isDownPosition() && $('body').prepend('down<br>');
        appCore.accelerometer.isBangPosition() && $('body').prepend('bang<br>');
        appCore.accelerometer.isBadPosition() && $('body').prepend('bad<br>');
    }, 50);
    $('.find-device').on('click', function () {
        $('.main-page').show();
        $('.devices').show();
        sendToPlatform('findDevices', function () {
            $('.devices').prepend(JSON.stringify(arguments) + '<br>');
        });
    });
    $('.log').on('click', function () {
        sendToPlatform('log', function (message) {
            $('.logger').append(message + '<br>');
        });
    });

    document.addEventListener(
        "backbutton",
        function() { mosync.app.exit(); },
        true
    );
});
