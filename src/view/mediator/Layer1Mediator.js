/**
 * Created by guoxiangyu on 16/5/14.
 */
"use strict";

var ref = require('ref');
var puremvc = require('puremvc').puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        name: 'view.mediator.Layer1Mediator',
        parent: puremvc.Mediator,
        constructor: function () {
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
            var viewComponent = this.getViewComponent();

            viewComponent._onClick = function () {
                var _data = viewComponent.getData();

                var str = viewComponent._label.getString();
                cc.log('ttttt:', viewComponent._label.zzzz);
                viewComponent._label.setString('');
                _data.num = Number(str) + 1;
                viewComponent._label.setString(String(_data.num));
            };
            //this.viewComponent.on('onClick', function () {
            //    var _data = this.getData();
            //
            //    var str = this._label.getString();
            //    _data.num = Number(str) + 1;
            //    this._label.setString(_data.num);
            //
            //}.bind(this.viewComponent));
        },

        /** @override */
        onRemove: function () {

        }
    },
    // STATIC MEMBERS
    {
        NAME: 'Layer1Mediator'
    }
);
