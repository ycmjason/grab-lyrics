const assert = require('assert');

const sinon = require('sinon');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const freshRequire = (path) => {
  delete require.cache[require.resolve(path)]
  return require(path);
};

const freshLyricsService = () => new (freshRequire('../../lib/services/LyricsService'))();

describe('LyricsService', function() {
  describe('fetch()', function() {
    it('# should call fetch', function(done) {
      const url = 'some_url.com';
      const res = {
        text: sinon.stub()
      };

      sinon.stub(fetch, 'default')                  
      fetch.default.returns(Promise.resolve(res));
      const lyricsService = freshLyricsService();
      sinon.stub(lyricsService, 'parse');

      lyricsService.fetch(url).then(() => {
        assert(fetch.default.calledWith(url));
        assert(res.text.called);
        assert(lyricsService.parse.called);
        fetch.default.restore();
      }).then(done);

    });
  });

  describe('parse()', function() {
    it('# should call parseTitle/Lyrics/Artist()', function() {
      const html = 'hello worllllld';
      const $ = 'hi';

      sinon.stub(cheerio, 'load');
      cheerio.load.returns($);

      const lyricsService = freshLyricsService();
      sinon.stub(lyricsService, 'parseTitle');
      sinon.stub(lyricsService, 'parseArtist');
      sinon.stub(lyricsService, 'parseLyrics');

      lyricsService.parse(html);
      assert(cheerio.load.calledWith(html));
      assert.equal(cheerio.load.callCount, 3);
      assert(lyricsService.parseTitle.calledWith($));
      assert(lyricsService.parseArtist.calledWith($));
      assert(lyricsService.parseLyrics.calledWith($));

      cheerio.load.restore();
    });
  });

  describe('parseArtist()', function() {
    it('# should throw', function() {
      assert.throws(() => freshLyricsService().parseArtist(), /overwritten/);
    });
  });

  describe('parseTitle()', function() {
    it('# should throw', function() {
      assert.throws(() => freshLyricsService().parseTitle(), /overwritten/);
    });
  });

  describe('parseLyrics()', function() {
    it('# should throw', function() {
      assert.throws(() => freshLyricsService().parseLyrics(), /overwritten/);
    });
  });
});
