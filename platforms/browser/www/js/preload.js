// JavaScript Document

var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

$$(document).on('pageInit', function (e) {
  // Do something here when page loaded and initialized
  console.log('ready');
});