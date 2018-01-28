module.exports = [
  'azlyricsService',
  'metrolyricsService',
  'mojimService',
].map(n => require(`./${n}`));
