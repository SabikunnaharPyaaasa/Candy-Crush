var GameEnd=cc.Layer.extend({
    preload_resources:null,
	init:function(gameStatus)
    {
        if (this._super())
        {
            this.preload_resources=[];
            this.preload_resources.push(folderGameResource+"target-bg.png");
            this.preload_resources.push(folderGameResource+"panel.png");
            this.preload_resources.push(folderGameResource+"well-done.png");
            this.preload_resources.push(folderGameResource+"pillow.png");
            this.preload_resources.push(folderGameResource+"star.png");
            this.preload_resources.push(folderGameResource+"white-spark.png");
            this.gameStatus = gameStatus;
            
            
            StorePanel.preLoadResource(this.preload_resources,this);
           
            return true;
        }
        return false;
    },
    loadCompleted:function()
    {
  
        if(this.gameStatus=="win")
        {
            console.log("win");
            this.setBackground();
            this.loadBackgroundColor();
            this.loadWinPanel();
            this.loadWellDone();
            this.loadPillow();
            this.loadStar();
            this.loadWhiteSpark();
       
        }
        if(this.gameStatus=="lose")
        {
            // this.setBackground();
            // this.loadBackgroundColor();
            // 
            console.log("defeat");
            this.setBackground();
            this.loadBackgroundColor();
            // this.loadWinPanel();
            // this.loadWellDone();
            // this.loadPillow();
            // this.loadStar();
            // this.loadWhiteSpark();
            
        }
    },
    setBackground:function()
    {
        this.imgBackground=cc.Sprite.create(folderGameResource+"target-bg.png");
        this.imgBackground.setScaleX(cc.winSize.width/this.imgBackground.getContentSize().width);
        this.imgBackground.setScaleY(cc.winSize.height/this.imgBackground.getContentSize().height);
        this.imgBackground.setPosition(cc.winSize.width/2, cc.winSize.height/2);
        this.addChild(this.imgBackground);
    },
    loadBackgroundColor:function()
    {
       this.colorBackground=cc.LayerColor.create(cc.color.black,cc.winSize.width,cc.winSize.height);
       this.colorBackground.setOpacity(0.5*255);
       this.colorBackground.setPosition(cc.p(0 , 0));
       this.addChild(this.colorBackground,1);
    },
    loadWinPanel:function()
    {
        var appDelegate = AppDelegate.sharedApplication();
        this.imgPanel=cc.Sprite.create(folderGameResource+"panel.png");
        this.imgPanel.setScale(appDelegate.deviceScaleFloat*2);
        //this.imgPanel.setScaleY(cc.winSize.height/this.imgBackground.getContentSize().height);
        this.imgPanel.setPosition(cc.winSize.width/2, cc.winSize.height/2);
        this.addChild(this.imgPanel,2);
    },

    loadWellDone:function()
    {
        var appDelegate = AppDelegate.sharedApplication();
        this.imgWellDone=cc.Sprite.create(folderGameResource+"well-done.png");
        this.imgWellDone.setScale(appDelegate.deviceScaleFloat/1.5);
        this.imgWellDone.setPosition(this.imgPanel.getPositionX()-20*this.imgPanel.getScaleX(), this.imgPanel.getPositionY()+200*this.imgPanel.getScaleY());
        this.addChild(this.imgWellDone,2);
        var action1 = cc.MoveBy.create(.5,this.imgBackground.getScaleX()*20,-this.imgBackground.getScaleY()*100);
        var action2 = cc.ScaleTo.create(.3,this.imgWellDone.getScaleX()*1.5,this.imgWellDone.getScaleY()*1.5);
        var action3 = cc.ScaleTo.create(.3,this.imgWellDone.getScaleX(),this.imgWellDone.getScaleY())
        var sequence = cc.Sequence.create(action1,action2,action3);
        this.imgWellDone.runAction(sequence)
    },
    loadPillow:function()
    {
        var appDelegate = AppDelegate.sharedApplication();
        this.imgPillow=cc.Sprite.create(folderGameResource+"pillow.png");
        this.imgPillow.setScale(appDelegate.deviceScaleFloat/1.5);
        this.imgPillow.setPosition(this.imgPanel.getPositionX(), this.imgPanel.getPositionY()-100*this.imgPanel.getScaleY());
        this.addChild(this.imgPillow,3);
    },
    loadStar:function()
    {
        var appDelegate = AppDelegate.sharedApplication();
        this.imgStar=cc.Sprite.create(folderGameResource+"star.png");
        this.imgStar.setScale(appDelegate.deviceScaleFloat/2);
        this.imgStar.setPosition(this.imgPillow.getPositionX(), this.imgPillow.getPositionY()+210*this.imgPillow.getScaleY());
        this.addChild(this.imgStar,3);
        //var action1 = cc.Rotate.create(.5,this.imgBackground.getScaleX()*20,-this.imgBackground.getScaleY()*100);
        //var action2 = cc.RotateTo.create(1.5,-this.imgPillow.getScaleX()*1.5,this.imgWellDone.getScaleY()*1.5);
        var star_action1 = cc.RotateTo.create(4,90);
        var star_action2 = cc.RotateTo.create(4,-90)
        //var sequence = cc.RepeatForever.create(cc.Sequence.create(action1,action2));
        var star_sequence = cc.RepeatForever.create(cc.Sequence.create(star_action1,star_action2));
        this.imgStar.runAction(star_sequence)
    },
    loadWhiteSpark:function()
    {
        var appDelegate = AppDelegate.sharedApplication();
        this.imgWhiteSpark=cc.Sprite.create(folderGameResource+"white-spark.png");
        this.imgWhiteSpark.setScale(appDelegate.deviceScaleFloat);
        this.imgWhiteSpark.setPosition(this.imgStar.getPositionX(), this.imgStar.getPositionY()+20*this.imgStar.getScaleY());
        this.addChild(this.imgWhiteSpark,2);
        var action1 = cc.ScaleTo.create(1,this.imgWhiteSpark.getScaleX()*2,-this.imgWhiteSpark.getScaleY()*2);
        this.imgWhiteSpark.runAction(action1)
    },
 
 
});

GameEnd.create=function(gameStatus)
{
    var ret = new GameEnd();
    if(ret && ret.init(gameStatus)) {
        return ret;
    } else {
        delete ret;
        ret=null;
        return null;
    }
}
