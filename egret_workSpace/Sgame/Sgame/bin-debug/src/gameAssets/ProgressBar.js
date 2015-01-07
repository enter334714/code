var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by Saco on 2014/8/17.
 */
var ProgressBar = (function (_super) {
    __extends(ProgressBar, _super);
    function ProgressBar(width) {
        _super.call(this);
        this._progress = 100;
        this._barMaxWidth = width;
        this.initSkin();
    }
    ProgressBar.prototype.initSkin = function () {
        this._bar = new egret.Shape();
        this._bar.graphics.beginFill(0xe0556d);
        this._bar.graphics.drawRect(2, 2, 476, 6);
        this._bar.graphics.endFill();
        this._barMask = new egret.Rectangle(0, 0, 476, 10);
        this._barBg = new egret.Shape();
        this._barBg.graphics.beginFill(0xffffff);
        this._barBg.graphics.drawRect(0, 0, 480, 10);
        this._barBg.graphics.endFill();
        this.addChild(this._barBg);
        this.addChild(this._bar);
        this._bar.mask = this._barMask;
    };
    /*如果有para2的话，进度为para1/para2*100%，否则按para1为百分数para1%*/
    ProgressBar.prototype.setProgress = function (para1, para2) {
        var pro;
        if (para2)
            pro = Math.round(para1 / para2 * 100);
        else
            pro = para1;
        if (pro > 100)
            pro = 100;
        if (pro < 0)
            pro = 0;
        this._progress = pro;
        this.updateProgress();
    };
    ProgressBar.prototype.updateProgress = function () {
        egret.Tween.removeTweens(this._bar);
        egret.Tween.get(this._barMask).to({ width: 476 * this._progress / 100 }, 1000);
    };
    ProgressBar.prototype.reset = function () {
        this._progress = 100;
    };
    ProgressBar.prototype.getProgress = function () {
        return this._progress;
    };
    return ProgressBar;
})(egret.DisplayObjectContainer);
ProgressBar.prototype.__class__ = "ProgressBar";
