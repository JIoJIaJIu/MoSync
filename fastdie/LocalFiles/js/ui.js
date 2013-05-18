function onSuccess () {
    $('body').html(JSON.stringify(arguments));
}

function onError (argument) {
    $('body').html(JSON.stringify(arguments));
}

$(function () {
    //$('body').html('');
    //$('body').html('LOL');
    //$('body').prepend('1<br>');
    //new appCore.accelerometer().down(function (data) {
        //$('body').prepend(JSON.stringify(data)+ '<br>');
    //});
    //setInterval(function () {
        //new appCore.accelerometer().isBangPos(function () {
            
            //$('body').prepend('bang pos');
            //$('body').prepend('bang pos');
        //});
    //}, 100);
    $('.find-device').on('click', function () {
        $('.main-page').show();
        $('.devices').show();
        sendToPlatform(['findDevices'], function () {
            $('.devices').prepend(JSON.stringify(arguments) + '<br>');
        });
    });
    $('.log').on('click', function () {
        sendToPlatform(['log'], function (message) {
            $('.logger').append(message + '<br>');
        });
    });

    document.addEventListener(
        "backbutton",
        function() { mosync.app.exit(); },
        true
    );
});
