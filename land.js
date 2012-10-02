goog.provide('farming.Land');
goog.require('lime.Sprite');

//states
farming.EMPTY = 0;
farming.PLOWED = 1;
farming.GROWING = 2;
farming.READY = 3;

/**
 * Land elements
 * 
 * @param {} gameObj
 */
farming.Land = function(gameObj, playerObj) {
    goog.base(this);
    this.setAnchorPoint(0, 0);
    this.setSize(gameObj.tile_size,gameObj.tile_size);
    this.setFill('images/bare_land.png');
    
    this.state = farming.EMPTY;
    
    //user input
    var land = this;
    goog.events.listen(this,['mousedown', 'touchstart'], function(e) {
        e.event.stopPropagation();        
        console.log(land.state);
        if(land.state == farming.EMPTY && playerObj.money >= gameObj.costPlowing) {
            //plow land
            land.setFill('images/plowed.png')
            land.state = farming.PLOWED;
            
            //update player money
            playerObj.money -= gameObj.costPlowing;
            gameObj.updateMoney();
        }
        else if(land.state == farming.PLOWED && playerObj.money >= gameObj.crops[playerObj.currentCrop].cost) {
            //plant
            land.setFill('images/growing.png');
            land.state = farming.GROWING;
            
            //store crop and left time for it to be ready and to die
            land.crop = playerObj.currentCrop;
            land.ripeTime = gameObj.crops[playerObj.currentCrop].time_to_ripe * 1000;
            land.deathTime = gameObj.crops[playerObj.currentCrop].time_to_death * 1000;
            
            //update player money
            playerObj.money -= gameObj.crops[playerObj.currentCrop].cost;
            gameObj.updateMoney();
        }
        else if(land.state == farming.READY ) {
            //harvest
            land.setFill('images/bare_land.png');
            land.state = farming.EMPTY;
            
            //update player money
            playerObj.money += gameObj.crops[land.crop].revenue;
            gameObj.updateMoney();
        }        
    });
    
    //growing plants
    dt = 1000;
    lime.scheduleManager.scheduleWithDelay(function() {
        if(this.state == farming.GROWING) {            
            if(this.ripeTime <= 0) {
                this.state = farming.READY;
                this.setFill('images/'+gameObj.crops[this.crop].image);
            }
            else {
                this.ripeTime -= dt;
            }
        }
        else if(this.state == farming.READY) {
            if(this.deathTime <= 0) {
                this.state = farming.EMPTY;
                this.setFill('images/bare_land.png');
            }
            else {
                this.deathTime -= dt;
            }
        }
    }, this, dt);
}

goog.inherits(farming.Land,lime.Sprite);