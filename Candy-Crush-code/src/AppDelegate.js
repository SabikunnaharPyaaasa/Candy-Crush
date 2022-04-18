
const Panel=
{
    GamePlay : 101,
};


var AppDelegate=cc.Layer.extend({
    deviceScaleFloat:1,
    
    gameNode:null,
    gameHud:null,
    totalCoin:0,
    isTouchSwallowed:false,

    init:function()
    {
        if (this._super())
        {
            this.deviceScaleFloat=1;
            var rectSize = cc.view.getFrameSize();
                  
            if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS)
            {
                if(rectSize.height==2436 && rectSize.width==1125) this.deviceScaleFloat=1.65;
                else if(rectSize.height==2208 && rectSize.width==1242) this.deviceScaleFloat=1.92;
                else if(rectSize.height==1334 && rectSize.width==750) this.deviceScaleFloat=1.17;
                else if(rectSize.height==2048 && rectSize.width==1536) this.deviceScaleFloat=1.9;
                else if(rectSize.height==1024 && rectSize.width==768) this.deviceScaleFloat=0.95;
                
            }
            else
            {
                if(rectSize.height>=2048 && rectSize.width>=640*2.0) this.deviceScaleFloat=2.0;
                else if(rectSize.height>=1792 && rectSize.width>=640*1.75) this.deviceScaleFloat=1.75;
                else if(rectSize.height>=1536 && rectSize.width>=640*1.5) this.deviceScaleFloat=1.5;
                else if(rectSize.height>=1280 && rectSize.width>=640*1.25) this.deviceScaleFloat=1.25;
                else if(rectSize.height>=1152 && rectSize.width>=640*1.125) this.deviceScaleFloat=1.125;
                
                else if(rectSize.height>=960 && rectSize.width>=640*1.0) this.deviceScaleFloat=1.0;
                else if(rectSize.height>=840 && rectSize.width>=640*0.875) this.deviceScaleFloat=0.875;
                else if(rectSize.height>=720 && rectSize.width>=640*0.75) this.deviceScaleFloat=0.75;
                else if(rectSize.height>=600 && rectSize.width>=600*1.5) this.deviceScaleFloat=1;
                else if(rectSize.height>=480 && rectSize.width>=640*0.5) this.deviceScaleFloat=0.5;
                else this.deviceScaleFloat=0.4;
            }
                                
            cc.log("rectSize.height/rectSize.width " + rectSize.height + " " + rectSize.width);
            cc.log("this.deviceScaleFloat " + this.deviceScaleFloat);
                                
            this.runAction(cc.Sequence.create(cc.delayTime(0.1),cc.CallFunc.create(this.callAfterLoad, this)));

            return true;
        }
        return false;
    },

    callAfterLoad:function()
    {
        cc.director.runScene(new GameNodeScene());

    },
});

AppDelegate.create=function() 
{
    var ret=new AppDelegate();

    if(ret && ret.init()) {
        return ret;
    } else {
        delete ret;
        ret=null;
        return null;
    }
}

AppDelegate.sharedInstance=null;    
AppDelegate.sharedApplication=function() 
{
    if(AppDelegate.sharedInstance==null)
    {
        AppDelegate.sharedInstance=AppDelegate.create();
    }
    return AppDelegate.sharedInstance;
}


var AppDelegateScene=cc.Scene.extend({
    onEnter:function () {
        this._super();

        var appDelegate=AppDelegate.sharedApplication();
        this.addChild(appDelegate,1);
    } 
});




