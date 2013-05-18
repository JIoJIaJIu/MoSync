
// Register event listeners.

// The "deviceready" event is sent when the system
// has finished loading.
document.addEventListener(
    "deviceready",
    initialize,
    true);


function initialize () {
    // Close the application when the back key is pressed
    document.addEventListener(
        "backbutton",
        function() { mosync.app.exit(); },
        true
    );

    $('.main-page').click(function ($e) {
        $('.main-page').hide();
        $('.devices').show();
        mosync.bridge.send(
            ["Custom", "findDevices"],
            function (devices) {
                $('.devices').html(devices.toString());
            }
        );
    });

}

//function changeColor()
//{
    //mosync.nativeui.callJS(
        //mosync.nativeui.MAIN_WEBVIEW,
        //"performChangeColor()");
//}

    //Change page background to a random color.
//function performChangeColor()
//{
    //var color = "#" +
        //(Math.random() * 0xFFFFFF + 0x1000000)
            //.toString(16).substr(1,6);
    //document.documentElement.style.backgroundColor = color;
    //document.body.style.backgroundColor = color;
//}

/**
* Vibrate device.
*/
function vibrate()
{
    mosync.bridge.send(["Custom", "Vibrate", "500"]);
}

/**
* Play one beep sound.
*/
function beep()
{
    // Send message to C++ to make device beep.
    // Here we used the string stream format.
    mosync.bridge.send(["Custom", "Beep"]);
}
