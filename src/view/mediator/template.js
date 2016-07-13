/**
 * Created by guoxiangyu on 15/12/24.
 */
"use strict";

var ref = require('ref');
var puremvc = require('puremvc').puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        name: 'view.mediator.IntroMediator',
        parent: ref.mvc.Mediator,
        constructor: function() {
            puremvc.Mediator.call(this, this.constructor.NAME);
        }

    },
    // INSTANCE MEMBERS
    {
        /** @override */
        listNotificationInterests: function () {
            return [];
        },

        /** @override */
        handleNotification: function (notification) {

        },

        /** @override */
        onRegister: function () {

        },

        /** @override */
        onRemove: function () {

        },

        destroy: function() {
            this.viewComponent = null;
        }
    },
    // STATIC MEMBERS
    {
        NAME: 'IntroMediator'
    }
);
