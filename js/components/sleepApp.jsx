var React = require('react');
var SleepForm = require('./sleepForm.jsx');
var SleepList = require('./sleepList.jsx');
var SleepStore = require('../stores/SleepStore');
var sleepLocalStorage = require('../api/sleepLocalStorage');
var SleepChart = require('./SleepChart.jsx');


var SleepApp = React.createClass({

  componentWillMount: function() {
    SleepStore.addChangeListener(this._onStoreChange);
    SleepStore.setAll(sleepLocalStorage.getAll());
  },
  componentWillUnmount: function() {
    SleepStore.removeChangeListener(this._onStoreChange);
  },

  _onStoreChange: function() {
    sleepLocalStorage.storeAll(SleepStore.getAll());
  },

  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10 col-xs-12">
            <div className="row">
              <div className="col-md-4 col-xs-4">

                <SleepForm />

              </div>
              <div className="col-md-8 col-xs-8">

                <SleepChart />

              </div>
            </div>

            <SleepList />

          </div>
        </div>
      </div>
    );
  }

});

module.exports = SleepApp;
