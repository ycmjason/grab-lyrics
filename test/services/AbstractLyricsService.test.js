const assert = require('assert');

const sinon = require('sinon');
const stub_fetch = require('../helpers/stub_fetch');
const stub_cheerio = require('../helpers/stub_cheerio');

const proxyquire = require('proxyquire');

const AbstractLyricsServicePath = '../../lib/services/AbstractLyricsService';

const ABSTRACT_METHODS = [
  'parseTitle',
  'parseArtist',
  'parseLyrics',
  'canParse',
];

describe('AbstractLyricsService', function() {
  beforeEach(function() {
    const html = `<b>hihi hello world</b>`;
    const fakeLibs = {
      'node-fetch': stub_fetch.ok(html),
      'cheerio': stub_cheerio(),
    };
    const AbstractLyricsService = proxyquire(AbstractLyricsServicePath, fakeLibs);

    Object.assign(this, { html, fakeLibs, AbstractLyricsService });
  });

  describe('fetch()', function() {
    it('# should call fetch', function(done) {
      const { AbstractLyricsService, fakeLibs, html } = this;
      const url = 'some_url.com';
      sinon.stub(AbstractLyricsService.prototype, 'parse');

      const lyricsService = new AbstractLyricsService();

      lyricsService.fetch(url).then(() => {
        assert(fakeLibs['node-fetch'].calledWith(url));
        assert(lyricsService.parse.calledWith(html));
      }).then(done);

    });
  });

  describe('parse()', function() {
    it('# should call parseTitle/Lyrics/Artist()', function() {
      const { AbstractLyricsService, fakeLibs, html } = this;
      const LOAD_RETURNS = 'yoyoyo amazing!';
      fakeLibs.cheerio.load.returns(LOAD_RETURNS);

      sinon.stub(AbstractLyricsService.prototype, 'parseTitle');
      sinon.stub(AbstractLyricsService.prototype, 'parseArtist');
      sinon.stub(AbstractLyricsService.prototype, 'parseLyrics');

      const lyricsService = new AbstractLyricsService();

      lyricsService.parse(html);

      assert(fakeLibs.cheerio.load.calledWith(html));
      assert.equal(fakeLibs.cheerio.load.callCount, 3);
      assert(lyricsService.parseTitle.calledWith(LOAD_RETURNS));
      assert(lyricsService.parseArtist.calledWith(LOAD_RETURNS));
      assert(lyricsService.parseLyrics.calledWith(LOAD_RETURNS));
    });
  });

  ABSTRACT_METHODS.forEach(methodName => {
    describe(`${methodName}()`, function() {
      it('# should throw', function() {
        const { AbstractLyricsService } = this;
        assert.throws(() => new AbstractLyricsService()[methodName](), /overwritten/);
      });
    });
  });
});
