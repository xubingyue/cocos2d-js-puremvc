/**
 * Created by guoxiangyu on 16/5/14.
 */
"use strict";

var puremvc = require('puremvc').puremvc;

module.exports = puremvc.define
(
    // CLASS INFO
    {
        name: 'controller.command.BackSceneCommand',
        parent: puremvc.SimpleCommand
    },
    // INSTANCE MEMBERS
    {
        /** @override */
        execute: function (notification) {
            cc.log('BackSceneCommand execute');

            var contextProxy = cc.facade.retrieveProxy(CONST.CONTEXT_PROXY);
            if (contextProxy.getContextCount() > 1) {
                var curContext = contextProxy.popContext();
                var preContext = contextProxy.popContext();

                //preContext.
                cc.facade.sendNotification(CONST.LOAD_CONTEXT_COMMAND, preContext);
            }
        }
    },
    // STATIC MEMBERS
    {
        NAME: 'BackSceneCommand'
    }
);
