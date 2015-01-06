/**
 * Created by Administrator on 2014-12-29.
 */
class NumContainer extends egret.DisplayObjectContainer
{
    private static _imgPool:egret.Bitmap[]=[];
    private numType:string;
    private _num:number;
    constructor(type:string)
    {
        this.numType = type;
        super();
    }

    public set num(num:number)
    {
        num = num^0;
        this._num = num;
        var numStr:string = num.toString();
        var numLen:number = numStr.length;
        var index:number = numLen-this.numChildren; //正数为多余,要删除index个；负数为缺少，要增加index个；
        var i:number=0;
        console.log("index:",index);
        for(i=0;i<Math.abs(index);i++)
        {
            if(index<0)
            {
                var bmp:egret.Bitmap =  <egret.Bitmap>this.removeChildAt(i);
                NumContainer.reclaimBitmap(bmp);
            }
            else
            {
                this.addChild(NumContainer.produceBitmap())
            }
        }
        var childLen:number = this.numChildren;
        for(i=0;i<childLen;i++)
        {
            var bmp:egret.Bitmap = <egret.Bitmap>this.getChildAt(i);
           // console.log(numStr.substr(i,1));
            bmp.texture = RES.getRes(this.numType+numStr.substr(i,1));
        }
        this.reposition();
    }

    public get num():number
    {
        return this._num;
    }

    private reposition():void
    {
        var len:number = this.numChildren;
        var i:number=0;
        var bmp:egret.Bitmap;
        var lastX:number = 0;
        for(;i<len;i++)
        {
            bmp = <egret.Bitmap>this.getChildAt(i);
            bmp.x = lastX;
            lastX = bmp.width+bmp.x;
        }
    }

    private static produceBitmap():egret.Bitmap
    {
        if(NumContainer._imgPool.length>0)
            return NumContainer._imgPool.shift();
        else
            return new egret.Bitmap;
    }
    private static reclaimBitmap(bitmap:egret.Bitmap):void
    {
      //  console.log("recla:",1);
        if(bitmap )
        {
            if(bitmap.parent)
                bitmap.parent.removeChild(bitmap);
            bitmap.texture = null;
            NumContainer._imgPool.push(bitmap);
            console.log("_imgPool:",   NumContainer._imgPool.length);
        }
    }
}