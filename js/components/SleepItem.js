var React = require('react');
var utils = require('../utils');
var moment = require('moment');



var SleepItem = React.createClass({
  propTypes: {
      sleep: React.PropTypes.object,
  },

  renderStart: function() {
    var time = moment(this.props.sleep.started).format("LT");
    return time;
  },

  renderStop: function() {
    var time = moment(this.props.sleep.finished).format("LT");
    return time;
  },

  render: function() {
    return (

      <tr>
          <td>
            <p className="text-success">{this.renderStart()}</p>
          </td>
          <td>
            <p className="text-success">{this.renderStop()}</p>
          </td>
          <td>
            <p className="text-success">{utils.getDuration(this.props.sleep)}</p>
          </td>
          <td>
            <p className="text-success">{this.props.sleep.note}</p>
          </td>

      </tr>
    );
  }

});

module.exports = SleepItem;
