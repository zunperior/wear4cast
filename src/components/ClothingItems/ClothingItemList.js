import React, {PropTypes} from 'react';
function renderClosingItem(clothingItem){
  return (
    <div key = {clothingItem.id}>
      <p>{clothingItem.descr}</p>
      <img key={clothingItem.id}
        src={clothingItem.imgUrl}
      />
      <p>{clothingItem.price}</p>
      <a href={clothingItem.link}>{'Buy'}</a>
    </div>
  );
}
const ClothingItemList = (props) => {
  const {clothingItemList} = props;
  //const clothingItemList = ['one', 'two', 'three'];
  return (
    <div>
      {
        clothingItemList.map(renderClosingItem)
      }
   </div>
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
