/**
 * Created by guoxiangyu on 16/5/14.
 */

var Context = require('../../model/vo/Context.js');
var ContextProxy = require('../../model/proxy/ContextProxy.js');
var Layer1 = require('../../view/component/Layer1.js');
var Layer1Mediator = require('../../view/mediator/Layer1Mediator.js');
var Layer2 = require('../../view/component/Layer2.js');
var Layer2Mediator = require('../../view/mediator/Layer2Mediator.js');
var Layer3 = require('../../view/component/Layer3.js');
var Layer3Mediator = require('../../view/mediator/Layer3Mediator.js');
var Layer4 = require('../../view/component/Layer4.js');
var Layer4Mediator = require('../../view/mediator/Layer4Mediator.js');


var Scene1 = cc.Scene.extend({
    ctor: function () {
        this._super();

        var size = cc.winSize;
        var contextProxy = cc.facade.retrieveProxy(ContextProxy.NAME);

        var addLayerBtn = new ccui.Button(res.HelloWorld_png);
        addLayerBtn.addClickEventListener(function () {
            cc.log('add layer button click');

            var idx = Math.random() * 4 | 0;
            var context = new Context();
            context.mediatorClass = [Layer1Mediator, Layer2Mediator, Layer3Mediator, Layer4Mediator][idx];
            context.viewComponentClass = [Layer1, Layer2, Layer3, Layer4][idx];
            context.parent = contextProxy.getCurrentContext();
            context.data = {layerId: Math.random() * 10 | 0};

            cc.facade.sendNotification('LoadContextCommand', context);
        });
        addLayerBtn.setTitleText('Add layer');
        addLayerBtn.setTitleFontSize(30);
        addLayerBtn.attr({
            x: size.width / 4,
            y: size.height / 2
        });
        this.addChild(addLayerBtn);

        var removeLayerBtn = new ccui.Button(res.HelloWorld_png);
        removeLayerBtn.addClickEventListener(function () {
            cc.log('remove layer button click');

            var idx = Math.random() * 4 | 0;
            var mediatorClass = [Layer1Mediator, Layer2Mediator, Layer3Mediator, Layer4Mediator][idx];
            cc.log('remove ' + mediatorClass.NAME);
            var mediator = cc.facade.retrieveMediator(mediatorClass.NAME);
            if (mediator) {
                cc.facade.sendNotification('RemoveContextCommand', mediator.context);
            }
        });
        removeLayerBtn.setTitleText('Remove layer');
        removeLayerBtn.setTitleFontSize(30);
        removeLayerBtn.attr({
            x: size.width * 3 / 4,
            y: size.height / 2
        });
        this.addChild(removeLayerBtn);
    },

    onEnter:function () {
        this._super();
    }
});

module.exports = Scene1;