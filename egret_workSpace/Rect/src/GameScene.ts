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
               // cRect.name = i+""+j;
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
        var col:number = parseInt(index.charAt(0));
        var row:number = parseInt(index.charAt(1));
        var re:egret.Sprite = this.clickArr[col][row];
        this.waitCheckList.push(re)
        this.checkWaitList();

        /*this.rectArr[col].splice(row,1);
       // this.rectArr[col].push(this.getRect());
        re.parent.removeChild(re);
        var re1:rect.Rect = this.rectArr[col][row];
        this.rectArr[col].splice(row,1);
        // this.rectArr[col].push(this.getRect());
        re1.parent.removeChild(re1);
        this.move(col,row,2);*/
    }

    private waitCheckList:egret.Sprite[] =  [];
    private isOKList:Object = new Object();

    private checkWaitList():void
    {
        var i:number = 0;
        var re:egret.Sprite;
        for(i=0;i<this.waitCheckList.length;i++)
        {
            re = (this.waitCheckList[i]);
            this.onCheck(re)
        }
        this.waitCheckList = [];
        this.prepare();
    }




    private onCheck(re:egret.Sprite):void
    {
        var index:any = re.name;
        var col:number = parseInt(index.charAt(0));
        var row:number = parseInt(index.charAt(1));
       //
       // console.log(col,row);
        var i:number;
        var rect:rect.Rect = this.rectArr[col][row];
        this.onCheckRect(col,row,rect.textureName);
        this.onCheckRect(col-1,row,rect.textureName);
        this.onCheckRect(col+1,row,rect.textureName);
        this.onCheckRect(col,row+1,rect.textureName);
        this.onCheckRect(col,row-1,rect.textureName);

    }

    private onCheckRect(col:number,row:number,name:String):void
    {
       // console.log(col,row);
        if(col<0 || col>=this.rectArr.length || row<0 || row>=this.rectArr[0].length)
        {
           // console.log("col:",col)
            return;
        }
        var rect:rect.Rect = (this.rectArr[col][row]);
        var sprite:egret.Sprite = this.clickArr[col][row];
        var dicName:any = col+""+row;

        if(this.isOKList[dicName])
            return;
        if(rect.textureName==name)
        {
            this.isOKList[dicName] = sprite;
            this.waitCheckList.push(this.clickArr[col][row]);
        }
    }

    private prepare():void
    {
        var t:string;
        var deleteDic:Object = new Object();
        //  egret.Tween.get().to().call()
        var col:string;
        var row:string;
        for (t in this.isOKList)
        {
            col = t.charAt(0);
            if(!deleteDic[col])
                deleteDic[col]=[];
            deleteDic[col].push(this.isOKList[t]);
            delete this.isOKList[t];
        }
        var len:number;
        var i:number;
        var sprite:egret.Sprite;
        for(t in deleteDic)
        {
            len = deleteDic[t].length;
            for(i=0;i<len;i++)
            {
                sprite = deleteDic[t][i];
                row = sprite.name.charAt(1);
                var re:rect.Rect = this.rectArr[parseInt(t)][parseInt(row)];
                re.parent.removeChild(re);
                this.rectArr[parseInt(t)][parseInt(row)] =null;
            }
            for(i=0;i<this.rectArr[t].length;i++)
            {
                if(this.rectArr[t][i]==null)
                {
                    this.rectArr[t].splice(i,1);
                    i--;
                }
            }
            this.move(parseInt(t),len);
            this.setScore(len);

        }

    }
    /*
    *
    *@param addCounts 增加的个数
    *
    */
    private move(col:number,addCounts:number):void
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
       // console.log(col,row);
        for(i=0;i<addCounts;i++ )
        {
            var pRe:rect.Rect = this.getRect();
            arr.unshift(pRe);
            pRe.x = GameScene.beginPos[GameScene.type]+col*(re.height*GameScene.scaleArr[GameScene.type]+1);
            pRe.y = 140+i*(re.width*GameScene.scaleArr[GameScene.type]+1);
            this.addChild(pRe);
            this.rectTween(pRe);
        }
        //console.log(this.numChildren)
    }

    private setScore(score:number):void
    {
        this.score.num = this.score.num+score*100;
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