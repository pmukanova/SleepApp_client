var React = require('react');


var Button = React.createClass({
  propTypes: {
    text: React.PropTypes.string,
    onClick: React.PropTypes.func,
  },

  render: function() {
    return (
      <button className="btn btn-default" onClick={this.props.onClick}>{this.props.text}</button>
    );
  }

});

module.exports = Button;
