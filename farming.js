//set main namespace 
goog.provide('farming');   
//get requirements 
goog.require('lime.Director'); 
goog.require('lime.Scene'); 
goog.require('lime.Layer');   
goog.require('lime.GlossyButton');   
goog.require('farming.Land');   

//entrypoint 
farming.start = function(){     
    
    //game object
    var gameObj = {
        width: 320,
        height: 480,
        tile_size: 32,
        num_tiles_x: 10,
        num_tiles_y: 13,
        landLayer_w: 32*10, 
        landLayer_h: 32*13,
        controlsLayer_w: 32*10,
        controlsLayer_h: 32*2
    }
    
    //player obj
    var playerObj = {
        gold: 100
    }
    
    var director = new lime.Director(document.body,gameObj.width,gameObj.height);     
    director.makeMobileWebAppCapable();     
    director.setDisplayFPS(false);        
    
    var gameScene = new lime.Scene().setRenderer(lime.Renderer.CANVAS);
    var landLayer = new lime.Layer().setAnchorPoint(0, 0);
    var controlsLayer = new lime.Layer().setAnchorPoint(0, 0);
    
    gameScene.appendChild(landLayer);
    gameScene.appendChild(controlsLayer);
    
    
    
    //controls area
    var controlArea = new lime.Sprite().setAnchorPoint(0,0)
        .setPosition(0, gameObj.height-gameObj.controlsLayer_h)
        .setSize(gameObj.controlsLayer_w, gameObj.controlsLayer_h)
        .setFill('#0D0D0D')
    controlsLayer.appendChild(controlArea);
    
    //shop button
    var shopButton = new lime.GlossyButton().setColor('#133242').setText('Shop')
        .setPosition(60, gameObj.height-gameObj.controlsLayer_h/2)
        .setSize(80, 40);
    controlsLayer.appendChild(shopButton); 
    
    //money
    var goldLabel = new lime.Label().setText('$'+playerObj.gold).setFontColor('#E8FC08')
        .setPosition(gameObj.controlsLayer_w-50, gameObj.height-gameObj.controlsLayer_h/2)
    controlsLayer.appendChild(goldLabel); 
    
    //create land elements
    for(var i=0; i<gameObj.num_tiles_x; i++) {
        for(var j=0; j<gameObj.num_tiles_y; j++) {
            var landElement = new farming.Land(gameObj).setPosition(i*gameObj.tile_size, j*gameObj.tile_size);
            landLayer.appendChild(landElement);
        }
    }
    
    director.replaceScene(gameScene); 
}