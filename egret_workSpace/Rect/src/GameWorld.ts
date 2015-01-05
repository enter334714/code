/**
 * Created by Administrator on 2014-12-25.
 */
class GameWorld extends egret.Sprite
{


    //public static imgs:egret.SpriteSheet;
    constructor()
    {
        super();
        this.initBg();
        this.touchEnabled = true;
      //  this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTab,this);
    }

    private onTab(e:egret.TouchEvent):void
    {
        var num:number = Math.random()*1000000^0;
        this.numContainer.num = num ;
       // console.log(num);
    }

    private  initBg():void
    {
        var bg:egret.Bitmap = new egret.Bitmap(RES.getRes("bg"))
        this.addChild(bg);
    }
    private  enterScene:EnterScene;
    private  numContainer:NumContainer;
    private  gameScene:GameScene;
    public init():void
    {

       // GameWorld.imgs = RES.getRes("imgs");
        this.enterScene = new EnterScene();
        this.addChild(this.enterScene);

        this.enterScene.addEventListener("startGame1",this.startGame1,this);
        this.enterScene.addEventListener("startGame2",this.startGame2,this);
        this.gameScene = new GameScene();
        this.gameScene.visible = false;


        this.gameScene.addEventListener("returnSence",this.onReturn,this)
        this.addChild(this.gameScene);
       // this.numContainer = new NumContainer();
        //this.addChild(this.numContainer);
       // this.numContainer.num = 13435465;

    }

    private startGame2(e:egret.Event):void
    {
        this.enterScene.visible = false;
        this.gameScene.visible = true;
        this.gameScene.dispatchEventWith("startGame2")
    }
    private startGame1(e:egret.Event):void
    {
        //console.log("startGame1_j");
        this.enterScene.visible = false;
        this.gameScene.visible = true;
        this.gameScene.dispatchEventWith("startGame1")
    }

    private onReturn(e:egret.Event):void
    {
        console.log("returnScene_j");
        this.enterScene.visible = true;
        this.gameScene.visible = false
        this.enterScene.visible = true;
    }
}