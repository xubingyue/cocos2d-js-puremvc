/**
 * Created by guoxiangyu on 16/5/14.
 */
"use strict";

var puremvc = require('puremvc').puremvc;
var Context = require('../../model/vo/Context.js');

module.exports = puremvc.define
(
    // CLASS INFO
    {
        name: 'controller.command.LoadContextCommand',
        parent: puremvc.SimpleCommand
    },
    // INSTANCE MEMBERS
    {
        /** @override */
        execute: function (notification) {
            cc.log('LoadContextCommand execute');

            var context = notification.getBody();

            cc.assert(context, 'context should be undefined');
            cc.assert(context instanceof Context, 'should be an instance of context');

            // 移除原来的mediator
            var mediator = cc.facade.retrieveMediator(context.mediatorClass.NAME);
            if (mediator) {
                if (mediator.getViewComponent()) {
                    mediator.getViewComponent().removeFromParent(true);
                }
                cc.facade.removeMediator(context.mediatorClass.NAME);
            }

            // 创建新的mediator
            mediator = new context.mediatorClass();
            mediator.context = context;

            // 创建viewComponent
            var viewComponent = new context.viewComponentClass(context.data);
            mediator.setViewComponent(viewComponent);

            cc.facade.registerMediator(mediator);

            // 加载子控件
            for (var i = 0; i < context.children.length; ++i) {
                context.children[i].parent = context;
                cc.facade.sendNotification('LoadContextCommand', context.children[i]);
            }

            var contextProxy = cc.facade.retrieveProxy(CONST.CONTEXT_PROXY);
            var isScene = viewComponent instanceof cc.Scene;
            if (isScene) {
                //
                contextProxy.pushContext(context);
                cc.director.runScene(viewComponent);
            } else {
                // 获取父亲Context
                var parentContext = context.parent;
                if (!parentContext) {
                    parentContext = contextProxy.getCurrentContext();
                    context.parent = parentContext;
                }

                // 添加到父节点
                var parentMediator = cc.facade.retrieveMediator(parentContext.mediatorClass.NAME);
                if (parentMediator && parentMediator.getViewComponent()) {
                    parentMediator.getViewComponent().addChild(viewComponent);
                }
            }
        }
    },
    // STATIC MEMBERS
    {
        NAME: 'LoadContextCommand'
    }
);
