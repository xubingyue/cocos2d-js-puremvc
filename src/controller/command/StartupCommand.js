/**
 * Created by guoxiangyu on 15/11/20.
 */
"use strict";

var puremvc = require('puremvc').puremvc;
var PrepModelCommand = require('./PrepModelCommand.js');
var PrepViewCommand = require('./PrepViewCommand.js');
var PrepControllerCommand = require('./PrepControllerCommand.js');
var StartGameCommand = require('./StartGameCommand.js');

module.exports = puremvc.define(
    // CLASS INFO
    {
        name: 'controller.command.StartupCommand',
        parent: puremvc.MacroCommand
    },
    // INSTANCE MEMBERS
    {
        /** @override */
        initializeMacroCommand: function (notification)
        {
            cc.log('startup command');
            this.addSubCommand(PrepModelCommand);
            this.addSubCommand(PrepViewCommand);
            this.addSubCommand(PrepControllerCommand);
            this.addSubCommand(StartGameCommand);
        }
    },
    // STATIC MEMBERS
    {
        NAME: 'StartupCommand'
    }
);