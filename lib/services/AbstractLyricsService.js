const fetch = require('node-fetch');
const cheerio = require('cheerio');

// abstract class
class AbstractLyricsService {
  fetch(url) {
    return fetch(url).then(res => res.text())
      .then(this.parse.bind(this))
      .catch(console.error.bind(console));
  }

  parse(html) {
    const title = this.parseTitle(cheerio.load(html));
    const artist = this.parseArtist(cheerio.load(html));
    const lyrics = this.parseLyrics(cheerio.load(html));
    return { title, artist, lyrics };
  };

  canParse(url) {
    throw new Error('this method should be overwritten!');
  }

  parseArtist($) {
    throw new Error('this method should be overwritten!');
  }

  parseTitle($) {
    throw new Error('this method should be overwritten!');
  }

  parseLyrics($) {
    throw new Error('this method should be overwritten!');
  }
}

module.exports = AbstractLyricsService;
