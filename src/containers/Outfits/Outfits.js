import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import {isLoaded, load as loadOutfits, changeOutfit} from 'redux/modules/outfits';
import {CurrentOutfit, Forecast} from 'containers';
import {ClothingItemList as ClothingItems} from 'components';

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
    const now = new Date();

    console.info(`Next Outfit call (${now})`);
    const nextIndex = getNextIndex(currentOutfitIndex, outfits.length);
    changeOutfit(outfits[nextIndex], nextIndex);
  }
}

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!isLoaded(getState())) {
      return dispatch(loadOutfits());
    }
  }
}])
@connect(
    state => ({
      outfits: state.outfits.data,
      error: state.outfits.error,
      loading: state.outfits.loading,
      currentOutfit: state.outfits.selectedOutfit,
      selectedOutfitIndex: state.outfits.selectedOutfitIndex
    }),
    {changeOutfit}
)
export default class Outfits extends Component {
  static propTypes = {
    outfits: PropTypes.array,
    error: PropTypes.object,
    loading: PropTypes.bool,
    selectedOutfitIndex: PropTypes.number,
    currentOutfit: PropTypes.shape({
      id: PropTypes.number,
      url: PropTypes.string
    }),
    changeOutfit: PropTypes.func.isRequired
  };

  componentDidMount(){
    const {outfits, selectedOutfitIndex, changeOutfit} = this.props;
    setTimeout(() => selectNextOutfit(outfits, selectedOutfitIndex, changeOutfit), 30000);
  }

 componentDidUpdate()
 {
   const {outfits, selectedOutfitIndex, changeOutfit} = this.props;
   setTimeout(() => selectNextOutfit(outfits, selectedOutfitIndex, changeOutfit), 30000);
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
        <Forecast />
			</div>
			);
  }
}
