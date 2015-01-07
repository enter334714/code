var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by Saco on 2014/9/1.
 */
var ShareArrow = (function (_super) {
    __extends(ShareArrow, _super);
    function ShareArrow() {
        _super.call(this);
        this.initMask();
        this.initBm();
    }
    ShareArrow.prototype.initBm = function () {
        this._arrow = new egret.Bitmap();
        this.addChild(this._arrow);
    };
    ShareArrow.prototype.setImg = function () {
        this._arrow.texture = RES.getRes("arrow");
    };
    ShareArrow.prototype.initMask = function () {
        this._mask = new egret.Shape();
        this._mask.graphics.beginFill(0x000000, 0.5);
        this._mask.graphics.drawRect(0, 0, 480, 800);
        this._mask.graphics.endFill();
        this._mask.touchEnabled = true;
        this._mask.width = 480;
        this._mask.height = 800;
        this._mask.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.endGuide, this);
        this.addChild(this._mask);
    };
    ShareArrow.prototype.startGuide = function () {
        this._arrow.x = this.stage.stageWidth - this._arrow.width;
        this.startAnimation();
    };
    ShareArrow.prototype.endGuide = function (e) {
        egret.Tween.removeTweens(this._arrow);
        this._arrow.y = 0;
        if (this.parent)
            this.parent.removeChild(this);
    };
    ShareArrow.prototype.startAnimation = function () {
        egret.Tween.get(this._arrow, { loop: true }).to({ y: 30 }, 600).to({ y: 0 }, 600);
    };
    return ShareArrow;
})(egret.Sprite);
ShareArrow.prototype.__class__ = "ShareArrow";
