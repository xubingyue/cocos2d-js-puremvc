/**
 * Created by admin on 16/3/13.
 */
"use strict";

var Context = cc.Class.extend({
    ctor: function (data) {
        this.mediatorClass = null;
        this.viewComponentClass = null;

        // viewComponent初始化数据，用于保存viewComponent状态
        this.data = data || {};

        this.parent = null;
        this.children = [];
    },

    addChild: function (context) {
        cc.assert(context instanceof Context, 'should be an instance of context');
        cc.assert(context.parent === null, 'context already has parent');

        context.parent = this;
        this.children.push(context);
    },

    removeChild: function (context) {
        cc.assert(context instanceof Context, 'should be an instance of context');

        for (var idx in this.children) {
            if (this.children[idx] === context) {
                context.parent = null;
                return this.children.splice(idx, 1);
            }
        }
    }
});

//Context.TYPE_SCENE = 1;
//Context.TYPE_LAYER = 2;

module.exports = Context;