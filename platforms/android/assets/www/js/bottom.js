// Load the app object
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Toast - by Timo
var toast = myApp.toast('Added to Cart', '<div>✓</div>', {});

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Init slider and store its instance in mySwiper variable
var mySwiper;

// Scan Button was clicked



function scanItem(){
		
	var item_sku = null;
	
	var camOpt = {
          "preferFrontCamera" : false, // iOS and Android
          "showFlipCameraButton" : false, // iOS and Android
          "prompt" : "Place a barcode inside the scan area", // supported on Android only
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
      {
          "preferFrontCamera" : true, // iOS and Android
          "showFlipCameraButton" : true, // iOS and Android
          "prompt" : "Place a barcode inside the scan area", // supported on Android only
          "formats" : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          "orientation" : "landscape" // Android only (portrait|landscape), default unset so it rotates with the device
      }
   );


/*
	cordova.plugins.barcodeScanner.scan(function (result) {
		console.log(result);
		  
		if(!result.cancelled)
		{
			// Vibrate to signal success
		  	navigator.vibrate(2000);
		  	alert("Barcode type is: " + result.format);
		  	alert("Decoded text is: " + result.text);
		  	item_sku = result.text;
		}
		else
		{
		  alert("You have cancelled scan");
		}
	  },
	  function (error) {
		  alert("Scanning failed: " + error);
	  },
	  camOpt
	);
	
	*/
			
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


/*************** Template7 ******************/
// Templates using Template7 template engine
/*
var template = $$('#template').html();
 
// compile it with Template7
var compiledTemplate = Template7.compile(template);
 
// Now we may render our compiled template by passing required context
var context = {
    firstName: 'John',
    lastName: 'Doe'
};
template.html(compiledTemplate(context));
*/