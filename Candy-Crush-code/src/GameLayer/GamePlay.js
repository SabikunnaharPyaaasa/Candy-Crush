var GamePlay = cc.Layer.extend({
    allItem:[],
    match:false,
    scoreDiamond:0,
    scoreGold:0,
    scoreRuby:0,
    init:function()
    {
        if (this._super())
        {
            this.loadBackground();
            this.loadBackgroundTop();
            this.loadBoard(); 
            //this.loadCage();
            this.loadScoreBoard();
            this.setTouchEnable();
            this.totalScore();
           
            this.runAction(cc.Sequence.create(cc.delayTime(45),cc.CallFunc.create(this.gameOver, this)));
        
            
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
    loadBackgroundTop:function()
    {
        var appDelegate=AppDelegate.sharedApplication();
        //var strBackground = this.Level[appDelegate.gameLevel][0][0];
        this.imgBackgroundTop=cc.Sprite.create(folderGameResource+"top.png");
        this.imgBackgroundTop.setScaleX(cc.winSize.width/this.imgBackgroundTop.getContentSize().width);
        //this.imgBackgroundTop.setScaleY(cc.winSize.height);
        this.imgBackgroundTop.setPosition(cc.winSize.width/2, cc.winSize.height-this.imgBackground.getScaleY()*25);
        this.addChild(this.imgBackgroundTop);
        
    },
    loadCage:function()
    {
        var appDelegate=AppDelegate.sharedApplication();
        this.imgScoreBoard=cc.Sprite.create(folderGameResource+"cage.png");
        this.imgScoreBoard.setScale(appDelegate.deviceScaleFloat);
        this.imgScoreBoard.setPosition(this.imgBoard.getPositionX()+200*this.imgBoard.getScaleX(), this.imgBoard.getPositionY()+450*this.imgBoard.getScaleY());
        this.addChild(this.imgScoreBoard);
        
    },
    loadScoreBoard:function()
    {
        var appDelegate=AppDelegate.sharedApplication();
        for(var i=0;i<3;i++)
        {
            this.imgScoreBoard=cc.Sprite.create(folderGameResource+"score-board.png");
            this.imgScoreBoard.setScale(appDelegate.deviceScaleFloat*3);
            this.imgScoreBoard.setPosition(this.imgBoard.getPositionX()-200*this.imgBoard.getScaleX()+i*200*this.imgBoard.getScaleX(), cc.winSize.height-this.imgBackground.getScaleY()*45);
            this.addChild(this.imgScoreBoard);
            if(i==0){
                this.imgDiamondIcon=cc.Sprite.create(folderGameResource+"diamond.png");
                this.imgDiamondIcon.setScale(this.imgBoard.getScale()*1.3);
                this.imgDiamondIcon.setPosition(this.imgScoreBoard.getPositionX()-30*this.imgBackground.getScaleX(),this.imgScoreBoard.getPositionY()+20*this.imgBackground.getScaleY());
                this.imgDiamondIcon.setTag(1);
                this.addChild(this.imgDiamondIcon);
                var dia_action1 = cc.RotateTo.create(1,45);
                var dia_action2 = cc.RotateTo.create(1,-45);
                var dia_sequence = cc.RepeatForever.create(cc.Sequence.create(dia_action1,dia_action2));
                this.imgDiamondIcon.runAction(dia_sequence);

            }
            if(i==1){
                this.imgGoldIcon=cc.Sprite.create(folderGameResource+"gold.png");
                this.imgGoldIcon.setScale(this.imgBoard.getScale()*1.3);
                this.imgGoldIcon.setPosition(this.imgScoreBoard.getPositionX()-30*this.imgBackground.getScaleX(),this.imgScoreBoard.getPositionY()+20*this.imgBackground.getScaleY());
                this.imgGoldIcon.setTag(1);
                this.addChild(this.imgGoldIcon);
                var gold_action1 = cc.RotateTo.create(1,-45);
                var gold_action2 = cc.RotateTo.create(1,45);
                var gold_sequence = cc.RepeatForever.create(cc.Sequence.create(gold_action1,gold_action2));
                this.imgGoldIcon.runAction(gold_sequence);
            }
            if(i==2){
                this.imgRubyIcon=cc.Sprite.create(folderGameResource+"ruby.png");
                this.imgRubyIcon.setScale(this.imgBoard.getScale()*1.3);
                this.imgRubyIcon.setPosition(this.imgScoreBoard.getPositionX()-30*this.imgBackground.getScaleX(),this.imgScoreBoard.getPositionY()+20*this.imgBackground.getScaleY());
                this.imgRubyIcon.setTag(1);
                this.addChild(this.imgRubyIcon);
                var ruby_action1 = cc.ScaleTo.create(1,-this.imgRubyIcon.getScaleX(),this.imgRubyIcon.getScaleY());
                var ruby_action2 = cc.ScaleTo.create(1,this.imgRubyIcon.getScaleX(),this.imgRubyIcon.getScale());
                var ruby_sequence = cc.RepeatForever.create(cc.Sequence.create(ruby_action1,ruby_action2));
                this.imgRubyIcon.runAction(ruby_sequence);
            }
        }

        
        
    },
    loadBoard:function()
    {
        var appDelegate=AppDelegate.sharedApplication();
        this.imgBoard=cc.Sprite.create(folderGameResource+"board.png");
        this.imgBoard.setScale(appDelegate.deviceScaleFloat*1.4);
        this.imgBoard.setPosition(cc.winSize.width/2, this.imgBoard.getContentSize().height/2+50*this.imgBackground.getScaleY());
        this.addChild(this.imgBoard);

        this.loadAllItem();
        //this.loadDiamond();
    },
    loadAllItem:function()
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
    totalScore:function()
    {
        this.lblDiamondScore=new cc.LabelTTF(this.score, "Arial");
        this.lblDiamondScore.setFontSize(60);
        this.lblDiamondScore.setPosition(cc.p(this.imgDiamondIcon.getPosition().x+25*this.imgScoreBoard.getScaleX(),this.imgDiamondIcon.getPosition().y-40*this.imgScoreBoard.getScaleY()));
        this.lblDiamondScore.setColor(cc.color(0,32,255));
        this.addChild(this.lblDiamondScore);

        this.lblGoldScore=new cc.LabelTTF(this.score, "Arial");
        this.lblGoldScore.setFontSize(60);
        this.lblGoldScore.setPosition(cc.p(this.imgGoldIcon.getPosition().x+25*this.imgScoreBoard.getScaleX(),this.imgGoldIcon.getPosition().y-40*this.imgScoreBoard.getScaleY()));
        this.lblGoldScore.setColor(cc.color(255,255,0));
        this.addChild(this.lblGoldScore);

        this.lblRubyScore=new cc.LabelTTF(this.score, "Arial");
        this.lblRubyScore.setFontSize(60);
        this.lblRubyScore.setPosition(cc.p(this.imgRubyIcon.getPosition().x+25*this.imgScoreBoard.getScaleX(),this.imgRubyIcon.getPosition().y-40*this.imgScoreBoard.getScaleY()));
        this.lblRubyScore.setColor(cc.color(255,0,0));
        this.addChild(this.lblRubyScore);
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
                this.imgDiamond.setTag(1);
                this.addChild(this.imgDiamond);   
                this.imgDiamond.setOpacity(0);
                var fade_action = cc.FadeIn.create(.1);
                this.imgDiamond.runAction(cc.Sequence.create(cc.delayTime(0.5),fade_action)); 
            break;

            case 1:
                this.imgGold=cc.Sprite.create(folderGameResource+"gold.png");
                this.imgGold.setScale(this.imgBoard.getScale()*2);
                this.imgGold.setPosition(position);
                this.imgGold.setTag(2);
                this.addChild(this.imgGold);   
                this.imgGold.setOpacity(0);
                var fade_action = cc.FadeIn.create(.1);
                this.imgGold.runAction(cc.Sequence.create(cc.delayTime(0.5),fade_action)); 
            break;

            case 2:
                this.imgRuby=cc.Sprite.create(folderGameResource+"ruby.png");
                this.imgRuby.setScale(this.imgBoard.getScale()*2);
                this.imgRuby.setPosition(position);
                this.imgRuby.setTag(3);
                this.addChild(this.imgRuby);
                this.imgRuby.setOpacity(0); 
                var fade_action = cc.FadeIn.create(.1);
                this.imgRuby.runAction(cc.Sequence.create(cc.delayTime(0.5),fade_action));    
            break;
        }
    },
    animation:function(position,tag)
    {
        switch(tag){
            case 1:
                this.imgDiamondAnimation=cc.Sprite.create(folderGameResource+"blue-spark.png");
                this.imgDiamondAnimation.setScale(this.imgBoard.getScale()/2);
                this.imgDiamondAnimation.setPosition(position);
                this.imgDiamondAnimation.setTag(1);
                this.addChild(this.imgDiamondAnimation);   
                var fade_action = cc.FadeIn.create(.1);
                var scale_action = cc.ScaleBy.create(1,this.imgDiamondAnimation.getScaleX()*3,this.imgDiamondAnimation.getScaleY()*3);
                var fade_out = cc.FadeOut.create(.3);
                var sequence = cc.Sequence.create(fade_action,scale_action,fade_out)
                this.imgDiamondAnimation.runAction(sequence); 
                this.scoreDiamond= this.scoreDiamond+1;
                this.lblDiamondScore.setString(this.scoreDiamond);
            break;

            case 2:
                this.imgGoldAnimation=cc.Sprite.create(folderGameResource+"yellow-spark.png");
                this.imgGoldAnimation.setScale(this.imgBoard.getScale()/10);
                this.imgGoldAnimation.setPosition(position);
                this.imgGoldAnimation.setTag(2);
                this.addChild(this.imgGoldAnimation);   
                this.imgGoldAnimation.setOpacity(0);
                var fade_action = cc.FadeIn.create(.1);
                var scale_action = cc.ScaleBy.create(1,this.imgGoldAnimation.getScaleX()*14,this.imgGoldAnimation.getScaleY()*14);
                var fade_out = cc.FadeOut.create(.3);
                var sequence = cc.Sequence.create(fade_action,scale_action,fade_out)
                this.imgGoldAnimation.runAction(sequence); 
                this.scoreGold= this.scoreGold+1;
                this.lblGoldScore.setString(this.scoreGold);
            break;

            case 3:
                this.imgRubyAnimation=cc.Sprite.create(folderGameResource+"red-spark.png");
                this.imgRubyAnimation.setScale(this.imgBoard.getScale()/10);
                this.imgRubyAnimation.setPosition(position);
                this.imgRubyAnimation.setTag(3);
                this.addChild(this.imgRubyAnimation);
                var fade_action = cc.FadeIn.create(.1);
                var scale_action = cc.ScaleBy.create(.5,this.imgRubyAnimation.getScaleX()*20,this.imgRubyAnimation.getScaleY()*20);
                var fade_out = cc.FadeOut.create(.3);
                var sequence = cc.Sequence.create(fade_action,scale_action,fade_out)
                this.imgRubyAnimation.runAction(sequence);  
                this.scoreRuby= this.scoreRuby+1;
                this.lblRubyScore.setString(this.scoreRuby);
            break;
        }
    },
    setTouchEnable: function () {
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
                    //console.log("cooo");

                    this.startItem = this.allItem[i][j];
                    //cc.log(this.startItem.getTag());
                
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
        
        for(var i=0;i<5;i++)
        {
            for(var j=0;j<6;j++)
            {
                
                this.endRect = this.allItem[i][j].getBoundingBox();
                this.endPoint = touch.getLocation();
                
                if(cc.rectContainsPoint(this.endRect, this.endPoint)) 
                {
                    this.endItem = this.allItem[i][j];
                    //cc.log("i value "+i);
                    //cc.log("j value "+j);
                    if((this.endPoint.x>this.startPoint.x) && (this.endPoint.y>=this.startPoint.y-this.threshold && this.endPoint.y<=this.startPoint.y+this.threshold))
                    {
                        cc.log("Right");
                        this.allItem[i][j] = this.startItem;
                        this.allItem[i][j-1] = this.endItem;
                        var touchSide = "right";
                        this.searchMatch(i,j,i,j-1,touchSide);
                    }
                    else if((this.endPoint.x<this.startPoint.x)&& (this.endPoint.y>=this.startPoint.y-this.threshold && this.endPoint.y<=this.startPoint.y+this.threshold))
                    {
                        cc.log("Left");
                        var touchSide = "left";
                        this.allItem[i][j] = this.startItem;
                        this.allItem[i][j+1] = this.endItem;
                        this.searchMatch(i,j,i,j+1,touchSide);
                        
                    }
                    else if((this.endPoint.y<this.startPoint.y) && (this.endPoint.x>=this.startPoint.x-this.threshold && this.endPoint.x<=this.startPoint.x+this.threshold))
                    {
                        // this.startItem.runAction(cc.MoveBy.create(.5,0,-100*this.imgBoard.getScaleY()));
                        // this.endItem.runAction(cc.MoveBy.create(.5,0,100*this.imgBoard.getScaleY()));
                        cc.log("Down");
                        var touchSide="down"
                        this.allItem[i][j] = this.startItem;
                        this.allItem[i-1][j] = this.endItem;
                        this.searchMatch(i,j,i-1,j,touchSide);
                    }
                    else if((this.endPoint.y>this.startPoint.y) && (this.endPoint.x>=this.startPoint.x-this.threshold && this.endPoint.x<=this.startPoint.x+this.threshold))
                    {
                        // this.startItem.runAction(cc.MoveBy.create(.5,0,100*this.imgBoard.getScaleY()));
                        // this.endItem.runAction(cc.MoveBy.create(.5,0,-100*this.imgBoard.getScaleY()));
                        cc.log("Up");
                        var touchSide="up"
                        this.allItem[i][j] = this.startItem;
                        this.allItem[i+1][j] = this.endItem;
                        this.searchMatch(i,j,i+1,j,touchSide);
                    }
                }
            } 
        }
        console.log("Ended");
	},
    

    searchMatch: function(currentRow, currentCol,prevRow, prevCol,touchSide){
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
            //Horizontal search for each Down vertical element
            for(var j=1; (currentCol+j<6 && currentCol+j>=0) && (this.allItem[currentRow+i][currentCol+j].getTag() == this.allItem[currentRow+i][currentCol].getTag()); j++){
                matchHorizontal.push({
                    row: currentRow+i,
                    col: currentCol+j,
                    val: this.allItem[currentRow+i][currentCol+j].getTag()
                });
            count=count+1;
            }
            for(var j=-1; (currentCol+j<6 && currentCol+j>=0) && (this.allItem[currentRow+i][currentCol+j].getTag() == this.allItem[currentRow+i][currentCol].getTag()); j--){
                matchHorizontal.push({
                    row: currentRow+i,
                    col: currentCol+j,
                    val: this.allItem[currentRow+i][currentCol+j].getTag()
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
            //Horizontal search for each Up vertical element
            for(var j=1; (currentCol+j<6 && currentCol+j>=0) && (this.allItem[currentRow+i][currentCol+j].getTag() == this.allItem[currentRow+i][currentCol].getTag()); j++){
                matchHorizontal.push({
                    row: currentRow+i,
                    col: currentCol+j,
                    val: this.allItem[currentRow+i][currentCol+j].getTag()
                });
                count=count+1;
            }
            for(var j=-1; (currentCol+j<6 && currentCol+j>=0) && (this.allItem[currentRow+i][currentCol+j].getTag() == this.allItem[currentRow+i][currentCol].getTag()); j--){
                matchHorizontal.push({
                    row: currentRow+i,
                    col: currentCol+j,
                    val: this.allItem[currentRow+i][currentCol+j].getTag()
                });
                count=count+1;
            }
        }

        //Horizontal Search
        for(var i=1; (currentCol+i<6 && currentCol+i>=0) && (this.allItem[currentRow][currentCol+i].getTag() == this.allItem[currentRow][currentCol].getTag()); i++){
            matchHorizontal.push({
                row: currentRow,
                col: currentCol+i,
                val: this.allItem[currentRow][currentCol+i].getTag()
            });
            count=count+1;
            //Vertical search for each right Horizontal element
            for(var j=1; (currentRow+j<5 && currentRow+j>=0) && (this.allItem[currentRow+j][currentCol+i].getTag() == this.allItem[currentRow][currentCol+i].getTag()); j++){
                matchHorizontal.push({
                    row: currentRow+j,
                    col: currentCol+i,
                    val: this.allItem[currentRow+j][currentCol+i].getTag()
                });
                count=count+1;
            }
            for(var j=-1; (currentRow+j<5 && currentRow+j>=0) && (this.allItem[currentRow+j][currentCol+i].getTag() == this.allItem[currentRow][currentCol+i].getTag()); j--){
                matchHorizontal.push({
                    row: currentRow+j,
                    col: currentCol+i,
                    val: this.allItem[currentRow+j][currentCol+i].getTag()
                });
                count=count+1;
            }
        }

        for(var i=-1; (currentCol+i<6 && currentCol+i>=0) && (this.allItem[currentRow][currentCol+i].getTag() == this.allItem[currentRow][currentCol].getTag()); i--){
            matchHorizontal.push({
                row: currentRow,
                col: currentCol+i,
                val: this.allItem[currentRow][currentCol+i].getTag()
            });
            count=count+1;
            //Vertical search for each left Horizontal element
            for(var j=1; (currentRow+j<5 && currentRow+j>=0) && (this.allItem[currentRow+j][currentCol+i].getTag() == this.allItem[currentRow][currentCol+i].getTag()); j++){
                matchHorizontal.push({
                    row: currentRow+j,
                    col: currentCol+i,
                    val: this.allItem[currentRow+j][currentCol+i].getTag()
                });
                count=count+1;
            }
            for(var j=-1; (currentRow+j<5 && currentRow+j>=0) && (this.allItem[currentRow+j][currentCol+i].getTag() == this.allItem[currentRow][currentCol+i].getTag()); j--){
                matchHorizontal.push({
                    row: currentRow+j,
                    col: currentCol+i,
                    val: this.allItem[currentRow+j][currentCol+i].getTag()
                });
                count=count+1;
            }
        }
      
        if(count>=3)
        {
            // this.score = this.score+count;
            // cc.log("Score"+this.score);
            
            if(touchSide=="right")
            {
                this.startItem.runAction(cc.MoveBy.create(.3,100*this.imgBoard.getScaleX(),0));
                this.endItem.runAction(cc.MoveBy.create(.3,-100*this.imgBoard.getScaleX(),0));
            }
            if(touchSide=="left")
            {
                this.startItem.runAction(cc.MoveBy.create(.3,-100*this.imgBoard.getScaleX(),0));
                this.endItem.runAction(cc.MoveBy.create(.3,100*this.imgBoard.getScaleX(),0));
            }
            if(touchSide=="up")
            {
                this.startItem.runAction(cc.MoveBy.create(.3,0,100*this.imgBoard.getScaleY()));
                this.endItem.runAction(cc.MoveBy.create(.3,0,-100*this.imgBoard.getScaleY()));
            }
            if(touchSide=="down")
            {
                this.startItem.runAction(cc.MoveBy.create(.3,0,-100*this.imgBoard.getScaleY()));
                this.endItem.runAction(cc.MoveBy.create(.3,0,100*this.imgBoard.getScaleY()));
            }
            for(var i=0;i<matchHorizontal.length;i++)
            {
               //cc.log("horizontal tag "+this.allItem[matchHorizontal[i].row][matchHorizontal[i].col].getTag());
               //cc.log("Hozi "+matchHorizontal.length);
               this.allItem[matchHorizontal[i].row][matchHorizontal[i].col].setTag(10);
               
            }
            for(var i=0;i<matchVertical.length;i++)
            {
               cc.log("vartical tag"+this.allItem[matchVertical[i].row][matchVertical[i].col].getTag());
               this.tag = this.allItem[matchVertical[i].row][matchVertical[i].col].getTag();
               this.allItem[matchVertical[i].row][matchVertical[i].col].setTag(10);
            //    this.scheduleOnce(this.remove,1.5);

               //this.allItem[matchVertical[i].row][matchVertical[i].col].removeFromParent();
            }
            this.runAction(cc.Sequence.create(cc.delayTime(0.8),cc.CallFunc.create(this.removeVisitedItem, this)));
            this.scheduleOnce(this.remove,1.5);
        }
        else{
            if(touchSide=="right")
            {
                var startItem_action1 = cc.MoveBy.create(.5,100*this.imgBoard.getScaleX(),0);
                var startItem_action2 = cc.MoveBy.create(.5,-100*this.imgBoard.getScaleX(),0);
                var startItem_sequence = cc.Sequence.create(startItem_action1,startItem_action2);
                this.startItem.runAction(startItem_sequence);

                var endItem_action1 = cc.MoveBy.create(.5,-100*this.imgBoard.getScaleX(),0);
                var endItem_action2 = cc.MoveBy.create(.5,100*this.imgBoard.getScaleX(),0);
                var endItem_sequence = cc.Sequence.create(endItem_action1, endItem_action2);
                this.endItem.runAction(endItem_sequence); 
            }
            if(touchSide=="left")
            {
                var startItem_action1 = cc.MoveBy.create(.5,-100*this.imgBoard.getScaleX(),0);
                var startItem_action2 = cc.MoveBy.create(.5,100*this.imgBoard.getScaleX(),0);
                var startItem_sequence = cc.Sequence.create(startItem_action1,startItem_action2);
                this.startItem.runAction(startItem_sequence);

                var endItem_action1 = cc.MoveBy.create(.5,100*this.imgBoard.getScaleX(),0);
                var endItem_action2 = cc.MoveBy.create(.5,-100*this.imgBoard.getScaleX(),0);
                var endItem_sequence = cc.Sequence.create(endItem_action1, endItem_action2);
                this.endItem.runAction(endItem_sequence);
            }
            if(touchSide=="up")
            {
                var startItem_action1 = cc.MoveBy.create(.5,0,100*this.imgBoard.getScaleY());
                var startItem_action2 = cc.MoveBy.create(.5,0,-100*this.imgBoard.getScaleY());
                var startItem_sequence = cc.Sequence.create(startItem_action1,startItem_action2);
                this.startItem.runAction(startItem_sequence);

                var endItem_action1 = cc.MoveBy.create(.5,0,-100*this.imgBoard.getScaleY());
                var endItem_action2 = cc.MoveBy.create(.5,0,100*this.imgBoard.getScaleY());
                var endItem_sequence = cc.Sequence.create(endItem_action1, endItem_action2);
                this.endItem.runAction(endItem_sequence);
            }
            if(touchSide=="down")
            {
                var startItem_action1 = cc.MoveBy.create(.5,0,-100*this.imgBoard.getScaleY());
                var startItem_action2 = cc.MoveBy.create(.5,0,100*this.imgBoard.getScaleY());
                var startItem_sequence = cc.Sequence.create(startItem_action1,startItem_action2);
                this.startItem.runAction(startItem_sequence);

                var endItem_action1 = cc.MoveBy.create(.5,0,100*this.imgBoard.getScaleY());
                var endItem_action2 = cc.MoveBy.create(.5,0,-100*this.imgBoard.getScaleY());
                var endItem_sequence = cc.Sequence.create(endItem_action1, endItem_action2);
                this.endItem.runAction(endItem_sequence);
            }
            
            var start = this.allItem[currentRow][currentCol];
            var end = this.allItem[prevRow][prevCol];
            this.allItem[currentRow][currentCol] = end;
            this.allItem[prevRow][prevCol] = start;
            console.log(this.allItem[currentRow][currentCol].getTag());
            console.log(this.allItem[prevRow][prevCol].getTag());

            //this.endItem.runAction(cc.Sequence.create(cc.MoveBy.create(.5,-100*this.imgBoard.getScaleX(),0),cc.MoveBy.create(.5,100*this.imgBoard.getScaleX(),0)));
        }
    
    },
    removeVisitedItem:function()
    {
        for(var i=0;i<this.allItem.length;i++)
        {
            for(var j=0;j<this.allItem[i].length;j++)
            {
                //cc.log("pain--->  "+this.allItem[i][j].getTag());
                if(this.allItem[i][j].getTag()==10)
                {
                    this.allItem[i][j].removeFromParent();
                    this.addItem(this.allItem[i][j].getPosition());
                    this.animation(this.allItem[i][j].getPosition(),this.tag);
                    if(this.randomTile==0){this.allItem[i][j] = this.imgDiamond;}
                    if(this.randomTile==1){this.allItem[i][j] = this.imgGold;}
                    if(this.randomTile==2){this.allItem[i][j] = this.imgRuby;}
                    
                }
            }
        }
        
    },
    gameOver:function()
    {
        if(this.scoreDiamond>10 && this.scoreGold>10 && this.scoreRuby>10)
        {
            var gameStatus = "win";
        }
        else{
            var gameStatus = "lose";
        }
        var gameEnd = GameEnd.create(gameStatus);
        this.addChild(gameEnd,1);
        
      
        // else
        // {
        //     var gameStatus = "lose";
        //     var gameEnd = GameEnd.create(gameStatus);
        //     this.addChild(gameEnd,1);
        // }
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