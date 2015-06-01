var React = require('react');
var timeAPI = require('./api/timeAPI');
var moment = require('moment');

var SleepApp = require('./components/sleepApp.jsx');

React.render(
  <SleepApp />,
  document.getElementById('SleepApp')
);
