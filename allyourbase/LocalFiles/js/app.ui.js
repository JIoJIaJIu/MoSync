/*
* @file app.ui.js
* @author Mikael Kindborg
*
* This file contains UI code at a more abstract level.
* The intention is to make it easier to switch UI libraries
* without having to update/rewrite all the UI code.
*/

app.ui = (function() {
    var ui = {};

    // Make sure we get the correct event type on every touch system.

    ui.showMessage = function(message)
    {
        // Windows Phone does not support alert, show the message
        // in the user name field for now.
        if (mosync.isWindowsPhone)
        {
            ui.setUserNameField(message);
        }
        else
        {
            alert(message);
        }
    };

    ui.getUserNameField = function() {
        return $("#userNameField").val();
    };

    ui.setUserNameField = function(name) {
        return $("#userNameField").val(name);
    };


    /**
        * Keydown event listener. Gets called when the user presses
        * a button on his/her keyboard in the input field.
        * @param keynum The pressed key (as an ASCII value).
        */
    ui.keydown = function(keynum)
    {
        if (keynum == 13)
        {
            // TODO: Perhaps we need to use a timer to
            // fix a virtual keyboard bug on Android 4.
            setTimeout(function () {
                // TODO 
            }, 1);
        }
    };

    /**
    * Set up event bindings and initialize the UI.
    */
    ui.initialize = function()
    {
        // Handle the back key event (on Android).
        document.addEventListener(
            "backbutton",
            function()
            {
                ui.goBack();
            },
            true
        );

        ui.initializeFramework();

        ui.readAndDisplayFavouriteUsers();
    };


    /**
        * Displays a loading indicator in the UI.
        */
    ui.showLoadingIndicator = function()
    {
        alert("ui.showLoadingIndicator: Implement for the specific UI framework used");
    };


    /**
        * Called by framework when document has loaded.
        */
    ui.initializeFramework = function()
    {
        alert("ui.initializeFramework: Implement for the specific UI framework used");
    };

    /**
        * Navigate back one page.
        */
    ui.goBack = function()
    {
        alert("ui.goBack: Implement for the specific UI framework used");
    };

    /**
        * Show one page.
        */
    ui.showPage = function(page)
    {
        alert("ui.showPage: Implement for the specific UI framework used");
    };

    return ui;
    })();

    // Call app.ui.initialize when document has loaded.
    document.addEventListener(
    "DOMContentLoaded",
    app.ui.initialize,
    false
    );


/**
    * Here we add jQuery Mobile specific code.
    */
(function()
{
    /**
        * Show one page.
        */
    app.ui.showPage = function(page)
    {
        $.mobile.changePage("#" + page);//, {transition: "slideleft"});
    };

    /**
        * Navigate back one page.
        */
    app.ui.goBack = function()
    {
        //console.log("@@@ app.ui.goBack activePage: " + $.mobile.activePage[0].id);

        if ($.mobile.activePage[0].id === "home")
        {
            // Send the app to the background if
            // we are on the home screen (first page).
            //mosync.app.sendToBackground();
            mosync.app.exit();
        }
        else
        {
            // Otherwise navigate to previous screen.
            history.back();
            return false;
        }
    };

    /**
        * Called by framework when document has loaded.
        */
    app.ui.initializeFramework = function()
    {
        // No special initialization is performed.
    };


    /**
        * Displays a loading indicator in the UI.
        */
    app.ui.showLoadingIndicator = function()
    {
        // We do not set this due to problems with
        // dynamically updating/refreshing the DOM/UI
        // of jQuery Mobile apps.
        // TODO: Use the loading support of jQuery Mobile.
    };

})();
