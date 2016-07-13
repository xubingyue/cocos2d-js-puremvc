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

            // 判断是否mediator已经存在，存在则删除该mediator之前的所有mediator
            var mediator = cc.facade.retrieveMediator(context.mediatorClass.NAME);
            if (mediator && context.parent) {
                for (var i = 0; i < context.parent.children; ++i) {
                    var child = context.parent.children[i];
                    if (child.mediatorClass.NAME === context.mediatorClass.NAME) {
                        for (var j = 0; j <= i; ++j) {
                            var childMediator = cc.facade.retrieveMediator(child.mediatorClass.NAME);
                            if (childMediator.getViewComponent()) {
                                childMediator.getViewComponent().removeFromParent(true);
                            }
                        }
                        context.parent.children.splice(0, i);
                        break;
                    }
                }
            }

            // 获取/创建viewComponent
            mediator = new context.mediatorClass();
            mediator.setViewComponent(new context.viewComponentClass(context.data));
            cc.facade.registerMediator(mediator);

            // 加载子控件
            for (var i = 0; i < context.children.length; ++i) {
                context.children[i].parent = context;
                cc.facade.sendNotification('LoadContextCommand', context.children[i]);
            }

            var contextProxy = cc.facade.retrieveProxy(ContextProxy.NAME);
            var isScene = viewComponent instanceof cc.Scene;
            if (isScene) {
                // 更换场景需要多传入更换类型参数
                var type = notification.getType();
                if (type === Constant.Change_Scene_Type.Push) {
                    contextProxy.pushContext(context);
                    cc.director.pushScene(viewComponent);
                } else if (type === Constant.Change_Scene_Type.Replace) {
                    // 替换场景，清空context集合
                    contextProxy.cleanContext();
                    contextProxy.pushContext(context);
                    cc.director.runScene(viewComponent);
                }
            } else {
                // 获取父亲Context
                var parentContext = context.parent;
                //if (!parentContext) {
                //    parentContext = contextProxy.getCurrentContext();
                //    context.parent = parentContext;
                //}

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
