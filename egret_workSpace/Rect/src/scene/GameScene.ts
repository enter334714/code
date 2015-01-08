/**
 * Created by Administrator on 2014-12-31.
 */
class GameScene extends egret.DisplayObjectContainer
{
    constructor()
    {
        super();
        this.initUi();
    }
    private hpProgressBar:egret.Sprite;
    private hpSub:number = 1;
    private stageW:number;
    private score:NumContainer;
    private _rectZone:egret.DisplayObjectContainer;
    private _interactor:egret.Bitmap;//接受鼠标事件
    private initUi():void
    {
        var returnSceneBtn:egret.Bitmap = new egret.Bitmap(RES.getRes("return"));
        returnSceneBtn.touchEnabled = true;
        this.addChild(returnSceneBtn);
        returnSceneBtn.x = 360;
        returnSceneBtn.y = 10;
        returnSceneBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.returnScene,this);
        this.stageW=egret.MainContext.instance.stage.stageWidth;

        var total_score:egret.Bitmap = new egret.Bitmap(RES.getRes("total_score"));
        this.addChild(total_score);
        total_score.x = 10;
        total_score.y = 20;

        this.score = new NumContainer("y");
        this.addChild(this.score);
        this.score.x = 90;
        this.score.y = 20;
        this.score.num = 0;

        this.initBlockZone();
        this.initBg();
    }
    private initBg():void
    {
        this._interactor = new egret.Bitmap();
        this._interactor.texture = RES.getRes("imgs.block1");
        this._interactor.alpha = 0;
        this._interactor.touchEnabled = true;
        this._rectZone.addChild(this._interactor);
    }
    private reposition():void
    {
        var w:number = GameSetting.TYPE_COL*(GameConfig.BLOCK_WIDTH+GameConfig.BLOCK_MARGIN);
        var h:number = GameSetting.TYPE_ROW*(GameConfig.BLOCK_WIDTH+GameConfig.BLOCK_MARGIN);
        this._interactor.width = w;
        this._interactor.height = h;

        if(this._rectZone.width > this.stage.stageWidth)
            this._rectZone.scaleX = this._rectZone.scaleY = (this.stage.stageWidth - 20)/w;
        else
            this._rectZone.scaleX = this._rectZone.scaleY = 1;
        this._rectZone.x = this.stage.stageWidth/2 - w/2*this._rectZone.scaleX;

        console.log("this._rectZone:",this._rectZone.width,"thisWidth:",this.stage.width);
       // this._returnBtn.x = this.stage.stageWidth - this._returnBtn.width;
        // console.log()
        // this.stage.stageWidth
        //egret.MainContext.instance.stage.stageWidth
    }
    private initBlockZone():void
    {
        this._rectZone = new egret.DisplayObjectContainer();
        this._rectZone.y = GameConfig.TOP_MARGIN;
        this._rectZone.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        this.addChild(this._rectZone);
    }

    private onTouch(e:egret.TouchEvent):void
    {
        console.log(e.localX,e.localY);
        this.rectClick(this.getTouchIndexByPos(e.localX,e.localY))
    }
    private rectClick(index:number):void
    {
        var rects:number[] = RectManager.instance().getSameBlocksNearby(index);
        console.log("(rects.length)*50:",(rects.length)*50)
        this.score.num=this.score.num+rects.length*50;
        RectManager.instance().boom(rects);
       // RectManager.instance()

    }





    private getTouchIndexByPos(localX, localY):number
    {
        return Math.floor(localX / (GameConfig.BLOCK_WIDTH + GameConfig.BLOCK_MARGIN)) +
            Math.floor(localY / (GameConfig.BLOCK_WIDTH + GameConfig.BLOCK_MARGIN)) * GameSetting.TYPE_COL;
    }
    public startGame(type:number):void
    {
        console.log("游戏准备"+type);
        this.score.num = 0;
        this.createGameZone(type);
        this.score.num = 0;

    }

    private createGameZone(type:number):void
    {

        GameSetting.GAMETYPE = type;
        GameSetting.TYPE_COL = GameConfig.COLUMN[type];
        GameSetting.TYPE_ROW = GameConfig.ROW[type];
        RectManager.instance().resetData();
        RectManager.instance().setContainer(this._rectZone);
        RectManager.instance().fillRect();
        this.reposition();
        console.log(this._rectZone.width);

    }

    private returnScene(e:egret.TouchEvent):void
    {

        this.dispatchEventWith("returnSence");
    }
}