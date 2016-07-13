/**
 * Created by guoxiangyu on 15/11/20.
 */
"use strict";

var puremvc = require('puremvc').puremvc;
var LoadContextCommand = require('./LoadContextCommand.js');
var RemoveContextCommand = require('./RemoveContextCommand.js');

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
            this.facade.registerCommand('RemoveContextCommand', RemoveContextCommand);
        }
    },
    // STATIC MEMBERS
    {
        NAME: 'PrepControllerCommand'
    }
);
