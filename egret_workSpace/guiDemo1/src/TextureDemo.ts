/**
 * Created by Administrator on 2014-12-23.
 */
class TextureDemo extends egret.DisplayObjectContainer
{
  //  private imgs:egret.SpriteSheet;
    private loadOk:boolean;
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
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this)
    }
    private load():void
    {
        egret.Profiler.getInstance().run()
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onGroupComp,this);
        RES.loadConfig("resource/resource.json","resource/");
        RES.loadGroup("assets");
        RES.loadGroup("shareGroup");
    }

    private onGroupComp(e:RES.ResourceEvent):void
    {
       // this.imgs = RES.getRes("imgs");
      //  this.loadOk = true;

        var img:rect.Rect = rect.Rect.produceRect("block1");
        img.touchEnabled = true;
        this.addChild(img);
    }

    private onTouch(e:egret.TouchEvent):void
    {
        console.log(e.target);
    }
}