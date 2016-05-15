/**
 * Created by admin on 16/5/15.
 */
'use strict';

var ref = require('ref');
var Context = require('../../model/vo/Context.js');
var Scene1 = require('./Scene1.js');
var Scene2 = require('./Scene2.js');
var Layer1 = require('./Layer1.js');
var Layer2 = require('./Layer2.js');
var Layer1Mediator = require('../mediator/Layer1Mediator.js');
var Layer2Mediator = require('../mediator/Layer2Mediator.js');
var Scene1Mediator = require('../mediator/Scene1Mediator.js');
var Scene2Mediator = require('../mediator/Scene2Mediator.js');

var ControllerLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        var size = cc.winSize;

        var _nextBtn = new ccui.Button(res.NextButton_png);
        _nextBtn.addClickEventListener(function () {
            //var context = new Context();
            //
            //var contextProxy = cc.facade.retrieveProxy(CONST.CONTEXT_PROXY);
            //var index = contextProxy.getContextCount() % 3 + 1;
            //cc.log('scene index:', index);

            //if (index === 1) {
            //    context.viewComponentClass = Scene1;
            //    context.mediatorClass = Scene1Mediator;
            //
            //    var childContent = new Context();
            //    childContent.viewComponentClass = Layer1;
            //    childContent.mediatorClass = Layer1Mediator;
            //    childContent.data = {num: Math.random() * 100 | 0};
            //
            //    context.addChild(childContent);
            //} else if (index === 2) {
            //    context.viewComponentClass = Scene2;
            //    context.mediatorClass = Scene2Mediator;
            //} else {
            //
            //}

            //cc.facade.sendNotification(CONST.LOAD_CONTEXT_COMMAND, context);

            ++SCENE;
            cc.facade.sendNotification('StartGameCommand');
        });
        _nextBtn.x = size.width - 100;
        _nextBtn.y = size.height / 2;
        this.addChild(_nextBtn);

        var _backBtn = new ccui.Button(res.BackButton_png);
        _backBtn.addClickEventListener(function () {
            if (SCENE > 1) --SCENE;
            cc.facade.sendNotification(CONST.BACK_SCENE_COMMAND);
        });
        _backBtn.x = 100;
        _backBtn.y = size.height / 2;
        this.addChild(_backBtn);

        return true;
    }
});

module.exports = ControllerLayer;