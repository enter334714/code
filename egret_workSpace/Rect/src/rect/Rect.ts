/**
 * Created by Administrator on 2014-12-24.
 */
module rect
{
    //方块
    export class Rect extends egret.Bitmap
    {
        private static cacheRect:Object = {};
        public static produceRect(textureName:string):rect.Rect
        {
            if(rect.Rect.cacheRect[textureName]==null)
                rect.Rect.cacheRect[textureName] = [];
            var dict:Rect[] = rect.Rect.cacheRect[textureName];
            var re:Rect;
            if(dict.length>=1)
                re = dict.pop();
            else
            {
                var texture:egret.Texture =  RES.getRes(textureName);
                re = new rect.Rect(texture);
            }
            re.textureName = textureName;
            return re;
        }

        public static reclaim(re:rect.Rect,textureName:string):void
        {
            if(rect.Rect.cacheRect[textureName]==null)
            {
                rect.Rect.cacheRect[textureName] = [];
            }
            var dict:rect.Rect[] = rect.Rect.cacheRect[textureName];
            if(dict.indexOf(re)==-1)
            {
                dict.push(re);
            }
        }
        public textureName:string;
        public constructor(texture:egret.Texture)
        {
           super(texture);
        }
    }

}