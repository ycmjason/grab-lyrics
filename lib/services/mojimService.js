const LyricsService = require('./LyricsService');

const { fromString: htmlToText } = require('html-to-text');

class MojimService extends LyricsService{
  parseTitle($) {
    return $('title').text().match(/(.*?) 歌詞 /)[1];
  }

  parseArtist($) {
    return $('title').text().match(/ 歌詞 (.*?) ※ Mo/)[1];
  }
  
  parseLyrics($) {
    const trimRemoveFirstLine = (s) => s.trim().split('\n').slice(1).join('\n');
    const removeMojimLine = (s) => s.split('\n').filter(l => !/.*?Mojim.com.*/.test(l)).join('\n');
    const removeFinalBits = (s) => {
      let cut = true;
      return s.split('\n').filter(l => cut = cut && !/^\[[0-9:.]+\]/.test(l)).join('\n');
    };
    return removeFinalBits(
      removeMojimLine(
        trimRemoveFirstLine(
        trimRemoveFirstLine(
        htmlToText(
          $('#fsZ')))
        ).trim()
      )
    ).trim();
  }
}

module.exports = new MojimService();
