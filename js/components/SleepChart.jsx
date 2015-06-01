var React = require('react');
var LineChart = require("react-chartjs").Line;
var SleepStore = require('../stores/SleepStore');
var sleepLocalStorage = require('../api/sleepLocalStorage');
var moment = require('moment');
var utils = require('../utils');


var SleepChart = React.createClass({
  getInitialState: function() {
    return {
      sleeps: SleepStore.getCompleted()
    };
  },

  componentDidMount: function() {
    SleepStore.addChangeListener(this._onStoreChange);
  },

  componentWillUnmount: function() {
    SleepStore.removeChangeListener(this._onStoreChange);
  },

  _onStoreChange: function() {
    this.setState(this.getInitialState());
  },

  render: function() {
    var data = this.state.sleeps.map(function(val, index) {
      return moment(val.started).format('L');
    });

    var durations = this.state.sleeps.map(function(val,index){
      return utils.getDurationNonFormat(val);
    });

    var data = {
        labels: data,
        datasets: [
            {
                label: "My Sleeping times",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#32CD32",
                pointHighlightFill: "#32CD32",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: durations
            },
        ]
    };

    var options = {

        ///Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines : true,

        //String - Colour of the grid lines
        scaleGridLineColor : "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth : 1,

        //Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,

        //Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: true,

        //Boolean - Whether the line is curved between points
        bezierCurve : true,

        //Number - Tension of the bezier curve between points
        bezierCurveTension : 0.4,

        //Boolean - Whether to show a dot for each point
        pointDot : true,

        //Number - Radius of each point dot in pixels
        pointDotRadius : 4,

        //Number - Pixel width of point dot stroke
        pointDotStrokeWidth : 1,

        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        pointHitDetectionRadius : 20,

        //Boolean - Whether to show a stroke for datasets
        datasetStroke : true,

        //Number - Pixel width of dataset stroke
        datasetStrokeWidth : 2,

        //Boolean - Whether to fill the dataset with a colour
        datasetFill : true,

        //String - A legend template
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

    };

    return <LineChart data={data} options={options} redraw width="600" height="250"/>
  }
});


module.exports=SleepChart;
