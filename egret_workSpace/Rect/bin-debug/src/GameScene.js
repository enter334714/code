var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by Administrator on 2014-12-31.
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
        this.hpSub = 1;
        this.initUi();
    }
    GameScene.prototype.initUi = function () {
        var returnSceneBtn = new egret.Bitmap(RES.getRes("return"));
        returnSceneBtn.touchEnabled = true;
        this.addChild(returnSceneBtn);
        returnSceneBtn.x = 360;
        returnSceneBtn.y = 10;
        returnSceneBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.returnScene, this);
        this.stageW = egret.MainContext.instance.stage.stageWidth;
        var total_score = new egret.Bitmap(RES.getRes("total_score"));
        this.addChild(total_score);
        total_score.x = 10;
        total_score.y = 20;
        this.score = new NumContainer("y");
        this.addChild(this.score);
        this.score.x = 90;
        this.score.y = 20;
        this.score.num = 0;
    };
    GameScene.prototype.startGame1 = function (e) {
        console.log("游戏准备1");
    };
    GameScene.prototype.startGame2 = function (e) {
        console.log("游戏准备2");
    };
    GameScene.prototype.returnScene = function (e) {
        this.dispatchEventWith("returnSence");
    };
    return GameScene;
})(egret.DisplayObjectContainer);
GameScene.prototype.__class__ = "GameScene";
