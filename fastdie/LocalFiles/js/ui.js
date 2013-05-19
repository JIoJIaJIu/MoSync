function onSuccess () {
    $('body').html(JSON.stringify(arguments));
}

function onError (argument) {
    $('body').html(JSON.stringify(arguments));
}

$(function () {
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
});
