const initialOutfits = [
		{ id: 1,
      url: 'http://oi63.tinypic.com/2nr3hoi.jpg',
      items:
        [
          { id: 11,
            link: 'some link 11',
            imgUrl: 'some image url 11',
            descr: 'some description 11',
            price: 5.99
          },
          { id: 12,
            link: 'some link 12',
            imgUrl: 'some image url 12',
            descr: 'some description 12',
            price: 10.99
          }
        ]
    },
    { id: 2,
      url: 'http://oi68.tinypic.com/t4x08z.jpg',
      items:
        [
          { id: 21,
            link: 'some link 21',
            imgUrl: 'some image url 21',
            descr: 'some description 11',
            price: 25.00
          },
          { id: 22,
            link: 'some link 22',
            imgUrl: 'some image url 22',
            descr: 'some description 22',
            price: 34.99
          },
          { id: 23,
            link: 'some link 23',
            imgUrl: 'some image url 23',
            descr: 'some description 23',
            price: 56.99
          }
        ]
    },
    { id: 3,
      url: 'http://oi64.tinypic.com/1zlpqn6.jpg',
      items:
        [
          { id: 31,
            link: 'some link 31',
            imgUrl: 'some image url 31',
            descr: 'some description 31',
            price: 100.99
          },
          { id: 32,
            link: 'some link 32',
            imgUrl: 'some image url 32',
            descr: 'some description 32',
            price: 200.99
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
