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
    { id: 13,
      url: 'https://s3.amazonaws.com/outfits.wear4cast.com/Look13.jpg',
      season: WINTER,
      temp_level: COLD,
      conditions: [SNOW, WIND],
      style: BUSINESS,
      items:
        [
          { id: 131,
            link: 'http://usa.tommy.com/shop/en/thb2cus/7894202',
            imgUrl: 'https://s3.amazonaws.com/clothingitems.wear4cast.com/Look13_item1.jpg',
            descr: 'BLOCK STRIPE TEE',
            price: '49.50'
          },
          { id: 132,
            link: 'http://usa.tommy.com/shop/en/thb2cus/7889648',
            imgUrl: 'https://s3.amazonaws.com/clothingitems.wear4cast.com/Look13_item2.jpg',
            descr: 'DENTON STRETCH COTTON CHINO',
            price: '109.50'
          },
          { id: 133,
            link: 'http://usa.tommy.com/shop/en/thb2cus/7893516',
            imgUrl: 'https://s3.amazonaws.com/clothingitems.wear4cast.com/Look13_item3.jpg',
            descr: 'MODERN TRENCH',
            price: '395.00'
          }
        ]
    },
    { id: 17,
      url: 'https://s3.amazonaws.com/outfits.wear4cast.com/Look17.jpg',
      season: WINTER,
      temp_level: COLD,
      conditions: [SNOW, WIND],
      style: BUSINESS,
      items:
        [
          { id: 171,
            link: 'http://usa.tommy.com/shop/en/thb2cus/7894204',
            imgUrl: 'https://s3.amazonaws.com/clothingitems.wear4cast.com/Look17_item1.jpg',
            descr: 'FLOWER POCKET TEE',
            price: '49.50'
          },
          { id: 172,
            link: 'http://usa.tommy.com/shop/en/thb2cus/7893642',
            imgUrl: 'https://s3.amazonaws.com/clothingitems.wear4cast.com/Look17_item2.jpg',
            descr: 'STRAIGHT FIT SLIM CHINO',
            price: '109.50'
          },
          { id: 173,
            link: 'http://usa.tommy.com/shop/en/thb2cus/7893508',
            imgUrl: 'https://s3.amazonaws.com/clothingitems.wear4cast.com/Look17_item3.jpg',
            descr: 'UTILITY WINDBREAKER',
            price: '250.00'
          }
        ]
    },
    { id: 6,
      url: 'https://s3.amazonaws.com/outfits.wear4cast.com/Look06.jpg',
      season: WINTER,
      temp_level: COLD,
      conditions: [SNOW, WIND],
      style: BUSINESS,
      items:
        [
          { id: 61,
            link: 'http://usa.tommy.com/shop/en/thb2cus/7894414',
            imgUrl: 'https://s3.amazonaws.com/clothingitems.wear4cast.com/Look06_item1.jpg',
            descr: 'SLIM FIT PRINT SHIRT',
            price: '89.50'
          },
          { id: 62,
            link: 'http://usa.tommy.com/shop/en/thb2cus/7893537',
            imgUrl: 'https://s3.amazonaws.com/clothingitems.wear4cast.com/Look06_item2.jpg',
            descr: 'COLORED DENTON CHINO',
            price: '129.50'
          },
          { id: 63,
            link: 'http://usa.tommy.com/shop/en/thb2cus/7893797',
            imgUrl: 'https://s3.amazonaws.com/clothingitems.wear4cast.com/Look06_item3.jpg',
            descr: 'DOWNTOWN FIELD JACKET',
            price: '395.00'
          }
        ]
    },
    { id: 5,
      url: 'https://s3.amazonaws.com/outfits.wear4cast.com/Look05.jpg',
      season: WINTER,
      temp_level: COLD,
      conditions: [SNOW, WIND],
      style: BUSINESS,
      items:
        [
          { id: 51,
            link: 'http://usa.tommy.com/shop/en/thb2cus/7894164',
            imgUrl: 'https://s3.amazonaws.com/clothingitems.wear4cast.com/Look05_item1.jpg',
            descr: 'CUSTOM FIT CREWNECK SWEATER',
            price: '119.50'
          },
          { id: 52,
            link: 'http://usa.tommy.com/shop/en/thb2cus/7893537',
            imgUrl: 'https://s3.amazonaws.com/clothingitems.wear4cast.com/Look05_item2.jpg',
            descr: 'DENTON STRETCH COTTON CHINO',
            price: '109.50'
          },
          { id: 53,
            link: 'http://usa.tommy.com/shop/en/thb2cus/7893797',
            imgUrl: 'https://s3.amazonaws.com/clothingitems.wear4cast.com/Look05_item3.jpg',
            descr: 'DOWNTOWN FIELD JACKET',
            price: '395.00'
          }
        ]
    },
    { id: 18,
      url: 'https://s3.amazonaws.com/outfits.wear4cast.com/Look18.jpg',
      season: WINTER,
      temp_level: COLD,
      conditions: [SNOW, WIND],
      style: BUSINESS,
      items:
        [
          { id: 181,
            link: 'http://usa.tommy.com/shop/en/thb2cus/7894276',
            imgUrl: 'https://s3.amazonaws.com/clothingitems.wear4cast.com/Look18_item1.jpg',
            descr: 'SLIM FIT INDIGO POLO',
            price: '89.50'
          },
          { id: 182,
            link: 'http://usa.tommy.com/shop/en/thb2cus/7893776',
            imgUrl: 'https://s3.amazonaws.com/clothingitems.wear4cast.com/Look18_item2.jpg',
            descr: 'FLORAL DENTON CHINO',
            price: '139.50'
          }
        ]
    },
    { id: 20,
      url: 'https://s3.amazonaws.com/outfits.wear4cast.com/Look20.jpg',
      season: WINTER,
      temp_level: COLD,
      conditions: [SNOW, WIND],
      style: BUSINESS,
      items:
        [
          { id: 201,
            link: 'http://usa.tommy.com/shop/en/thb2cus/7894184',
            imgUrl: 'https://s3.amazonaws.com/clothingitems.wear4cast.com/Look20_item1.jpg',
            descr: 'CLASSIC HEATHERED TEE',
            price: '45.50'
          },
          { id: 202,
            link: 'http://usa.tommy.com/shop/en/thb2cus/7889654',
            imgUrl: 'https://s3.amazonaws.com/clothingitems.wear4cast.com/Look20_item2.jpg',
            descr: 'TAILORED CLUB SHORT',
            price: '69.50'
          },
          { id: 203,
            link: 'http://usa.tommy.com/shop/en/thb2cus/7894183',
            imgUrl: 'https://s3.amazonaws.com/clothingitems.wear4cast.com/Look20_item3.jpg',
            descr: 'MOCKNECK STRIPE HOODIE',
            price: '179.50'
          }
        ]
    },
    { id: 20,
      url: 'https://s3.amazonaws.com/outfits.wear4cast.com/Look20.jpg',
      season: WINTER,
      temp_level: COLD,
      conditions: [SNOW, WIND],
      style: BUSINESS,
      items:
        [
          { id: 201,
            link: 'http://usa.tommy.com/shop/en/thb2cus/7894184',
            imgUrl: 'https://s3.amazonaws.com/clothingitems.wear4cast.com/Look20_item1.jpg',
            descr: 'CLASSIC HEATHERED TEE',
            price: '45.50'
          },
          { id: 202,
            link: 'http://usa.tommy.com/shop/en/thb2cus/7889654',
            imgUrl: 'https://s3.amazonaws.com/clothingitems.wear4cast.com/Look20_item2.jpg',
            descr: 'TAILORED CLUB SHORT',
            price: '69.50'
          },
          { id: 203,
            link: 'http://usa.tommy.com/shop/en/thb2cus/7894183',
            imgUrl: 'https://s3.amazonaws.com/clothingitems.wear4cast.com/Look20_item3.jpg',
            descr: 'MOCKNECK STRIPE HOODIE',
            price: '179.50'
          }
        ]
    },
    { id: 19,
      url: 'https://s3.amazonaws.com/outfits.wear4cast.com/Look19.jpg',
      season: WINTER,
      temp_level: COLD,
      conditions: [SNOW, WIND],
      style: BUSINESS,
      items:
        [
          { id: 191,
            link: 'http://usa.tommy.com/shop/en/thb2cus/7893922',
            imgUrl: 'https://s3.amazonaws.com/clothingitems.wear4cast.com/Look19_item1.jpg',
            descr: 'NEW YORK FIT 80S TWO-PLY SHIRT',
            price: '79.50'
          },
          { id: 192,
            link: 'http://usa.tommy.com/shop/en/thb2cus/7893718',
            imgUrl: 'https://s3.amazonaws.com/clothingitems.wear4cast.com/Look19_item2.jpg',
            descr: 'FLORAL SWIM TRUNK',
            price: '69.50'
          }
        ]
    },
	];

// inclusive range check
function inRange(val, min, max){
  const res =  (val>=min && val<=max);
  // console.info(`inRange: ${res}, val:${val} min:${min} max:${max}`);
  return res;
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
  const springOrFall = month > 5 ? FALL : SPRING;
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

        // filter has no weather limiting conditions
        if (filterItem.condition === 'ANY'){
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

function matchAll(filter){
  return function(outfit) {
    return true;
  }
}

export function getOutfits(req, filter) {

  // let outfits = initialOutfits.filter(matchExact(filter));
  let outfits = initialOutfits.filter(matchAll(filter));
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
