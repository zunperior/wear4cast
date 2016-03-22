import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {fetchForecast} from 'redux/modules/weatherForecast';

@connect(
    state => ({forecast: state.weatherForecast.forecast}),
    {fetchForecast}
)
export default class Forecast extends Component {
  static propTypes = {
    //forecast: PropTypes.object,
    forecast: PropTypes.string,
    fetchForecast: PropTypes.func.isRequired,
  }

  componentWillMount(){
    const {fetchForecast,forecast} = this.props;
    if(forecast === ''){
      fetchForecast('Toronto','Canada');
    }
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    const {forecast} = this.props;
    const styles = require('./Forecast.scss');

    return (
      <div className={styles.forecast + ' container'}>
        <h1>Forecast</h1>

        {forecast &&

          <h1>{forecast}</h1>
        }

      </div>);

  }

}
