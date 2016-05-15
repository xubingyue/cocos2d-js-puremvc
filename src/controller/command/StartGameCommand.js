/**
 * Created by admin on 16/3/14.
 */
"use strict";

var puremvc = require('puremvc').puremvc;
var Layer1 = require('../../view/component/Layer1.js');
var Layer2 = require('../../view/component/Layer2.js');
var Scene1 = require('../../view/component/Scene1.js');
var Scene2 = require('../../view/component/Scene2.js');
var Layer1Mediator = require('../../view/mediator/Layer1Mediator.js');
var Layer2Mediator = require('../../view/mediator/Layer2Mediator.js');
var Scene1Mediator = require('../../view/mediator/Scene1Mediator.js');
var Scene2Mediator = require('../../view/mediator/Scene2Mediator.js');
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

            var childContent = new Context();
            childContent.viewComponentClass = Layer1;
            childContent.mediatorClass = Layer1Mediator;
            childContent.data = {num: 1};

            context.addChild(childContent);
            cc.facade.sendNotification('LoadContextCommand', context);

            //var layer2Context = new Context();
            //layer2Context.viewComponentClass = Layer2;
            //layer2Context.mediatorClass = Layer2Mediator;
            //layer2Context.data = {a0: 1000, b0: 2000};
            //cc.facade.sendNotification('LoadContextCommand', layer2Context);
            //
            //cc.facade.sendNotification('RemoveLayerCommand', layer2Context);

            //var childContent1 = new Context();
            //childContent1.viewComponentClass = Layer1;
            //childContent1.mediatorClass = Layer1Mediator;
            //childContent1.data = {a: 10000, b: 20000};
            //cc.facade.sendNotification('LoadContextCommand', childContent1);

        }
    },
    // STATIC MEMBERS
    {
        NAME: 'StartGameCommand'
    }
);