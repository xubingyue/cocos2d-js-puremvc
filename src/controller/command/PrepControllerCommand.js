/**
 * Created by guoxiangyu on 15/11/20.
 */
"use strict";

var puremvc = require('puremvc').puremvc;
var LoadContextCommand = require('./LoadContextCommand.js');
var RemoveLayerCommand = require('./RemoveLayerCommand.js');
var BackSceneCommand = require('./BackSceneCommand.js');
var StartGameCommand = require('./StartGameCommand.js');

module.exports = puremvc.define
(
    // CLASS INFO
    {
        name: 'controller.command.PrepControllerCommand',
        parent:puremvc.SimpleCommand
    },
    // INSTANCE MEMBERS
    {
        /** @override */
        execute: function (notification)
        {
            cc.log('PrepControllerCommand execute');

            this.facade.registerCommand('LoadContextCommand', LoadContextCommand);
            this.facade.registerCommand('RemoveLayerCommand', RemoveLayerCommand);
            this.facade.registerCommand('BackSceneCommand', BackSceneCommand);
            this.facade.registerCommand('StartGameCommand', StartGameCommand);
        }
    },
    // STATIC MEMBERS
    {
        NAME: 'PrepControllerCommand'
    }
);
