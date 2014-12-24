var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by Administrator on 2014-12-23.
 */
var TextureDemo = (function (_super) {
    __extends(TextureDemo, _super);
    function TextureDemo() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedHandler, this);
    }
    TextureDemo.prototype.onAddedHandler = function (e) {
        this.load();
        this.touchEnabled = true;
        this.touchChildren = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    TextureDemo.prototype.load = function () {
        egret.Profiler.getInstance().run();
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGroupComp, this);
        RES.loadConfig("resource/resource.json", "resource/");
        RES.loadGroup("assets");
        RES.loadGroup("shareGroup");
    };
    TextureDemo.prototype.onGroupComp = function (e) {
        // this.imgs = RES.getRes("imgs");
        //  this.loadOk = true;
        var img = rect.Rect.produceRect("block1");
        img.touchEnabled = true;
        this.addChild(img);
    };
    TextureDemo.prototype.onTouch = function (e) {
        console.log(e.target);
    };
    return TextureDemo;
})(egret.DisplayObjectContainer);
TextureDemo.prototype.__class__ = "TextureDemo";
