import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
// import {fetchCurrentWeather} from 'redux/modules/currentWeather';

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

function prepareCurrentWeatherData(weatherData){
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
    {}
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
    })
  };

  render() {
    const {currentWeather} = this.props;
    const styles = require('./CurrentWeather.scss');
    const data = prepareCurrentWeatherData(currentWeather);

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
