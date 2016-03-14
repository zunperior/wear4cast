import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
//import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';
import {isLoaded, load as loadOutfits} from 'redux/modules/outfits';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!isLoaded(getState())) {
      return dispatch(loadOutfits());
    }
  }
}])
export default class Outfits extends Component {
  static propTypes = {
  //  outfits: PropTypes.array,
    outfits: PropTypes.string,
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
            // outfits && outfits.length && outfits.map(outfit => (
            //   <p key={outfit.id}> {outfit.url} </p>))
            outfits
          }
        </div>
			</div>
			);
  }
}



// export default class Outfits extends Component {
//
//   render() {
//
//     return (
//       <div className="container">
//         <h1>Outfits</h1>
//         <Helmet title="Outfits"/>
//         <p>Outfits page, test text</p>
//       </div>
//     );
//   }
// }
