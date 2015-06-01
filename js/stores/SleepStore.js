var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var assign = require('object-assign');

var CHANGE_EVENT = AppConstants.CHANGE_EVENT;

var _sleeps = []; // collection of sleep items

var SleepStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAll: function() {
    return _sleeps;
  },

  setAll: function(sleeps) {
    _sleeps = sleeps || [];
  },

  getCompleted: function() {
    var c = this.getCurrent(),
        all = this.getAll();
    if( c === null )
      return all;
    else
      return all.slice(0, -1);
  },

  getCurrent: function(){
    var all = this.getAll();
    if(all.length === 0){
      return null;
    }
    else if (all[all.length-1].finished === null){
      return all[all.length-1];
    }
    else return null;
  },

  add: function(sleep) {
    _sleeps.push(sleep);
  },

  replaceCurrent: function(sleep) {
    _sleeps.pop();
    _sleeps.push(sleep);
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
      case AppConstants.SLEEP_STARTED_ACTION:
        SleepStore.add(action.object);
        SleepStore.emitChange();
        break;
      case AppConstants.SLEEP_STOPED_ACTION:
        SleepStore.replaceCurrent(action.object);
        SleepStore.emitChange();
        break;

    }

    return true; // No errors. Needed by promise in Dispatcher.
  })

});

module.exports = SleepStore;
