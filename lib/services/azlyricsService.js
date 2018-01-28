const AbstractLyricsService = require('./AbstractLyricsService');

class AzlyricsService extends AbstractLyricsService{
  get canParseHostnames() {
    return ['www.azlyrics.com'];
  }

  parseTitle($) {
    return $('.ringtone').next('b').text().match(/"(.*?)"/)[1];
  }

  parseArtist($) {
    return $('title').text().match(/(.*?) Lyrics/)[1];
  }

  parseLyrics($) {
    return $('.ringtone').nextAll('div').eq(0).text().trim();
  }
}

module.exports = new AzlyricsService();
