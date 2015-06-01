/**
 * SleepActions
 */

var moment = require('moment');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var app = require('../app.js');
var timeAPI = require('../api/timeAPI');

var create = function(note, time) {
  return {
    note: note,
    started: time,
    finished: null
  };
};

function finish(sleep) {
  sleep.finished = moment().format();
  return sleep;
}


var SleepActions = {

  /**
   * @param  {string} text
   */
  start: function(note) {
    timeAPI.getCurrentTime(function(time) {

      AppDispatcher.handleViewAction({
        actionType: AppConstants.SLEEP_STARTED_ACTION,
        object: create(note, time)
      });

    });
  },

  stop: function(sleep){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SLEEP_STOPED_ACTION,
      object: finish(sleep)
    });
   }

};

module.exports = SleepActions;
