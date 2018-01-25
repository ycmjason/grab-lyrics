const LyricsService = require('./LyricsService');

class MetrolyricsService extends LyricsService{
  parseTitle($) {
    return $('title').text().match(/- (.*?) Lyrics/)[1];
  }

  parseArtist($) {
    return $('title').text().match(/(.*?) -/)[1];
  }
  
  parseLyrics($) {
    return Array.from($('.verse').map((_, el) => $(el).text())).join('\n\n');
  }
}

module.exports = new MetrolyricsService();
