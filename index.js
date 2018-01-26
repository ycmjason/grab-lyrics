const fetch = require('node-fetch').default;
const cheerio = require('cheerio');

const azlyricsService = require('./services/azlyricsService');

azlyricsService.fetch('https://www.azlyrics.com/lyrics/johnmayer/backtoyou.html')
  .then(console.log.bind(console));
