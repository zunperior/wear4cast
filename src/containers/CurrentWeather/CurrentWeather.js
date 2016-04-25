import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { prepareCurrentWeatherData} from 'utils/weatherUtils';

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
        currentWeather && data &&
        <div className={styles.currentWeather + ' container description_content'}>
          <div className={'row'}>

            <div className={'col-md-4'}>
              <p className={styles.temperature}>
                {data.temperature}<sup>{'o'}</sup>{'C'}
              </p>
              <p className={styles.weatherCondition}>
                {data.conditionDescr}
              </p>
            </div>
          </div>
        </div>
      );
  }
}
