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
        console.log("bg");
    };
    GameWorld.prototype.init = function () {
        this.enterScene = new EnterScene();
        this.addChild(this.enterScene);
        this.enterScene.play();
        this.enterScene.startTimer();
        this.enterScene.addEventListener("startGame1", this.startGame1, this);
        this.enterScene.addEventListener("startGame2", this.startGame2, this);
        this.gameScene = new GameScene();
        this.gameScene.addEventListener("returnSence", this.onReturn, this);
        //   this.gameScene.init();
        //   this.gameScene.visible = false;
        //  this.addChild(this.gameScene);
        // this.numContainer = new NumContainer();
        //this.addChild(this.numContainer);
        // this.numContainer.num = 13435465;
    };
    GameWorld.prototype.startGame1 = function (e) {
        this.startGame(0);
    };
    GameWorld.prototype.startGame2 = function (e) {
        this.startGame(1);
    };
    GameWorld.prototype.startGame = function (gameType) {
        if (this.contains(this.enterScene)) {
            this.removeChild(this.enterScene);
            this.enterScene.stopTimer();
        }
        this.addChild(this.gameScene);
        this.gameScene.startGame(gameType);
        this.gameScene.dispatchEventWith("startGame" + gameType);
    };
    GameWorld.prototype.onReturn = function (e) {
        console.log("returnScene_j");
        if (this.contains(this.gameScene))
            this.removeChild(this.gameScene);
        this.addChild(this.enterScene);
        this.enterScene.startTimer();
        this.enterScene.play();
    };
    return GameWorld;
})(egret.Sprite);
GameWorld.prototype.__class__ = "GameWorld";
