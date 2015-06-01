var utils = require('../utils.js');
var moment = require('moment');
var request = require('superagent');

var getServerTime = function(callback, coordinates) {
  request
    .get('http://localhost:8080/time_api/geo')
    .query({lat: coordinates[0], lng: coordinates[1]})
    .set('Accept', 'application/json')
    .end(function(err, res) {
      if(err) {
        console.log(err);
      } else {
        console.log(res.statusCode, res.body);
        var time = moment(res.body.time).format();
        callback(time);
      }
    });
};



module.exports = {
  getCurrentTime: function(callback){
    console.log("getcurrentdate");
    utils.getLocation(getServerTime.bind(this, callback));
  }
};
