/**
 * Copyright (c) 2016 Vadim Cpp
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of
 * the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

goog.provide('theEliteGames.blocks.Content');

goog.require('goog.net.XhrIo');
goog.require('theEliteGames.elements.Base');
goog.require('theEliteGames.elements.Game');
goog.require('theEliteGames.models.Data');
goog.require('theEliteGames.models.Game');
goog.require('theEliteGames.models.Store');
goog.require('theEliteGames.models.Link');



/**
 * @constructor
 * @extends {theEliteGames.elements.Base}
 */
theEliteGames.blocks.Content = function() {
    theEliteGames.elements.Base.call(this);
    this.addClassName(goog.getCssName('the-elite-games-blocks-content'));
    this.addClassName(goog.getCssName('uk-container'));
    this.addClassName(goog.getCssName('uk-container-center'));

    /**
     * @type {!goog.net.XhrIo}
     * @private
     */
    this.xhr_ = new goog.net.XhrIo();
    goog.events.listen(this.xhr_, goog.net.EventType.COMPLETE, this.onRequestComplete_.bind(this));

    this.getGames_();

};
goog.inherits(theEliteGames.blocks.Content, theEliteGames.elements.Base);


/**
 * @private
 */
theEliteGames.blocks.Content.prototype.getGames_ = function() {

    /**
     * @type {!string}
     */
    var DATA_FILE = 'data/data.json';

    /**
     * NOTE! Add a delay to show user cool animation.
     *
     * @type {!number}
     */
    var TIMEOUT = 1000;

    /**
     * @type {!theEliteGames.blocks.Content}
     */
    var that = this;
    setTimeout(function() {
        that.xhr_.send(DATA_FILE);
    } , TIMEOUT);
};


/**
 * @private
 */
theEliteGames.blocks.Content.prototype.onRequestComplete_ = function() {
    /**
     * @type {!number}
     */
    var status = this.xhr_.getStatus();

    if (status !== 200) {
        console.error('Bad status code (' + status + ')');

        // TODO: display error message

    } else {
        /**
         * @type {?Object|undefined}
         */
        var responseJson = this.xhr_.getResponseJson();

        if (this.validateJson_(responseJson)) {

            /**
             * @type {!theEliteGames.models.Data}
             */
            var data = /** @type {!theEliteGames.models.Data} */ (responseJson);

            this.loadData_(data);

        } else {

            console.error('Cannot display games :(');

        }
    }
};


/**
 * @param {!theEliteGames.models.Data} data
 * @private
 */
theEliteGames.blocks.Content.prototype.loadData_ = function(data) {

    /**
     * @type {!Array}
     */
    var games = data['games'];

    /**
     * @type {!Array}
     */
    var stores = data['stores'];

    /**
     * @type {!theEliteGames.elements.Base}
     */
    var grid = new theEliteGames.elements.Base();
    grid.addClassName(goog.getCssName('uk-grid'));

    /**
     * @type {!number}
     */
    var i = 0;

    /**
     * @type {!number}
     */
    var l = games.length;

    for (; i < l; i++) {
        var gameElem = new theEliteGames.elements.Game(games[i], stores);
        gameElem.onIconClick = this.onIconClickCallback_.bind(this);
        grid.appendChild(gameElem);
    }

    this.appendChild(grid);

};


/**
 * @param {?Object|undefined} json
 * @return {!boolean}
 * @private
 */
theEliteGames.blocks.Content.prototype.validateJson_ = function(json) {
    /**
     * @type {!boolean}
     */
    var retVal = false;

    /**
     * @type {!string}
     */
    var errorMessage = '';

    if (json === null || json === undefined) {
        errorMessage = 'null returned. Object expected.';
    } else if (json instanceof Object) {

        if (!json.hasOwnProperty('games')) {
            errorMessage = ' missing games property';
        } else if (!json.hasOwnProperty('stores')) {
            errorMessage = ' missing stores property';
        } else {
            
            retVal = true;
        }

    } else {
        errorMessage =  json.prototype.toString() + 'returned. Object expected.';
    }

    if (!retVal) {
        console.error('data.json: Validation failed!');
        console.error('data.json: ' + errorMessage);
    }

    return retVal;
};


/**
 * @param {!theEliteGames.models.Game} game
 * @param {!Array<!theEliteGames.models.Store>} stores
 * @private
 */
theEliteGames.blocks.Content.prototype.onIconClickCallback_ = function(game, stores) {
    this.onIconClick(game, stores);
};


/**
 * @type {!function(!theEliteGames.models.Game, !Array<!theEliteGames.models.Store>)}
 */
theEliteGames.blocks.Content.prototype.onIconClick = goog.nullFunction;
