var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by Saco on 2014/8/12.
 */
var GameScore = (function (_super) {
    __extends(GameScore, _super);
    function GameScore() {
        _super.call(this);
        this.init();
    }
    GameScore.prototype.init = function () {
        this._titleBm = new egret.Bitmap();
        this._titleBm.texture = RES.getRes("imgs.total_score");
        this.addChild(this._titleBm);
        this._scorePic = BitmapNumber.i().createNumPic(0, "y");
        this._scorePic.x = 80;
        this.addChild(this._scorePic);
    };
    GameScore.prototype.resetScore = function () {
        GameScore.score = 0;
        BitmapNumber.i().changeNum(this._scorePic, 0, "y");
    };
    GameScore.prototype.addScore = function (count) {
        GameScore.score += count;
        BitmapNumber.i().changeNum(this._scorePic, GameScore.score, "y");
    };
    return GameScore;
})(egret.DisplayObjectContainer);
GameScore.prototype.__class__ = "GameScore";
