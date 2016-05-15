/**
 * Created by guoxiangyu on 16/5/14.
 */

var ref = require('ref');

var Layer1 = ref.views.BaseLayer.extend({
    _label: null,
    _button: null,
    _onClick: null,

    ctor: function (data) {
        this._super(data);

        this.createView();
        this.initByData();

        return true;
    },

    createView: function () {
        var self = this;
        var size = cc.winSize;

        var title = new ccui.Text("Scene" + SCENE, "Arial", 38);
        title.x = size.width / 2;
        title.y = size.height / 2 + 200;
        this.addChild(title);

        this._label = new cc.LabelTTF("0", "Arial", 38);
        this._label.x = size.width / 2;
        this._label.y = size.height / 2 - 200;
        this._label.zzzz = 10;
        this.addChild(this._label);

        this._button = new ccui.Button(res.YellowSquare_png);
        this._button.x = size.width / 2;
        this._button.y = size.height / 2;
        this._button.addClickEventListener(function () {
            self._onClick();
        });
        this.addChild(this._button);

        cc.log('ttttt:', this._label.zzzz);
    },

    initByData: function () {
        var data = this.getData();
        if (data.num) {
            this._label.setString(data.num);
        }
    }
});

module.exports = Layer1;