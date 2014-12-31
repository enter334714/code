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
    //  private imgs:egret.SpriteSheet;
    // private loadOk:boolean;
    function TextureDemo() {
        _super.call(this);
        this.loadIndex = 0;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedHandler, this);
    }
    TextureDemo.prototype.onAddedHandler = function (e) {
        this.load();
        this.touchEnabled = true;
        this.touchChildren = true;
        //  this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this)
    };
    TextureDemo.prototype.load = function () {
        egret.Profiler.getInstance().run();
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    };
    TextureDemo.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onConfigComp, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("assets");
        RES.loadGroup("shareGroup");
    };
    TextureDemo.prototype.onConfigComp = function (e) {
        if (e.groupName == "assets" || e.groupName == "shareGroup") {
            this.loadIndex++;
        }
        console.log(this.loadIndex);
        if (this.loadIndex == 2) {
            this.gameWorld = new GameWorld();
            this.gameWorld.init();
            this.addChild(this.gameWorld);
        }
        //this.add
        /* var bm:egret.Bitmap = new egret.Bitmap();
         bm.texture = RES.getRes("g2");
         this.addChild(bm);*/
    };
    TextureDemo.prototype.onResourceProgress = function (e) {
        console.log(e.itemsLoaded, "/", e.itemsTotal);
    };
    return TextureDemo;
})(egret.DisplayObjectContainer);
TextureDemo.prototype.__class__ = "TextureDemo";
