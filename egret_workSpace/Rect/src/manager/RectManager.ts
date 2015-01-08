/**
 * Created by Administrator on 2015-01-08.
 */
class RectManager
{
    private _container:egret.DisplayObjectContainer;
    private static  _instance:RectManager;
    private _rects:rect.Rect[];


    constructor()
    {
        this._rects = [];
        this._clearRects = [];
    }

    public resetData():void
    {
        var re:rect.Rect;
        for(var i:number=0;i<this._rects.length;i++)
        {
            re = this._rects[i];
            if(re.parent)
            {
                re.parent.removeChild(re);
            }
        }
        this._rects = new Array(GameSetting.TYPE_COL*GameSetting.TYPE_ROW);
    }

    public addRectAt(index:number):void
    {
        var rect:rect.Rect = this.getNewRect();
        this._rects[index] = rect;
        var pos:egret.Point = this.getPosByIndex(index);
       // console.log(index);
        rect.x = pos.x;
        rect.y = pos.y;
      //  console.log(pos.x,pos.y)
        this._container.addChild(rect);
        rect.playFadeInAnimation();
    }

    public fillRect():void
    {
        var leng:number = this._rects.length;
        // console.log("blocklength:",leng)
        for(var i:number = 0; i < leng; i++)
        {
            this.addRectAt(i);
        }
    }


    public getNewRect(type?:string):rect.Rect
    {
        var re:rect.Rect;
        if(type==null)
        {
            type = "block"+(Math.random()*7^0);
        }
        re = rect.Rect.produceRect(type)
        return re;
    }

    public getPosByIndex(index:number):egret.Point
    {
        var x = index%GameSetting.TYPE_COL * (GameConfig.BLOCK_WIDTH + GameConfig.BLOCK_MARGIN);
        var y = Math.floor(index/GameSetting.TYPE_COL) * (GameConfig.BLOCK_WIDTH + GameConfig.BLOCK_MARGIN);
        return new egret.Point(x, y);
    }
    public setContainer(box:egret.DisplayObjectContainer):void
    {
        this._container = box;
    }

    public getSameBlocksNearby(index:number):number[]
    {
       // var totalIndex:number = GameSetting.TYPE_ROW * GameSetting.TYPE_COL;
      //  var clearArr:number[] = [];
        var textureName:string =this.getRectByIndex(index).textureName;
        return this.checkRectAround(index, textureName).concat(index);
    }

    private getRectByIndex(index:number):rect.Rect
    {
        return this._rects[index];
    }

    private checkRectAround(index:number,textureName:string):number[]
    {
        var arr:number[] =[];
        var arounds:number[] = this.getAroundIndex(index);
        var needCheck:number[] = arounds;
        var indexTemp:number;
        var rectChecked:number[] = [index];
        while(needCheck.length>0)
        {
            indexTemp = needCheck.shift();
            if(rectChecked.indexOf(indexTemp)>=0)
                continue;
            if(this.getRectByIndex(indexTemp).textureName==textureName)
            {
                arr.push(indexTemp);
                needCheck = needCheck.concat(this.getAroundIndex(indexTemp));
            }
            rectChecked.push(indexTemp);
        }
        //console.log("arrLength:",arr.length);
        return arr;
    }

    private getAroundIndex(index:number):number[]
    {
        var arr:number[] =[];
        if(index-GameSetting.TYPE_COL>=0)
            arr.push(index-GameSetting.TYPE_COL);
        if(index+GameSetting.TYPE_COL<GameSetting.TYPE_COL*GameSetting.TYPE_ROW)
            arr.push(index+GameSetting.TYPE_COL);
        if(index%GameSetting.TYPE_COL!=0)
            arr.push(index-1);
        if((index+1)%GameSetting.TYPE_COL!=0)
            arr.push(index+1);

        return arr;
    }
    public static SORT_NUM_DESC:number = 1;
    public getDropIndex(indexs:number[]):any
    {
        indexs = indexs.sort(function(t1:any,t2:any):number
        {
            if(parseInt(t1)>parseInt(t2))
                return -1;
            else
                return 1;
        });
        var moveBlock:any = {};
        var tempIndex:number;
        for(var i:number = indexs.length-1;i>=0;i--)
        {
            tempIndex = indexs[i]-GameSetting.TYPE_COL;
            while(tempIndex>=0)
            {
                if(indexs.indexOf(tempIndex)==-1&&this.getRectByIndex(tempIndex))
                {
                    if(moveBlock[tempIndex])
                    {
                        moveBlock[tempIndex]+=GameSetting.TYPE_COL;
                    }
                    else
                    {
                        moveBlock[tempIndex]=tempIndex+GameSetting.TYPE_COL;
                    }
                }
                tempIndex -=GameSetting.TYPE_COL;
            }
        }
        return moveBlock;
    }

    private  _clearRects:number[];

    public fillBoomRect():void
    {
        var rect:rect.Rect;
        while(this._clearRects.length)
        {
            //rect =
            this.addRectAt(this._clearRects.shift());
        }
    }

    private dropBlocks(dropRects:any,boomRect:number[]):void
    {

        var dropArr:any[] = this.rankRect(dropRects);
      //  console.log("dropArr:",dropArr);
        var pos:egret.Point;
        var toArr:number[] = [];
        for(var i:number = 0;i<dropArr.length;i++)
        {
            pos = this.getPosByIndex(dropArr[i].to);
            //console.log("to:",dropArr[i].to)
            this._rects[dropArr[i].to] = this._rects[dropArr[i].from];
          //  console.log("to:",dropArr[i].to)
            this._rects[dropArr[i].from] = null;
          //  console.log("to:",dropArr[i].to)
            this._clearRects.push(dropArr[i].from);
          //  console.log("to:",dropArr[i].to)
            toArr.push(dropArr[i].to);
            this._rects[dropArr[i].to].resetProperty();
            egret.Tween.removeTweens(this._rects[dropArr[i].to]);
            egret.Tween.get(this._rects[dropArr[i].to]).to({x:pos.x,y:pos.y},150);
        }
        this._clearRects = this._clearRects.concat(boomRect);
        while(toArr.length)
        {
            this._clearRects.splice(this._clearRects.indexOf(toArr.shift()),1);
        }
    }

    private rankRect(drop:any):any[]
    {
        var arr:any = [];
        for(var from in drop)
        {
            arr.push({"from":parseInt(from),"to":parseInt(drop[from])})
        }
        return arr.sort(function(t1:any,t2:any):number
        {
            if(t1.from>t2.from)
                return -1;
            else
                return 1;
        })
    }



    public boom(indexs:number[]):void
    {
       // console.log(indexs);
        for(var i:number=0;i<indexs.length;i++)
        {
            this._rects[indexs[i]].boom();
        }
        this.dropBlocks(this.getDropIndex(indexs),indexs);
        this.fillBoomRect();
    }



    public static instance():RectManager
    {
        if(RectManager._instance==null)
                RectManager._instance = new RectManager;
        return RectManager._instance;
    }


}