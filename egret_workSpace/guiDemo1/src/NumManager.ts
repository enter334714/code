/**
 * Created by Administrator on 2014-12-29.
 */
class NumManager extends egret.Sprite
{
    public constructor()
    {
        super();
        this._imgPool=[];
    }
    private _imgPool:egret.Bitmap[];
    private _imgContainer:NumContainer;
    private static _instance:NumManager;
    public static num():NumManager
    {
      if(this._instance==null)
      {
          this._instance = new NumManager;
      }
        return this._instance;
    }

    public get num():NumContainer
    {
        return null;
    }


    private getNumImg(num:number,type:string):egret.Bitmap
    {
        var bmp:egret.Bitmap = new egret.Bitmap();
        bmp.texture = RES.getRes(type+num);
        return bmp;
    }

    private getBitmap():egret.Bitmap
    {
        if(this._imgPool.length>0)
        {
            return this._imgPool.shift();
        }
        else return new egret.Bitmap;
    }

}