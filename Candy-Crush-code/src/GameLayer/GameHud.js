
var GameHud=cc.Layer.extend({
    
    loadStorePanel:function(panelId)
    {
        switch(panelId)
        {
            // case Panel.GamePlay:
            //     {
            //         var appDelegate=AppDelegate.sharedApplication();
            //         var gamePlay=GamePlay.create();
            //         this.addChild(gamePlay,1);
            //     }
            //     break;
            // case Panel.GameStart:
            //     {
            //         var appDelegate=AppDelegate.sharedApplication();
            //         var gameStart=GameStart.create();
            //         this.addChild(gameStart,1);
            //     }
            //     break;
                case Panel.GamePlay:
                {
                    var appDelegate=AppDelegate.sharedApplication();
                    var gamePlay=GamePlay.create();
                    this.addChild(gamePlay,1);
                }
                break;
                // case Panel.GamePlayLevel2:
                // {
                //     var appDelegate=AppDelegate.sharedApplication();
                //     var gamePlayLevel2=GamePlayLevel2.create();
                //     this.addChild(gamePlayLevel2,1);
                // }
                // break;
                
            }
        }
    });

GameHud.create=function()
{
    var ret=new GameHud();

    if(ret && ret.init()) {
        return ret;
    } else {
        delete ret;
        ret=null;
        return null;
    }
}
