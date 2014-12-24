var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by Administrator on 2014-12-16.
 */
var GuiDemo = (function (_super) {
    __extends(GuiDemo, _super);
    function GuiDemo() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addHandler, this);
    }
    GuiDemo.prototype.addHandler = function () {
        this.uiStage = new egret.gui.UIStage;
        this.addChild(this.uiStage);
        this.label = new egret.gui.Label;
        this.label.x = 200;
        var str = egret.localStorage.getItem("k");
        this.index = str == "" ? 0 : Number(str);
        this.label.text = "点击了" + this.index + "次";
        this.uiStage.addElement(this.label);
        egret.Injector.mapClass("egret.gui.IAssetAdapter", AssetAdapter);
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        egret.gui.Theme.load("resource/theme.thm");
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
        var icon = new egret.gui.UIAsset();
        //  icon.source = "";
        var sourceArr = [{ "name": "one", value: 1 }, { "name": "two", value: 2 }];
        var myCollection = new egret.gui.ArrayCollection(sourceArr);
        myCollection.addEventListener(egret.gui.CollectionEvent.COLLECTION_CHANGE, this.collectionChange, this);
        var itemData = [{ "name": "three", value: 3 }];
        myCollection.addItem(itemData);
        myCollection.moveItemAt(2, 1);
    };
    GuiDemo.prototype.collectionChange = function (e) {
        console.log("数据改变了：" + e.kind + "," + e.target.length, e.items, e.oldItems, e.location, e.oldLocation);
    };
    GuiDemo.prototype.onConfigComplete = function (e) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    };
    GuiDemo.prototype.onResourceProgress = function (e) {
        if (e.groupName == "preload") {
        }
        //console.
    };
    /*资源加载完成*/
    GuiDemo.prototype.onResourceLoadComplete = function (e) {
        if (e.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        }
        var btn = new egret.gui.Button();
        btn.label = "我是按钮";
        // btn.left = 100;
        this.uiStage.addElement(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
    };
    GuiDemo.prototype.onBtnClick = function (e) {
        this.index += 1;
        this.label.text = "点击了" + this.index + "次";
        egret.localStorage.setItem("k", this.index.toString());
        console.log("点击了按钮");
    };
    return GuiDemo;
})(egret.DisplayObjectContainer);
GuiDemo.prototype.__class__ = "GuiDemo";
