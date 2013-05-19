mosync.bridge.send = function (messages, callback) {
    setTimeout(function() {
        console.log(messages[1]);
        callback && callback(true);
        //switch(messages[1]) {
            //case 'create':
                //callback(true);
                //break;
            //case 'join':
                //callback();
            //case 'cancel'
                //callback();
            //case
        //}
    }, Math.random() * 1000);
}

document.addEventListener(
	"deviceready",
	handleEvents,
	true
);

document.addEventListener(
	"DOMContentLoaded",
	handleEvents
);

// addEventListener should get callback function instead of EventListener object
function handleEvents(event) {
	coreApp.handleEvent(event);
}

var coreApp = function coreApp_constructor() {
	var initialized = false;
	var CONSTS = {
		NAVIGATION_CLASS: "js-navigation"
	}
	
	function coreApp__initialize() {
	    // Close the application when the back key is pressed
	    document.addEventListener("backbutton", function() { mosync.app.exit(); }, true);
	    var viewSwitcher = getViewSwitcher();
	    try {
	    	viewSwitcher.init();
	    }
	    catch(e) {
	    	mosync.rlog("Couldn't init layout. "+ e);
	    	return;
	    }
	    
	    $("."+ CONSTS.NAVIGATION_CLASS +">li").on("click", function() {
	    	console.log("clicked; "+ $(this).attr("data-screen"));
	    	viewSwitcher.show($(this).attr("data-screen"));
	    });
	    
		initialized = true;
	}
	
	function getViewSwitcher() {
		return viewSwitcher;
	}
	
	return {
		init: function coreApp_init() {
			if (initialized) {
				return;
			}
			
			coreApp__initialize.apply(this);
		},
		handleEvent: function coreApp_handleEvent(event) {
			switch(event.type) {
			case "DOMContentLoaded":
				this.init();
				break;
			case "deviceready":
				break;
			}
		}
	}
}();

var viewSwitcher = function viewSwitcher_constructor() {
	var initialized = false;
	var viewPageArea = null;
	var $overlay = null; // jQuery object
	
	var CONSTS = {
		VIEW_AREA_ID: "view-page-area",
		ACITVE_VIEW_CLASS: "active-view",
		OVERLAY_ID: "view-switcher-overlay",
        DEFAULT_FADE_TIMEOUT: 200
	};
	
	function getViewName(viewTarget) {
		return ".vp-"+ viewTarget;
	}
	
	function viewSwitcher__initialize() {
		viewPageArea = document.getElementById(CONSTS.VIEW_AREA_ID);
		if (!viewPageArea) {
			throw new Error("Broken layout");
		}
		
		$overlay = $("<div id='"+ CONSTS.OVERLAY_ID +"'></div>");
		$(document.body).append($overlay);
		
	    $( viewPageArea.querySelector(".vp-main") || ":first-child", viewPageArea).fadeIn(600, function(){ 
	    	$(this).addClass(CONSTS.ACITVE_VIEW_CLASS); 
	    	$overlay.hide(); 
	    });
	    
		initialized = true;
	}
	
	return {
		init: function viewSwitcher_init() {
			if (initialized) {
				return;
			}
			
			viewSwitcher__initialize.apply(this);
		},
		show: function viewSwitcher_show(view, callback) {
			var viewName = getViewName(view);
			var $newView = null;
			if (!($newView = $(viewName, viewPageArea)).length) {
				return;
			}
			
			$overlay.show();
			
			var $curView = this.getCurrentView();
			$curView.fadeOut(CONSTS.DEFAULT_FADE_TIMEOUT, function() {
				$curView.removeClass(CONSTS.ACITVE_VIEW_CLASS);
				$newView.fadeIn(CONSTS.ACITVE_VIEW_CLASS, function() {
					$newView.addClass(CONSTS.ACITVE_VIEW_CLASS);
					$overlay.hide();
                    callback();
				});
			});
		},
		getCurrentView: function viewSwitcher_getCurrentView() {
			return $("."+ CONSTS.ACITVE_VIEW_CLASS);
		}
	}
}();

var deviceUtils = {
	vibrate: function deviceUtils_vibrate(duration) {
		mosync.brindge.send(["Custom", "Vibrate", parseInt(duration, 0)]);
	},
	beep: function deviceUtils_beep() {
		mosync.bridge.send(["Custom", "Beep"]);
	}
};




/**
 * Отправка сообщений бекенду
 *
 * @param message {String} message name
 * @param callback {Function}
 */
function sendToPlatform (message, callback) {
    var arr = ['Custom', message];

    mosync.bridge.send(
        arr,
        callback
    );
}

