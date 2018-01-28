const sinon = require('sinon');
const cheerio = require('cheerio');

module.exports = () => {
  const cheerioStub = function() {
    throw new Error('Please use `cheerio.load` instead.');
  };

  return Object.assign(cheerioStub, sinon.stub(Object.assign({}, cheerio)));
};
