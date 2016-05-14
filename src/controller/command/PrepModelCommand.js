/**
 * Created by guoxiangyu on 15/11/20.
 */
"use strict";

var puremvc = require('puremvc').puremvc;
var ContextProxy = require('../../model/proxy/ContextProxy.js');

module.exports = puremvc.define
(
    // CLASS INFO
    {
        name: 'controller.command.PrepModelCommand',
        parent: puremvc.SimpleCommand
    },
    // INSTANCE MEMBERS
    {
        /** @override */
        execute: function (notification) {
            cc.log('PrepModelCommand execute');

            this.facade.registerProxy(new ContextProxy());
        }
    },
    // STATIC MEMBERS
    {
        NAME: 'PrepModelCommand'
    }
);
