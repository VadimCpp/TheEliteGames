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

goog.provide('theEliteGames.GameView');

goog.require('theEliteGames.elements.Base');
goog.require('theEliteGames.models.Game');
goog.require('goog.events');



/**
 * @param {!theEliteGames.models.Game} game
 * @constructor
 * @extends {theEliteGames.elements.Base}
 */
theEliteGames.GameView = function(game) {
    theEliteGames.elements.Base.call(this);
    this.addClassName(goog.getCssName('the-elite-games-game-view'));

    /**
     * @type {!theEliteGames.models.Game}
     * @private
     */
    this.game_ = game;

    /**
     * @type {!theEliteGames.elements.Base}
     * @private
     */
    this.link_ = new theEliteGames.elements.Base();
    this.link_.addClassName(goog.getCssName('img-close'));
    this.link_.addClassName(goog.getCssName('the-elite-games-game-close'));
    goog.events.listen(this.link_.getMainElement(), goog.events.EventType.CLICK, this.onCloseCallback_, false, this);

    /**
     * @type {!theEliteGames.elements.Base}
     * @private
     */
    this.block_ = new theEliteGames.elements.Base();
    this.block_.addClassName(goog.getCssName('the-elite-games-block'));

    /**
     * @type {!theEliteGames.elements.Base}
     * @private
     */
    this.videoContainer_ = new theEliteGames.elements.Base();
    this.videoContainer_.addClassName(goog.getCssName('the-elite-games-video-container'));

    /**
     * @type {!theEliteGames.elements.Base}
     * @private
     */
    this.video_ = new theEliteGames.elements.Base('iframe');
    this.video_.addClassName(goog.getCssName('the-elite-games-video'));
    this.video_.setAttribute('src', this.game_['youtube']);
    this.video_.setAttribute('frameborder', '0');
    this.video_.setAttribute('allowfullscreen', 'allowfullscreen');

    /**
     * @type {!theEliteGames.elements.Base}
     * @private
     */
    this.description_ = new theEliteGames.elements.Base();
    this.description_.addClassName(goog.getCssName('the-elite-games-game-description'));
    this.description_.getMainElement().innerHTML = this.game_['description'];

    /**
     * @type {!theEliteGames.elements.Base}
     */
    var storeBlock = this.getStoresBlock_();

    this.videoContainer_.appendChild(this.video_);
    this.block_.appendChild(this.videoContainer_);
    this.block_.appendChild(this.description_);
    this.block_.appendChild(storeBlock);
    this.appendChild(this.link_);
    this.appendChild(this.block_);
};
goog.inherits(theEliteGames.GameView, theEliteGames.elements.Base);


/**
 * @private
 */
theEliteGames.GameView.prototype.onCloseCallback_ = function() {
    this.onClose();
};


/**
 * @type {!function()}
 */
theEliteGames.GameView.prototype.onClose = goog.nullFunction;


/**
 * @return {!theEliteGames.elements.Base}
 * @private
 */
theEliteGames.GameView.prototype.getStoresBlock_ = function() {
    /**
     * @type {!theEliteGames.elements.Base}
     */
    var storesBlock = new theEliteGames.elements.Base();
    storesBlock.addClassName(goog.getCssName('stores-block'));

    /**
     * NOTE! Bracket notation is use because closure compile renames variables.
     *
     * More details on a problem:
     * http://stackoverflow.com/q/36379364/4222953
     *
     * @type {!Array<!theEliteGames.models.Store>}
     */
    var stores = this.game_['stores'];

    /**
     * @type {!number}
     */
    var i = 0;

    /**
     * @type {!number}
     */
    var l = stores.length;

    for (; i < l; i++) {
        /**
         * @type {!theEliteGames.models.Store}
         */
        var store = stores[i];

        /**
         * @type {!string}
         */
        var storeClass = theEliteGames.models.StoreIconClass[store['iconId']];

        /**
         * @type {!theEliteGames.elements.Link}
         */
        var storeLink = new theEliteGames.elements.Link(store['url'], '_blank');

        /**
         * @type {!theEliteGames.elements.Base}
         */
        var externalLinkIcon = new theEliteGames.elements.Base();
        externalLinkIcon.addClassName(goog.getCssName('img-external-link'));

        /**
         * @type {!theEliteGames.elements.Base}
         */
        var storeIcon = new theEliteGames.elements.Base();
        storeIcon.addClassName(goog.getCssName('store'));
        storeIcon.addClassName(storeClass);

        storeIcon.appendChild(externalLinkIcon);
        storeLink.appendChild(storeIcon);
        storesBlock.appendChild(storeLink);
    }

    return storesBlock;
};
