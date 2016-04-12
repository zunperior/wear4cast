import Enum from 'es6-enum';

export const CONDITION = Enum(
  'SNOW',
  'RAIN',
  'WIND',
  'ALL');

//
//  WINTER_SUPERCOLD    WINTER_COLD   WINTER_NORMAL   WINTER_WARM  WINTER_HOT
//                                                                 SPRING_SUPERCOLD    SPRING_COLD   SPRING_NORMAL      SPRING_WARM   SPRING_HOT
//                                                                 FALL_SUPERCOLD      FALL_COLD     FALL_NORMAL        FALL_WARM     FALL_HOT
//                                                                                                   SUMMER_SUPERCOLD           SUMMER_COLD          SUMMER_NORMAL    SUMMER_WARM    SUMMER_HOT
// ------------------+--------------+---------------+------------+-------------------+-------------+------------------+-------------+--------------+----------------+--------------+-----------------
//                 -21             -8              -1            2                   5             9                 14            17             20               27             32
export const SEASON = Enum(
  'WINTER',
  'SPRING',
  'SUMMER',
  'FALL'
);

export const TEMP_LEVEL = Enum(
  'SUPERCOLD',
  'COLD',
  'NORMAL',
  'WARM',
  'HOT'
);

export const  STYLE = Enum(
  'OUTDOORS',
  'SPORTY',
  'BEACH',
  'RESORT',
  'RESORT_DRESSEDUP',
  'CLUB',
  'FORMAL',
  'CASUAL',
  'SMART_CASUAL',
  'BUSINESS'
);

const initialOutfits = [
    { id: 5,
      url: 'http://oi68.tinypic.com/t4x08z.jpg',
      season: SEASON.WINTER,
      temp_level: TEMP_LEVEL.COLD,
      conditions: [CONDITION.SNOW, CONDITION.WIND],
      style: STYLE.BUSINESS,
      items:
        [
          { id: 51,
            link: 'http://bananarepublic.gapcanada.ca/browse/product.do?cid=85424&vid=1&pid=762150003',
            imgUrl: 'http://bananarepublic.gapcanada.ca/webcontent/0006/518/296/cn6518296.jpg',
            descr: 'Tailored-Fit Navy Italian Wool Suit Jacket',
            price: 495.00
          },
          { id: 52,
            link: 'http://bananarepublic.gapcanada.ca/browse/product.do?cid=1050643&vid=1&pid=184617003',
            imgUrl: 'http://bananarepublic.gapcanada.ca/webcontent/0010/776/018/cn10776018.jpg',
            descr: 'Camden-Fit Non-Iron Oxford Shirt',
            price: 110.00
          }
        ]
    },
		{ id: 6,
      url: 'http://oi63.tinypic.com/2nr3hoi.jpg',
      season: SEASON.WINTER,
      temp_level: TEMP_LEVEL.COLD,
      conditions: [CONDITION.SNOW, CONDITION.WIND],
      style: STYLE.BUSINESS,
      items:
        [
          { id: 61,
            link: 'http://bananarepublic.gapcanada.ca/browse/product.do?cid=1053856&vid=1&pid=184993013',
            imgUrl: 'http://bananarepublic.gapcanada.ca/webcontent/0010/743/517/cn10743517.jpg',
            descr: 'Vintage U-Neck Tee',
            price: 35.00
          }
        ]
    },

    { id: 7,
      url: 'http://oi64.tinypic.com/1zlpqn6.jpg',
      season: SEASON.WINTER,
      temp_level: TEMP_LEVEL.COLD,
      conditions: [CONDITION.SNOW, CONDITION.WIND],
      style: STYLE.BUSINESS,
      items:
        [
          { id: 71,
            link: 'http://bananarepublic.gapcanada.ca/browse/product.do?cid=1051348&vid=1&pid=724291003',
            imgUrl: 'http://bananarepublic.gapcanada.ca/webcontent/0010/459/290/cn10459290.jpg',
            descr: 'Double-Breasted Trench',
            price: 310.00
          },
          { id: 72,
            link: 'http://bananarepublic.gapcanada.ca/browse/product.do?cid=1051345&vid=1&pid=175290003',
            imgUrl: 'http://bananarepublic.gapcanada.ca/webcontent/0010/575/855/cn10575855.jpg',
            descr: 'Water-Repellent Cotton Jacket',
            price: 124.00
          }
        ]
    },
	];

export function getOutfits(req) {
  let outfits = req.session.outfits;
  if (!outfits) {
    outfits = initialOutfits;
    req.session.outfits = outfits;
  }
  return outfits;
}

export default function load(req) {
  return new Promise((resolve) => {
    // make async call to database
    setTimeout(() => {
      resolve(getOutfits(req));

    }, 1000); // simulate async load
  });
}
