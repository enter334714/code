var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by Saco on 2014/8/26.
 */
var GameShare = (function (_super) {
    __extends(GameShare, _super);
    function GameShare() {
        _super.call(this);
        this.init();
    }
    GameShare.prototype.setImg = function () {
        if (this._shareWnd)
            this._shareWnd.texture = RES.getRes("share");
        if (this._guideArrow)
            this._guideArrow.setImg();
    };
    GameShare.prototype.init = function () {
        this.initBm();
        this.initScore();
        this.initTF();
        this.initArrow();
        this.setDefaultShareData();
    };
    GameShare.prototype.initBm = function () {
        this._shareWnd = new HotspotBitmap();
        this._shareWnd.x = 22;
        this._shareWnd.y = 100;
        this.addChild(this._shareWnd);
        var rectReturn = new egret.Rectangle(0, 390, 210, 75);
        var rectShare = new egret.Rectangle(220, 390, 210, 75);
        this._shareWnd.addHotspotArea(rectReturn, this.returnToMenu, this);
        this._shareWnd.addHotspotArea(rectShare, this.share, this);
    };
    GameShare.prototype.initScore = function () {
        this._score = BitmapNumber.i().createNumPic(0, "y");
        this._score.y = 250;
        this.addChild(this._score);
    };
    GameShare.prototype.initTF = function () {
        this._achieveTF = new egret.TextField();
        this._achieveTF.x = 60;
        this._achieveTF.y = 320;
        this._achieveTF.width = 360;
        this._achieveTF.height = 180;
        this._achieveTF.textAlign = egret.HorizontalAlign.CENTER;
        this._achieveTF.size = 30;
        this._achieveTF.bold = true;
        this._achieveTF.lineSpacing = 10;
        this._achieveTF.fontFamily = "Microsoft YaHei";
        this._achieveTF.textColor = 0x545454;
        this.addChild(this._achieveTF);
    };
    GameShare.prototype.initArrow = function () {
        this._guideArrow = new ShareArrow();
    };
    GameShare.prototype.returnToMenu = function () {
        EventCenter.dispatchEvent(new GameEvent(GameEvent.GAME_EVENT_GAMERESTART));
    };
    GameShare.prototype.share = function () {
        return;
        /* var thisObj = this;
         this.addChild(this._guideArrow);
         this._guideArrow.startGuide();
         WeixinApi.ready(function(api:WeixinApi){
             var info:WeixinShareInfo = new WeixinShareInfo();
             info.title = "《消灭方块》我打了" + GameScore.score + "分，完全停不下来了!";
             info.desc = thisObj._achieve.others;
             info.link = "sgame.sinaapp.com";
             info.imgUrl = "http://sgame.sinaapp.com/resource/assets/icon.jpg";
             api.shareToFriend(info);
             api.shareToTimeline(info);
         });*/
    };
    GameShare.prototype.setDefaultShareData = function () {
        return;
        /* WeixinApi.ready(function(api:WeixinApi){
             var info:WeixinShareInfo = new WeixinShareInfo();
             info.title = "《消灭方块》轻松益智休闲小游戏";
             info.desc = "完全停不下来了，快来跟我一试高下";
             info.link = "sgame.sinaapp.com";
             info.imgUrl = "http://sgame.sinaapp.com/resource/assets/icon.jpg";
             api.shareToFriend(info);
             api.shareToTimeline(info);
         });*/
    };
    GameShare.prototype.showResult = function () {
        BitmapNumber.i().changeNum(this._score, GameScore.score, "y");
        this._score.x = (this.stage.stageWidth - this._score.width) / 2;
        this._achieve = AchieveManager.i().getTitle();
        this._achieveTF.text = this._achieve.self;
        this.playAmination();
    };
    GameShare.prototype.playAmination = function () {
        this._shareWnd.x = this._shareWnd.width / 4 - 11;
        this._shareWnd.y = this._shareWnd.height / 4 - 50;
        this._shareWnd.scaleX = 0.5;
        this._shareWnd.scaleY = 0.5;
        egret.Tween.get(this._shareWnd).to({ x: 22, y: 100, scaleX: 1, scaleY: 1 }, 800, egret.Ease.backOut);
    };
    return GameShare;
})(egret.Sprite);
GameShare.prototype.__class__ = "GameShare";
