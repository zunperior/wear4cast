import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import {isLoaded, load as loadOutfits} from 'redux/modules/outfits';

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
      loading: state.outfits.loading
    }),
    {}
)
export default class Outfits extends Component {
  static propTypes = {
    outfits: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool
  };

  // DispalyName = 'Outfits';

  render() {
    const {outfits, loading} = this.props;

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
            outfits && outfits.length && outfits.map(outfit => (
              <img key={outfit.id} src={outfit.url} />))
          }
        </div>
			</div>
			);
  }
}
