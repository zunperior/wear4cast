import React, {PropTypes} from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

function renderClosingItem(clothingItem){
  const styles = require('./ClothingItemList.scss');

  return (
    <div key = {clothingItem.id} className={styles.clothingItem + ' ' + styles.shadow}>
      <img key={clothingItem.id}
        src={clothingItem.imgUrl}
      />
    <p className={styles.clothingItemDescription}>
      {clothingItem.descr}
    </p>
    <p className={styles.clothingItemDescription}>
      {'$'}{clothingItem.price}{'\u00A0 \u00A0'}
      <a className={'btn btn-success btn-sm'} href={clothingItem.link} role={'button'}>
        <i className={'fa fa-shopping-cart'} />{'\u00A0'}{'BUY'}
      </a>
    </p>

    </div>
  );
}

const ClothingItemList = (props) => {
  const {clothingItemList} = props;
  return (
    <Scrollbars universal style={{ width: '300', height: '95vh' }}>

        {/*<div style = {inlinestyles}>*/}
        <div>
          {
            clothingItemList.map(renderClosingItem)
          }
        </div>

    </Scrollbars>

  );
};

ClothingItemList.propTypes = {
  clothingItemList: PropTypes.array
  // clothingItemList: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     id: PropTypes.number,
  //     imgUrl: PropTypes.string,
  //     price: PropTypes.number,
  //     link: PropTypes.link
  //   })
  // )
};

export default ClothingItemList;
