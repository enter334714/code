/**
 * Created by Administrator on 2014-12-25.
 */
class EnterScene extends egret.Sprite
{
    public constructor()
    {
        super();
        this.init()
    }
    private blocks:rect.Rect[];
    private startPos:number[][] = [[-80,10],[-80,10],[-80,500],[480,10]];
    private endPos:number[][] = [[50,150,0.8],[130,150,1.2],[210,150,1.2],[290,150,0.8]];
    private timer:egret.Timer;
    public init():void
    {
        this.blocks= [];
        var block:rect.Rect;
        var i:number = 0;
        for(;i<4;i++)
        {
            block = rect.Rect.produceRect("block"+(i+1));
            block.scale9Grid = new egret.Rectangle(9,9,1,1);
            this.addChild(block);
            this.blocks.push(block);
        }
        this.swapChildren(this.blocks[1],this.blocks[2]);
        this.timer = new egret.Timer(1000,0);
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.playAnimation,this);
        this.timer.stop();
        this.play();

        var logo:egret.Bitmap = new egret.Bitmap(RES.getRes("logo"));
        logo.x = 120;
        logo.y = 100;
        this.addChild(logo);

        var easyBtn:egret.Bitmap = new egret.Bitmap(RES.getRes("easy"));
        easyBtn.touchEnabled = true;
        this.addChild(easyBtn);
        easyBtn.x = 140;
        easyBtn.y = 253;
        easyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchEasy,this)

        var hardBtn:egret.Bitmap = new egret.Bitmap(RES.getRes("hard"));
        hardBtn.touchEnabled = true;
        this.addChild(hardBtn);
        hardBtn.x = 140;
        hardBtn.y = 323;
        hardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchHard,this)
        /// var tween:;
        /* for(i=0;i<4;i++)
         {
         egret.Tween.get(this.blocks[i]).to({x:this.endPos[i][0],y:this.endPos[i][1],scaleX:this.endPos[i][2],scaleY:this.endPos[i][2]},500,egret.Ease.backInOut)
         }*/

        //移动进来
        //tween.to({x:240,y:85,scaleX:1.2,scaleY:1.2},500,egret.Ease.backOut);

        //放大缩小


        // tween.to({scaleX:1.2,scaleY:1.2,alpha:0,x:100,y:100},300).call(function(){this.parent.removeChild(img)});
        //tween.to({y:50},600,egret.Ease.cubicOut);
        //egret.Tween.get(this._arrow,{loop:!0}).to({y:30},600).to({y:0},600)
    }

    private onTouchEasy(e:egret.TouchEvent):void
    {
        console.log(e.target)
    }

    private onTouchHard(e:egret.TouchEvent):void
    {
        console.log(e.target)
    }

    public  play():void
    {
        var i:number = 0;
        var block:rect.Rect;
        for(;i<4;i++)
        {
            block = this.blocks[i];
            //block.alpha = 0;
            block.x = this.startPos[i][0];
            block.y = this.startPos[i][1];
        }
        egret.Tween.get(this.blocks[0]).to({x:90,y:92},500,egret.Ease.backInOut);
        egret.Tween.get(this.blocks[1]).to({x:163,y:75,scaleX:1.4,scaleY:1.4},300,egret.Ease.backInOut);
        egret.Tween.get(this.blocks[2]).to({x:243,y:85,scaleX:1.2,scaleY:1.2},500,egret.Ease.backInOut);
        egret.Tween.get(this.blocks[3]).to({x:313,y:90},500,egret.Ease.backInOut).call(this.startTimer,this)

        //tween.to({scaleX:1.2*1,scaleY:1.2*1},500,egret.Ease.backIn).to({scaleX:1,scaleY:1},500,egret.Ease.backOut)
    }
    public startTimer():void
    {
        console.log("thisTimer:",this.timer);
        this.timer.reset();
        this.timer.start();
        console.log("定时器启动")
    }
    private playAnimation():void
    {
        var block:rect.Rect = this.blocks[Math.random()*4^0];
        var scaX:number = block.scaleX;
        var scaY:number = block.scaleY;
        egret.Tween.get(block).to({scaleX:scaX*1.2,scaleY:1.2*scaY},500,egret.Ease.backIn).to({scaleX:scaX,scaleY:scaY},500,egret.Ease.backOut)
    }

    public _setVisible(value:boolean):void
    {
        super._setVisible(value)
        if(value==false)
        {
            this.timer.stop();
            //////////////this.timer.start();
        }
    }
}