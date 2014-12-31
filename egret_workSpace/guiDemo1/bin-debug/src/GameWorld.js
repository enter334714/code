var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by Administrator on 2014-12-25.
 */
var GameWorld = (function (_super) {
    __extends(GameWorld, _super);
    //public static imgs:egret.SpriteSheet;
    function GameWorld() {
        _super.call(this);
        this.initBg();
        this.touchEnabled = true;
        //  this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTab,this);
    }
    GameWorld.prototype.onTab = function (e) {
        var num = Math.random() * 1000000 ^ 0;
        this.numContainer.num = num;
        // console.log(num);
    };
    GameWorld.prototype.initBg = function () {
        var bg = new egret.Bitmap(RES.getRes("bg"));
        this.addChild(bg);
    };
    GameWorld.prototype.init = function () {
        // GameWorld.imgs = RES.getRes("imgs");
        this.enterScene = new EnterScene();
        this.addChild(this.enterScene);
        this.enterScene.addEventListener("startGame1", this.startGame1, this);
        this.enterScene.addEventListener("startGame2", this.startGame2, this);
        this.gameScene = new GameScene();
        this.gameScene.visible = false;
        this.gameScene.addEventListener("returnSence", this.onReturn, this);
        this.addChild(this.gameScene);
        // this.numContainer = new NumContainer();
        //this.addChild(this.numContainer);
        // this.numContainer.num = 13435465;
    };
    GameWorld.prototype.startGame2 = function (e) {
        console.log("startGame2");
    };
    GameWorld.prototype.startGame1 = function (e) {
        console.log("startGame1_j");
        this.enterScene.visible = false;
        this.gameScene.visible = true;
    };
    GameWorld.prototype.onReturn = function (e) {
        console.log("returnScene_j");
        this.enterScene.visible = true;
        this.gameScene.visible = false;
        this.enterScene.visible = true;
    };
    return GameWorld;
})(egret.Sprite);
GameWorld.prototype.__class__ = "GameWorld";
