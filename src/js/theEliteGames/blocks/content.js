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

goog.require('theEliteGames.elements.Base');


/**
 * @typedef {{title: !string}}
 */
theEliteGames.Game;


/**
 * @constructor
 * @extends {theEliteGames.elements.Base}
 */
theEliteGames.blocks.Content = function() {
    theEliteGames.elements.Base.call(this);
    this.addClassName(goog.getCssName('the-elite-games-blocks-content'));

    /**
     * @type {!Array<!theEliteGames.Game>}
     * @private
     */
    this.games_ = this.getGames_();

    /**
     * @type {!number}
     */
    var i = 0;

    /**
     * @type {!number}
     */
    var l = this.games_.length;

    for (; i < l; i++) {
        var gameElem = new theEliteGames.elements.Base();
        gameElem.addClassName(goog.getCssName('the-elite-games-game'));
        gameElem.getMainElement().innerHTML = this.games_[i].title;
        this.appendChild(gameElem);
    }
};
goog.inherits(theEliteGames.blocks.Content, theEliteGames.elements.Base);


/**
 * @returns {!Array<!theEliteGames.Game>}
 * @private
 */
theEliteGames.blocks.Content.prototype.getGames_ = function() {
    return [
        {
            'title' : 'Royal Offense'
        },
        {
            'title' : 'Royal Heroes'
        },
        {
            'title' : 'Royal Blacksmith'
        },
        {
            'title' : 'Mech Defender'
        },
        {
            'title' : 'Control Craft 2'
        },
        {
            'title' : 'Control Craft 3'
        },
        {
            'title' : 'Merlins Lab'
        },
        {
            'title' : 'Fly to the Moon!'
        },
        {
            'title' : 'Regulator'
        }
    ];
};
