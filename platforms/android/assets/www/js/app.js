//////////////////////////////////
// Mercury Project
// 6/20/16
// Migliore Technologies Inc.
//////////////////////////////////

/// Put all application logic in here
(function(){	
	
	// Global variables
	var geodata;

	// Global variable holding shopping cart
	var shoppingCart;
	
	// Init slider and store its instance in mySwiper variable
	var mySwiper;
	
	var myApp = new Framework7({
		modalTitle: 'Mercury',
		animateNavBackIcon: true,
	});
	
	// Add view
	var mainView = myApp.addView('.view-main', {
		// Because we use fixed-through navbar we can enable dynamic navbar
		dynamicNavbar: true
	});	
	
	// Expose Internal DOM library
	var $$ = Dom7;

	
	// Toast - by Timo
	var toast = myApp.toast('Added to Cart', '<div>✓</div>', {});
	
	document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady() {
		
		console.log("-- adding event listeners --");
		document.addEventListener("pause", onPause, false);
		document.addEventListener("resume", onResume, false);

		console.log("-- adding event handlers --");
		addEventHandlers();
		
		console.log("-- capturing geolocation --");
		navigator.geolocation.getCurrentPosition(geoSuc, geoErr);
		
		//console.log("-- enabling notifications --");
		//setupPush();
		
			
		// Complete
		console.log("-- device ready --");
	}
	


	function addEventHandlers(){



		// Scan Item button
		$$("#btnScan").on('click', scanItem );


		// Scan Item button
		$$("#btnTry").on('click', prepareItems );

	}

	function prepareItems(){

		// Function sends a JSON message to a terminal (or master phone)
		// alerting them customer is ready to try on clothing
		// In a non-retail setting, this could mean to get the items together
		// Or go away if it does not make sense

		// sendItemsToTerminal()

	}

	function checkout(){


	}


	
	function onPause(){
	  // TODO: This application has entered its paused state
	  alert("Goodnight!");	
	}
	
	function onResume(){
	  // TODO: This application has resumed from its paused state
	  alert("And we're back!");	
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
	
	
	function geoSuc(data){
		var geodata = data.coords;
		console.log("-- setting geodata --");
		console.log( geodata );
		localStorage.setItem("geoData", JSON.stringify(geodata) );
		// Use this to detect if within the store coordinates
		// and if so, download store database to local storage
	}
	
	function geoErr(data){
		// alert("Error getting location data");
	}
	
	function lclStorage(){
		if(localStorage.getItem("LocalData") === null)
		{
			var data = [];
			data = JSON.stringify(data);
			localStorage.setItem("LocalData", data);
		}	
	}


	function callAjax( func, params, cbFunc ){



	}

	
	function scanItem(){
		
		var item_sku = null;
		
		var camOpt = {
			  "preferFrontCamera" : false, // iOS and Android
			  "showFlipCameraButton" : false, // iOS and Android
			  "prompt" : "Place a barcode inside the scan area", // supported on Android only
			  "formats" : "EAN_8,EAN_13,QR_CODE", // Specify formats
			  "orientation" : "portrait" // Android only (portrait|landscape), default unset so it rotates with the device
		  };
		  
		  cordova.plugins.barcodeScanner.scan(
			  function (result) {
				  alert("We got a barcode\n" +
						"Result: " + result.text + "\n" +
						"Format: " + result.format + "\n" +
						"Cancelled: " + result.cancelled);
			  }, 
			  function (error) {
				  alert("Scanning failed: " + error);
			  },
			  camOpt
	   	  );
	
					
		if( item_sku ){
		
			$$("#divSwipeInstr").removeClass("hidden-none");
			$$("#blkButtons").removeClass("hidden-none");
			$$("#divSwiperHld").addClass("swiper-wrapper");
			
			mySwiper = myApp.swiper('.swiper-container', {
				pagination:'.swiper-pagination'
			});
			mySwiper.on('slideChangeStart', function (swp) {
				alert('slide change start');
				console.log(swp);
			});
			
			// Show toast
			// toast.show(true);
			
			// If the shopping cart bag is not present, show
			if( parseInt( $$("#cart-total").html() ) == 0 ){ 
				$$("#cart-total").removeClass("hidden");
				$$("i.ion-bag").removeClass("inactive");
			}
			// Then increment 
			$$("#cart-total").html( parseInt($$("#cart-total").html()) + 1);
		
		}
		
	}
	
})();
