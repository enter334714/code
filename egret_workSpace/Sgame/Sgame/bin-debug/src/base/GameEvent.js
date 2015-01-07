var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by Saco on 2014/8/2.
 */
var GameEvent = (function (_super) {
    __extends(GameEvent, _super);
    function GameEvent(type, body) {
        this.type = type;
        this.eventBody = body;
        _super.call(this, type);
    }
    GameEvent.GAME_EVENT_GAMEOVER = "game_over";
    GameEvent.GAME_EVENT_GAMESTART = "game_start";
    GameEvent.GAME_EVENT_GAMERESTART = "game_restart";
    GameEvent.GAME_EVENT_SHARE = "game_share";
    GameEvent.COLLECT_BLOCK = "collect_block";
    return GameEvent;
})(egret.Event);
GameEvent.prototype.__class__ = "GameEvent";
