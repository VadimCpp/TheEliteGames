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
goog.require('theEliteGames.models.Game');



/**
 * @param {!theEliteGames.models.Game} game
 *
 * @constructor
 * @extends {theEliteGames.elements.Base}
 */
theEliteGames.elements.Game = function(game) {
    theEliteGames.elements.Base.call(this);
    this.addClassName(goog.getCssName('the-elite-games-elements-game'));

    /**
     * @type {!theEliteGames.models.Game}
     * @private
     */
    this.game_ = game;




    ///**
    // * @type {!theEliteGames.elements.Base}
    // */
    //var title = new theEliteGames.elements.Base('div');
    //title.addClassName(goog.getCssName('title'));
    //title.getMainElement().innerHTML = this.game_.title;
    //
    ///**
    // * @type {!theEliteGames.elements.Base}
    // */
    //var description = new theEliteGames.elements.Base('div');
    //description.addClassName(goog.getCssName('description'));
    //
    ///**
    // * @type {/theEliteGames.elements.Base}
    // */
    //var descriptionText = new theEliteGames.elements.Base('span');
    //descriptionText.getMainElement().innerHTML = this.game_.description;
    //
    ///**
    // * @type {/theEliteGames.elements.Base}
    // */
    //var descriptionIcon = new theEliteGames.elements.Base();
    //descriptionIcon.addClassName(this.game_.iconClass);
    //
    //description.appendChild(descriptionIcon);
    //description.appendChild(descriptionText);

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
    title.getMainElement().innerHTML = this.game_.title;

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
    gameType.getMainElement().innerHTML = this.game_.type;

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
     * @type {!theEliteGames.elements.Base}
     */
    var icon = new theEliteGames.elements.Base('div');
    icon.addClassName(goog.getCssName('icon'));
    icon.addClassName(this.game_.iconClass);

    /**
     * @type {!theEliteGames.elements.Base}
     */
    var iconContainer = new theEliteGames.elements.Base('div');
    iconContainer.addClassName(goog.getCssName('icon-container'));
    iconContainer.appendChild(icon);

    /**
     * @type {!theEliteGames.elements.Base}
     */
    var description = new theEliteGames.elements.Base('div');
    description.addClassName(goog.getCssName('description'));
    description.getMainElement().innerHTML = this.game_.description;

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
    var storesBlock = new theEliteGames.elements.Base('div');
    storesBlock.addClassName(goog.getCssName('stores-block'));

    // TODO: implement

    return storesBlock;
};
