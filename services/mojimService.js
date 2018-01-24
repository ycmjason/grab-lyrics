const LyricsService = require('./LyricsService');

class MojimService extends LyricsService{
  parseTitle($) {
    return $('title').text().match(/(.*?) 歌詞 /)[1];
  }

  parseArtist($) {
    return $('title').text().match(/ 歌詞 (.*?) ※ Mo/)[1];
  }
  
  parseLyrics($) {
    const lines = $.load($('.fsZx3').html().replace(/<br>/g, '\n')).text().split('\n');
    let cut = true;
    return lines.filter(l => !/.*?Mojim.com.*/.test(l))
      .filter(l => cut = cut && !/^\[[0-9:.]+\]/.test(l))
      .join('\n')
      .trim();
  }
}

module.exports = new MojimService();
