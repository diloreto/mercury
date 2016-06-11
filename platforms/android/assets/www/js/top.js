//////////////////////////////////
// Mercury Project
// 6/10/16
// Migliore Technologies Inc.
//////////////////////////////////

/// Put all application logic in here
(function(){
	
	var myApp = new Framework7();
	
	// Export selectors engine
	var $$ = Dom7;
	
	// Global variables
	var geodata;
	
	// Require the barcodescanner plugin
	// cordova.require("com.phonegap.plugins.barcodescanner.BarcodeScanner");

	document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady() {
		
		console.log("-- adding event listeners --");
		document.addEventListener("pause", onPause, false);
		document.addEventListener("resume", onResume, false);
		
		console.log("-- capturing geolocation --");
		navigator.geolocation.getCurrentPosition(geoSuc, geoErr);
		
		console.log("-- enabling notifications --");
		setupPush();
		
		$$("#btnScan").on('click', scanItem );
	
		
		// plugin here
		console.log("-- device ready --");
	}
	
	
	function onPause(){
	  // TODO: This application has entered its paused state	
	}
	
	function onResume(){
	  // TODO: This application has resumed from its paused state	
	}
	
	
	function setupPush() {
        console.log('calling push init');
        var push = PushNotification.init({
            "android": {
                "senderID": "944042506564"
            },
            "ios": {
                "sound": true,
                "vibration": true,
                "badge": true
            },
            "windows": {}
        });
        console.log('after push init');

        push.on('registration', function(data) {
            console.log('registration event: ' + data.registrationId);

            var oldRegId = localStorage.getItem('registrationId');
            if (oldRegId !== data.registrationId) {
                // Save new registration ID
                localStorage.setItem('registrationId', data.registrationId);
                // Post registrationId to your app server as the value has changed
            }

            var parentElement = document.getElementById('registration');
            var listeningElement = parentElement.querySelector('.waiting');
            var receivedElement = parentElement.querySelector('.received');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
        });

        push.on('error', function(e) {
            console.log("push error = " + e.message);
        });

        push.on('notification', function(data) {
            console.log('notification event');
            navigator.notification.alert(
                data.message,         // message
                null,                 // callback
                data.title,           // title
                'Ok'                  // buttonName
            );
       });
    }

	
})();
