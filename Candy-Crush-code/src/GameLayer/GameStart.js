
// var GameStart = cc.Layer.extend({
//     GameLevel:1,


//     init:function()
//     {
//         if (this._super())
//         {
         
//             this.loadBackground();

//             //this.loadPipe();

           
//             //var gamePlay=GamePlay.sharedApplication();
//             //gamePlay.setPosition(gamePlay.getContentSize().width, cc.winSize.height);
//             // var appDelegate=AppDelegate.sharedApplication();
//             // appDelegate.gameHud.loadStorePanel(Panel.GamePlayLevel1,1);
//             var appDelegate=AppDelegate.sharedApplication();
//             if(appDelegate.GameLevel==2){
//             this.addChild(GamePlayLevel2.sharedApplication(),2);
//             //appDelegate.GameLevel=appDelegate.GameLevel+1;
//             }
//             else if(appDelegate.GameLevel==3){
//                 this.addChild(GamePlayLevel1.sharedApplication(),3);
//                 //appDelegate.GameLevel=appDelegate.GameLevel+1;
//             }
            

            
//             return true;
//         }
//         return false;
//     },

//     loadBackground:function()
//     {
//         var appDelegate=AppDelegate.sharedApplication();
//         this.imgBackground=cc.Sprite.create(folderGameResource+"bg.png");
//         this.imgBackground.setScaleX(cc.winSize.width/this.imgBackground.getContentSize().width);
//         this.imgBackground.setScaleY(cc.winSize.height/this.imgBackground.getContentSize().height);
//         this.imgBackground.setPosition(cc.winSize.width/2, cc.winSize.height/2);
//         this.addChild(this.imgBackground);
//     },


//     loadPipe:function()
//     {
//         var appDelegate=AppDelegate.sharedApplication();
//         this.imgPipe=cc.Sprite.create(folderGameResource+"pipe.png");
//         //this.imgPipe.setScaleX((cc.winSize.width/this.imgPipe.getContentSize().width)/2);
        
//         if(appDelegate.deviceScaleFloat==0.5){
//             this.imgPipe.setScaleX(appDelegate.deviceScaleFloat*4);
//         }
//         else if(appDelegate.deviceScaleFloat>0.5){
//             this.imgPipe.setScaleX(appDelegate.deviceScaleFloat);
//         }
//         this.imgPipe.setScaleY(cc.winSize.height/this.imgPipe.getContentSize().height);
//         this.imgPipe.setPosition(cc.winSize.width/2, cc.winSize.height/2);
//         this.addChild(this.imgPipe);

//         this.leftClip=cc.Sprite.create(folderGameResource+"lclip.png");
//         this.leftClip.setScaleX(this.imgPipe.getScaleX());
//         this.leftClip.setScaleY(this.imgPipe.getScaleY());
//         //this.leftClip.setPosition(cc.winSize.width/2-this.imgPipe.getContentSize().width/2-this.leftClip.getContentSize().width*2, cc.winSize.height/2+this.leftClip.getContentSize().height*2);
//         this.leftClip.setPosition(this.imgPipe.getPositionX()-this.imgPipe.getScaleX()*70, this.imgPipe.getPositionY()+this.imgPipe.getScaleY()*30);
//         this.addChild(this.leftClip,2);

//         this.rightClip=cc.Sprite.create(folderGameResource+"rclip.png");
//         this.rightClip.setScaleX(this.imgPipe.getScaleX());
//         this.rightClip.setScaleY(this.imgPipe.getScaleY());
//         //this.rightClip.setPosition(cc.winSize.width/2+this.imgPipe.getContentSize().width/2+this.rightClip.getContentSize().width*2, cc.winSize.height/2+this.rightClip.getContentSize().height*2);
//         this.rightClip.setPosition(this.imgPipe.getPositionX()+this.imgPipe.getScaleX()*70, this.imgPipe.getPositionY()+this.imgPipe.getScaleY()*30);
//         this.addChild(this.rightClip,2);
        
//     },

// });

// GameStart.sharedInstance=null;
    
// GameStart.sharedApplication=function() 
// {
//     if(GameStart.sharedInstance==null)
//     {
//         GameStart.sharedInstance=GameStart.create();
//     }
//     return GameStart.sharedInstance;
// }

// GameStart.create=function()
// {
//     var ret = new GameStart();
//     if(ret && ret.init()) {
//         GameStart.sharedInstance = ret;
//         return ret;
//     } else {
//         delete ret;
//         ret=null;
//         return null;
//     }
// }