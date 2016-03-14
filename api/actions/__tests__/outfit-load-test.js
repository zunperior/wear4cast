import {expect} from 'chai';
import load from '../outfit/load';

describe('outfit load', () => {
  describe('successful', () => {
    it('uses the outfit from the session', () => {
      return load({session: {outfits: ['a', 'b', 'c']}}).then(outfits => {
        expect(outfits.length).to.equal(3);
      });
    });

    it('initializes the outfits ', () => {
      return load({session: {}}).then(outfits => {
        expect(outfits.length).to.equal(4);
        expect(outfits[0].url).to.equal('some url 1');
      });
    });
  });
});
