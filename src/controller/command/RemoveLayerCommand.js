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
        name: 'controller.command.RemoveLayerCommand',
        parent: puremvc.SimpleCommand
    },
    // INSTANCE MEMBERS
    {
        /** @override */
        execute: function (notification) {
            cc.log('RemoveLayerCommand execute');

            var context = notification.getBody();

            cc.assert(context, 'context should be undefined');
            cc.assert(context instanceof Context, 'should be an instance of context');

            var open = [context];
            var close = [];
            while (open.length !== 0) {
                var topContext = open.shift();
                close.push(topContext);

                for (var idx in topContext.children) {
                    open.push(topContext.children[idx]);
                }
            }

            if (context.parent) {
                context.parent.removeChild(context);
            } else {
                // do not remove root context
                close.shift();
            }

            // remove context tree
            while (close.length !== 0) {
                var lastContext = close.pop();
                var mediator = cc.facade.removeMediator(lastContext.mediatorClass.NAME);
                var viewComponent = mediator.getViewComponent();
                viewComponent.removeFromParent(true);
            }
        }
    },
    // STATIC MEMBERS
    {
        NAME: 'RemoveLayerCommand'
    }
);
