/**
 * Created by Saco on 2014/7/30.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
        this.initScoreZone();
        this.initBlockZone();
    }
    GameScene.prototype.initBg = function () {
        this._interactor = new egret.Bitmap();
        this._interactor.texture = RES.getRes("imgs.block1");
        this._interactor.alpha = 0;
        this._interactor.touchEnabled = true;
        this._blockZone.addChild(this._interactor);
    };
    GameScene.prototype.reposition = function () {
        var w = GameSettings.COLUMN * (GameConfig.BLOCK_WIDTH + GameConfig.BLOCK_MARGIN);
        var h = GameSettings.ROW * (GameConfig.BLOCK_WIDTH + GameConfig.BLOCK_MARGIN);
        this._interactor.width = w;
        this._interactor.height = h;
        if (this._blockZone.width > this.stage.stageWidth)
            this._blockZone.scaleX = this._blockZone.scaleY = (this.stage.stageWidth - 20) / w;
        else
            this._blockZone.scaleX = this._blockZone.scaleY = 1;
        this._blockZone.x = this.stage.stageWidth / 2 - w / 2 * this._blockZone.scaleX;
        this._returnBtn.x = this.stage.stageWidth - this._returnBtn.width;
        // console.log()
        // this.stage.stageWidth
        //egret.MainContext.instance.stage.stageWidth
    };
    GameScene.prototype.initBlockZone = function () {
        this._blockZone = new egret.DisplayObjectContainer();
        this._blockZone.y = GameConfig.TOP_MARGIN;
        this._blockZone.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.checkGeture, this);
        this.addChild(this._blockZone);
    };
    GameScene.prototype.checkGeture = function (e) {
        this._startIndex = this.getTouchIndexByPos(e.localX, e.localY);
        //两种模式分开处理
        if (GameSettings.TYPE == GameConfig.TYPE_3CLEAR) {
            this._touchStartX = e.localX;
            this._touchStartY = e.localY;
            this._blockZone.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        }
        else {
            this.onBlockClick(this._startIndex);
        }
    };
    GameScene.prototype.onTouchMove = function (e) {
        var towards;
        var isCanSwitch;
        if (this._touchStartX - e.localX > GameConfig.TOUCH_MOVE_LENGTH) {
            towards = "left";
        }
        else if (e.localX - this._touchStartX > GameConfig.TOUCH_MOVE_LENGTH) {
            towards = "right";
        }
        else if (e.localY - this._touchStartY > GameConfig.TOUCH_MOVE_LENGTH) {
            towards = "down";
        }
        else if (this._touchStartY - e.localY > GameConfig.TOUCH_MOVE_LENGTH) {
            towards = "up";
        }
        if (towards != undefined) {
            var towardIndex = RulesManager.i().getIndexByTowards(this._startIndex, towards);
            isCanSwitch = BlockManager.i().checkIfMoveCan3Clear(this._startIndex, towardIndex);
            BlockManager.i().switchIndex(this._startIndex, towardIndex, isCanSwitch);
            this._blockZone.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        }
    };
    GameScene.prototype.initScoreZone = function () {
        this._scoreZone = new egret.DisplayObjectContainer();
        this._scoreZone.x = 15;
        this._scoreZone.y = 15;
        this._gameScore = new GameScore();
        this._gameScore.resetScore();
        this._scoreZone.addChild(this._gameScore);
        this.addChild(this._scoreZone);
    };
    GameScene.prototype.onBlockClick = function (index) {
        console.log("click");
        var blastBlock = RulesManager.i().getSameBlocksNearby(index);
        var score = RulesManager.i().getScoreByBlockCount(blastBlock.length);
        var scoreType = RulesManager.i().getScoreType(blastBlock.length);
        var pos = BlockManager.i().getPosByIndex(index);
        this.showScore(score, scoreType, pos.x, pos.y);
        AchieveManager.i().recordData(blastBlock.length, BlockManager.i().getBlockByIndex(blastBlock[0]).type);
        BlockManager.i().blastBlocks(blastBlock);
        this._gameScore.addScore(blastBlock.length * score);
        this._timeProgress.changeTimeSpeed(RulesManager.i().getTimeSpeedChange(blastBlock.length));
    };
    GameScene.prototype.showScore = function (score, scoreType, x, y) {
        if (!this._showScore)
            this._showScore = BitmapNumber.i().createNumPic(score, scoreType);
        else
            BitmapNumber.i().changeNum(this._showScore, score, scoreType);
        this.jumpScore(x, y);
    };
    GameScene.prototype.jumpScore = function (x, y) {
        var scoreObj = this._showScore;
        scoreObj.x = x;
        scoreObj.y = y;
        var targetY = scoreObj.y - 80;
        this.addChild(scoreObj);
        egret.Tween.removeTweens(scoreObj);
        egret.Tween.get(scoreObj).to({ y: targetY }, 600, egret.Ease.cubicOut).call(function () {
            scoreObj.parent.removeChild(scoreObj);
        });
    };
    GameScene.prototype.getTouchIndexByPos = function (localX, localY) {
        return Math.floor(localX / (GameConfig.BLOCK_WIDTH + GameConfig.BLOCK_MARGIN)) + Math.floor(localY / (GameConfig.BLOCK_WIDTH + GameConfig.BLOCK_MARGIN)) * GameSettings.COLUMN;
    };
    GameScene.prototype.initUI = function () {
        this.initBg();
        this.initProgress();
        this.initBtn();
    };
    GameScene.prototype.initBtn = function () {
        this._returnBtn = new egret.Bitmap();
        this._returnBtn.y = 10;
        this._returnBtn.touchEnabled = true;
        this._returnBtn.texture = RES.getRes("imgs.return");
        this._returnBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.returnToMenu, this);
        this.addChild(this._returnBtn);
    };
    GameScene.prototype.returnToMenu = function (e) {
        this._timeProgress.stop();
        this.stopGame();
        EventCenter.dispatchEvent(new GameEvent(GameEvent.GAME_EVENT_GAMERESTART));
    };
    GameScene.prototype.initProgress = function () {
        this._timeProgress = new TimeProgress();
        this._timeProgress.getProgressBar().y = 70;
        this.addChild(this._timeProgress.getProgressBar());
    };
    GameScene.prototype.startGame = function (difficulty) {
        this._timeProgress.startCounting();
        this._gameScore.resetScore();
        this.setGameProperty(difficulty);
        this.createGameZone(difficulty);
        this.reposition();
    };
    GameScene.prototype.setGameProperty = function (difficulty) {
        GameSettings.TYPE = difficulty;
        GameSettings.COLUMN = GameConfig.TYPE_COLUMN[difficulty];
        GameSettings.ROW = GameConfig.TYPE_ROW[difficulty];
        GameSettings.CURR_COLORS = GameConfig.TYPE_COLOR_NUM[difficulty];
    };
    GameScene.prototype.createGameZone = function (difficulty) {
        BlockManager.i().setContainer(this._blockZone);
        BlockManager.i().resetData();
        BlockManager.i().fillBlocks();
        if (GameSettings.TYPE == GameConfig.TYPE_3CLEAR)
            BlockManager.i().check3Clear();
    };
    GameScene.prototype.gameOver = function () {
        this.showShareDialogue();
    };
    GameScene.prototype.showShareDialogue = function () {
    };
    GameScene.prototype.stopGame = function () {
    };
    return GameScene;
})(egret.Sprite);
GameScene.prototype.__class__ = "GameScene";
