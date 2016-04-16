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

goog.provide('theEliteGames.App');

goog.require('theEliteGames.elements.Base');
goog.require('theEliteGames.View');
goog.require('theEliteGames.GameView');



/**
 * @constructor
 * @extends {theEliteGames.elements.Base}
 */
theEliteGames.App = function() {
    theEliteGames.elements.Base.call(this);

    /**
     * @type {?theEliteGames.View}
     */
    this.view_ = null;

    /**
     * @type {?theEliteGames.GameView}
     */
    this.gameView_ = null;

};
goog.inherits(theEliteGames.App, theEliteGames.elements.Base);


/**
 * @public
 */
theEliteGames.App.prototype.run = function() {
    if (!this.view_) {
        this.view_ = new theEliteGames.View();
        this.view_.onIconClick = this.onIconClickCallback_.bind(this);
        this.appendChild(this.view_);
    }
};


/**
 * @inheritDoc
 */
theEliteGames.App.prototype.appendChild = function(elem) {
    document.body.appendChild(elem.getMainElement());
};


/**
 * @inheritDoc
 */
theEliteGames.App.prototype.removeChild = function(elem) {
    document.body.removeChild(elem.getMainElement());
};


/**
 * @param {!theEliteGames.models.Game} game
 * @param {!Array<!theEliteGames.models.Store>} stores
 * @private
 */
theEliteGames.App.prototype.onIconClickCallback_ = function(game, stores) {
    if (!this.gameView_) {
        /**
         * @type {theEliteGames.GameView}
         * @private
         */
        this.gameView_ = new theEliteGames.GameView(game, stores);
        this.gameView_.onClose = this.onCloseCallback_.bind(this);
        this.appendChild(this.gameView_);
        this.gameView_.addClassName(goog.getCssName('uk-animation-scale-up'));

        /**
         * @type {!theEliteGames.App}
         */
        var that = this;

        /**
         * @type {!number}
         */
        var timeout = 500; // ms

        setTimeout(function () {
            that.gameView_.removeClassName(goog.getCssName('uk-animation-scale-up'));
        }, timeout);
    }
};


/**
 * @private
 */
theEliteGames.App.prototype.onCloseCallback_ = function() {
    if (this.gameView_) {
        this.gameView_.addClassName(goog.getCssName('uk-animation-scale-up'));
        this.gameView_.addClassName(goog.getCssName('uk-animation-reverse'));

        /**
         * @type {!theEliteGames.App}
         */
        var that = this;

        /**
         * @type {!number}
         */
        var timeout = 500; // ms

        setTimeout(function() {
            if (that.gameView_) {
                that.removeChild(that.gameView_);
                that.gameView_ = null;
            }
        }, timeout);
    }
};


goog.exportSymbol('theEliteGames.App', theEliteGames.App);
goog.exportSymbol('theEliteGames.App.prototype.run', theEliteGames.App.prototype.run);
