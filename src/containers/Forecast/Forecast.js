import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import isEmpty from 'lodash.isempty';
import {fetchForecast} from 'redux/modules/weatherForecast';
import {Line as LineChart} from 'react-chartjs';
//import localDateTime from 'utils/timeUtil';

// import moment from 'moment-timezone';
// import coordinateTimezone from 'coordinate-tz';

import moment from 'moment-timezone';
import coordinateTimezone from 'coordinate-tz';

function getTimezone(longitude, latitude){
  return coordinateTimezone.calculate(latitude, longitude).timezone;
}

function localDateTime(unixDateTime, timezone){
  const momentUnix = moment.unix(unixDateTime);
  const unixDateTimeObj = momentUnix.toDate();
  const localTime = moment(unixDateTimeObj).tz(timezone).format('YYYY-MM-DD HH:mm:ss');
  return localTime;
}

function prepareGraphData(forecastData){
  var times = [];
  var temperatures = [];
  var refLine = [];
  if (forecastData && forecastData.forecastDataPoints && forecastData.forecastDataPoints.length > 0)
  {
    const timezone = getTimezone(forecastData.longitude, forecastData.latitude);
    for(let point of forecastData.forecastDataPoints)
    {
      times.push(''+localDateTime(point.datetimeUnix, timezone));

      temperatures.push(Math.round(point.temperature));
      refLine.push(0);
    }
  }

  return {
    labels: times.slice(),
    datasets: [
      {
        label: 'Weather Forecast',
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: refLine.slice()
      },
      {
        label: '0 line',
        // fillColor: 'rgba(151,187,205,0.2)',
        strokeColor: 'rgba(151,187,205,1)',
        // pointColor: 'rgba(151,187,205,1)',
        // pointStrokeColor: '#fff',
        // pointHighlightFill: '#fff',
        // pointHighlightStroke: 'rgba(151,187,205,1)',

        data: temperatures.slice()
      }
    ]
  };

}

@connect(
    state => ({forecast: state.weatherForecast.forecast}),
    {fetchForecast}
)
export default class Forecast extends Component {
  static propTypes = {
    forecast: PropTypes.shape({
      city: PropTypes.string,
      country: PropTypes.string,
      longitude: PropTypes.number,
      latitude: PropTypes.number,
      forecastDataPoints: PropTypes.array,
      currentWeather: PropTypes.object
    }),
    fetchForecast: PropTypes.func.isRequired
  };

  componentWillMount(){
    const {fetchForecast,forecast} = this.props;
    if(isEmpty(forecast)){
      fetchForecast('Toronto','Canada');
    }
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    const {forecast} = this.props;
    const styles = require('./Forecast.scss');
    const chartData = prepareGraphData(forecast);
    const chartOptions = {
      animation: false,
      bezierCurve: false,
      showTooltips: false,
      scaleShowGridLines : false,
      datasetFill: false,
      pointDot : false
    };


    //const timezone = coordinateTimezone.calculate(43.700111,-79.416298).timezone;
    //const time = moment(moment.unix(1458788400).toDate()).tz(timezone).format('YYYY-MM-DD HH:mm:ss');
    return (
      <div className={styles.forecast + ' container'}>
        <h1>{'Forecast'}</h1>

        {forecast &&
          // Get the context of the canvas element we want to select

          <LineChart
            data={chartData}
            options={chartOptions}
            width="600"
            height="250"
          />

          // <h1>{forecast.city}</h1>
        }
        <div>
          <i className="wi wi-day-sunny"></i>
        </div>

      </div>);

  }

}
