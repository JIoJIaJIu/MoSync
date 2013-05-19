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

    $('.create-server').on('click', function () {
        console.log('123');
        sendToPlatform('create', function (ok) {
            if (!ok)
                alert('some smth wrong');

        

        })
    });

    document.addEventListener(
        "backbutton",
        function() { mosync.app.exit(); },
        true
    );
});
