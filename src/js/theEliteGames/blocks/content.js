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
goog.require('theEliteGames.elements.Game');
goog.require('theEliteGames.models.Game');



/**
 * @constructor
 * @extends {theEliteGames.elements.Base}
 */
theEliteGames.blocks.Content = function() {
    theEliteGames.elements.Base.call(this);
    this.addClassName(goog.getCssName('the-elite-games-blocks-content'));

    /**
     * @type {!Array<!theEliteGames.models.Game>}
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
        var gameElem = new theEliteGames.elements.Game(this.games_[i]);
        this.appendChild(gameElem);
    }
};
goog.inherits(theEliteGames.blocks.Content, theEliteGames.elements.Base);


/**
 * @returns {!Array<!theEliteGames.models.Game>}
 * @private
 */
theEliteGames.blocks.Content.prototype.getGames_ = function() {
    return [
        {
            'title' : 'Royal Offense',
            'type' : 'STRATEGY',
            'description' : 'Royal Offense contains elements of role play: while fulfilling your orders, the heroes ' +
                            'improve their skills and talents, as well as earn cash to be spent on new equipment, we' +
                            'apons, and magical elixirs.',
            'iconClass' : goog.getCssName('img-icons-ro')
        },
        {
            'title' : 'Royal Heroes',
            'type' : 'STRATEGY',
            'description' : 'A land plagued by black magic and creatures that crawl out of the darkness. Once this w' +
                            'as a great kingdom. It could be great again. Hire an army of legendary heroes and battl' +
                            'e vast waves of monsters.',
            'iconClass' : goog.getCssName('img-icons-rh')
        },
        {
            'title' : 'Royal Blacksmith',
            'type' : 'SIM',
            'description' : 'Build your own royal Blacksmith. With blackjack and stuff. Soon on every devices.',
            'iconClass' : goog.getCssName('img-icons-bs')
        },
        {
            'title' : 'Mech Defender',
            'type' : 'STRATEGY',
            'description' : 'Pilot a Mech to defend your home from zombies. MechDefender is a next chapter in Hero T' +
                            'ower Defense series. With Tower and Weapons and new tricky maps.',
            'iconClass' : goog.getCssName('img-icons-md')
        },
        {
            'title' : 'Control Craft 2',
            'type' : 'STRATEGY',
            'description' : 'A fast thinking RTS game, with tactic capabilities and graphics in unique style. Take o' +
                            'ver the enemy colonies to battle your way through challenging levels that call for your' +
                            ' skill and wit. Upgrade your troop, pimp up your super weapons and smash enemies to sav' +
                            'e your Planet.',
            'iconClass' : goog.getCssName('img-icons-cc2')
        },
        {
            'title' : 'Control Craft 3',
            'type' : 'STRATEGY',
            'description' : 'Command your troops to attack enemy control points. Utilize a wide range of troops and ' +
                            'tactical abilities. During the heat of the battle, tactical decisions of when, where an' +
                            'd how to attack will win or lose you the war.',
            'iconClass' : goog.getCssName('img-icons-cc3')
        },
        {
            'title' : 'Merlins Lab',
            'type' : 'PUZZLE',
            'description' : 'Merlins Lab is an puzzle game in which you try to find the philosopher' + "'" + 's ston' +
                            'e. The closer you to final aim, the more points you score.',
            'iconClass' : goog.getCssName('img-icons-ml')
        },
        {
            'title' : 'Fly to the Moon!',
            'type' : 'ARCADE',
            'description' : 'One step at a time, your space program is taking off. Use the money earned from each la' +
                            'unch to upgrade your rocket. Grab all the powerups and fuel you can while heading for t' +
                            'he stratosphere. Avoid colliding with blimps, balloons and UFOs - they hurt! How fast c' +
                            'an you get to the moon?',
            'iconClass' : goog.getCssName('img-icons-mn')
        },
        {
            'title' : 'Regulator',
            'type' : 'PLATFOMER',
            'description' : '"Regulator" - an action/platformer in the style of metroidvania. The player searches th' +
                            'rough an underground base for world' + "'" + 's most dangerous terrorist leader, and it' +
                            's definitely not to reward him with candies and hugs.',
            'iconClass' : goog.getCssName('img-icons-r')
        }
    ];
};
