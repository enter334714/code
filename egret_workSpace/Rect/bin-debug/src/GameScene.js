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
        this.rectArr = [[]];
        this.clickArr = [[]];
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
        this.addEventListener("startGame1", this.startGame1, this);
        this.addEventListener("startGame2", this.startGame2, this);
        this.addEventListener("stopGame", this.stopGame, this);
    };
    GameScene.prototype.startGame1 = function (e) {
        console.log("游戏准备1");
        this.createRect(0);
        //this.startHpTimer();
    };
    GameScene.prototype.startGame2 = function (e) {
        console.log("游戏准备2");
        this.createRect(1);
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
    GameScene.prototype.createRect = function (type) {
        if (type === void 0) { type = 0; }
        var i = 0;
        var j = 0;
        var re;
        GameScene.type = type;
        for (i = 0; i < GameScene.column[GameScene.type]; i++) {
            this.rectArr[i] = [];
            this.clickArr[i] = [];
            for (j = 0; j < GameScene.row[GameScene.type]; j++) {
                re = this.getRect();
                this.rectArr[i].push(re);
                re.x = GameScene.beginPos[GameScene.type] + i * (re.height * GameScene.scaleArr[GameScene.type] + 1);
                re.y = 140 + j * (re.width * GameScene.scaleArr[GameScene.type] + 1);
                this.addChild(re);
                this.rectTween(re);
                var cRect = this.createClickRect();
                //cRect.name = i+j+"";
                cRect.x = GameScene.beginPos[GameScene.type] + i * (re.height * GameScene.scaleArr[GameScene.type] + 1);
                cRect.y = 140 + j * (re.width * GameScene.scaleArr[GameScene.type] + 1);
                cRect.name = i + "" + j;
                cRect.alpha = 0;
                this.clickArr[i].push(cRect);
                cRect.anchorOffsetX = 40;
                cRect.anchorOffsetY = 40;
                cRect.touchEnabled = true;
                cRect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
                this.addChild(cRect);
            }
        }
        console.log("gameSceneNumChildren:", this.numChildren);
    };
    GameScene.prototype.onTouch = function (e) {
        var index = e.target.name;
        var col = index.charAt(0);
        var row = index.charAt(1);
        var re = this.rectArr[col][row];
        this.rectArr[col].splice(row, 1);
        // this.rectArr[col].push(this.getRect());
        re.parent.removeChild(re);
        this.move(col, row, 1);
    };
    GameScene.prototype.move = function (col, row, index) {
        var arr = this.rectArr[col];
        var len = arr.length == 0 ? 0 : arr.length - 1;
        var i = len;
        var re;
        for (i; i >= 0; i--) {
            var re = arr[i];
            egret.Tween.get(arr[i]).to({ y: 140 + (GameScene.row[GameScene.type] - (len - i) - 1) * (re.width * GameScene.scaleArr[GameScene.type] + 1) }, 100);
        }
        console.log(col, row);
        var pRe = this.getRect();
        arr.unshift(pRe);
        pRe.x = GameScene.beginPos[GameScene.type] + col * (re.height * GameScene.scaleArr[GameScene.type] + 1);
        pRe.y = 140 + 0 * (re.width * GameScene.scaleArr[GameScene.type] + 1);
        this.addChild(pRe);
        this.rectTween(pRe);
    };
    GameScene.prototype.getRect = function () {
        var re = rect.Rect.produceRect("block" + (Math.random() * 7 ^ 0));
        re.anchorOffsetX = re.width / 2;
        re.anchorOffsetY = re.height / 2;
        re.scaleX = 0.5;
        re.scaleY = 0.5;
        return re;
    };
    GameScene.prototype.rectTween = function (re) {
        egret.Tween.get(re).to({ scaleX: GameScene.scaleArr[GameScene.type], scaleY: GameScene.scaleArr[GameScene.type] }, 300, egret.Ease.backOut);
    };
    GameScene.prototype.createClickRect = function () {
        var cRect = new egret.Sprite();
        cRect.graphics.beginFill(0xff0000);
        cRect.graphics.drawRoundRect(0, 0, 80, 80, 5, 5);
        cRect.width = cRect.height = 80;
        cRect.graphics.endFill();
        return cRect;
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
        var j = 0;
        var re;
        for (i; i < GameScene.column[GameScene.type]; i++) {
            for (j = 0; j < GameScene.row[GameScene.type]; j++) {
                re = this.rectArr[i][j];
                if (!rect)
                    return;
                //  console.log("rect:",i,j,GameScene.row);
                if (re.parent) {
                    re.parent.removeChild(re);
                }
                rect.Rect.reclaim(re, re.textureName);
                re = null;
            }
        }
        this.rectArr = [[]];
        this.clickArr = [[]];
        this.dispatchEventWith("returnSence");
    };
    GameScene.column = [5, 6];
    GameScene.row = [7, 8];
    GameScene.beginPos = [75, 55];
    GameScene.scaleArr = [1, .9];
    GameScene.type = 0;
    return GameScene;
})(egret.DisplayObjectContainer);
GameScene.prototype.__class__ = "GameScene";
