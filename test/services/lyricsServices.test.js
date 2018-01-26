const assert = require('assert');
const cheerio = require('cheerio');
const fetch_retry = require('../helpers/fetch_retry');

const test_cases = {
  'azlyricsService': require('./specs/azlyricsService.spec'),
  'metrolyricsService': require('./specs/metrolyricsService.spec'),
  'mojimService': require('./specs/mojimService.spec'),
};

const makeTest = (serviceName, { url, expect }) => {
  describe(`${serviceName} - ${expect.title}`, function() {
    before(function(done) {
      fetch_retry(url)
        .then(res => res.text())
        .then(html => this.$ = cheerio.load(html))
        .then(() => done())
        .catch(done);
      this.lyricsService = require('../../lib/services/' + serviceName);
    });

    it('#parseTitle()', function() {
      const { $ } = this;
      assert.equal(this.lyricsService.parseTitle($), expect.title);
    });

    it('#parseArtist()', function() {
      const { $ } = this;
      assert.equal(this.lyricsService.parseArtist($), expect.artist);
    });

    it('#parseLyrics()', function() {
      const { $ } = this;
      assert.equal(this.lyricsService.parseLyrics($), expect.lyrics);
    });
  });
}

describe('lyricsServices', () => {
  for (let [serviceName, specs] of Object.entries(test_cases)) {
    specs.forEach(spec => makeTest(serviceName, spec));
  };
});
