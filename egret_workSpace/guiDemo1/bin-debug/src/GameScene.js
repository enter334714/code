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
        var hpBg = new egret.Sprite();
        hpBg.graphics.lineStyle(1, 0xffffff);
        hpBg.graphics.beginFill(0xffffff);
        hpBg.graphics.drawRect(0, 0, this.stageW, 9);
        hpBg.graphics.endFill();
        hpBg.y = 73;
        this.addChild(hpBg);
        this.hpProgressBar = new egret.Sprite();
        this.hpProgressBar.width = this.stageW;
        this.hpProgressBar.height = 5;
        this.addChild(this.hpProgressBar);
        //this.hpProgressBar.x = 5;
        this.hpProgressBar.y = 75;
        this.drawHp();
        this.hpTimer = new egret.Timer(100);
        this.hpTimer.addEventListener(egret.TimerEvent.TIMER, this.hpPlay, this);
        //  this.startHpTimer();
        this.addEventListener("startGame", this.startGame, this);
        this.addEventListener("stopGame", this.stopGame, this);
    };
    GameScene.prototype.startGame = function (e) {
        console.log("游戏准备");
        this.createRect();
        //this.startHpTimer();
    };
    GameScene.prototype.stopGame = function (e) {
        this.stopHpTimer();
    };
    GameScene.prototype.drawHp = function () {
        this.hpProgressBar.graphics.clear();
        //  this.hpProgressBar.graphics.lineStyle(1,0xff0000);
        this.hpProgressBar.graphics.beginFill(0xff0000);
        this.hpProgressBar.graphics.drawRect(0, 0, this.stageW, 5);
        this.hpProgressBar.graphics.endFill();
        console.log("this.hpProgressBar.width:", this.hpProgressBar.width);
        this.stageW -= 1;
        //console.log("stagew:",egret.MainContext.instance.stage.stageWidth,this.hpProgressBar.width);
    };
    GameScene.prototype.createRect = function () {
        var i = 0;
        var j = 0;
        var re;
        for (i = 0; i < GameScene.row; i++) {
            GameScene.rectArr[i] = [];
            for (j = 0; j < GameScene.column; j++) {
                re = rect.Rect.produceRect("block" + (Math.random() * 7 ^ 0));
                GameScene.rectArr[i].push(re);
                this.addChild(re);
                re.y = 140 + i * (re.width + 2);
                re.x = 75 + j * (re.height + 2);
                re.anchorOffsetX = re.width / 2;
                re.anchorOffsetY = re.height / 2;
                re.scaleX = 0.5;
                re.scaleY = 0.5;
                egret.Tween.get(re).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut);
            }
        }
        console.log("gameSceneNumChildren:", this.numChildren);
        // var len:number = GameScene.rectArr.length;
        //  for(i=0;i<)
    };
    GameScene.prototype.startHpTimer = function () {
        this.hpTimer.reset();
        this.hpTimer.start();
    };
    GameScene.prototype.stopHpTimer = function () {
        this.hpTimer.stop();
    };
    GameScene.prototype.hpPlay = function (e) {
        if (this.stageW < 5) {
            this.stopHpTimer();
            this.hpProgressBar.graphics.clear();
        }
        this.drawHp();
    };
    GameScene.prototype.returnScene = function (e) {
        //  console.log("return;");
        // var len:number = GameScene.rectArr.length;
        var i = 0;
        //  var j:number = 0;
        var rect;
        for (i; i < GameScene.row; i++) {
            for (j = 0; j < GameScene.column; j++) {
                rect = GameScene.rectArr[i][j];
                console.log("rect:", i, j, GameScene.row);
                if (rect.parent) {
                    rect.parent.removeChild(rect);
                }
            }
        }
        this.dispatchEventWith("returnSence");
    };
    GameScene.column = 5;
    GameScene.row = 7;
    GameScene.rectArr = [[]];
    return GameScene;
})(egret.DisplayObjectContainer);
GameScene.prototype.__class__ = "GameScene";
