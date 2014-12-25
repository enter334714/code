var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by Administrator on 2014-12-25.
 */
var GameWorld = (function (_super) {
    __extends(GameWorld, _super);
    function GameWorld() {
        _super.call(this);
        this.initBg();
    }
    GameWorld.prototype.initBg = function () {
        var bg = new egret.Bitmap(RES.getRes("bg"));
        this.addChild(bg);
    };
    GameWorld.prototype.init = function () {
        this.enterScene = new EnterScene();
        this.addChild(this.enterScene);
        /// var tween:;
        /* for(i=0;i<4;i++)
         {
             egret.Tween.get(this.blocks[i]).to({x:this.endPos[i][0],y:this.endPos[i][1],scaleX:this.endPos[i][2],scaleY:this.endPos[i][2]},500,egret.Ease.backInOut)
         }*/
        //移动进来
        //tween.to({x:240,y:85,scaleX:1.2,scaleY:1.2},500,egret.Ease.backOut);
        //放大缩小
        //tween.to({scaleX:1.2*1,scaleY:1.2*1},500,egret.Ease.backIn).to({scaleX:1,scaleY:1},500,egret.Ease.backOut)
        // tween.to({scaleX:1.2,scaleY:1.2,alpha:0,x:100,y:100},300).call(function(){this.parent.removeChild(img)});
        //tween.to({y:50},600,egret.Ease.cubicOut);
        //egret.Tween.get(this._arrow,{loop:!0}).to({y:30},600).to({y:0},600)
    };
    return GameWorld;
})(egret.Sprite);
GameWorld.prototype.__class__ = "GameWorld";
