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

goog.provide('theEliteGames.elements.Error');

goog.require('theEliteGames.elements.Base');
goog.require('theEliteGames.elements.Link');



/**
 * @param {!string=} opt_msg
 *
 * @constructor
 * @extends {theEliteGames.elements.Base}
 */
theEliteGames.elements.Error = function(opt_msg) {
    theEliteGames.elements.Base.call(this);
    this.addClassName(goog.getCssName('the-elite-games-elements-error'));
    this.addClassName(goog.getCssName('uk-width-small-1-1'));
    this.addClassName(goog.getCssName('uk-width-medium-1-2'));
    this.addClassName(goog.getCssName('uk-width-large-1-3'));
    this.addClassName(goog.getCssName('uk-align-center'));

    /**
     * @type {!string}
     */
    var errorMessage = opt_msg ? opt_msg : 'Unknown error :(';

    /**
     * @type {!theEliteGames.elements.Base}
     */
    var title = new theEliteGames.elements.Base();
    title.addClassName(goog.getCssName('title'));
    title.getMainElement().innerHTML = 'ERROR';

    /**
     * @type {!theEliteGames.elements.Base}
     */
    var message = new theEliteGames.elements.Base();
    message.addClassName(goog.getCssName('message'));
    message.getMainElement().innerHTML = errorMessage;

    this.appendChild(title);
    this.appendChild(message);

};
goog.inherits(theEliteGames.elements.Error, theEliteGames.elements.Base);
