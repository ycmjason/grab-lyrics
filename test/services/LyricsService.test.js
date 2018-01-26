const assert = require('assert');

const sinon = require('sinon');
const stub_fetch = require('../helpers/stub_fetch');
const stub_cheerio = require('../helpers/stub_cheerio');

const proxyquire = require('proxyquire');


const LyricsServicePath = '../../lib/services/LyricsService';

describe('LyricsService', function() {
  beforeEach(function() {
    const html = `<b>hihi hello world</b>`;
    const fakeLibs = {
      'node-fetch': stub_fetch.ok(html),
      'cheerio': stub_cheerio(),
    };
    const LyricsService = proxyquire(LyricsServicePath, fakeLibs);

    Object.assign(this, { html, fakeLibs, LyricsService });
  });

  describe('fetch()', function() {
    it('# should call fetch', function(done) {
      const { LyricsService, fakeLibs, html } = this;
      const url = 'some_url.com';
      sinon.stub(LyricsService.prototype, 'parse');

      const lyricsService = new LyricsService();

      lyricsService.fetch(url).then(() => {
        assert(fakeLibs['node-fetch'].calledWith(url));
        assert(lyricsService.parse.calledWith(html));
      }).then(done);

    });
  });

  describe('parse()', function() {
    it('# should call parseTitle/Lyrics/Artist()', function() {
      const { LyricsService, fakeLibs, html } = this;
      const LOAD_RETURNS = 'yoyoyo amazing!';
      fakeLibs.cheerio.load.returns(LOAD_RETURNS);

      sinon.stub(LyricsService.prototype, 'parseTitle');
      sinon.stub(LyricsService.prototype, 'parseArtist');
      sinon.stub(LyricsService.prototype, 'parseLyrics');

      const lyricsService = new LyricsService();

      lyricsService.parse(html);

      assert(fakeLibs.cheerio.load.calledWith(html));
      assert.equal(fakeLibs.cheerio.load.callCount, 3);
      assert(lyricsService.parseTitle.calledWith(LOAD_RETURNS));
      assert(lyricsService.parseArtist.calledWith(LOAD_RETURNS));
      assert(lyricsService.parseLyrics.calledWith(LOAD_RETURNS));
    });
  });

  describe('parseArtist()', function() {
    it('# should throw', function() {
      const { LyricsService } = this;
      assert.throws(() => new LyricsService().parseArtist(), /overwritten/);
    });
  });

  describe('parseTitle()', function() {
    it('# should throw', function() {
      const { LyricsService } = this;
      assert.throws(() => new LyricsService().parseTitle(), /overwritten/);
    });
  });

  describe('parseLyrics()', function() {
    it('# should throw', function() {
      const { LyricsService } = this;
      assert.throws(() => new LyricsService().parseLyrics(), /overwritten/);
    });
  });
});
