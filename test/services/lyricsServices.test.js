const assert = require('assert');
const cheerio = require('cheerio');
const testPages = require('./specs/testPages.json');

const specs = require('./specs');

const makeTest = (serviceName, { url, expect }) => {
  describe(`${serviceName} - ${expect.title}`, function() {
    before(function() {
      this.html = testPages[url];
      this.lyricsService = require('../../lib/services/' + serviceName);
    });

    it('#parseTitle()', function() {
      const { html } = this;
      assert.equal(this.lyricsService.parseTitle(cheerio.load(html)), expect.title);
    });

    it('#parseArtist()', function() {
      const { html } = this;
      assert.equal(this.lyricsService.parseArtist(cheerio.load(html)), expect.artist);
    });

    it('#parseLyrics()', function() {
      const { html } = this;
      assert.equal(this.lyricsService.parseLyrics(cheerio.load(html)), expect.lyrics);
    });
  });
}

describe('lyricsServices', () => {
  for (let [serviceName, testCases] of Object.entries(specs)) {
    testCases.forEach(testCase => makeTest(serviceName, testCase));
  };
});
