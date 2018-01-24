const LyricsService = require('./LyricsService');

class AzlyricsService extends LyricsService{
  parseTitle($) {
    return $('.ringtone').next().text();
  }

  parseWritter($) {
    return 'writter';
  }
  
  parseLyrics($) {
    return 'hello';
  }
}

module.exports = new AzlyricsService();
