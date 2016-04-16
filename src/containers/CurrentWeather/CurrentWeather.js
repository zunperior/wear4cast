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

function simplifyWeatherConditionId(weatherConditionId)
{

  const id = ''+ weatherConditionId;
  switch (id) {
    case '200':	//thunderstorm with light rain
    case '201':	//thunderstorm with rain
    case '202':	//thunderstorm with heavy rain
    case '210':	//light thunderstorm
    case '211':	//thunderstorm
    case '212':	//heavy thunderstorm
    case '221':	//ragged thunderstorm
    case '230':	//thunderstorm with light drizzle
    case '231':	//thunderstorm with drizzle
    case '232':	//thunderstorm with heavy drizzle
    case '300':	//light intensity drizzle
    case '301':	//drizzle
    case '302':	//heavy intensity drizzle
    case '310':	//light intensity drizzle rain
    case '311':	//drizzle rain
    case '312':	//heavy intensity drizzle rain
    case '313':	//shower rain and drizzle
    case '314':	//heavy shower rain and drizzle
    case '321': //shower drizzle
    case '500':	//light rain
    case '501':	//moderate rain
    case '502':	//very heavy rain
    case '504':	//extreme rain
    case '511':	//freezing rain
    case '520':	//light intensity shower rain
    case '521':	//shower rain
    case '522':	//heavy intensity shower rain
    case '531':	//ragged shower rain
    case '900':	//tornado
    case '901':	//tropical storm
    case '902':	//hurricane
    case '906':	//hail
    case '960':	//storm
    case '961':	//violent storm
    case '962':	//hurricane
      return 'RAIN';

    case '600':	//light snow
    case '601':	//snow
    case '602':	//heavy snow
    case '611':	//sleet
    case '612':	//shower sleet
    case '615':	//light rain and snow
    case '616':	//rain and snow
    case '620':	//light shower snow
    case '621':	//shower snow
    case '622':	//heavy shower snow
      return 'SNOW';

    case '781':	//tornado
    case '905':	//windy
    case '954':	//moderate breeze
    case '955':	//fresh breeze
    case '956':	//strong breeze
    case '957':	//high wind, near gale
    case '958':	//gale
    case '959':	//severe gale
      return 'WIND';

    default:
      return 'ANY';
  }
  return 'ANY';
}

function prepareCurrentWeatherData(weatherData){
  if (weatherData && weatherData.currWeather )
  {
    const timezone = getTimezone(weatherData.longitude, weatherData.latitude);
    return {
      time: ''+localDateTime(weatherData.currWeather.datetimeUnix, timezone),
      temperature: Math.round(weatherData.currWeather.temperature),
      condition: simplifyWeatherConditionId(weatherData.currWeather.weatherConditionId),
      conditionDescr: weatherData.currWeather.weatherConditionDescr
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
            <p>{data.conditionDescr}</p>
          </div>

        }
        <div>
          <i className="wi wi-day-sunny"></i>
        </div>

      </div>);

  }

}
