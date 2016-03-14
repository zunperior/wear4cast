const initialOutfits = [
		{ id: 1, url: 'some url 1', info: 'some info 1' },
		{ id: 2, url: 'some url 2', info: 'some info 2' }
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
