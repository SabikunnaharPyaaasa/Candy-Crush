var GamePlay = cc.Layer.extend({
    allItem:[],
    init:function()
    {
        if (this._super())
        {
            this.loadBackground();
            this.loadCage();  
            this.loadScoreBoard();
            this.loadBoard();
            this.setTouchEnable();
        
            
            return true;
        }
        return false;
    },

    loadBackground:function()
    {
        var appDelegate=AppDelegate.sharedApplication();
        this.imgBackground=cc.Sprite.create(folderGameResource+"target-bg.png");
        this.imgBackground.setScaleX(cc.winSize.width/this.imgBackground.getContentSize().width);
        this.imgBackground.setScaleY(cc.winSize.height/this.imgBackground.getContentSize().height);
        this.imgBackground.setPosition(cc.winSize.width/2, cc.winSize.height/2);
        this.addChild(this.imgBackground);
        
    },
    loadCage:function()
    {
        var appDelegate=AppDelegate.sharedApplication();
        this.imgScoreBoard=cc.Sprite.create(folderGameResource+"cage.png");
        this.imgScoreBoard.setScale(appDelegate.deviceScaleFloat);
        this.imgScoreBoard.setPosition(cc.winSize.width/2+50*this.imgBackground.getScaleX(), cc.winSize.height/2+40*this.imgBackground.getScaleY());
        this.addChild(this.imgScoreBoard);
        
    },
    loadScoreBoard:function()
    {
        var appDelegate=AppDelegate.sharedApplication();
        this.imgScoreBoard=cc.Sprite.create(folderGameResource+"score-board.png");
        this.imgScoreBoard.setScale(appDelegate.deviceScaleFloat*3);
        this.imgScoreBoard.setPosition(cc.winSize.width/2-50*this.imgBackground.getScaleX(), cc.winSize.height/2+10*this.imgBackground.getScaleY());
        this.addChild(this.imgScoreBoard);
        
    },
    loadBoard:function()
    {
        var appDelegate=AppDelegate.sharedApplication();
        this.imgBoard=cc.Sprite.create(folderGameResource+"board.png");
        this.imgBoard.setScale(appDelegate.deviceScaleFloat);
        this.imgBoard.setPosition(cc.winSize.width/2, cc.winSize.height/2-80*this.imgBackground.getScaleY());
        this.addChild(this.imgBoard);

        //this.loadAllItem();
        this.loadDiamond();
    },
    loadDiamond:function()
    {
        for(var i=0;i<5;i++) 
        {
            this.allItem.push([]);
        }

        for(var i=0;i<5;i++)
        {
            for(var j=0;j<6;j++)
            {
                if(i==0 && j==0 || i==0 && j==2 || i==0 && j==5 || i==1 && j==5 || i==2 && j==0||i==2 && j==3||i==2 && j==4||i==3 && j==4)
                {
                    var appDelegate=AppDelegate.sharedApplication();
                    this.imgDiamond=cc.Sprite.create(folderGameResource+"diamond.png");
                    this.imgDiamond.setScale(this.imgBoard.getScale()*2);
                    this.imgDiamond.setPosition(this.imgBoard.getPositionX()-240*this.imgBoard.getScaleX()+j*96*this.imgBoard.getScaleX(), this.imgBoard.getPositionY()+190*this.imgBoard.getScaleY()-i*95*this.imgBoard.getScaleY());
                    this.imgDiamond.setTag(1);
                    this.addChild(this.imgDiamond);
                    this.allItem[i].push(this.imgDiamond);

                    // this.imgDiamond_action1 = cc.MoveBy.create(.2,-this.imgDiamond.getScaleX()*2,0)
                    // this.imgDiamond_action2 = cc.MoveBy.create(.5,this.imgDiamond.getScaleX()*2,0)
                    // this.imgDiamond_sequence = cc.Sequence.create(this.imgDiamond_action1,this.imgDiamond_action2);
                    // this.imgDiamond.runAction(cc.RepeatForever.create(this.imgDiamond_sequence));
                }

                if(i==0 && j==1 || i==0 && j==4 || i==1 && j==2 || i==2 && j==2||i==3 && j==0||i==3 && j==1||i==4 && j==1||i==4 && j==2||i==4 && j==4||i==4 && j==5)
                {
                    var appDelegate=AppDelegate.sharedApplication();
                    this.imgGold=cc.Sprite.create(folderGameResource+"gold.png");
                    this.imgGold.setScale(this.imgBoard.getScale()*2);
                    this.imgGold.setPosition(this.imgBoard.getPositionX()-240*this.imgBoard.getScaleX()+j*96*this.imgBoard.getScaleX(), this.imgBoard.getPositionY()+190*this.imgBoard.getScaleY()-i*95*this.imgBoard.getScaleY());
                    this.imgGold.setTag(2);
                    this.addChild(this.imgGold);
                    this.allItem[i].push(this.imgGold);
                }

                if(i==0 && j==3 || i==1 && j==0 || i==1 && j==1 || i==1 && j==3||i==1 && j==4||i==2 && j==1||i==2 && j==5||i==3 && j==2||i==3 && j==3||i==3 && j==5||i==4 && j==0||i==4 && j==3)
                {
                    var appDelegate=AppDelegate.sharedApplication();
                    this.imgRuby=cc.Sprite.create(folderGameResource+"ruby.png");
                    this.imgRuby.setScale(this.imgBoard.getScale()*2);
                    this.imgRuby.setPosition(this.imgBoard.getPositionX()-240*this.imgBoard.getScaleX()+j*96*this.imgBoard.getScaleX(), this.imgBoard.getPositionY()+190*this.imgBoard.getScaleY()-i*95*this.imgBoard.getScaleY());
                    this.imgRuby.setTag(3);
                    this.addChild(this.imgRuby);
                    this.allItem[i].push(this.imgRuby);
                    //cc.log(this.imgRuby.getContentSize());
                }
                
            }
            
        }
        
        
    },
    addItem:function(position)
    {
        this.randomTile = Math.floor(Math.random()*3);
        cc.log("random  "+this.randomTile);
        switch(this.randomTile){
            case 0:
                this.imgDiamond=cc.Sprite.create(folderGameResource+"diamond.png");
                this.imgDiamond.setScale(this.imgBoard.getScale()*2);
                this.imgDiamond.setPosition(position);
                this.imgDiamond.setTag(3);
                this.addChild(this.imgDiamond);    
            break;

            case 1:
                this.imgGold=cc.Sprite.create(folderGameResource+"gold.png");
                this.imgGold.setScale(this.imgBoard.getScale()*2);
                this.imgGold.setPosition(position);
                this.imgGold.setTag(3);
                this.addChild(this.imgGold);    
            break;

            case 2:
                this.imgRuby=cc.Sprite.create(folderGameResource+"ruby.png");
                this.imgRuby.setScale(this.imgBoard.getScale()*2);
                this.imgRuby.setPosition(position);
                this.imgRuby.setTag(3);
                this.addChild(this.imgRuby);    
            break;
        }
        var appDelegate=AppDelegate.sharedApplication();
        
        //this.allItem[i].push(this.imgRuby);
    }
,
    setTouchEnable: function () {
        //cc.log(this.getContentSize());

        
        //cc.log(tag);
        cc.eventManager.addListener(
            {
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                onTouchBegan: function (touch, event) {
                    return event.getCurrentTarget().onTouchBegan(touch, event);
                },
                onTouchMoved: function (touch, event) {
                    event.getCurrentTarget().onTouchMoved(touch, event);
                },
                onTouchEnded: function (touch, event) {
                    event.getCurrentTarget().onTouchEnded(touch, event);
                }
            },
            this
        );
    },
    onTouchBegan:function(touch, event)
	{
        console.log("Began");
        this.threshold = 20*this.imgBoard.getScale();
        for(var i=0;i<this.allItem.length;i++)
        {
            for(var j=0;j<this.allItem[i].length;j++)
            {
                cc.log("Tag--->  "+this.allItem[i][j].getTag());
                this.startRect = this.allItem[i][j].getBoundingBox();
                this.startPoint = touch.getLocation();
                if(cc.rectContainsPoint(this.startRect, this.startPoint)) 
                {
                    console.log("cooo");

                    this.startItem = this.allItem[i][j];
                    cc.log(this.startItem.getTag());
                
                } 
            }
        }
       
		return true;
	},
	onTouchMoved:function(touch, event)
	{
        console.log("Moved");
        
	},
	onTouchEnded:function(touch, event)
	{
        
        for(var i=0;i<this.allItem.length;i++)
        {
            for(var j=0;j<this.allItem[i].length;j++)
            {
                
                this.endRect = this.allItem[i][j].getBoundingBox();
                this.endPoint = touch.getLocation();
                
                if(cc.rectContainsPoint(this.endRect, this.endPoint)) 
                {
                    // console.log("last");
                    // cc.log("start  "+this.endPoint.x);
                    // cc.log("end"  +this.startPoint.y);
                    this.endItem = this.allItem[i][j];
                    cc.log("i value "+i);
                    cc.log("j value "+j);
                    if((this.endPoint.x>this.startPoint.x) && (this.endPoint.y>=this.startPoint.y-this.threshold && this.endPoint.y<=this.startPoint.y+this.threshold))
                    {
                        this.startItem.runAction(cc.MoveBy.create(1,100*this.imgBoard.getScaleX(),0));
                        this.endItem.runAction(cc.MoveBy.create(1,-100*this.imgBoard.getScaleX(),0));
                        cc.log("Right");
                        this.allItem[i][j] = this.startItem;
                        this.allItem[i][j-1] = this.endItem;
                        this.searchMatch(i,j);
                      
                        

                        //item matching
                        // var count = 0;
                        // if(this.startItem.getTag()==this.allItem[i][j+1].getTag())
                        // {
                        //     count = count+1;
                        //     cc.log("one");
                        //     if(this.allItem[i][j+1].getTag()==this.allItem[i][j+2].getTag())
                        //     {
                        //         count = count+1;
                        //         //var remove = this.allItem[i][j+1].removeFromParent();
                        //         //this.allItem[i][j+1].runAction(cc.Sequence.create(cc.delayTime(2),cc.CallFunc.create(this.allItem[i][j+1].removeFromParent,this)));
                        //         //this.addItem(this.allItem[i][j+1].getPosition());
                        //         //this.allItem[i][j+1] = this.addItem(this.allItem[i][j+1].getPosition())
                        //         //if(this.randomTile==0){this.allItem[i][j+1] = this.imgDiamond;}
                        //         //if(this.randomTile==1){this.allItem[i][j+1] = this.imgGold;}
                        //        // if(this.randomTile==2){this.allItem[i][j+1] = this.imgRuby;}
                        //         //this.runAction(cc.Sequence.create(cc.delayTime(1),this.allItem[i][j+1].removeFromParent()));
                                
                        //         cc.log("two");
                        //     }
                        //     if(this.allItem[i][j+1].getTag()==this.allItem[i+1][j+1].getTag())
                        //     {
                        //         count = count+1;
                        //         //this.allItem[i+1][j+1].removeFromParent();
                        //         this.addItem(this.allItem[i][j+1].getPosition());
                        //         cc.log("two");
                        //     }
                            
                        // }
                        // if(this.startItem.getTag()==this.allItem[i+1][j].getTag())
                        // {
                        //     count = count+1;
                        //     if(this.allItem[i+1][j].getTag()==this.allItem[i+2][j].getTag())
                        //     {
                        //         count = count+1;
                        //         //this.allItem[i+2][j].removeFromParent();
                        //     }
                            
                        // }

                        // if(this.startItem.getTag()==this.allItem[i-1][j].getTag())
                        // {
                        //     count = count+1;
                        //     this.allItem[i-1][j].removeFromParent();
                        //     cc.log("whatt");
                        //     if(this.allItem[i+1][j].getTag()==this.allItem[i+2][j].getTag())
                        //     {
                        //         count = count+1;
                        //     }
                        // }
                        // for(var i=0;i<this.allItem.length;i++)
                        // {
                        //     for(var j=0;j<this.allItem[i].length;j++)
                        //     {
                        //         cc.log("End Tag--->  "+this.allItem[i][j].getTag());
                        //     }
                        // }
                        

                    }
                    else if((this.endPoint.x<this.startPoint.x)&& (this.endPoint.y>=this.startPoint.y-this.threshold && this.endPoint.y<=this.startPoint.y+this.threshold))
                    {
                        this.startItem.runAction(cc.MoveBy.create(1,-100*this.imgBoard.getScaleX(),0));
                        this.endItem.runAction(cc.MoveBy.create(1,100*this.imgBoard.getScaleX(),0));
                        cc.log("Left");
                        
                        this.allItem[i][j] = this.startItem;
                        this.allItem[i][j+1] = this.endItem;

                        for(var i=0;i<this.allItem.length;i++)
                        {
                            for(var j=0;j<this.allItem[i].length;j++)
                            {
                                cc.log("End Tag--->  "+this.allItem[i][j].getTag());
                            }
                        }
                    }
                    else if((this.endPoint.y<this.startPoint.y) && (this.endPoint.x>=this.startPoint.x-this.threshold && this.endPoint.x<=this.startPoint.x+this.threshold))
                    {
                        this.startItem.runAction(cc.MoveBy.create(1,0,-100*this.imgBoard.getScaleY()));
                        this.endItem.runAction(cc.MoveBy.create(1,0,100*this.imgBoard.getScaleY()));
                        cc.log("Down");
                        this.allItem[i][j] = this.startItem;
                        this.allItem[i-1][j] = this.endItem;

                        for(var i=0;i<this.allItem.length;i++)
                        {
                            for(var j=0;j<this.allItem[i].length;j++)
                            {
                                cc.log("End Tag--->  "+this.allItem[i][j].getTag());
                            }
                        }
                    }
                    else if((this.endPoint.y>this.startPoint.y) && (this.endPoint.x>=this.startPoint.x-this.threshold && this.endPoint.x<=this.startPoint.x+this.threshold))
                    {
                        this.startItem.runAction(cc.MoveBy.create(1,0,100*this.imgBoard.getScaleY()));
                        this.endItem.runAction(cc.MoveBy.create(1,0,-100*this.imgBoard.getScaleY()));
                        cc.log("Up");
                        this.allItem[i][j] = this.startItem;
                        this.allItem[i+1][j] = this.endItem;

                        for(var i=0;i<this.allItem.length;i++)
                        {
                            for(var j=0;j<this.allItem[i].length;j++)
                            {
                                cc.log("End Tag--->  "+this.allItem[i][j].getTag());
                            }
                        }
                    }
                }
            } 
        }
        console.log("Ended");
	},

    searchMatch: function(currentRow, currentCol){
        matchHorizontal = [];
        matchVertical = [];
        var count = 1;

        // Vertical Search
        matchVertical.push({
                row: currentRow,
                col: currentCol,
                val: this.allItem[currentRow][currentCol].getTag()
                
            });
            

        for(var i=1; (currentRow+i<5 && currentRow+i>=0) && (this.allItem[currentRow+i][currentCol].getTag() == this.allItem[currentRow][currentCol].getTag()); i++){
            matchVertical.push({
                row: currentRow+i,
                col: currentCol,
                val: this.allItem[currentRow+i][currentCol].getTag()
                
            });
            count=count+1;
            for(var j=1; (currentCol+j<6 && currentCol+j>=0) && (this.allItem[currentRow][currentCol+j].getTag() == this.allItem[currentRow][currentCol].getTag()); j++){
                matchHorizontal.push({
                    row: currentRow,
                    col: currentCol+j,
                    val: this.allItem[currentRow][currentCol+j].getTag()
                });
                count=count+1;
            }

        }

        for(var i=-1; (currentRow+i<5 && currentRow+i>=0) && (this.allItem[currentRow+i][currentCol].getTag() == this.allItem[currentRow][currentCol].getTag()); i--){
            matchVertical.push({
                row: currentRow+i,
                col: currentCol,
                val: this.allItem[currentRow+i][currentCol].getTag()
            });
            count=count+1;
        }

        for(var i=1; (currentCol+i<6 && currentCol+i>=0) && (this.allItem[currentRow][currentCol+i].getTag() == this.allItem[currentRow][currentCol].getTag()); i++){
            matchHorizontal.push({
                row: currentRow,
                col: currentCol+i,
                val: this.allItem[currentRow][currentCol+i].getTag()
            });
            count=count+1;
        }

        for(var i=-1; (currentCol+i<6 && currentCol+i>=0) && (this.allItem[currentRow][currentCol+i].getTag() == this.allItem[currentRow][currentCol].getTag()); i--){
            matchHorizontal.push({
                row: currentRow,
                col: currentCol+i,
                val: this.allItem[currentRow][currentCol+i].getTag()
            });
            count=count+1;
        }
        cc.log("Hi "+count);
    }

});


GamePlay.sharedInstance=null;
    
GamePlay.sharedApplication=function() 
{
    if(GamePlay.sharedInstance==null)
    {
        GamePlay.sharedInstance=GamePlay.create();
    }
    return GamePlay.sharedInstance;
}


GamePlay.create=function()
{
    var ret = new GamePlay();
    if(ret && ret.init()) {
        return ret;
    } else {
        delete ret;
        ret=null;
        return null;
    }
}