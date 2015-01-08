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
        this.initBlockZone();
        this.initBg();
    };
    GameScene.prototype.initBg = function () {
        this._interactor = new egret.Bitmap();
        this._interactor.texture = RES.getRes("imgs.block1");
        this._interactor.alpha = 0;
        this._interactor.touchEnabled = true;
        this._rectZone.addChild(this._interactor);
    };
    GameScene.prototype.reposition = function () {
        var w = GameSetting.TYPE_COL * (GameConfig.BLOCK_WIDTH + GameConfig.BLOCK_MARGIN);
        var h = GameSetting.TYPE_ROW * (GameConfig.BLOCK_WIDTH + GameConfig.BLOCK_MARGIN);
        this._interactor.width = w;
        this._interactor.height = h;
        if (this._rectZone.width > this.stage.stageWidth)
            this._rectZone.scaleX = this._rectZone.scaleY = (this.stage.stageWidth - 20) / w;
        else
            this._rectZone.scaleX = this._rectZone.scaleY = 1;
        this._rectZone.x = this.stage.stageWidth / 2 - w / 2 * this._rectZone.scaleX;
        console.log("this._rectZone:", this._rectZone.width, "thisWidth:", this.stage.width);
        // this._returnBtn.x = this.stage.stageWidth - this._returnBtn.width;
        // console.log()
        // this.stage.stageWidth
        //egret.MainContext.instance.stage.stageWidth
    };
    GameScene.prototype.initBlockZone = function () {
        this._rectZone = new egret.DisplayObjectContainer();
        this._rectZone.y = GameConfig.TOP_MARGIN;
        this._rectZone.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this.addChild(this._rectZone);
    };
    GameScene.prototype.onTouch = function (e) {
        console.log(e.localX, e.localY);
        this.rectClick(this.getTouchIndexByPos(e.localX, e.localY));
    };
    GameScene.prototype.rectClick = function (index) {
        var rects = RectManager.instance().getSameBlocksNearby(index);
        console.log("(rects.length)*50:", (rects.length) * 50);
        this.score.num = this.score.num + rects.length * 50;
        RectManager.instance().boom(rects);
        // RectManager.instance()
    };
    GameScene.prototype.getTouchIndexByPos = function (localX, localY) {
        return Math.floor(localX / (GameConfig.BLOCK_WIDTH + GameConfig.BLOCK_MARGIN)) + Math.floor(localY / (GameConfig.BLOCK_WIDTH + GameConfig.BLOCK_MARGIN)) * GameSetting.TYPE_COL;
    };
    GameScene.prototype.startGame = function (type) {
        console.log("游戏准备" + type);
        this.score.num = 0;
        this.createGameZone(type);
        this.score.num = 0;
    };
    GameScene.prototype.createGameZone = function (type) {
        GameSetting.GAMETYPE = type;
        GameSetting.TYPE_COL = GameConfig.COLUMN[type];
        GameSetting.TYPE_ROW = GameConfig.ROW[type];
        RectManager.instance().resetData();
        RectManager.instance().setContainer(this._rectZone);
        RectManager.instance().fillRect();
        this.reposition();
        console.log(this._rectZone.width);
    };
    GameScene.prototype.returnScene = function (e) {
        this.dispatchEventWith("returnSence");
    };
    return GameScene;
})(egret.DisplayObjectContainer);
GameScene.prototype.__class__ = "GameScene";
