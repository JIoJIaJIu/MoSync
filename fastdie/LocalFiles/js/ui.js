function onSuccess () {
    $('body').html(JSON.stringify(arguments));
}

function onError (argument) {
    $('body').html(JSON.stringify(arguments));
}

mosync.rlog("GOOGO");
$(function () {
    //$('body').html('');
    //$('body').html('LOL');
    //$('body').prepend('1<br>');
    //appCore.accelerometer.down(function (data) {
        //$('body').prepend(JSON.stringify(data)+ '<br>');
    //});
    $('.find-device').on('click', function () {
        $('.main-page').show();
        $('.devices').show();
        sendToPlatform(['findDevices'], function () {
            $('.log').prepend(JSON.stringify(arguments));
        });
    });
    $('.find-devices').on('click', function () {
        sendToPlatform(['log'], function (message) {
            $('.devices').append(message + '<br>');
        });
    });

    document.addEventListener(
        "backbutton",
        function() { mosync.app.exit(); },
        true
    );
});
