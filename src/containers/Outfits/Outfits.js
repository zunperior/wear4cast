import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import isEmpty from 'lodash.isempty';
import {fetchCurrentWeather} from 'redux/modules/currentWeather';
import {isLoaded, load as loadOutfits, changeOutfit} from 'redux/modules/outfits';
import {CurrentOutfit, Forecast, CurrentWeather} from 'containers';
import {ClothingItemList as ClothingItems} from 'components';
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

function getNextIndex(currentIndex, arrayLength){
  const nextIndex = currentIndex + 1;
  if (nextIndex >= arrayLength)
  {
    return 0;
  }

  return nextIndex;
}

function selectNextOutfit(outfits, currentOutfitIndex, changeOutfit)
{
  if(outfits && outfits.length > 0)
  {
    // const now = new Date();
    // console.info(`Next Outfit call (${now})`);
    const nextIndex = getNextIndex(currentOutfitIndex, outfits.length);
    changeOutfit(outfits[nextIndex], nextIndex);
  }
}

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    var globState = getState();
    if (!isLoaded(globState)) {
      //var currWeather = prepareCurrentWeatherData(globState.currentWeather.currentWeather);
      return dispatch(loadOutfits({ temperature: -10, time: '2016-01-12 16:58:49', condition: 'SNOW' }, 'BUSINESS'));
    }
  }
}])
@connect(
    state => ({
      currentWeather: state.currentWeather.currentWeather,
      outfits: state.outfits.outfitList,
      error: state.outfits.error,
      loading: state.outfits.loading,
      currentOutfit: state.outfits.selectedOutfit,
      selectedOutfitIndex: state.outfits.selectedOutfitIndex
    }),
    {fetchCurrentWeather, changeOutfit}
)
export default class Outfits extends Component {
  static propTypes = {
    currentWeather: PropTypes.object,
    outfits: PropTypes.array,
    error: PropTypes.object,
    loading: PropTypes.bool,
    selectedOutfitIndex: PropTypes.number,
    currentOutfit: PropTypes.shape({
      id: PropTypes.number,
      url: PropTypes.string
    }),
    changeOutfit: PropTypes.func.isRequired,
    fetchCurrentWeather: PropTypes.func.isRequired
  };

  componentDidMount(){
    const {fetchCurrentWeather, currentWeather} = this.props;
    if(isEmpty(currentWeather)){
      fetchCurrentWeather('Toronto','Canada');
    }

    const {outfits, selectedOutfitIndex, changeOutfit} = this.props;
    setTimeout(() => selectNextOutfit(outfits, selectedOutfitIndex, changeOutfit), 30000);
  }

  componentDidUpdate()
  {
    const {outfits, selectedOutfitIndex, changeOutfit} = this.props;
    setTimeout(() => selectNextOutfit(outfits, selectedOutfitIndex, changeOutfit), 30000);
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    const {loading, outfits, currentOutfit} = this.props;

    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const styles = require('./Outfits.scss');

    return (

			<div className={styles.outfits + ' container'}>
        <CurrentWeather />

				<h1>{'Outfits'}</h1>
				<Helmet title="Outfits"/>
        <div>
          {
            outfits && outfits.length &&
            <CurrentOutfit />
          }
        </div>
        <div>
          {
            outfits && outfits.length && currentOutfit &&
            <ClothingItems clothingItemList = {currentOutfit.items} />
          }
        </div>
        {/*<Forecast />*/}

			</div>
			);
  }
}
