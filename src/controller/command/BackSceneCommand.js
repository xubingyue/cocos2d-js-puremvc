/**
 * Created by guoxiangyu on 16/5/14.
 */
"use strict";

var puremvc = require('puremvc').puremvc;
var ContextProxy = require('../../model/proxy/ContextProxy.js');

module.exports = puremvc.define
(
    // CLASS INFO
    {
        name: 'controller.command.BackSceneCommand',
        parent:puremvc.SimpleCommand
    },
    // INSTANCE MEMBERS
    {
        /** @override */
        execute: function (notification)
        {
            cc.log('BackSceneCommand execute');

            var context = notification.getBody();

            cc.assert(context, 'context should be undefined');
            cc.assert(context instanceof Context, 'should be an instance of context');

            var contextProxy = cc.facade.retrieveProxy(ContextProxy.NAME);
            var previousContext = contextProxy.getPreviousContext();
            if (!previousContext) return;


            var currentContext = contextProxy.getCurrentContext();
        }
    },
    // STATIC MEMBERS
    {
        NAME: 'BackSceneCommand'
    }
);
