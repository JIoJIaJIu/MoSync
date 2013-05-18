// Register event listeners.

// The "deviceready" event is sent when the system
// has finished loading.
//document.addEventListener(
    //"deviceready",
    //initialize,
    //true
//);

//document.addEventListener(
    //'DOMContentLoaded',
    //initialize
//)

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
 * Отправка сообщений бекенду
 *
 * @param message {Array} list of words
 * @param callback {Function}
 */
function sendToPlatform (messages, callback) {
    var arr = ['Custom'],
        $loading = $('.loading');

    $loading.show();
    arr = arr.concat(messages);
    mosync.bridge.send(
        arr,
        function (data) {
            $loading.hide();
            callback(data);
        }
    );
}

/**
 * Генерация mustache шаблона
 *
 * @param templateName имя шаблона без префикса
 * @param data данные
 */
function render (templateName, data) {
    if (!templateName)
        return '';

    return Mustache.render($('.m-'+templateName).html(), data || null);
}

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
