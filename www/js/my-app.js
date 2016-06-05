// Initialize your app
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

// Templates using Template7 template engine
/*
myApp.searchResultsTemplate = Template7.compile($$('#search-results-template').html());
myApp.homeItemsTemplate = Template7.compile($$('#home-items-template').html());
myApp.detailsTemplate = Template7.compile($$('#details-template').html());
*/

// Scan Button was clicked
$$("#btnScan").click(function(){
	
	$$("#blkButtons").removeClass("hidden-none");
	
	// Show toast
	toast.show(true);
	
	// If the shopping cart bag is not present, show
	if( parseInt( $$("#cart-total").html() ) == 0 ){ 
		$$("#cart-total").removeClass("hidden");
	}
	// Then increment 
	$$("#cart-total").html( parseInt($$("#cart-total").html()) + 1);
	
});