/**
 * Created by Administrator on 2014-12-23.
 */
class TextureDemo extends egret.DisplayObjectContainer
{
  //  private imgs:egret.SpriteSheet;
   // private loadOk:boolean;
    constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddedHandler,this)
    }

    private onAddedHandler(e:egret.Event):void
    {
        this.load();
        this.touchEnabled = true;
        this.touchChildren = true;
      //  this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this)
    }
    private load():void
    {
        egret.Profiler.getInstance().run()
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.loadConfig("resource/resource.json","resource/");

    }

    private onConfigComplete(event:RES.ResourceEvent):void{
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onConfigComp,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        RES.loadGroup("assets");
        RES.loadGroup("shareGroup");
    }

    private gameWorld:GameWorld;
    private loadIndex:number=0;
    private onConfigComp(e:RES.ResourceEvent):void
    {
        if(e.groupName=="assets"  ||  e.groupName=="shareGroup")
        {
            this.loadIndex++;
        }
        console.log(this.loadIndex);
        if(this.loadIndex==2)
        {
            this.gameWorld = new GameWorld();
            this.gameWorld.init();
            this.addChild(this.gameWorld);
        }


        //this.add
       /* var bm:egret.Bitmap = new egret.Bitmap();
        bm.texture = RES.getRes("g2");
        this.addChild(bm);*/
    }
    private onResourceProgress(e:RES.ResourceEvent):void
    {
         console.log(e.itemsLoaded,"/",e.itemsTotal);
    }

}