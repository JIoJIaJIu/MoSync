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
            $('body').html(JSON.stringify(arguments));
            alert(JSON.stringify(arguments));
        })
    });
})
