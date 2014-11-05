var Campaign = require('../models/campaign');


exports.getById = function(req, res){
	var id = req.params.id;
	Campaign.findOne({layer: {$elemMatch: {_id: id}}},function(err, layerDetail) {
    if(layerDetail){
      var output = layerDetail.layer.filter(function(doc){
        var id = req.params.id;
        return doc._id==id
      });
      res.send(JSON.stringify(output));
    }else{
    	res.send(JSON.stringify(layerDetail));
    }
  });
};

exports.postLayer = function(req, res, next){
  var id = req.params.id;
  Campaign.findById(id, function(err, campaignDertail) {

    campaignDertail.layer.push({
      order : req.body.order || '',
      media : req.body.media || '',
      content : req.body.content || '',
      x : req.body.x || '',
      y : req.body.y || '',
      h : req.body.h || '',
      w : req.body.w || '',
      position : req.body.position || '',
      duration : req.body.duration || ''
    });

    campaignDertail.save(function(err) {
      if (err) return next(err);
      res.send('Add Successfully');
    });
  });
};

exports.updateLayer = function(req, res, next) {
  var id = req.params.id;
  //Update
  Campaign.update(
    { "layer._id": id },
      { $set: { 
        "layer.$.order" : req.body.order || '', 
        "layer.$.media" : req.body.media || '', 
        "layer.$.content" : req.body.content || '', 
        "layer.$.x" : req.body.x || '', 
        "layer.$.y" : req.body.y || '', 
        "layer.$.h" : req.body.h || '', 
        "layer.$.w" : req.body.w || '', 
        "layer.$.position" : req.body.position || '', 
        "layer.$.duration" : req.body.duration || '' }
      },function(err, layerDetail) {
      res.send('Update Successfully');
  });
};


//delete layer by id
exports.removeLayer = function(req, res, next) {
  var id = req.params.id;
  Campaign.update({ }, { $pull: { layer: { _id: id } } }, { multi: true },function(err, layerDetail) {
      res.send('Remove Successfully');
  }); 
};