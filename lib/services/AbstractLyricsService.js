const { URL } = require('url');

const fetch = require('node-fetch');
const cheerio = require('cheerio');

const NOT_OVERWRITTEN_ERROR = new Error('Not overwritten: this should be overwritten!');

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
  }

  canParse(url) {
    return this.canParseHostnames
      .map(hostname => hostname.toLowerCase())
      .includes(new URL(url).hostname.toLowerCase());
  }

  get canParseHostnames() {
    throw NOT_OVERWRITTEN_ERROR;
  }

  parseArtist($) { // eslint-disable-line no-unused-vars
    throw NOT_OVERWRITTEN_ERROR;
  }

  parseTitle($) { // eslint-disable-line no-unused-vars
    throw NOT_OVERWRITTEN_ERROR;
  }

  parseLyrics($) { // eslint-disable-line no-unused-vars
    throw NOT_OVERWRITTEN_ERROR;
  }
}

module.exports = AbstractLyricsService;
