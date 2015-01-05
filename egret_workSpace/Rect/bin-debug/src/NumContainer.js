var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by Administrator on 2014-12-29.
 */
var NumContainer = (function (_super) {
    __extends(NumContainer, _super);
    function NumContainer(type) {
        this.numType = type;
        _super.call(this);
    }
    Object.defineProperty(NumContainer.prototype, "num", {
        set: function (num) {
            num = num ^ 0;
            var numStr = num.toString();
            var numLen = numStr.length;
            var index = numLen - this.numChildren; //正数为多余,要删除index个；负数为缺少，要增加index个；
            var i = 0;
            console.log("index:", index);
            for (i = 0; i < Math.abs(index); i++) {
                if (index < 0) {
                    var bmp = this.removeChildAt(i);
                    NumContainer.reclaimBitmap(bmp);
                }
                else {
                    this.addChild(NumContainer.produceBitmap());
                }
            }
            var childLen = this.numChildren;
            for (i = 0; i < childLen; i++) {
                var bmp = this.getChildAt(i);
                // console.log(numStr.substr(i,1));
                bmp.texture = RES.getRes(this.numType + numStr.substr(i, 1));
            }
            this.reposition();
        },
        enumerable: true,
        configurable: true
    });
    NumContainer.prototype.reposition = function () {
        var len = this.numChildren;
        var i = 0;
        var bmp;
        var lastX = 0;
        for (; i < len; i++) {
            bmp = this.getChildAt(i);
            bmp.x = lastX;
            lastX = bmp.width + bmp.x;
        }
    };
    NumContainer.produceBitmap = function () {
        if (NumContainer._imgPool.length > 0)
            return NumContainer._imgPool.shift();
        else
            return new egret.Bitmap;
    };
    NumContainer.reclaimBitmap = function (bitmap) {
        //  console.log("recla:",1);
        if (bitmap) {
            if (bitmap.parent)
                bitmap.parent.removeChild(bitmap);
            bitmap.texture = null;
            NumContainer._imgPool.push(bitmap);
            console.log("_imgPool:", NumContainer._imgPool.length);
        }
    };
    NumContainer._imgPool = [];
    return NumContainer;
})(egret.DisplayObjectContainer);
NumContainer.prototype.__class__ = "NumContainer";
