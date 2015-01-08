var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by Administrator on 2014-12-24.
 */
var rect;
(function (rect) {
    //方块
    var Rect = (function (_super) {
        __extends(Rect, _super);
        function Rect(texture) {
            _super.call(this, texture);
            //this.anchorOffsetX = GameConfig.BLOCK_WIDTH/2;
            //this.
        }
        Rect.produceRect = function (textureName) {
            if (rect.Rect.cacheRect[textureName] == null)
                rect.Rect.cacheRect[textureName] = [];
            var dict = rect.Rect.cacheRect[textureName];
            var re;
            if (dict.length >= 1)
                re = dict.pop();
            else {
                var texture = RES.getRes(textureName);
                re = new rect.Rect(texture);
            }
            re.textureName = textureName;
            return re;
        };
        Rect.reclaim = function (re, textureName) {
            if (rect.Rect.cacheRect[textureName] == null) {
                rect.Rect.cacheRect[textureName] = [];
            }
            var dict = rect.Rect.cacheRect[textureName];
            if (dict.indexOf(re) == -1) {
                dict.push(re);
            }
        };
        Rect.prototype.boom = function () {
            egret.Tween.removeTweens(this);
            var targetX = this.x - 8;
            var targetY = this.y - 8;
            egret.Tween.get(this).to({ scaleX: 1.2, scaleY: 1.2, alpha: 0, x: targetX, y: targetY }, 300).call(function () {
                this.parent.removeChild(this);
                rect.Rect.reclaim(this, this.textureName);
            }, this);
        };
        Rect.prototype.resetProperty = function () {
            this.scaleX = 1;
            this.scaleY = 1;
            this.alpha = 1;
        };
        Rect.prototype.playFadeInAnimation = function () {
            egret.Tween.removeTweens(this);
            var targetX = this.x;
            var targetY = this.y;
            this.alpha = 0;
            this.scaleX = 0;
            this.scaleY = 0;
            this.x = this.x + GameConfig.BLOCK_WIDTH / 2;
            this.y = this.y + GameConfig.BLOCK_WIDTH / 2;
            egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, alpha: 1, x: targetX, y: targetY }, 300);
        };
        Rect.cacheRect = {};
        return Rect;
    })(egret.Bitmap);
    rect.Rect = Rect;
    Rect.prototype.__class__ = "rect.Rect";
})(rect || (rect = {}));
