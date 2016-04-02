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

goog.provide('theEliteGames.elements.Base');

goog.require('goog.dom');



/**
 * @param {?string=} opt_tagName
 * @constructor
 */
theEliteGames.elements.Base = function(opt_tagName) {

    /**
     * @type {!string}
     * @private
     */
    this.tagName_ = opt_tagName ? opt_tagName : 'div';

    /**
     * @type {!Element}
     * @private
     */
    this.mainElem_ = goog.dom.createElement(this.tagName_);
};


/**
 * @return {!Element}
 * @public
 */
theEliteGames.elements.Base.prototype.getMainElement = function() {
    return this.mainElem_;
};


/**
 * @param {!theEliteGames.elements.Base} elem
 * @public
 */
theEliteGames.elements.Base.prototype.appendChild = function(elem) {
    this.mainElem_.appendChild(elem.getMainElement());
};


/**
 * @param {!theEliteGames.elements.Base} elem
 * @public
 */
theEliteGames.elements.Base.prototype.removeChild = function(elem) {
    this.mainElem_.removeChild(elem.getMainElement());
};


/**
 * @public
 */
theEliteGames.elements.Base.prototype.removeAllChildren = function() {
    //
    // http://stackoverflow.com/a/3955238/4222953
    //
    var node = this.getMainElement();
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
};


/**
 * @param {!string} className
 * @public
 */
theEliteGames.elements.Base.prototype.addClassName = function(className) {
    this.mainElem_.classList.add(className);
};


/**
 * @param {!string} className
 * @public
 */
theEliteGames.elements.Base.prototype.removeClassName = function(className) {
    this.mainElem_.classList.remove(className);
};


/**
 * @param {!string} name
 * @param {!string} value
 * @public
 */
theEliteGames.elements.Base.prototype.setAttribute = function(name, value) {
    this.mainElem_.setAttribute(name, value);
};


/**
 * @param {!string} name
 * @return {!string}
 * @public
 */
theEliteGames.elements.Base.prototype.getAttribute = function(name) {
    return this.mainElem_.getAttribute(name);
};
