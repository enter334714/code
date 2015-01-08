/**
 * Created by Administrator on 2015-01-08.
 */
var RectManager = (function () {
    function RectManager() {
        this._rects = [];
        this._clearRects = [];
    }
    RectManager.prototype.resetData = function () {
        var re;
        for (var i = 0; i < this._rects.length; i++) {
            re = this._rects[i];
            if (re.parent) {
                re.parent.removeChild(re);
            }
        }
        this._rects = new Array(GameSetting.TYPE_COL * GameSetting.TYPE_ROW);
    };
    RectManager.prototype.addRectAt = function (index) {
        var rect = this.getNewRect();
        this._rects[index] = rect;
        var pos = this.getPosByIndex(index);
        // console.log(index);
        rect.x = pos.x;
        rect.y = pos.y;
        //  console.log(pos.x,pos.y)
        this._container.addChild(rect);
        rect.playFadeInAnimation();
    };
    RectManager.prototype.fillRect = function () {
        var leng = this._rects.length;
        for (var i = 0; i < leng; i++) {
            this.addRectAt(i);
        }
    };
    RectManager.prototype.getNewRect = function (type) {
        var re;
        if (type == null) {
            type = "block" + (Math.random() * 7 ^ 0);
        }
        re = rect.Rect.produceRect(type);
        return re;
    };
    RectManager.prototype.getPosByIndex = function (index) {
        var x = index % GameSetting.TYPE_COL * (GameConfig.BLOCK_WIDTH + GameConfig.BLOCK_MARGIN);
        var y = Math.floor(index / GameSetting.TYPE_COL) * (GameConfig.BLOCK_WIDTH + GameConfig.BLOCK_MARGIN);
        return new egret.Point(x, y);
    };
    RectManager.prototype.setContainer = function (box) {
        this._container = box;
    };
    RectManager.prototype.getSameBlocksNearby = function (index) {
        // var totalIndex:number = GameSetting.TYPE_ROW * GameSetting.TYPE_COL;
        //  var clearArr:number[] = [];
        var textureName = this.getRectByIndex(index).textureName;
        return this.checkRectAround(index, textureName).concat(index);
    };
    RectManager.prototype.getRectByIndex = function (index) {
        return this._rects[index];
    };
    RectManager.prototype.checkRectAround = function (index, textureName) {
        var arr = [];
        var arounds = this.getAroundIndex(index);
        var needCheck = arounds;
        var indexTemp;
        var rectChecked = [index];
        while (needCheck.length > 0) {
            indexTemp = needCheck.shift();
            if (rectChecked.indexOf(indexTemp) >= 0)
                continue;
            if (this.getRectByIndex(indexTemp).textureName == textureName) {
                arr.push(indexTemp);
                needCheck = needCheck.concat(this.getAroundIndex(indexTemp));
            }
            rectChecked.push(indexTemp);
        }
        //console.log("arrLength:",arr.length);
        return arr;
    };
    RectManager.prototype.getAroundIndex = function (index) {
        var arr = [];
        if (index - GameSetting.TYPE_COL >= 0)
            arr.push(index - GameSetting.TYPE_COL);
        if (index + GameSetting.TYPE_COL < GameSetting.TYPE_COL * GameSetting.TYPE_ROW)
            arr.push(index + GameSetting.TYPE_COL);
        if (index % GameSetting.TYPE_COL != 0)
            arr.push(index - 1);
        if ((index + 1) % GameSetting.TYPE_COL != 0)
            arr.push(index + 1);
        return arr;
    };
    RectManager.prototype.getDropIndex = function (indexs) {
        indexs = indexs.sort(function (t1, t2) {
            if (parseInt(t1) > parseInt(t2))
                return -1;
            else
                return 1;
        });
        var moveBlock = {};
        var tempIndex;
        for (var i = indexs.length - 1; i >= 0; i--) {
            tempIndex = indexs[i] - GameSetting.TYPE_COL;
            while (tempIndex >= 0) {
                if (indexs.indexOf(tempIndex) == -1 && this.getRectByIndex(tempIndex)) {
                    if (moveBlock[tempIndex]) {
                        moveBlock[tempIndex] += GameSetting.TYPE_COL;
                    }
                    else {
                        moveBlock[tempIndex] = tempIndex + GameSetting.TYPE_COL;
                    }
                }
                tempIndex -= GameSetting.TYPE_COL;
            }
        }
        return moveBlock;
    };
    RectManager.prototype.fillBoomRect = function () {
        var rect;
        while (this._clearRects.length) {
            //rect =
            this.addRectAt(this._clearRects.shift());
        }
    };
    RectManager.prototype.dropBlocks = function (dropRects, boomRect) {
        var dropArr = this.rankRect(dropRects);
        //  console.log("dropArr:",dropArr);
        var pos;
        var toArr = [];
        for (var i = 0; i < dropArr.length; i++) {
            pos = this.getPosByIndex(dropArr[i].to);
            //console.log("to:",dropArr[i].to)
            this._rects[dropArr[i].to] = this._rects[dropArr[i].from];
            //  console.log("to:",dropArr[i].to)
            this._rects[dropArr[i].from] = null;
            //  console.log("to:",dropArr[i].to)
            this._clearRects.push(dropArr[i].from);
            //  console.log("to:",dropArr[i].to)
            toArr.push(dropArr[i].to);
            this._rects[dropArr[i].to].resetProperty();
            egret.Tween.removeTweens(this._rects[dropArr[i].to]);
            egret.Tween.get(this._rects[dropArr[i].to]).to({ x: pos.x, y: pos.y }, 150);
        }
        this._clearRects = this._clearRects.concat(boomRect);
        while (toArr.length) {
            this._clearRects.splice(this._clearRects.indexOf(toArr.shift()), 1);
        }
    };
    RectManager.prototype.rankRect = function (drop) {
        var arr = [];
        for (var from in drop) {
            arr.push({ "from": parseInt(from), "to": parseInt(drop[from]) });
        }
        return arr.sort(function (t1, t2) {
            if (t1.from > t2.from)
                return -1;
            else
                return 1;
        });
    };
    RectManager.prototype.boom = function (indexs) {
        for (var i = 0; i < indexs.length; i++) {
            this._rects[indexs[i]].boom();
        }
        this.dropBlocks(this.getDropIndex(indexs), indexs);
        this.fillBoomRect();
    };
    RectManager.instance = function () {
        if (RectManager._instance == null)
            RectManager._instance = new RectManager;
        return RectManager._instance;
    };
    RectManager.SORT_NUM_DESC = 1;
    return RectManager;
})();
RectManager.prototype.__class__ = "RectManager";
