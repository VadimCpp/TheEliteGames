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

goog.provide('theEliteGames.elements.Game');

goog.require('theEliteGames.elements.Base');
goog.require('theEliteGames.elements.Link');
goog.require('theEliteGames.models.Game');
goog.require('theEliteGames.models.Store');
goog.require('goog.events');



/**
 * @param {!theEliteGames.models.Game} game
 * @param {!Array<!theEliteGames.models.Store>} stores
 *
 * @constructor
 * @extends {theEliteGames.elements.Base}
 */
theEliteGames.elements.Game = function(game, stores) {
    theEliteGames.elements.Base.call(this);
    this.addClassName(goog.getCssName('the-elite-games-elements-game'));
    this.addClassName(goog.getCssName('uk-width-small-1-1'));
    this.addClassName(goog.getCssName('uk-width-medium-1-2'));
    this.addClassName(goog.getCssName('uk-width-large-1-3'));
    this.addClassName(goog.getCssName('uk-align-center'));

    /**
     * @type {!theEliteGames.models.Game}
     * @private
     */
    this.game_ = game;

    /**
     * @type {!Array<!theEliteGames.models.Store>}
     * @private
     */
    this.stores_ = stores;

    /**
     * @type {!theEliteGames.elements.Base}
     */
    var title = this.getTitle_();

    /**
     * @type {!theEliteGames.elements.Base}
     */
    var details = this.getDetails_();

    this.appendChild(title);
    this.appendChild(details);

};
goog.inherits(theEliteGames.elements.Game, theEliteGames.elements.Base);


/**
 * @return {!theEliteGames.elements.Base}
 * @private
 */
theEliteGames.elements.Game.prototype.getTitle_ = function() {
    /**
     * @type {!theEliteGames.elements.Base}
     */
    var title = new theEliteGames.elements.Base('div');
    title.addClassName(goog.getCssName('title'));
    title.getMainElement().innerHTML = this.game_['name'];

    return title;
};


/**
 * @return {!theEliteGames.elements.Base}
 * @private
 */
theEliteGames.elements.Game.prototype.getDetails_ = function() {
    /**
     * @type {!theEliteGames.elements.Base}
     */
    var details = new theEliteGames.elements.Base('div');
    details.addClassName(goog.getCssName('details'));

    /**
     * @type {!theEliteGames.elements.Base}
     */
    var gameType = new theEliteGames.elements.Base('div');
    gameType.addClassName(goog.getCssName('game-type'));
    gameType.getMainElement().innerHTML = this.game_['type'];

    /**
     * @type {!theEliteGames.elements.Base}
     */
    var descriptionBlock = this.getDescriptionBlock_();

    /**
     * @type {!theEliteGames.elements.Base}
     */
    var storesBlock = this.getStoresBlock_();

    details.appendChild(gameType);
    details.appendChild(descriptionBlock);
    details.appendChild(storesBlock);

    return details;
};


/**
 * @return {!theEliteGames.elements.Base}
 * @private
 */
theEliteGames.elements.Game.prototype.getDescriptionBlock_ = function() {

    /**
     * @type {!theEliteGames.elements.Base}
     */
    var descriptionBlock = new theEliteGames.elements.Base('div');
    descriptionBlock.addClassName(goog.getCssName('description-block'));

    /**
     * @type {!string}
     */
    var background = 'background: url("../img/icons/' + this.game_['icon'] + '");';

    /**
     * @type {!theEliteGames.elements.Base}
     */
    var icon = new theEliteGames.elements.Base('div');
    icon.addClassName(goog.getCssName('icon'));
    icon.setAttribute('style', background);

    /**
     * @type {!theEliteGames.elements.Base}
     */
    var iconContainer = new theEliteGames.elements.Base('div');
    iconContainer.addClassName(goog.getCssName('icon-container'));
    iconContainer.appendChild(icon);
    goog.events.listen(iconContainer.getMainElement(), goog.events.EventType.CLICK, this.onIconClickCallback_, false, this);

    /**
     * @type {!theEliteGames.elements.Base}
     */
    var description = new theEliteGames.elements.Base('div');
    description.addClassName(goog.getCssName('description'));
    description.getMainElement().innerHTML = this.game_['description'];

    descriptionBlock.appendChild(iconContainer);
    descriptionBlock.appendChild(description);

    return descriptionBlock;
};


/**
 * @return {!theEliteGames.elements.Base}
 * @private
 */
theEliteGames.elements.Game.prototype.getStoresBlock_ = function() {
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
     * @type {!Array<!theEliteGames.models.Link>}
     */
    var links = this.game_['links'];

    /**
     * @type {!number}
     */
    var i = 0;

    /**
     * @type {!number}
     */
    var l = links.length;

    for (; i < l; i++) {
        /**
         * @type {!theEliteGames.models.Link}
         */
        var link = links[i];

        /**
         * @type {!string}
         */
        var storeImg = this.getStoreImg_(link['store']);

        /**
         * @type {!string}
         */
        var backgroundImage = 'background-image: url("../img/stores/' + storeImg + '");';

        /**
         * @type {!theEliteGames.elements.Link}
         */
        var storeLink = new theEliteGames.elements.Link(link['url'], '_blank');

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
        storeIcon.setAttribute('style', backgroundImage);

        storeIcon.appendChild(externalLinkIcon);
        storeLink.appendChild(storeIcon);
        storesBlock.appendChild(storeLink);
    }

    return storesBlock;
};


/**
 * @private
 */
theEliteGames.elements.Game.prototype.onIconClickCallback_ = function(e) {
    this.onIconClick(this.game_);
};


/**
 * @param {!string} storeName
 * @private
 */
theEliteGames.elements.Game.prototype.getStoreImg_ = function(storeName) {

    /**
     * @type {!string}
     */
    var retVal = '';

    /**
     * @type {!number}
     */
    var i = 0;

    /**
     * @type {!number}
     */
    var l = this.stores_.length;

    for(; i < l; i++) {
        /**
         * @type {!theEliteGames.models.Store}
         */
        var store = this.stores_[i];

        if (store['name'] === storeName) {
            retVal = store['icon'];
            i = l;
        }
    }

    return retVal;
};


/**
 * @type {!function(!theEliteGames.models.Game)}
 */
theEliteGames.elements.Game.prototype.onIconClick = goog.nullFunction;
