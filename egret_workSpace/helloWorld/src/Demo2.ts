/**
 * Created by Administrator on 2014/12/15.
 */
class Demo2 extends egret.DisplayObjectContainer
{
    private logo:egret.Bitmap;
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.load,this)

    }

    private load():void
    {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResComplete,this);
        RES.loadConfig("resource/resource.json","resource/");
        RES.loadGroup("preload");
    }

    private onResComplete():void
    {
        this.logo = new egret.Bitmap();
        this.logo.texture = RES.getRes("egretIcon");
        this.addChild(this.logo);
        this.starAnimation();
    }

    private starAnimation():void{
        var tw = egret.Tween.get(this.logo);
        tw.to({x:280,y:0},500).to({x:280,y:300},500).to({x:0,y:300},500).to({x:0,y:0},500);
        tw.call(this.starAnimation,this)
    }


}