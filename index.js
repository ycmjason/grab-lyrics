const azlyricsService = require('./lib/services/azlyricsService');

azlyricsService.fetch('https://www.azlyrics.com/lyrics/johnmayer/backtoyou.html').then(({ lyrics }) => {
  console.log(lyrics);
});
