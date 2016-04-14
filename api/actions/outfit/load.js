// Conditions
const SNOW = 'SNOW';
const RAIN = 'RAIN';
const WIND = 'WIND';
const ALL = 'ALL';

// Seasons
const WINTER = 'WINTER';
const SPRING = 'SPRING';
const SUMMER = 'SUMMER';
const FALL = 'FALL';

// Temperature Levels

const SUPERCOLD = 'SUPERCOLD';
const COLD = 'COLD';
const NORMAL = 'NORMAL';
const WARM = 'WARM';
const HOT = 'HOT';


// Styles
const OUTDOORS = 'OUTDOORS';
const SPORTY = 'SPORTY';
const BEACH = 'BEACH';
const RESORT = 'RESORT';
const RESORT_DRESSEDUP = 'RESORT_DRESSEDUP';
const CLUB = 'CLUB';
const FORMAL = 'FORMAL';
const CASUAL = 'CASUAL';
const SMART_CASUAL = 'SMART_CASUAL';
const BUSINESS = 'BUSINESS';


const initialOutfits = [
    { id: 5,
      url: 'http://oi68.tinypic.com/t4x08z.jpg',
      season: WINTER,
      temp_level: COLD,
      conditions: [SNOW, WIND],
      style: BUSINESS,
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
      season: WINTER,
      temp_level: COLD,
      conditions: [SNOW, WIND],
      style: BUSINESS,
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
      season: WINTER,
      temp_level: COLD,
      conditions: [SNOW, WIND],
      style: BUSINESS,
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

// inclusive range check
function inRange(val, min, max){
  return (val>=min && val<=max);
}

function getFilter(temperature, date, condition, style)
{
  //
  //  WINTER_SUPERCOLD    WINTER_COLD   WINTER_NORMAL   WINTER_WARM  WINTER_HOT
  //                                                                 SPRING_SUPERCOLD    SPRING_COLD   SPRING_NORMAL      SPRING_WARM   SPRING_HOT
  //                                                                 FALL_SUPERCOLD      FALL_COLD     FALL_NORMAL        FALL_WARM     FALL_HOT
  //                                                                                                   SUMMER_SUPERCOLD           SUMMER_COLD          SUMMER_NORMAL    SUMMER_WARM    SUMMER_HOT
  // ------------------+--------------+---------------+------------+-------------------+-------------+------------------+-------------+--------------+----------------+--------------+-----------------
  //                 -21             -8              -1            2                   5             9                 14            17             20               27             32

  const month = new Date(date).getMonth();
  const springOrFall = month > 5 ? SPRING : FALL;
  // WINTER_SUPERCOLD
  if (temperature < -20){
    return  [{season: WINTER, temp_level: SUPERCOLD, condition: condition, style: style}];
  }

  // WINTER_COLD
  if (inRange(temperature, -20, -8)){
    return  [{season: WINTER, temp_level: COLD, condition: condition, style: style}];
  }

  // WINTER_NORMAL
  if (inRange(temperature, -7, -1)){
    return  [{season: WINTER, temp_level: NORMAL, condition: condition, style: style}];
  }

  // WINTER_WARM
  if (inRange(temperature, 0, 2)){
    return  [{season: WINTER, temp_level: NORMAL, condition: condition, style: style}];
  }

  // WINTER_HOT, SPRING_SUPERCOLD, FALL_SUPERCOLD
  if (inRange(temperature, 3, 5)){
    return  [
      {season: WINTER, temp_level: SUPERCOLD, condition: condition, style: style},
      {season: springOrFall, temp_level: SUPERCOLD, condition: condition, style: style},
    ];
  }

  // SPRING_COLD, FALL_COLD
  if (inRange(temperature, 6, 9)){
    return  [{season: springOrFall, temp_level: COLD, condition: condition, style: style}];
  }

  // SPRING_NORMAL, FALL_NORMAL, SUMMER_SUPERCOLD
  if (inRange(temperature, 10, 14)){
    return  [
      {season: SUMMER, temp_level: SUPERCOLD, condition: condition, style: style},
      {season: springOrFall, temp_level: NORMAL, condition: condition, style: style},
    ];
  }

  // SPRING_WARM, FALL_WARM, SUMMER_COLD
  if (inRange(temperature, 15, 17)){
    return  [
      {season: SUMMER, temp_level: COLD, condition: condition, style: style},
      {season: springOrFall, temp_level: WARM, condition: condition, style: style},
    ];
  }

  // SPRING_HOT, FALL_HOT, SUMMER_COLD
  if (inRange(temperature, 18, 20)){
    return  [
      {season: SUMMER, temp_level: COLD, condition: condition, style: style},
      {season: springOrFall, temp_level: HOT, condition: condition, style: style},
    ];
  }

  // SUMMER_NORMAL
  if (inRange(temperature, 21, 27)){
    return  [{season: SUMMER, temp_level: NORMAL, condition: condition, style: style}];
  }

  // SUMMER_WARM
  if (inRange(temperature, 28, 32)){
    return  [{season: SUMMER, temp_level: WARM, condition: condition, style: style}];
  }

  // SUMMER_HOT
  if (temperature > 32){
    return  [{season: SUMMER, temp_level: HOT, condition: condition, style: style}];
  }
}

function matchExact(filter) {
  return function(outfit) {
    for (var filterItem of filter) {
      // Outfit has matching season and temperature level
      if (outfit.style === filterItem.style && outfit.season === filterItem.season && outfit.temp_level === filterItem.temp_level){

        // No conditions are specified for the outfit (means good for any weather)
        if (!outfit.conditions || outfit.conditions.length === 0){
          return true;
        }

        for(var outfitCondition of outfit.conditions){
          // outfit is good for any weather
          if (outfitCondition === ALL){
            return true;
          }

          // outfit matches weather condition
          if (outfitCondition === filterItem.condition){
            return true;
          }
        }
      }
    }

    return false;
  };
}

export function getOutfits(req, filter) {

  let outfits = initialOutfits.filter(matchExact(filter));
  req.session.outfits = outfits;

  return outfits;
}

export default function load(req, params) {

  return new Promise((resolve) => {
    // make async call to database
    setTimeout(() => {
      resolve(getOutfits(req, getFilter(
        params[0], // temperature
        params[1], // date
        params[2], // condition
        params[3]  // style
      )));

    }, 1000); // simulate async load
  });
}
