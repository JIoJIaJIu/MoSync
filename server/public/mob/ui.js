function html (html) {
    $('.c').html(html);
}
$(function () {
    return;
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

    $('._create-server').on('click', function () {
        sendToPlatform('create', function (ok) {
            if (!ok)
                alert('some smth wrong');

            var isStarted = false;
            sendToPlatform('join', function () {
                appCore.accelerometer.inStartPosition(function () {
                    $('body').html('5 4 3 2 1');
                    var timeout = setTimeout(function() {
                        sendToPlatform('ready', function () {
                            isStarted = true;
                            $('body').html(
                                '<div class="pistolet">это пистолет</div>'
                            );
                            $('.pistolet').on('click', function () {
                                if (appCore.accelerometer.isBangPosition())
                                    $('body').html('BANG!!!!');
                                else
                                    $('body').html('MISS!!!!!');
                            });
                        });
                    }, 5000);

                    appCore.accelerometer.inBadPosition(function () {
                        clearTimeout(timeout);
                        if (!isStarted)
                            $("body").html('NOOOOOOOOOOOO!!!!!!!!!!!!!!!!');
                        else {
                            // TODO lol
                        }
                    });
                });
            });
        });
    });

    document.addEventListener(
        "backbutton",
        function() { mosync.app.exit(); },
        true
    );
});
