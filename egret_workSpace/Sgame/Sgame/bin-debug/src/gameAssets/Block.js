var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by Saco on 2014/7/30.
 */
var Block = (function (_super) {
    __extends(Block, _super);
    function Block() {
        _super.call(this);
        this.width = GameConfig.BLOCK_WIDTH;
        this.height = GameConfig.BLOCK_WIDTH;
        this.initImg();
        this.getRandomColor();
        this.touchEnabled = false;
        this.touchChildren = false;
    }
    Block.prototype.getRandomColor = function (type) {
        this.type = (type != null) ? type : Math.floor(Math.random() * GameSettings.CURR_COLORS);
        this._img.texture = RES.getRes("imgs.block" + this.type);
        this._img.fillMode = egret.BitmapFillMode.SCALE;
    };
    Block.prototype.initImg = function () {
        this._img = new egret.Bitmap();
        this.addChild(this._img);
    };
    Block.prototype.resetColor = function (type) {
        if (type != null)
            this.getRandomColor(type);
        else
            this.getRandomColor();
    };
    Block.prototype.blast = function () {
        egret.Tween.removeTweens(this);
        this._targetX = this.x - 8;
        this._targetY = this.y - 8;
        egret.Tween.get(this).to({ scaleX: 1.2, scaleY: 1.2, alpha: 0, x: this._targetX, y: this._targetY }, 300).call(function () {
            this.parent.removeChild(this);
            EventCenter.dispatchEvent(new GameEvent(GameEvent.COLLECT_BLOCK, this));
        }, this);
    };
    Block.prototype.playFadeInAnimation = function () {
        egret.Tween.removeTweens(this);
        this._targetX = this.x;
        this._targetY = this.y;
        this.alpha = 0;
        this.scaleX = 0;
        this.scaleY = 0;
        this.x = this.x + GameConfig.BLOCK_WIDTH / 2;
        this.y = this.y + GameConfig.BLOCK_WIDTH / 2;
        egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, alpha: 1, x: this._targetX, y: this._targetY }, 300);
    };
    Block.prototype.reset = function () {
        this.resetColor();
        this.resetProperty();
    };
    Block.prototype.resetProperty = function () {
        this.scaleX = 1;
        this.scaleY = 1;
        this.alpha = 1;
    };
    return Block;
})(egret.Sprite);
Block.prototype.__class__ = "Block";
