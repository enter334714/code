var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by Administrator on 2014/12/15.
 */
var Demo2 = (function (_super) {
    __extends(Demo2, _super);
    function Demo2() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.load, this);
    }
    Demo2.prototype.load = function () {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
        RES.loadGroup("preload");
    };
    Demo2.prototype.onResComplete = function () {
        this.logo = new egret.Bitmap();
        this.logo.texture = RES.getRes("egretIcon");
        this.addChild(this.logo);
        this.starAnimation();
    };
    Demo2.prototype.starAnimation = function () {
        var tw = egret.Tween.get(this.logo);
        tw.to({ x: 280, y: 0 }, 500).to({ x: 280, y: 300 }, 500).to({ x: 0, y: 300 }, 500).to({ x: 0, y: 0 }, 500);
        tw.call(this.starAnimation, this);
    };
    return Demo2;
})(egret.DisplayObjectContainer);
Demo2.prototype.__class__ = "Demo2";
