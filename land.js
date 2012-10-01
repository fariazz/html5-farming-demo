goog.provide('farming.Land');
goog.require('lime.Sprite');

/**
 * Land elements
 * 
 * @param {} gameObj
 */
farming.Land = function(gameObj) {
    goog.base(this);
    this.setAnchorPoint(0, 0);
    this.setSize(gameObj.tile_size,gameObj.tile_size);
    this.setFill('images/bare_land.png')
}

goog.inherits(farming.Land,lime.Sprite);