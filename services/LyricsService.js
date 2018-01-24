const fetch = require('node-fetch');
const cheerio = require('cheerio');

class LyricsService {
  fetch(url) {
    return fetch(url).then(res => res.text())
      .then(this.parse.bind(this));
  }

  parse(html) {
    const title = this.parseTitle(cheerio.load($));
    const lyrics = this.parseLyrics(cheerio.load($));
    const artist = this.parseArtist(cheerio.load($));
    return { title, artist, lyrics };
  };

  parseArtist($) {
    throw "this method should be overwritten!";
  }

  parseTitle($) {
    throw "this method should be overwritten!";
  }

  parseLyrics($) {
    throw "this method should be overwritten!";
  }
}

module.exports = LyricsService;
