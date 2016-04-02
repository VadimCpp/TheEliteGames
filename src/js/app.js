goog.provide('App');


/**
 * @constructor
 */
App = function() {
    console.log('Hello, world');
};


/**
 * @public
 */
App.prototype.run = function() {
    alert('Application is run.');
};


goog.exportSymbol('App', App);
goog.exportSymbol('App.prototype.run', App.prototype.run);
