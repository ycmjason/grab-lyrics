/* eslint-env node, mocha */

const assert = require('assert');
const cheerio = require('cheerio');
const testPages = require('./specs/testPages.json');

const specs = require('./specs');

const TEST_PAGE_MISSING_ERROR = new Error('Test page missing: Please do `npm run createTestPages`');

const AbstractLyricsService = require('../../lib/services/AbstractLyricsService');

const makeTest = (serviceName, { url, expect }) => {
  describe(`${serviceName} - ${expect.title}`, function() {
    before(function() {
      if (!(url in testPages)) throw TEST_PAGE_MISSING_ERROR;
      this.html = testPages[url];
      this.lyricsService = require('../../lib/services/' + serviceName);
    });

    it('# should be an instance of AbstractLyricsService', function() {
      assert(this.lyricsService instanceof AbstractLyricsService);
    });

    describe('# canParse()', function() {
      it('# should return true to the appropriate urls', function() {
        assert(this.lyricsService.canParse(url));
      });
    });

    describe('parseTitle()', function() {
      it('# should parse title properly', function() {
        const { html } = this;
        assert.equal(this.lyricsService.parseTitle(cheerio.load(html)), expect.title);
      });
    });

    describe('parseArtist()', function() {
      it('# should parse title properly', function() {
        const { html } = this;
        assert.equal(this.lyricsService.parseArtist(cheerio.load(html)), expect.artist);
      });
    });

    describe('parseLyrics()', function() {
      it('# should parse title properly', function() {
        const { html } = this;
        assert.equal(this.lyricsService.parseLyrics(cheerio.load(html)), expect.lyrics);
      });
    });
  });
};

describe('lyricsServices', () => {
  for (let [serviceName, testCases] of Object.entries(specs)) {
    testCases.forEach(testCase => makeTest(serviceName, testCase));
  }
});
