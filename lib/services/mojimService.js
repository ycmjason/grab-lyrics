const AbstractLyricsService = require('./AbstractLyricsService');

const { fromString: htmlToText } = require('html-to-text');

class MojimService extends AbstractLyricsService{
  get canParseHostnames() {
    return ['mojim.com', 'www.mojim.com'];
  }

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
      const isFinalBits = (s) => {
        const finalBitsPattern = [/^\[[0-9:.]+\]/, /^------+/];
        return finalBitsPattern.some(p => p.test(s));
      };
      let cut = true;
      return s.split('\n').filter(l => cut = cut && !isFinalBits(l)).join('\n');
    };
    return removeFinalBits(
      removeMojimLine(
        trimRemoveFirstLine(
          trimRemoveFirstLine(
            htmlToText($('#fsZ'))
          )
        ).trim()
      )
    ).trim();
  }
}

module.exports = new MojimService();
