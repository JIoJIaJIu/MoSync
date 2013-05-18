/*
* @file app.js
* @author Mikael Kindborg
*
* Code for the application layer. The app is divided into
* separate objects for the application logic (the app object)
* and the user interface (the app.ui object).
*/

/**
 * Application layer (non-UI code).
 */
var app = (function()
{
    var app = {};

    /**
     * Read the list of favourite users.
     * @param callback Called with parameters:
     * err {Error|Null}
     * data
     * @param file
     * callback(err, data)
     */
    app.readFile = function(callback, file) {
        // Get path to local file directory, then
        // read favourite users from that directory.
        mosync.file.getLocalPath(function(path)
        {
            if (!path) {
                callback(new Error('no path!'), null);
            } else {
                var filePath = path + file;
                mosync.file.read(
                    filePath,
                    function(data) {
                        callback(null, data);
                });
            }
        });
    };

    return app;
})();
