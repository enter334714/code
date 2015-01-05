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
        Rect.cacheRect = {};
        return Rect;
    })(egret.Bitmap);
    rect.Rect = Rect;
    Rect.prototype.__class__ = "rect.Rect";
})(rect || (rect = {}));
