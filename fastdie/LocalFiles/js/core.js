// Register event listeners.

// The "deviceready" event is fired when the system has finished loading.
//document.addEventListener(
//    "deviceready",
//    initialize,
//    true
//);
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

//var coreApp_Old = {
//	get viewSwitcher() {
//		return viewSwitcher;
//	}
//	init: function coreApp_init() {
//	    // Close the application when the back key is pressed
//	    document.addEventListener("backbutton", function() { mosync.app.exit(); }, true);
//	    
//	    try {
//	    	this.viewSwitcher.init();
//	    }
//	    catch(e) {
//	    	mosync.rlog("Couldn't init layout. "+ e);
//	    	return;
//	    }
//	},
//	handleEvent: function coreApp_handleEvent(event) {
//		switch(event.type) {
//		case "DOMContentLoaded":
//			this.init();
//			break;
//		case "deviceready":
//			break;
//		}
//	}
//};

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
//	    var navigations = document.getElementsByClassName(CONSTS.NAVIGATION_CLASS);
//	    var links = null;
//	    for ( var navItem in navigations ) {
//	    	$(navigations[navItem].querySelectorAll(">li")).click(function(){
//	    		this
//	    	});
//	    }
	    
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
		OVERLAY_ID: "view-switcher-overlay"
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
		show: function viewSwitcher_show(view) {
			var viewName = getViewName(view);
			var $newView = null;
			if (!($newView = $(viewName, viewPageArea)).length) {
				return;
			}
			
			$overlay.show();
			
			var curView = this.getCurrentView();
			console.log( $(curView) );
			$(curView).fadeOut(200, function() {
				curView.classList.remove(CONSTS.ACITVE_VIEW_CLASS);
				$newView.fadeIn(200, function() {
					$newView.addClass(CONSTS.ACITVE_VIEW_CLASS);
					$overlay.hide();
				});
			});
		},
		getCurrentView: function viewSwitcher_getCurrentView() {
			return viewPageArea.querySelector("."+ CONSTS.ACITVE_VIEW_CLASS);
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

///**
//* Vibrate device.
//*/
//function vibrate()
//{
//    mosync.bridge.send(["Custom", "Vibrate", "500"]);
//}
//
///**
//* Play one beep sound.
//*/
//function beep()
//{
//    // Send message to C++ to make device beep.
//    // Here we used the string stream format.
//    mosync.bridge.send(["Custom", "Beep"]);
//}
