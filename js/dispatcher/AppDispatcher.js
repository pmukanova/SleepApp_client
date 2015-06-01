var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

var AppDispatcher = new Dispatcher();

AppDispatcher.handleViewAction = function(action) {
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
};


module.exports = AppDispatcher;
