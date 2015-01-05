/**
 * Created by Administrator on 2014-12-16.
 */
class GuiDemo extends egret.DisplayObjectContainer
{
    private uiStage;
    private label:egret.gui.Label;
    public  constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.addHandler,this)
    }

    private addHandler():void
    {

        this.uiStage = new egret.gui.UIStage;
        this.addChild(this.uiStage);

       this.label = new egret.gui.Label;
        this.label.x = 200;
        var str:String = egret.localStorage.getItem("k");
        this.index = str==""?0:Number(str);
        this.label.text = "点击了"+ this.index+"次";
        this.uiStage.addElement(this.label);

        egret.Injector.mapClass("egret.gui.IAssetAdapter",AssetAdapter);
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        egret.gui.Theme.load("resource/theme.thm");
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.loadConfig("resource/resource.json","resource/");

        var icon:egret.gui.UIAsset = new egret.gui.UIAsset();
      //  icon.source = "";


        var sourceArr:any[] = [{"name":"one",value:1},{"name":"two",value:2}];
        var myCollection:egret.gui.ArrayCollection = new egret.gui.ArrayCollection(sourceArr);
        myCollection.addEventListener(egret.gui.CollectionEvent.COLLECTION_CHANGE,this.collectionChange,this)

        var itemData:any[] = [{"name":"three",value:3}];
        myCollection.addItem(itemData);
        myCollection.moveItemAt(2,1);
    }
    private collectionChange(e:egret.gui.CollectionEvent):void
    {
            console.log("数据改变了："+e.kind+","+e.target.length,e.items,e.oldItems,e.location,e.oldLocation)
    }

    private onConfigComplete(e:RES.ResourceEvent):void
    {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this)
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this)
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this)
        RES.loadGroup("preload");

    }

    private onResourceProgress(e:RES.ResourceEvent):void
    {
        if(e.groupName=="preload")
        {
           // console.log(e.itemsLoaded+"/"+e.itemsTotal);
             //this.label.text = e.itemsLoaded+"/"+e.itemsTotal;
        }
        //console.
    }

    /*资源加载完成*/
    private onResourceLoadComplete(e:RES.ResourceEvent):void {

        if (e.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);

        }


        var btn:egret.gui.Button = new egret.gui.Button();
        btn.label = "我是按钮";
        // btn.left = 100;
        this.uiStage.addElement(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this)
    }
    private  index:number
    private onBtnClick(e:egret.TouchEvent):void
    {
        this.index+=1;
        this.label.text = "点击了"+ this.index+"次";
        egret.localStorage.setItem("k",this.index.toString())

        console.log("点击了按钮");
    }


}