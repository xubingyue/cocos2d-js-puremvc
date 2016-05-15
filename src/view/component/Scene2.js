/**
 * Created by guoxiangyu on 16/5/14.
 */
var ControllerLayer = require('./ControllerLayer.js');

var Scene2 = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var layer = new ControllerLayer();
        this.addChild(layer, 1000);
    }
});

module.exports = Scene2;