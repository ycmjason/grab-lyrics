const axios = require('axios');
const cheerio = require('cheerio');

class LyricsService {
  fetch(url) {
    return axios.get(url)
      .then(res => res.data)
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
