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

        this.addEventListener("startGame1",this.startGame1,this);
        this.addEventListener("startGame2",this.startGame2,this)
        this.addEventListener("stopGame",this.stopGame,this);
    }
    private startGame1(e:egret.Event):void
    {
        console.log("游戏准备1");
        this.createRect(0);
        //this.startHpTimer();

    }

    private startGame2(e:egret.Event):void
    {
        console.log("游戏准备2");
        this.createRect(1)
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
    private static column:number[] = [5,6];
    private static row:number[] = [7,8];
    private static beginPos:number[]=[75,55];
    private static scaleArr:number[]=[1,.9];
    private rectArr:rect.Rect[][] = [[]];
    private clickArr:egret.Sprite[][]=[[]];
    private static type:number=0;
    private createRect(type:number=0):void
    {
        var i:number=0;
        var j:number=0;
        var re:rect.Rect;
        GameScene.type = type;
     //   console.log("GameScene.row[GameScene.type]",GameScene.row[GameScene.type],GameScene.column[GameScene.type])
        for(i=0;i<GameScene.column[GameScene.type];i++)
        {
            this.rectArr[i]=[];
            this.clickArr[i]=[];
            for(j=0;j<GameScene.row[GameScene.type];j++)
            {
                re = this.getRect();
                this.rectArr[i].push(re);
                re.x = GameScene.beginPos[GameScene.type]+i*(re.height*GameScene.scaleArr[GameScene.type]+1);
                re.y = 140+j*(re.width*GameScene.scaleArr[GameScene.type]+1);
                this.addChild(re);
                this.rectTween(re);
                var cRect:egret.Sprite = this.createClickRect();
                //cRect.name = i+j+"";
                cRect.x = GameScene.beginPos[GameScene.type]+i*(re.height*GameScene.scaleArr[GameScene.type]+1);
                cRect.y = 140+j*(re.width*GameScene.scaleArr[GameScene.type]+1);
                cRect.name = i+""+j;
                cRect.alpha = 0;
                this.clickArr[i].push(cRect);

                cRect.anchorOffsetX = 40;
                cRect.anchorOffsetY = 40;
                cRect.touchEnabled = true;
                cRect.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
                this.addChild(cRect);
            }
        }
        console.log("gameSceneNumChildren:",this.numChildren);
    }

    private onTouch(e:egret.TouchEvent):void
    {
        var index:any = e.target.name;
        var col:number = <number>index.charAt(0);
        var row:number = <number>index.charAt(1);
        var re:rect.Rect = this.rectArr[col][row];
        this.rectArr[col].splice(row,1);
       // this.rectArr[col].push(this.getRect());
        re.parent.removeChild(re);
        this.move(col,row,1);
    }

    private move(col:number,row:number,index:number):void
    {
        var arr:rect.Rect[]  = this.rectArr[col];
        var len:number = arr.length==0?0:arr.length-1;
        var i:number=len;
        var re:rect.Rect;
        for(i;i>=0;i--)
        {
            var re:rect.Rect = arr[i];
            egret.Tween.get(arr[i]).to({y:140+(GameScene.row[GameScene.type]-(len-i)-1)*(re.width*GameScene.scaleArr[GameScene.type]+1)},100);

        }
        console.log(col,row);
        var pRe:rect.Rect = this.getRect();
        arr.unshift(pRe);
        pRe.x = GameScene.beginPos[GameScene.type]+col*(re.height*GameScene.scaleArr[GameScene.type]+1);
        pRe.y = 140+0*(re.width*GameScene.scaleArr[GameScene.type]+1);
        this.addChild(pRe);
        this.rectTween(pRe);
    }


    private getRect():rect.Rect
    {
        var re:rect.Rect = rect.Rect.produceRect("block"+(Math.random()*7^0));
        re.anchorOffsetX = re.width/2;
        re.anchorOffsetY = re.height/2;
        re.scaleX = 0.5;
        re.scaleY = 0.5;
        return re;
    }
    private rectTween(re:rect.Rect):void
    {
        egret.Tween.get(re).to({scaleX:GameScene.scaleArr[GameScene.type],scaleY:GameScene.scaleArr[GameScene.type]},300,egret.Ease.backOut);
    }

    private createClickRect():egret.Sprite
    {
        var cRect:egret.Sprite = new egret.Sprite();
        cRect.graphics.beginFill(0xff0000);
        cRect.graphics.drawRoundRect(0,0,80,80,5,5);
        cRect.width = cRect.height = 80;
        cRect.graphics.endFill();
        return cRect;
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
        var j:number = 0;
        var re:rect.Rect;
        for(i;i<GameScene.column[GameScene.type];i++)
        {
            for(j=0;j<GameScene.row[GameScene.type];j++)
            {
                re =  this.rectArr[i][j];
                if(!rect)
                    return;
              //  console.log("rect:",i,j,GameScene.row);
                if(re.parent)
                {
                    re.parent.removeChild(re)
                }
                rect.Rect.reclaim(re,re.textureName);
                re = null;
            }
        }
        this.rectArr = [[]];
        this.clickArr = [[]];
        this.dispatchEventWith("returnSence");
    }
}