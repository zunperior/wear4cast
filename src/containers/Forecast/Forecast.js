import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {fetchForecast} from 'redux/modules/weatherForecast';

@connect(
    state => ({forecast: state.forecast}),
    {fetchForecast}
)
export default class Forecast extends Component {
  static propTypes = {
    forecast: PropTypes.object,
    fetchForecast: PropTypes.func.isRequired,
  }

  componentWillMount(){
    const {fetchForecast,forecast} = this.props;
    if(forecast === undefined){
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

          <h1>{forecast.city.name}</h1>
        }

      </div>);

  }

}
