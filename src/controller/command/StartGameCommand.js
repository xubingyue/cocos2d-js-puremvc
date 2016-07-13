/**
 * Created by admin on 16/3/14.
 */
"use strict";

var puremvc = require('puremvc').puremvc;
var Scene1 = require('../../view/component/Scene1.js');
var Scene1Mediator = require('../../view/mediator/Scene1Mediator.js');
var Context = require('../../model/vo/Context.js');

module.exports = puremvc.define(
    // CLASS INFO
    {
        name: 'controller.command.StartGameCommand',
        parent: puremvc.SimpleCommand
    },
    // INSTANCE MEMBERS
    {
        /** @override */
        execute: function (notification) {
            cc.log('start game');

            var context = new Context();
            context.viewComponentClass = Scene1;
            context.mediatorClass = Scene1Mediator;
            cc.facade.sendNotification('LoadContextCommand', context, Constant.Change_Scene_Type.Replace);
        }
    },
    // STATIC MEMBERS
    {
        NAME: 'StartGameCommand'
    }
);