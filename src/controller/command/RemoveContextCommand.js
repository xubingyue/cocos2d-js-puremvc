/**
 * Created by guoxiangyu on 16/5/14.
 */
"use strict";

var puremvc = require('puremvc').puremvc;
var Context = require('../../model/vo/Context.js');
var ContextProxy = require('../../model/proxy/ContextProxy.js');

module.exports = puremvc.define
(
    // CLASS INFO
    {
        name: 'controller.command.RemoveContextCommand',
        parent:puremvc.SimpleCommand
    },
    // INSTANCE MEMBERS
    {
        /** @override */
        execute: function (notification)
        {
            cc.log('RemoveContextCommand execute');

            var context = notification.getBody();

            cc.assert(context, 'context should be undefined');
            cc.assert(context instanceof Context, 'should be an instance of context');

            var parentContext = context.parent;
            if (!parentContext) return;

            // 移除所有子节点
            for (var i = 0; i < context.children.length; ++i) {
                cc.facade.sendNotification('RemoveContextCommand', context.children[i]);
            }

            // Context从父节点移除
            for (var i = 0; i < parentContext.children.length; ++i) {
                var child = parentContext.children[i];
                if (child.mediatorClass.NAME === context.mediatorClass.NAME) {
                    parentContext.children.splice(i, 1);
                    break;
                }
            }

            // ViewComponent从父节点移除
            var mediator = cc.facade.retrieveMediator(context.mediatorClass.NAME);
            if (mediator) {
                if (mediator.getViewComponent()) {
                    mediator.getViewComponent().removeFromParent(true);
                }
                cc.facade.removeMediator(context.mediatorClass.NAME);
            }
        }
    },
    // STATIC MEMBERS
    {
        NAME: 'RemoveContextCommand'
    }
);
