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
    private initUi():void
    {
        var returnSceneBtn:egret.Bitmap = new egret.Bitmap(RES.getRes("return"));
        returnSceneBtn.touchEnabled = true;
        this.addChild(returnSceneBtn);
        returnSceneBtn.x = 360;
        returnSceneBtn.y = 10;
        returnSceneBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.returnScene,this);
        this.stageW=egret.MainContext.instance.stage.stageWidth;

        var hpBg:egret.Sprite = new egret.Sprite();
        hpBg.graphics.lineStyle(1,0xffffff);
        hpBg.graphics.beginFill(0xffffff);
        hpBg.graphics.drawRect(0,0,this.stageW,9);
        hpBg.graphics.endFill();
        hpBg.y = 73;
        this.addChild(hpBg)

        this.hpProgressBar = new egret.Sprite();
        this.hpProgressBar.width = this.stageW;
        this.hpProgressBar.height = 5;
        this.addChild(this.hpProgressBar);
        //this.hpProgressBar.x = 5;
        this.hpProgressBar.y = 75;
        this.drawHp();

        this.hpTimer = new egret.Timer(100);
        this.hpTimer.addEventListener(egret.TimerEvent.TIMER,this.hpPlay,this)
      //  this.startHpTimer();

        this.addEventListener("startGame",this.startGame,this);
        this.addEventListener("stopGame",this.stopGame,this);
    }

    private startGame(e:egret.Event):void
    {
        console.log("游戏准备");
        this.createRect();
        //this.startHpTimer();

    }

    private stopGame(e:egret.Event):void
    {
        this.stopHpTimer();
    }

    private drawHp():void
    {
        this.hpProgressBar.graphics.clear();
      //  this.hpProgressBar.graphics.lineStyle(1,0xff0000);
        this.hpProgressBar.graphics.beginFill(0xff0000);
        this.hpProgressBar.graphics.drawRect(0,0,this.stageW,5);
        this.hpProgressBar.graphics.endFill();
        console.log("this.hpProgressBar.width:",this.hpProgressBar.width)
        this.stageW-=1;
        //console.log("stagew:",egret.MainContext.instance.stage.stageWidth,this.hpProgressBar.width);
    }
    private static column:number = 5;
    private static row:number = 7;
    private static  rectArr:rect.Rect[][] = [[]];
    private createRect():void
    {
        var i:number=0;
        var j:number=0;
        var re:rect.Rect;
        for(i=0;i<GameScene.row;i++)
        {
            GameScene.rectArr[i]=[];
            for(j=0;j<GameScene.column;j++)
            {
                re = rect.Rect.produceRect("block"+(Math.random()*7^0));
                GameScene.rectArr[i].push(re);
                this.addChild(re);
                re.y = 140+i*(re.width+2);
                re.x = 75+j*(re.height+2);
                re.anchorOffsetX = re.width/2;
                re.anchorOffsetY = re.height/2;
                re.scaleX = 0.5;
                re.scaleY = 0.5;
                egret.Tween.get(re).to({scaleX:1,scaleY:1},300,egret.Ease.backOut);
            }
        }
        console.log("gameSceneNumChildren:",this.numChildren)
       // var len:number = GameScene.rectArr.length;
      //  for(i=0;i<)

    }


    private hpTimer:egret.Timer;

    private startHpTimer():void
    {
        this.hpTimer.reset();
        this.hpTimer.start();
    }

    private stopHpTimer():void
    {
        this.hpTimer.stop();
    }

    private hpPlay(e:egret.TimerEvent):void
    {
        if(this.stageW<5)
        {
            this.stopHpTimer();
            this.hpProgressBar.graphics.clear();
        }
        this.drawHp();
    }


    private returnScene(e:egret.TouchEvent):void
    {
      //  console.log("return;");
       // var len:number = GameScene.rectArr.length;
        var i:number=0;
      //  var j:number = 0;
        var rect:rect.Rect;
        for(i;i<GameScene.row;i++)
        {
            for(j=0;j<GameScene.column;j++)
            {
                rect =  GameScene.rectArr[i][j];
                console.log("rect:",i,j,GameScene.row)
                if(rect.parent)
                {
                    rect.parent.removeChild(rect)
                }
            }
        }
        this.dispatchEventWith("returnSence");
    }
}