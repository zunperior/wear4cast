import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

@connect(
    state => ({
      currentOutfit: state.outfits.selectedOutfit,
    }),
    {}
)
export default class CurrentOutfit extends Component{
  static propTypes = {
    currentOutfit: PropTypes.shape({
      id: PropTypes.number,
      url: PropTypes.string
    })
  };

  render() {
    const {currentOutfit} = this.props;
    //const styles = require('./CurrentOutfit.scss');
    const inlinestyles = {height: '80vh', width: 'auto'};
    return (
      <div>
      {currentOutfit &&
              <img key={currentOutfit.id}
                src={currentOutfit.url}
                //className={styles.outfitImage}
                style= {inlinestyles}
              />
      }
      </div>
    );
  }
}
