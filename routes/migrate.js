var express = require('express');
var router = express.Router();
var async = require('async');
var mysql = require('mysql');
var mongoose = require('mongoose');
var database = require('../config/database');
var connection = mysql.createConnection(database.mysql);

var User = require('../models/user');
var Campaign = require('../models/campaign');
var Display = require('../models/display');

connection.connect(); // mysql only for this migrate.js

router.get('/', function(req, res) {
  //userMigrate();
  //campaignMigrate();
  displayMigrate();
  res.send('migrate');
});

var userMigrate = function() {
  connection.query('SELECT * from user', function(err, rows, fields) {
    if (err) throw err;
    rows.forEach(function(row) {

      User.findOne({old_id: row.id}, function(err,user) {
        if (err) throw err;
        if(!user) {
          user = new User();
          user.old_id = row.id;
        }
        user.name = row.name;
        user.email = row.email;
        user.password = row.password;
        user.contact = row.contact;
        user.address = row.address;
        user.postcode = row.postcode;
        user.city = row.city;
        user.country = 'nl';
        user.is_admin = row.isAdmin;

        user.save( function(err) {
          if (err) throw err;
        });
      });
    });
  });
};


var campaignMigrate = function() {
  connection.query('SELECT cs.id campaign_schedule_id, c.*, cs.* from campaign c inner join campaign_schedule cs on cs.campaign_id = c.id', function(err, rows, fields) {
    if (err) throw err;
    rows.forEach(function(row) {

      Campaign.findOne({old_id: row.campaign_schedule_id}, function(err,campaign) {
        if (err) throw err;
        if(!campaign) {
          campaign = new Campaign();
          campaign.old_id = row.campaign_schedule_id;
        }
        campaign.name = row.name;

        async.parallel([
          function(cb) {
            connection.query('SELECT * from campaign_schedule cs inner join campaign_schedule_ads csa on cs.id = csa.campaign_schedule_id inner join ads a on csa.ads_id = a.id where cs.campaign_id = ?',[row.id], function(err, ads_rows) {
              if (err) throw err;
              ads_rows.forEach(function(ads_row) {
                campaign.layer.push({media: ads_row.media_id});
              });
              cb();
            });

          },
          function (cb) {
            User.findOne({old_id:row.user_id}, function(err, user) {
              campaign.user_id = user._id;
              cb();
            });
          }],
          function(err, results){
            campaign.save( function(err) {
              if (err) throw err;
            });
          }
        );


      });
    });
  });
};





var displayMigrate = function() {
  connection.query('SELECT l.*, (select min(start_date) from location_credits lc where lc.location_id = l.id ) start_date from location l ', function(err, rows, fields) {
    if (err) throw err;
    console.log('here');
    rows.forEach(function(row) {
    console.log('row');

      Display.findOne({old_id: row.id}, function(err,display) {
        if (err) throw err;
        if(!display) {
          display = new Display();
          display.old_id = row.id;
        }
        display.name = row.name;
        display.code = row.code;
        display.contact = row.contact;
        display.address = row.address;
        display.postcode = row.postcode;
        display.city = row.city;
        display.scope = row.scope;
        display.layout = row.layout;
        display.lat = row.lat;
        display.lng = row.lng;
        display.created = row.created;
        display.credits = {start_date: Date(row.start_date), end_date: new Date('2099-01-01'), credits: 8};

        User.findOne({old_id:row.user_id}, function(err, user) {
          display.user_id = user._id;
          display.save( function(err) {
            if (err) throw err;
          });
        });


      });
    });
  });
};




module.exports = router;
