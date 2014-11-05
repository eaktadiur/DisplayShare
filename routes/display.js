var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Display = mongoose.model('display');
var util = require("util"); 

// router.route('/getlistByUserId').get(function(req, res) {
//   Display.find({user_id:req.user._id},function(err, displays) {
//     res.send(JSON.stringify(displays));
//   });
// });

exports.getlistByUserId = function(req, res) {
  Display.find({user_id:req.user._id},function(err, displays) {
    res.send(JSON.stringify(displays));
  });
};

//Update Display
exports.putUpdate = function(req, res, next) {
  var id = req.params.id;
  Display.findById(id, function(err, display) {
    display.name = req.body.name,
    display.logo = req.body.logo,
    display.code = req.body.code,
    display.scope = req.body.scope,
    display.layout = req.body.layout,
    display.contact = req.body.contact,
    display.address = req.body.address,
    display.postcode = req.body.postcode,
    display.city = req.body.city,
    display.lat = req.body.lat,
    display.lng = req.body.lng,
    display.info = req.body.info,
    display.opening = req.body.opening,
    display.url = req.body.url

    display.save(function(err) {
      if (err) return next(err);
      res.send('Update Successfully');
    }); //Save end here
  }); //display find end here
}; //putUpdate function end here

//Update Display
exports.putfileUloadUpdate = function(req, res) {
  var id = req.params.id;
  if (req.files) {
    Display.findById('5438e800c2f4bf2418b582a8', function(err, display) {
      display.logo = '/uploads/' + req.files.file.name || ''
      display.save(function(err) {
        if (err) return next(err);
        res.send(display.logo);
      }); //Save end here
    }); //display find end here
  }
}; //putUpdate function end here