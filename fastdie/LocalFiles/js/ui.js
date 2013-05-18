function onSuccess () {
    $('body').html(JSON.stringify(arguments));
}

function onError (argument) {
    $('body').html(JSON.stringify(arguments));
}

$(function () {

    $('.find-device').on('click', function () {
        $('.main-page').hide();
        $('.devices').show();
        sendToPlatform(['findDevices'], function () {
            $('body').html(JSON.stringify(arguments));
            alert(JSON.stringify(arguments));
        });
    });
    $('.log').on('click', function () {
        sendToPlatform(['log'], function (message) {
            $('.logger').prepend(message + '<br>');
        });
    });

    document.addEventListener(
        "backbutton",
        function() { mosync.app.exit(); },
        true
    );
})
