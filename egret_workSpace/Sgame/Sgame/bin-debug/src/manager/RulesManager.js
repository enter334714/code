/**
 * Created by Saco on 2014/8/1.
 */
var RulesManager = (function () {
    function RulesManager() {
    }
    RulesManager.i = function () {
        if (!this._instance)
            this._instance = new RulesManager();
        return this._instance;
    };
    RulesManager.prototype.checkClickedBlock = function (index) {
        return false;
    };
    RulesManager.prototype.checkIsMost = function () {
        return false;
    };
    RulesManager.prototype.getSameBlocksNearby = function (index) {
        var totalIndex = GameSettings.ROW * GameSettings.COLUMN;
        var clearArr = [];
        var type = BlockManager.i().getBlockByIndex(index).type;
        return this.checkBlockAround(index, type).concat(index);
    };
    RulesManager.prototype.checkBlockAround = function (index, type) {
        var arr = [];
        var arounds = this.getAroundIndex(index);
        var needCheck = arounds;
        var indexTemp;
        var blockChecked = [index];
        while (needCheck.length > 0) {
            indexTemp = needCheck.shift();
            //console.log("indexTemp:",indexTemp);
            if (blockChecked.indexOf(indexTemp) >= 0)
                continue;
            if (BlockManager.i().getBlockByIndex(indexTemp).type == type) {
                arr.push(indexTemp);
                needCheck = needCheck.concat(this.getAroundIndex(indexTemp));
            }
            blockChecked.push(indexTemp);
        }
        return arr;
    };
    RulesManager.prototype.getAroundIndex = function (index) {
        var arr = [];
        if (index - GameSettings.COLUMN >= 0)
            arr.push(index - GameSettings.COLUMN);
        if (index + GameSettings.COLUMN < GameSettings.COLUMN * GameSettings.ROW)
            arr.push(index + GameSettings.COLUMN);
        if (index % GameSettings.COLUMN != 0)
            arr.push(index - 1);
        if ((index + 1) % GameSettings.COLUMN != 0)
            arr.push(index + 1);
        return arr;
    };
    RulesManager.prototype.getIndexByTowards = function (index, towards) {
        if (towards == "left") {
            if ((index - 1) / GameSettings.COLUMN == 0)
                return -1;
            return index - 1;
        }
        else if (towards == "right") {
            if ((index + 1) % GameSettings.COLUMN == 0)
                return -1;
            return index + 1;
        }
        else if (towards == "up") {
            if ((index - GameSettings.COLUMN) < 0)
                return -1;
            return index - GameSettings.COLUMN;
        }
        else if (towards == "down") {
            if ((index + GameSettings.COLUMN) >= GameSettings.COLUMN * GameSettings.ROW)
                return -1;
            return index + GameSettings.COLUMN;
        }
        return -1;
    };
    RulesManager.prototype.getScoreByBlockCount = function (count) {
        return 200 * count - 100;
    };
    RulesManager.prototype.getScoreType = function (count) {
        if (count >= 10)
            return GameConfig.NUM_PIC_TYPE_YELLOW;
        else if (count >= 5)
            return GameConfig.NUM_PIC_TYPE_PURPLE;
        return GameConfig.NUM_PIC_TYPE_GREEN;
    };
    RulesManager.prototype.getDropIndex = function (indexes) {
        indexes = ArrayUtils.sortArray(indexes, ArrayUtils.SORT_NUM_DESC);
        var moveBlock = {};
        var tempIndex;
        for (var i = indexes.length - 1; i >= 0; i--) {
            tempIndex = indexes[i] - GameSettings.COLUMN;
            while (tempIndex >= 0) {
                if (indexes.indexOf(tempIndex) == -1 && BlockManager.i().getBlockByIndex(tempIndex)) {
                    //console.log("moveBlock:",tempIndex);
                    if (moveBlock[tempIndex])
                        moveBlock[tempIndex] += GameSettings.COLUMN;
                    else
                        moveBlock[tempIndex] = tempIndex + GameSettings.COLUMN;
                }
                tempIndex -= GameSettings.COLUMN;
            }
        }
        console.log("moveBlock:", moveBlock);
        return moveBlock;
    };
    RulesManager.prototype.getTimeSpeedChange = function (blockCount) {
        return blockCount - GameConfig.CLICK_PUNISH;
    };
    RulesManager.prototype.getSameBlocksCR = function (index) {
        return [];
    };
    return RulesManager;
})();
RulesManager.prototype.__class__ = "RulesManager";
