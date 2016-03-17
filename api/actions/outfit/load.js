const initialOutfits = [
		{ id: 1, url: 'http://oi63.tinypic.com/2nr3hoi.jpg', info: 'some info 1' },
		{ id: 2, url: 'http://oi68.tinypic.com/t4x08z.jpg', info: 'some info 2' },
    { id: 3, url: 'http://oi64.tinypic.com/1zlpqn6.jpg', info: 'some info 3' }
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
