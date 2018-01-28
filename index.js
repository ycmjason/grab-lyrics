const services = require('./lib/services');

const CANNOT_PARSE_ERROR = new Error('Cannot Parse: this url is not supported yet, feel free to contribute: https://github.com/ycmjason/grab-lyrics');

module.exports = (url) => {
  const service = services.find(s => s.canParse(url));
  if(!service) return Promise.reject(CANNOT_PARSE_ERROR);

  return service.fetch(url);
};


