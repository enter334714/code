var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by Administrator on 2014-12-25.
 */
var EnterScene = (function (_super) {
    __extends(EnterScene, _super);
    function EnterScene() {
        _super.call(this);
        this.startPos = [[-80, 10], [-80, 10], [-80, 500], [480, 10]];
        this.endPos = [[50, 150, 0.8], [130, 150, 1.2], [210, 150, 1.2], [290, 150, 0.8]];
        this.targetIndex = -1;
        this.init();
    }
    EnterScene.prototype.init = function () {
        this.blocks = [];
        var block;
        var i = 0;
        for (; i < 4; i++) {
            block = rect.Rect.produceRect("block" + (i + 1));
            block.scale9Grid = new egret.Rectangle(9, 9, 1, 1);
            this.addChild(block);
            this.blocks.push(block);
        }
        this.swapChildren(this.blocks[1], this.blocks[2]);
        this.timer = new egret.Timer(1000, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.playAnimation, this);
        this.timer.stop();
        this.play();
        var logo = new egret.Bitmap(RES.getRes("logo"));
        logo.x = 120;
        logo.y = 100;
        this.addChild(logo);
        var easyBtn = new egret.Bitmap(RES.getRes("easy"));
        easyBtn.touchEnabled = true;
        this.addChild(easyBtn);
        easyBtn.x = 140;
        easyBtn.y = 253;
        easyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEasy, this);
        var hardBtn = new egret.Bitmap(RES.getRes("hard"));
        hardBtn.touchEnabled = true;
        this.addChild(hardBtn);
        hardBtn.x = 140;
        hardBtn.y = 323;
        hardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHard, this);
        var t = new egret.TextField();
        t.textColor = 0;
        t.text = "秋天：839982440（QQ）";
        this.addChild(t);
        t.x = 83;
        t.y = 433;
    };
    EnterScene.prototype.onTouchEasy = function (e) {
        this.dispatchEventWith("startGame1");
    };
    EnterScene.prototype.onTouchHard = function (e) {
        this.dispatchEventWith("startGame2");
    };
    EnterScene.prototype.play = function () {
        var i = 0;
        var block;
        for (; i < 4; i++) {
            block = this.blocks[i];
            //block.alpha = 0;
            block.x = this.startPos[i][0];
            block.y = this.startPos[i][1];
        }
        egret.Tween.get(this.blocks[0]).to({ x: 90, y: 92 }, 500, egret.Ease.backInOut);
        egret.Tween.get(this.blocks[1]).to({ x: 163, y: 75, scaleX: 1.3, scaleY: 1.3 }, 300, egret.Ease.backInOut);
        egret.Tween.get(this.blocks[2]).to({ x: 243, y: 85, scaleX: 1.2, scaleY: 1.2 }, 500, egret.Ease.backInOut);
        egret.Tween.get(this.blocks[3]).to({ x: 313, y: 90 }, 500, egret.Ease.backInOut).call(this.startTimer, this);
        //tween.to({scaleX:1.2*1,scaleY:1.2*1},500,egret.Ease.backIn).to({scaleX:1,scaleY:1},500,egret.Ease.backOut)
    };
    EnterScene.prototype.startTimer = function () {
        this.timer.reset();
        this.timer.start();
    };
    EnterScene.prototype.playAnimation = function () {
        var index = Math.random() * 4 ^ 0;
        if (this.targetIndex == index) {
            return;
        }
        this.targetIndex = index;
        var block = this.blocks[index];
        var scaX = block.scaleX;
        var scaY = block.scaleY;
        egret.Tween.get(block).to({ scaleX: scaX * 1.2, scaleY: 1.2 * scaY }, 500, egret.Ease.backIn).to({ scaleX: scaX, scaleY: scaY }, 500, egret.Ease.backOut);
    };
    EnterScene.prototype._setVisible = function (value) {
        if (this.visible == value)
            return;
        _super.prototype._setVisible.call(this, value);
        if (value == false) {
            this.timer.stop();
        }
        else {
            this.startTimer();
            this.play();
        }
    };
    return EnterScene;
})(egret.Sprite);
EnterScene.prototype.__class__ = "EnterScene";
