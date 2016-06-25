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