var Display = require('../models/display');


exports.getList = function(req, res){
	Display.find({},function(err, displays) {
    res.send(JSON.stringify(displays));
  });
};

exports.getById = function(req, res){
  var id = req.params.id;
  Display.findById(id,function(err, Details) {
    res.send(JSON.stringify(Details));
  });
};

exports.postAdd = function(req, res, next){
  var newDisplay = new Display({
    name: req.body.name || '',
    logo: req.body.logo || '',
    code: req.body.code || '',
    scope: req.body.scope || '',
    layout: req.body.layout || '',
    contact: req.body.contact || '',
    address: req.body.address || '',
    postcode: req.body.postcode || '',
    city: req.body.city || '',
    lat: req.body.lat || '',
    lng: req.body.lng || '',
    info: req.body.info || '',
    opening: req.body.opening || '',
    url: req.body.url || '',
    user_id: req.body.user_id || ''
  });

  newDisplay.save(function(err) {
    if (err) return next(err);
    res.send('Add Successfully');
  });
};


exports.postCreditAdd = function(req, res, next){
  var id = req.params.id;
  Display.findById(id, function(err, displayDertail) {

    displayDertail.credits.push({
      start_date : req.body.start_date || '',
      end_date : req.body.end_date || '',
      credits : req.body.credits || ''
    });

    displayDertail.save(function(err) {
      if (err) return next(err);
      res.send('Add Successfully');
    });
  });
};


//Update Display
exports.putUpdate = function(req, res, next) {
  var id = req.params.id;
  Display.findById(id, function(err, display) {
    display.name = req.body.name || '',
    display.logo = req.body.logo || '',
    display.code = req.body.code || '',
    display.scope = req.body.scope || '',
    display.layout = req.body.layout || '',
    display.contact = req.body.contact || '',
    display.address = req.body.address || '',
    display.postcode = req.body.postcode || '',
    display.city = req.body.city || '',
    display.lat = req.body.lat || '',
    display.lng = req.body.lng || '',
    display.info = req.body.info || '',
    display.opening = req.body.opening || '',
    display.url = req.body.url || '',
    display.user_id = req.body.user_id || ''

    display.save(function(err) {
      if (err) return next(err);
      res.send('Update Successfully');
    }); //Save end here
  }); //display find end here
}; //putUpdate function end here




//delete layer by id
exports.removeById = function(req, res, next) {
  var id = req.params.id;
  Display.remove({ _id: id }, function(err) {
    if (err) return next(err);
    res.send('Remove Successfully');
  });
};