const LyricsService = require('./LyricsService');

class AzlyricsService extends LyricsService{
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
