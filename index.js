const azlyricsService = require('./services/azlyricsService');

azlyricsService.fetch('https://www.azlyrics.com/lyrics/johnmayer/backtoyou.html')
  .then(console.log.bind(console));
