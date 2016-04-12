import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import isEmpty from 'lodash.isempty';
import {fetchCurrentWeather} from 'redux/modules/currentWeather';

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

function prepareData(weatherData){
  if (weatherData && weatherData.currWeather )
  {
    const timezone = getTimezone(weatherData.longitude, weatherData.latitude);
    return {
      time: ''+localDateTime(weatherData.currWeather.datetimeUnix, timezone),
      temperature: Math.round(weatherData.currWeather.temperature),
      condition: weatherData.currWeather.weatherConditionDescr
    };
  }else{
    return {};
  }
}

@connect(
    state => ({currentWeather: state.currentWeather.currentWeather}),
    {fetchCurrentWeather}
)
export default class CurrentWeather extends Component {
  static propTypes = {
    currentWeather: PropTypes.shape({
      city: PropTypes.string,
      country: PropTypes.string,
      longitude: PropTypes.number,
      latitude: PropTypes.number,
      forecastDataPoints: PropTypes.array,
      currentWeather: PropTypes.object
    }),
    fetchCurrentWeather: PropTypes.func.isRequired
  };

  componentWillMount(){
    const {fetchCurrentWeather, currentWeather} = this.props;
    if(isEmpty(currentWeather)){
      fetchCurrentWeather('Toronto','Canada');
    }
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    const {currentWeather} = this.props;
    const styles = require('./CurrentWeather.scss');
    const data = prepareData(currentWeather);

    return (
      <div className={styles.currentWeather + ' container'}>
        <h1>{'Current Weather'}</h1>

        {currentWeather && data &&
          <div>
            <h1>{data.temperature}</h1>
            <p>{data.time}</p>
            <p>{data.condition}</p>
          </div>

        }
        <div>
          <i className="wi wi-day-sunny"></i>
        </div>

      </div>);

  }

}
