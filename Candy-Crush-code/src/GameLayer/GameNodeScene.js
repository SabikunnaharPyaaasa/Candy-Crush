var GameNodeScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        
        var appDelegate=AppDelegate.sharedApplication();
        
        var gameHud=GameHud.create();
        this.addChild(gameHud,1);
        appDelegate.gameHud=gameHud;

        var gameNode=GameNode.create();
        this.addChild(gameNode);
        appDelegate.gameNode=gameNode;
    }
});

var GameNode = cc.Layer.extend({
    preload_resources:null,
    init:function()
    {
        if (this._super())
        {
            this.preload_resources=[];
            this.preload_resources.push(folderGameResource+"target-bg.png");
            this.preload_resources.push(folderGameResource+"diamond.png");
            this.preload_resources.push(folderGameResource+"gold.png");
            this.preload_resources.push(folderGameResource+"ruby.png");
            this.preload_resources.push(folderGameResource+"board.png");
            this.preload_resources.push(folderGameResource+"score-board.png");
            this.preload_resources.push(folderGameResource+"cage.png");
            // this.preload_resources.push(folderGameResource+"fight_effect2.png");
            // this.preload_resources.push(folderGameResource+"merge-animation.png");
            // this.preload_resources.push(folderGameResource+"enemy-merge-animation.png");
            
            

            StorePanel.preLoadResource(this.preload_resources,this);
        
            return true;
        }
        return false;
    },

    loadCompleted:function()
    {
        var appDelegate=AppDelegate.sharedApplication();
        appDelegate.gameHud.loadStorePanel(Panel.GamePlay);

    },
});

GameNode.create=function()
{
    var ret = new GameNode();
    if(ret && ret.init()) {
        return ret;
    } else {
        delete ret;
        ret=null;
        return null;
    }
}