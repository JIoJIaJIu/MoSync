function initialize () {
    // Close the application when the back key is pressed
    document.addEventListener(
        "backbutton",
        function() { mosync.app.exit(); },
        true
    );


}
$(function () {
    $('.find-device').on('click', function () {
        $('.main-page').hide();
        $('.devices').show();
        sendToPlatform(['findDevices'], function () {
            $('.body').append((JSON.stringify(arguments)));
        })
    });
})
