var moment = require('moment');

module.exports = {

  getLocation: function(callback) {
    navigator.geolocation.getCurrentPosition(function(position) {
       var coordinates = [position.coords.latitude.toFixed(2), position.coords.longitude.toFixed(2)];
       callback(coordinates);
    });
  },

  getDurationNonFormat: function(s) {
    var a = moment(s.started);
    var b = moment(s.finished);
    var c = b.diff(a,'minutes');
    return c;
  },

  getDuration: function(s) {
    var a = moment(s.started);
    var b = moment(s.finished);
    var c = b.diff(a,'minutes');

    if(c>=60){
      duration = parseInt(c/60) + ' hours ' + c%60 +' minutes ';
    } else {
      duration = c + ' minutes';
    }
    return duration;
  }
}
