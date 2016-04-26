import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import isEmpty from 'lodash.isempty';
import {fetchCurrentWeather} from 'redux/modules/currentWeather';
import {load as loadOutfits, changeOutfit} from 'redux/modules/outfits';
import {CurrentOutfit, CurrentWeather} from 'containers';
import {ClothingItemList as ClothingItems} from 'components';

import { prepareCurrentWeatherData} from 'utils/weatherUtils';

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
    const nextIndex = getNextIndex(currentOutfitIndex, outfits.length);
    changeOutfit(outfits[nextIndex], nextIndex);
  }
}

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    var globState = getState();
    var currWeather = prepareCurrentWeatherData(globState.currentWeather.currentWeather);
    if(currWeather && currWeather.temperature && currWeather.datePortion && currWeather.condition){
      return dispatch(loadOutfits({ temperature: currWeather.temperature, date: currWeather.datePortion, condition: currWeather.condition }, 'BUSINESS'));
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
        <Helmet title="Outfits"/>

          <span className={styles.wrapper}>
            <div className={styles.description}>
              <CurrentWeather />
            </div>
            {outfits && outfits.length &&
            <CurrentOutfit />
            }
          </span>
          <span>
            {outfits && outfits.length && currentOutfit &&
              <ClothingItems clothingItemList = {currentOutfit.items} />
            }
          </span>

			</div>
			);
  }
}
