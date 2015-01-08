/**
 * Created by Administrator on 2015-01-08.
 */
var GameConfig = (function () {
    function GameConfig() {
    }
    GameConfig.COLUMN = [5, 6];
    GameConfig.ROW = [7, 8];
    GameConfig.beginPos = [75, 55];
    GameConfig.BLOCK_MARGIN = 1;
    GameConfig.BLOCK_WIDTH = 80;
    GameConfig.TOP_MARGIN = 100;
    return GameConfig;
})();
GameConfig.prototype.__class__ = "GameConfig";
