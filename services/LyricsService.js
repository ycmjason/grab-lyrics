const fetch = require('node-fetch');
const cheerio = require('cheerio');

class LyricsService {
  fetch(url) {
    return fetch(url).then(res => res.text())
      .then(html => cheerio.load(html))
      .then(this.parse.bind(this));
  }

  parse($) {
    const title = this.parseTitle($);
    const lyrics = this.parseLyrics($);
    const artist = this.parseArtist($);
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
