var GameEnd=cc.Layer.extend({
    preload_resources:null,
	init:function(gameStatus)
    {
        if (this._super())
        {
            this.preload_resources=[];
            this.preload_resources.push(folderGameResource+"bg-.png");
            this.gameStatus = gameStatus;
            
            this.preload_resources.push(folderGameResource+"lock_box.png");
            this.preload_resources.push(folderGameResource+"coin_stock_box.png");
            this.preload_resources.push(folderGameResource+"victory.png");
            this.preload_resources.push(folderGameResource+"gold_coin.png");
            this.preload_resources.push(folderGameResource+"next.png");
            this.preload_resources.push(folderGameResource+"try_again.png");
            StorePanel.preLoadResource(this.preload_resources,this);
           
            return true;
        }
        return false;
    },
    loadCompleted:function()
    {
        // var appDelegate=AppDelegate.sharedApplication();
        // var gameStart=GameStart.sharedApplication();
        //gameStart.loadBackground();
        if(this.gameStatus=="win"){
            console.log("win");
        this.setBackground();
        this.loadBackgroundColor();
        this.lockBox();
        this.coinStockBox();
        this.victory();
        this.loadCollectButton();
        this.goldCoin();
        this.coinLabel();
        }
        if(this.gameStatus=="lose")
        {
            // this.setBackground();
            // this.loadBackgroundColor();
            // 
            console.log("defeat");
            this.setBackground();
            this.loadBackgroundColor();
            this.tryAgainButton();
        }
    },
    setBackground:function()
    {
        this.imgBackground=cc.Sprite.create(folderGameResource+"bg-.png");
        this.imgBackground.setScaleX(cc.winSize.width/this.imgBackground.getContentSize().width);
        this.imgBackground.setScaleY(cc.winSize.height/this.imgBackground.getContentSize().height);
        this.imgBackground.setPosition(cc.winSize.width/2, cc.winSize.height/2);
        this.addChild(this.imgBackground);
    },
    lockBox:function()
    {
        var appDelegate=AppDelegate.sharedApplication();
        this.imgLockBox=cc.Sprite.create(folderGameResource+"lock_box.png");
        if(appDelegate.deviceScaleFloat==0.5){
        this.imgLockBox.setScale(appDelegate.deviceScaleFloat*4);
        }
        else if(appDelegate.deviceScaleFloat>0.5){
            this.imgLockBox.setScale(appDelegate.deviceScaleFloat);
            }
        this.imgLockBox.setPosition(cc.winSize.width/2, cc.winSize.height/2);
        this.addChild(this.imgLockBox,2);
        this.imgLockBox_action1 = cc.MoveBy.create(1,0,0);
        this.imgLockBox_action2 = cc.FadeOut.create(.01);
        this.imgLockBox_sequence = cc.Sequence.create(this.imgLockBox_action1,this.imgLockBox_action2);
        this.imgLockBox.runAction(this.imgLockBox_sequence);
    },

    coinStockBox:function()
    {
        var appDelegate=AppDelegate.sharedApplication();
        this.imgCoinBox=cc.Sprite.create(folderGameResource+"coin_stock_box.png");
        this.imgCoinBox.setScale(this.imgLockBox.getScale());
        this.imgCoinBox.setPosition(cc.winSize.width/2, cc.winSize.height/2);
        this.addChild(this.imgCoinBox,2);
        this.imgCoinBox.setOpacity(0);
        this.imgCoinBox_action1 = cc.MoveBy.create(1,0,0);
        this.imgCoinBox_action2 = cc.FadeIn.create(.01);
        this.imgCoinBox_sequence = cc.Sequence.create(this.imgCoinBox_action1,this.imgCoinBox_action2);
        this.imgCoinBox.runAction(this.imgCoinBox_sequence);
    },
    victory:function()
    {
        var appDelegate=AppDelegate.sharedApplication();
        this.imgVictory=cc.Sprite.create(folderGameResource+"victory.png");
        this.imgVictory.setScale(appDelegate.deviceScaleFloat/4);
        this.imgVictory.setPosition(cc.winSize.width/2, cc.winSize.height/2+this.imgBackground.getScaleY()*300);
        this.addChild(this.imgVictory,2);
        this.imgVictory_action = cc.ScaleTo.create(.6, this.imgVictory.getScaleX()-this.imgVictory.getScaleX()/4,this.imgVictory.getScaleY()-this.imgVictory.getScaleY()/4);
        this.imgVictory_action1 = cc.ScaleTo.create(.6, this.imgVictory.getScaleX(),this.imgVictory.getScaleY());
        this.imgVictory_sequence = cc.RepeatForever.create(cc.Sequence.create(this.imgVictory_action,this.imgVictory_action1));
        this.imgVictory.runAction( this.imgVictory_sequence);
    },
    goldCoin:function()
    {
        this.imgGoldCoin=cc.Sprite.create(folderGameResource+"gold_coin.png");
        this.imgGoldCoin.setScale(this.imgLockBox.getScale()/2);
        this.imgGoldCoin.setPosition(cc.winSize.width-this.imgGoldCoin.getScaleX()*300, cc.winSize.height-this.imgGoldCoin.getScaleY()*50);
        this.addChild(this.imgGoldCoin,2);
        
    },
    gold:function()
    {
        for(var i=0;i<10;i++){
        this.imgGold=cc.Sprite.create(folderGameResource+"gold_coin.png");
        this.imgGold.setScale(this.imgLockBox.getScale()/2);
        this.imgGold.setPosition(cc.winSize.width/2+i%2*this.imgGold.getScaleX()*5, cc.winSize.height/2-i%3*this.imgGold.getScaleY()*5);
        this.addChild(this.imgGold,2);
        this.imgGold_action = cc.MoveBy.create(i*.2, cc.p(this.imgGoldCoin.getPositionX()-this.imgGoldCoin.getScaleX()*300,this.imgGoldCoin.getPositionY()-this.imgGoldCoin.getScaleY()*100));
        this.imgGold_action1 = cc.FadeOut.create(.1);
        this.imgGold.runAction(cc.Sequence.create(this.imgGold_action,this.imgGold_action1));
        }

    },
    loadCollectButton:function()
    {
        var strCollectImage = folderGameResource+"btn_collect.png";
        this.btnCollect = new ccui.Button();
        this.btnCollect.loadTextures(strCollectImage);
        this.btnCollect.setScale(this.imgLockBox.getScale()/4);
        
        this.btnCollect.setPosition(this.imgCoinBox.getPositionX(), this.imgCoinBox.getPositionY()-this.btnCollect.getScaleY()*700);
        this.btnCollect.addTouchEventListener(this.btnCollectCallBack,this);
        this.addChild(this.btnCollect,1);
        this.btnCollect_action = cc.ScaleTo.create(.6, this.btnCollect.getScaleX()+this.btnCollect.getScaleX()/4,this.btnCollect.getScaleY()+this.btnCollect.getScaleY()/4);
        this.btnCollect_action1 = cc.ScaleTo.create(.6, this.btnCollect.getScaleX(),this.btnCollect.getScaleY());
        this.btnCollect_sequence = cc.RepeatForever.create(cc.Sequence.create(this.btnCollect_action,this.btnCollect_action1));
        this.btnCollect.runAction( this.btnCollect_sequence);
 
    },
    nextButton:function()
    {
        var strNextImage = folderGameResource+"next.png";
        this.btnNext = new ccui.Button();
        this.btnNext.loadTextures(strNextImage);
        this.btnNext.setScale(this.imgLockBox.getScale()/4);
        
        this.btnNext.setPosition(this.imgCoinBox.getPositionX(), this.imgCoinBox.getPositionY()-this.btnNext.getScaleY()*700);
        this.btnNext.addTouchEventListener(this.btnNextCallBack,this);
        this.addChild(this.btnNext,1);
        this.btnNext_action = cc.ScaleTo.create(.6, this.btnNext.getScaleX()+this.btnNext.getScaleX()/4,this.btnNext.getScaleY()+this.btnNext.getScaleY()/4);
        this.btnNext_action1 = cc.ScaleTo.create(.6, this.btnNext.getScaleX(),this.btnNext.getScaleY());
        this.btnNext_sequence = cc.RepeatForever.create(cc.Sequence.create(this.btnNext_action,this.btnNext_action1));
        this.btnNext.runAction( this.btnNext_sequence);
 
    },
    tryAgainButton:function()
    {
        var appDelegate = AppDelegate.sharedApplication();
        var strTryImage = folderGameResource+"try_again.png";
        this.btnTryAgain = new ccui.Button();
        this.btnTryAgain.loadTextures(strTryImage);
        this.btnTryAgain.setScale(appDelegate.deviceScaleFloat/2);
        
        this.btnTryAgain.setPosition(cc.winSize.width/2,cc.winSize.height/2);
        this.btnTryAgain.addTouchEventListener(this.btnNextCallBack,this);
        this.addChild(this.btnTryAgain,1);
        this.btnTryAgain_action = cc.ScaleTo.create(.6, this.btnTryAgain.getScaleX()+this.btnTryAgain.getScaleX()/2,this.btnTryAgain.getScaleY()+this.btnTryAgain.getScaleY()/2);
        this.btnTryAgain_action1 = cc.ScaleTo.create(.6, this.btnTryAgain.getScaleX(),this.btnTryAgain.getScaleY());
        this.btnTryAgain_sequence = cc.RepeatForever.create(cc.Sequence.create(this.btnTryAgain_action,this.btnTryAgain_action1));
        this.btnTryAgain.runAction( this.btnTryAgain_sequence);
 
    },
    btnCollectCallBack:function()
    {
        var appDelegate=AppDelegate.sharedApplication();
        console.log(appDelegate.totalCoin);
        appDelegate.totalCoin = appDelegate.totalCoin+100;
        console.log(appDelegate.totalCoin);
        this.btnCollect.removeFromParent();

        //this.lblCoin.removeFromParent();
        this.lblCoin.setPosition(cc.p(this.imgGoldCoin.getPositionX()+this.imgGoldCoin.getScaleX()*100,this.imgGoldCoin.getPositionY()));
        
        this.lblCoin.setString(""+appDelegate.totalCoin);
        this.lblCoin.setColor(cc.color(234, 221, 202));
        this.gold();
        this.nextButton();
        

       
        appDelegate.gameLevel = appDelegate.gameLevel+1;
        console.log(appDelegate.gameLevel);
        
        
        //GameStart.sharedApplication();
        
        //this.runAction(cc.Sequence.create(cc.delayTime(4),cc.CallFunc.create(gameplay.removeFromParent, this)));
        
    },
    btnNextCallBack:function()
    {
        //this.runAction(cc.Sequence.create(cc.delayTime(.01),cc.CallFunc.create(this.gameLevel2, this)));
        //var gamePlayLevel1=GamePlayLevel1.sharedApplication();
        
        // var gamePlay=GamePlay.create();
        // this.addChild(gamePlay,1);
        cc.director.runScene(new GameNodeScene(),2);
        //this.removeFromParent(true);
        //gamePlayLevel1.removeFromParent(true);

        
        
    },
    

    coinLabel:function()
    {
        this.lblCoin=new cc.LabelTTF("+ 100");
        this.lblCoin.setFontSize(this.btnCollect.getScaleX()*150);
        this.lblCoin.setPosition(cc.p(this.btnCollect.getPositionX()-this.btnCollect.getScaleX()*60,this.btnCollect.getPositionY()));
        this.lblCoin.setColor(cc.color(0,0,0));
        this.addChild(this.lblCoin,2);
    },
    loadBackgroundColor:function()
    {
       this.colorBackground=cc.LayerColor.create(cc.color.black,cc.winSize.width,cc.winSize.height);
       this.colorBackground.setOpacity(0.5*255);
       this.colorBackground.setPosition(cc.p(0 , 0));
       this.addChild(this.colorBackground,1);
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
