import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import isEmpty from 'lodash.isempty';
import {fetchCurrentWeather} from 'redux/modules/currentWeather';
import {load as loadOutfits, changeOutfit} from 'redux/modules/outfits';
import {CurrentOutfit, CurrentWeather} from 'containers';
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
    var currWeather = prepareCurrentWeatherData(globState.currentWeather.currentWeather);
    if(currWeather && currWeather.temperature && currWeather.time && currWeather.condition){
      console.info('attempting to dipatch loadOutfitts');
      return dispatch(loadOutfits({ temperature: currWeather.temperature, time: currWeather.time, condition: currWeather.condition }, 'BUSINESS'));
    }
    //return dispatch(loadOutfits({ temperature: -10, time: '2016-01-12 16:58:49', condition: 'SNOW' }, 'BUSINESS'));
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
