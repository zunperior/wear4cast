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

    return(
      <div>
          <h1>{'Current Outfit'}</h1>
          {currentOutfit &&
              <img key={currentOutfit.id}
                src={currentOutfit.url}
              />
          }
    </div>
    );
  }

}
