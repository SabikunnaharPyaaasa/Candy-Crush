
var StorePanel=cc.Layer.extend({
    
    appDelegate:null,
    isSmallWindow:false,

	imgBackground:null,

    initDefaultValue:function()
    {
        appDelegate=AppDelegate.sharedApplication();
        this.isSmallWindow=false;
    },

    init:function()
    {
        if (this._super())
        {
            this.initDefaultValue();

            return true;
        }
        return false;
    },

    loadBackground:function(strImageName)
    {
        this.imgBackground=cc.Sprite.create(strImageName);
        this.imgBackground.setScaleX(cc.winSize.width/this.imgBackground.getContentSize().width);
        this.imgBackground.setScaleY(cc.winSize.height/this.imgBackground.getContentSize().height);
        this.imgBackground.setPosition(cc.winSize.width/2, cc.winSize.height/2);
        this.addChild(this.imgBackground);
    },
});

StorePanel.preLoadResource=function(preload_resources,that)
{
    cc.loader.load(
            preload_resources,
            function(err)
            {
                if(err) 
                {
                }
                else 
                {
                    that.loadCompleted();
                }
            }
    );
}

