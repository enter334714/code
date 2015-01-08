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
        public boom():void
        {
            egret.Tween.removeTweens(this);
            var targetX:number = this.x - 8;
            var targetY:number = this.y - 8;
            egret.Tween.get(this).to({scaleX:1.2, scaleY:1.2, alpha:0, x:targetX, y:targetY}, 300).call(function (){
                this.parent.removeChild(this);
                rect.Rect.reclaim(this,this.textureName);
            }, this);
        }
        public resetProperty():void
        {
            this.scaleX = 1;
            this.scaleY = 1;
            this.alpha = 1;
        }
        public playFadeInAnimation():void
        {
            egret.Tween.removeTweens(this);
            var targetX:number = this.x;
            var targetY:number = this.y;
            this.alpha = 0;
            this.scaleX = 0;
            this.scaleY = 0;
            this.x = this.x + GameConfig.BLOCK_WIDTH/2;
            this.y = this.y + GameConfig.BLOCK_WIDTH/2;
            egret.Tween.get(this).to({scaleX:1, scaleY:1, alpha:1, x:targetX, y:targetY}, 300);
        }

        public textureName:string;
        public constructor(texture:egret.Texture)
        {
           super(texture);
            //this.anchorOffsetX = GameConfig.BLOCK_WIDTH/2;
            //this.
        }
    }

}