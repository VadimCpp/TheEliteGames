/**
 * Copyright (c) 2016-2018 Vadim Cpp
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

goog.provide('theEliteGames.elements.Link');

goog.require('theEliteGames.elements.Base');



/**
 * @param {?string=} opt_url
 * @param {?string=} opt_target
 *
 * @constructor
 * @extends {theEliteGames.elements.Base}
 */
theEliteGames.elements.Link = function(opt_url, opt_target) {
    theEliteGames.elements.Base.call(this, 'a');

    /**
     * @type {!string}
     * @private
     */
    this.url_ = opt_url ? opt_url : 'javascript:void(0);';

    /**
     * @type {!string}
     * @private
     */
    this.target_ = opt_target ? opt_target : '_self';

    this.setAttribute('href', this.url_);
    this.setAttribute('target', this.target_);

};
goog.inherits(theEliteGames.elements.Link, theEliteGames.elements.Base);
