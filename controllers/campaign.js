var Campaign = require('../models/campaign');

/**
 * GET /
 * campaign page.
 */


exports.postAdd = function(req, res, next){
  var newCampaign = new Campaign({
    user_id : req.user.id,
    name: req.body.name || '',
    duration: req.body.duration || '',
    start_date: req.body.start_date || '',
    end_date: req.body.end_date || '',
    draft: req.body.draft || ''
  });

  newCampaign.save(function(err) {
    console.log(newCampaign);
    if (err) return next(err);
    res.send('Add Successfully');
  });
};

exports.userUpdate = function(req, res, next){
  var id = req.params.id;
  Campaign.findById(id, function(err, Dertail) {   
    Dertail.name = req.body.name,
    Dertail.duration = req.body.duration,
    Dertail.start_date = req.body.start_date,
    Dertail.end_date = req.body.end_date,
    Dertail.draft = req.body.draft
    
    Dertail.save(function(err) {
      if (err) return next(err);
      res.send('Add Successfully');
    });
  });
};


exports.index = function(req, res) {
	console.log('campaign page');
  	res.render('campaign', {
    title: 'Campaign'
  });
};

exports.getById = function(req, res){
	var campaignId = req.params.id;
	Campaign.findOne({_id:campaignId},function(err, campaignDetail) {
    	res.send(JSON.stringify(campaignDetail));
  });
};

exports.getList = function(req, res){
	Campaign.find({user_id:req.user._id},function(err, campaigns) {
    	res.send(JSON.stringify(campaigns));
  });
};

exports.postTagAdd = function(req, res, next){
  var campainId = req.params.campainId;
  
  Campaign.findById(campainId, function(err, Dertails) {

    Dertails.display.push({
      display_id : req.params.displayId || ''
    });

    Dertails.save(function(err) {
      if (err) return next(err);
      res.send('Tag Successfully');
    });
  });
};