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

        if (responseJson) {

            /**
             * @type {?theEliteGames.models.Data}
             */
            var data = this.validateJsonData_(responseJson);

            console.warn(JSON.stringify(data));

            if (data) {
                this.loadData_(data);
            } else {
                // TODO: display error dialogue.
                console.error('TODO: display error dialogue');
            }

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
     * @type {!Array<!theEliteGames.models.Game>}
     */
    var games = data.games;

    /**
\     * @type {!Array<!theEliteGames.models.Store>}
     */
    var stores = data.stores;

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
 * @return {?theEliteGames.models.Data}
 * @private
 */
theEliteGames.blocks.Content.prototype.validateJsonData_ = function(json) {
    console.log('Content - validateJsonData_');
    /**
     * @type {?theEliteGames.models.Data}
     */
    var data = null;

    if (json instanceof Object) {

        console.log('Content - validateJsonData_ : json instanceof Object');

        /**
         * @type {?Array<!theEliteGames.models.Game>}
         */
        var games = null;

        /**
         * @type {?Array<!theEliteGames.models.Store>}
         */
        var stores = null;

        if (json.hasOwnProperty('games')) {
            games = this.validateJsonGames_(json['games']);
        } else {
            console.error('Games is not found.');
        }

        if (json.hasOwnProperty('stores')) {
            stores = this.validateJsonStores_(json['stores']);
        } else {
            console.error('Stores is not found.');
        }
        console.log('Content - validateJsonData_ : stores = ' + JSON.stringify(stores));
        if (!!games && !!stores) {

            data = new theEliteGames.models.Data();
            data.games = games;
            data.stores = stores;
        }
    } else {
        console.error('The global object expect to be Object');
    }

    return data;
};


/**
 * @param {?Object|undefined} json
 * @return {?Array<!theEliteGames.models.Game>}
 * @private
 */
theEliteGames.blocks.Content.prototype.validateJsonGames_ = function(json) {

    /**
     * @type {?Array<!theEliteGames.models.Game>}
     */
    var games = null;

    if (json instanceof Array) {

        /**
         * @type {!number}
         */
        var i = 0;

        /**
         * @type {!number}
         */
        var l = json.length;
        if (l) {

            games = [];

            for (; i < l; i++) {

                /**
                 * @type {?theEliteGames.models.Game}
                 */
                var game = this.validateJsonGame_(json[i]);

                if (game) {
                    games.push(game);
                } else {
                    games = null;
                    break;
                }
            }
        }
    } else {
        console.error('Games property expected to be an Array');
    }

    return games;
};


/**
 * @param {?Object|undefined} json
 * @return {?Array<!theEliteGames.models.Store>}
 * @private
 */
theEliteGames.blocks.Content.prototype.validateJsonStores_ = function(json) {

    console.log('Content - validateJsonStores_ : json = ' + JSON.stringify(json));

    /**
     * @type {?Array<!theEliteGames.models.Store>}
     */
    var stores = null;

    if (json instanceof Array) {

        /**
         * @type {!number}
         */
        var i = 0;

        /**
         * @type {!number}
         */
        var l = json.length;

        console.log('Content - validateJsonStores_ : l = ' + l);

        stores = [];

        for (; i < l; i++) {

            /**
             * @type {?theEliteGames.models.Store}
             */
            var store = this.validateJsonStore_(json[i]);

            console.log('Content - validateJsonStores_ : store = ' + JSON.stringify(store));

            if (store) {
                stores.push(store);
            } else {
                stores = null;
                break;
            }
        }
    } else {
        console.error('Stores property expected to be an Array');
    }

    return stores;
};


/**
 * @param {?Object|undefined} json
 * @return {?theEliteGames.models.Game}
 * @private
 */
theEliteGames.blocks.Content.prototype.validateJsonGame_ = function(json) {

    /**
     * @type {?theEliteGames.models.Game}
     */
    var game = null;

    if (json instanceof Object) {

        /**
         * @type {?string}
         */
        var name = null;

        if (json.hasOwnProperty('name')) {
            name = json['name'];
        } else {
            console.error('Game object missed required field - name');
        }

        /**
         * @type {?string}
         */
        var type = null;

        if (json.hasOwnProperty('type')) {
            type = json['type'];
        } else {
            console.error('Game object missed required field - type');
        }

        /**
         * @type {?string}
         */
        var icon = null;

        if (json.hasOwnProperty('icon')) {
            icon = json['icon'];
        } else {
            console.error('Game object missed required field - icon');
        }

        /**
         * @type {!string|undefined}
         */
        var youtube = undefined;

        if (json.hasOwnProperty('youtube')) {
            youtube = json['youtube'];
        }

        /**
         * @type {!string|undefined}
         */
        var gameplayImage = undefined;

        if (json.hasOwnProperty('gameplayImage')) {
            gameplayImage = json['gameplayImage'];
        }

        /**
         * @type {?string}
         */
        var description = null;

        if (json.hasOwnProperty('description')) {
            description = json['description'];
        } else {
            console.error('Game object missed required field - description');
        }

        /**
         * @type {?Array<!theEliteGames.models.Link>}
         */
        var links = null;

        if (json.hasOwnProperty('description')) {
            links = this.validateJsonLinks_(json['links']);
        } else {
            console.error('Game object missed required field - links');
        }

        if (name && type && icon && description && links) {
            game = new theEliteGames.models.Game();
            game.name = name;
            game.type = type;
            game.icon = icon;
            game.youtube = youtube;
            game.gameplayImage = gameplayImage;
            game.description = description;
            game.links = links;
        }


    } else {
        console.error('Game property expected to be an Object');
    }

    return game;
};


/**
 * @param {?Object|undefined} json
 * @return {?Array<!theEliteGames.models.Link>}
 * @private
 */
theEliteGames.blocks.Content.prototype.validateJsonLinks_ = function(json) {

    /**
     * @type {?Array<!theEliteGames.models.Link>}
     */
    var links = null;

    if (json instanceof Array) {

        /**
         * @type {!number}
         */
        var i = 0;

        /**
         * @type {!number}
         */
        var l = json.length;
        if (l) {

            links = [];

            for (; i < l; i++) {

                /**
                 * @type {?theEliteGames.models.Link}
                 */
                var link = this.validateJsonLink_(json[i]);

                if (link) {
                    links.push(link);
                } else {
                    links = null;
                    break;
                }
            }
        }
    } else {
        console.error('Links property expected to be an Array');
    }

    return links;
};


/**
 * @param {?Object|undefined} json
 * @return {?theEliteGames.models.Link}
 * @private
 */
theEliteGames.blocks.Content.prototype.validateJsonLink_ = function(json) {

    /**
     * @type {?theEliteGames.models.Link}
     */
    var link = null;

    if (json instanceof Object) {

        /**
         * @type {?string}
         */
        var store = null;

        if (json.hasOwnProperty('store')) {
            store = json['store'];
        } else {
            console.error('Link object missed required field - store');
        }

        /**
         * @type {?string}
         */
        var url = null;

        if (json.hasOwnProperty('url')) {
            url = json['url'];
        } else {
            console.error('Link object missed required field - url');
        }

        if (store && url) {
            link = new theEliteGames.models.Link();
            link.store = store;
            link.url = url;
        }


    } else {
        console.error('Link property expected to be an Object');
    }

    return link;
};


/**
 * @param {?Object|undefined} json
 * @return {?theEliteGames.models.Store}
 * @private
 */
theEliteGames.blocks.Content.prototype.validateJsonStore_ = function(json) {

    console.log('Content - validateJsonStore_');
    console.log('Content - validateJsonStore_ : json = ' + JSON.stringify(json));

    /**
     * @type {?theEliteGames.models.Store}
     */
    var store = null;

    if (json instanceof Object) {

        /**
         * @type {?string}
         */
        var name = null;

        if (json.hasOwnProperty('name')) {
            name = json['name'];
        } else {
            console.error('Store object missed required field - name');
        }

        /**
         * @type {?string}
         */
        var icon = null;

        if (json.hasOwnProperty('icon')) {
            icon = json['icon'];
        } else {
            console.error('Store object missed required field - icon');
        }

        if (name && icon) {
            store = new theEliteGames.models.Store();
            store.name = name;
            store.icon = icon;
        }

    } else {
        console.error('Store property expected to be an Object');
    }

    return store;
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
