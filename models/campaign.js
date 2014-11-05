var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator').validate;


var layerSchema = Schema({
  widget: String, // image, content, iframe, weather, news, video...
  order: Number,
  media: String, // image filename
  content: String, // html in case of content, url in case of iframe 
  x: Number, y: Number, w: Number, h:Number, // positions of the layer
  position: String, // "+=0" is default and means at the end of last chain, can be label or relative to label
  duration: Number, // duration of this layer
});


var campaignDisplaySchema = Schema({
  display_id: {type: Schema.Types.ObjectId, ref: 'display'},
},{ _id : false});

// A campaign contains the advertisement and on which selected displays it will be shown.
// An advertisement is build from layers.
// Each layer is a tween for timelinemax (greensock.com)
var campaignSchema = Schema({
  old_id: Number, // only for migration
  user_id  : { type: Schema.Types.ObjectId, ref: 'User' },
  name: String,
  duration: {type: Number, default: 6}, // duration of the campaign in seconds
  layer: [layerSchema],
  display: [campaignDisplaySchema],
  start_date: Date,
  end_date: Date,
  draft: Boolean // true in case it is in edit mode
}, {collection: 'campaign'});

module.exports = mongoose.model('campaign', campaignSchema);
