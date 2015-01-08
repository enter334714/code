/**
 * Created by Saco on 2014/7/30.
 */
var BlockManager = (function () {
    function BlockManager() {
        this._blocks = [];
        this._blockPool = [];
        this._clearedBlockIndex = [];
        EventCenter.addEventListener(GameEvent.COLLECT_BLOCK, this.collectBlock, this);
    }
    BlockManager.i = function () {
        if (!this._instance)
            this._instance = new BlockManager();
        return this._instance;
    };
    BlockManager.prototype.collectBlock = function (e) {
        this.destroyBlock(e.eventBody);
    };
    BlockManager.prototype.destroyBlock = function (block) {
        if (this._blockPool.indexOf(block) >= 0)
            return;
        if (block.parent)
            block.parent.removeChild(block);
        this._blockPool.push(block);
    };
    BlockManager.prototype.setContainer = function (container) {
        this._container = container;
    };
    BlockManager.prototype.resetData = function () {
        while (this._blocks.length > 0) {
            this.destroyBlock(this._blocks.shift());
        }
        this._blocks = new Array(GameSettings.ROW * GameSettings.COLUMN);
    };
    BlockManager.prototype.getNewBlock = function (type) {
        var block;
        if (this._blockPool.length > 0) {
            block = this._blockPool.shift();
            block.reset();
        }
        else
            block = new Block();
        if (type != null)
            block.resetColor(type);
        return block;
    };
    /* 添加方块到指定单元格*/
    BlockManager.prototype.addBlockAt = function (index) {
        var block = this.getNewBlock();
        this._blocks[index] = block;
        var pos = this.getPosByIndex(index);
        block.x = pos.x;
        block.y = pos.y;
        this._container.addChild(block);
        block.playFadeInAnimation();
    };
    BlockManager.prototype.fillBlocks = function () {
        var leng = this._blocks.length;
        for (var i = 0; i < leng; i++) {
            this.addBlockAt(i);
        }
    };
    BlockManager.prototype.fillBlastedBlocks = function () {
        while (this._clearedBlockIndex.length) {
            this.addBlockAt(this._clearedBlockIndex.shift());
        }
    };
    BlockManager.prototype.getPosByIndex = function (index) {
        var x = index % GameSettings.COLUMN * (GameConfig.BLOCK_WIDTH + GameConfig.BLOCK_MARGIN);
        var y = Math.floor(index / GameSettings.COLUMN) * (GameConfig.BLOCK_WIDTH + GameConfig.BLOCK_MARGIN);
        return new egret.Point(x, y);
    };
    BlockManager.prototype.getBlockByIndex = function (index) {
        return this._blocks[index];
    };
    BlockManager.prototype.blastBlock = function (index) {
        this._blocks[index].blast();
    };
    BlockManager.prototype.blastBlocks = function (indexes) {
        for (var i = 0; i < indexes.length; i++) {
            this.blastBlock(indexes[i]);
        }
        this.dropBlocks(RulesManager.i().getDropIndex(indexes), indexes);
        this.fillBlastedBlocks();
        if (GameSettings.TYPE == GameConfig.TYPE_3CLEAR)
            this.check3Clear();
    };
    BlockManager.prototype.dropBlocks = function (dropBlocks, blastBlocks) {
        var dropArr = this.rangeDropBlock(dropBlocks);
        var posi;
        var toArr = [];
        for (var i = 0; i < dropArr.length; i++) {
            posi = this.getPosByIndex(dropArr[i].to);
            this._blocks[dropArr[i].to] = this._blocks[dropArr[i].from];
            this._blocks[dropArr[i].from] = null;
            this._clearedBlockIndex.push(dropArr[i].from); //获得空白的格子
            console.log("block:", dropArr[i].to);
            toArr.push(dropArr[i].to); //获得空白的格子
            this._blocks[dropArr[i].to].resetProperty();
            egret.Tween.removeTweens(this._blocks[dropArr[i].to]);
            egret.Tween.get(this._blocks[dropArr[i].to]).to({ x: posi.x, y: posi.y }, 150);
        }
        this._clearedBlockIndex = this._clearedBlockIndex.concat(blastBlocks); //获得空白的格子
        //获得空白的格子
        // return;
        console.log("toArr:", toArr, "boomRect:", blastBlocks);
        while (toArr.length) {
            this._clearedBlockIndex.splice(this._clearedBlockIndex.indexOf(toArr.shift()), 1);
        }
    };
    BlockManager.prototype.rangeDropBlock = function (drop) {
        var arr = [];
        for (var from in drop) {
            arr.push({ "from": parseInt(from), "to": parseInt(drop[from]) });
        }
        return arr.sort(this.sortDrop);
    };
    BlockManager.prototype.sortDrop = function (drop1, drop2) {
        if (drop1.from > drop2.from)
            return -1;
        return 1;
    };
    BlockManager.prototype.switchBlock = function (fromIndex, toIndex, actual) {
        if (toIndex < 0)
            return;
        egret.Tween.removeTweens(this._blocks[fromIndex]);
        egret.Tween.removeTweens(this._blocks[toIndex]);
        var fromPos = this.getPosByIndex(fromIndex);
        var toPos = this.getPosByIndex(toIndex);
        if (actual) {
            egret.Tween.get(this._blocks[fromIndex]).to({ x: toPos.x, y: toPos.y }, 150).call(this.check3Clear, this);
            egret.Tween.get(this._blocks[toIndex]).to({ x: fromPos.x, y: fromPos.y }, 150);
        }
        else {
            egret.Tween.get(this._blocks[fromIndex]).to({ x: toPos.x, y: toPos.y }, 100).to({ x: fromPos.x, y: fromPos.y }, 100);
            egret.Tween.get(this._blocks[toIndex]).to({ x: fromPos.x, y: fromPos.y }, 100).to({ x: toPos.x, y: toPos.y }, 100);
        }
    };
    BlockManager.prototype.switchIndex = function (fromIndex, toIndex, actual) {
        this.switchBlock(fromIndex, toIndex, actual);
        if (actual) {
            var temp = this._blocks[fromIndex];
            this._blocks[fromIndex] = this._blocks[toIndex];
            this._blocks[toIndex] = temp;
        }
    };
    BlockManager.prototype.checkIfMoveCan3Clear = function (fromIndex, toIndex) {
        var temp = this._blocks[fromIndex];
        this._blocks[fromIndex] = this._blocks[toIndex];
        this._blocks[toIndex] = temp;
        var count = this.checkSingle3Clear(toIndex).length;
        var count2 = this.checkSingle3Clear(fromIndex).length;
        this._blocks[toIndex] = this._blocks[fromIndex];
        this._blocks[fromIndex] = temp;
        if (count >= 3 || count2 >= 3)
            return true;
        else
            return false;
    };
    BlockManager.prototype.check3Clear = function (changeArr) {
        var sound;
        if (changeArr != undefined) {
            this.checkAll3Clear();
        }
        else
            this.checkAll3Clear();
    };
    BlockManager.prototype.checkSingle3Clear = function (index) {
        var totalArr = [];
        var arr = [];
        var tempIndex = 1;
        while (this._blocks[index + tempIndex] && this._blocks[index].type == this._blocks[index + tempIndex].type && tempIndex < (GameSettings.COLUMN - (index % GameSettings.COLUMN))) {
            arr.push(index + tempIndex);
            tempIndex++;
        }
        tempIndex = 1;
        while (this._blocks[index - tempIndex] && this._blocks[index].type == this._blocks[index - tempIndex].type && tempIndex <= (index % GameSettings.COLUMN)) {
            arr.push(index - tempIndex);
            tempIndex++;
        }
        if (arr.length >= 2)
            totalArr = totalArr.concat(arr);
        console.log("arr:" + arr + "total" + totalArr);
        arr = [];
        tempIndex = GameSettings.COLUMN;
        while (this._blocks[index + tempIndex] && this._blocks[index].type == this._blocks[index + tempIndex].type && (index + tempIndex) < this._blocks.length) {
            arr.push(index + tempIndex);
            tempIndex += GameSettings.COLUMN;
        }
        tempIndex = GameSettings.COLUMN;
        while (this._blocks[index - tempIndex] && this._blocks[index].type == this._blocks[index - tempIndex].type && (index - tempIndex) > 0) {
            arr.push(index - tempIndex);
            tempIndex += GameSettings.COLUMN;
        }
        if (arr.length >= 2)
            totalArr = totalArr.concat(arr);
        console.log("arr:" + arr + "total" + totalArr);
        if (totalArr.length >= 2)
            totalArr.unshift(index);
        else
            totalArr = [];
        return totalArr;
    };
    BlockManager.prototype.checkAll3Clear = function () {
        var arr = [];
        for (var i = 0; i < this._blocks.length; i++) {
            if (arr.indexOf(i) >= 0)
                continue;
            arr = arr.concat(this.checkSingle3Clear(i));
        }
        if (arr.length)
            this.blastBlocks(arr);
        console.log("Clear=======" + arr);
    };
    return BlockManager;
})();
BlockManager.prototype.__class__ = "BlockManager";
