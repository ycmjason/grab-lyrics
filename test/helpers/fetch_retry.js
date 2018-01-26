const fetch = require('node-fetch');

const DEFAULT_OPTIONS = {
  method: 'GET',
  headers: {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36',
  },
};

const fetch_retry = (url, options = {}, n = 5) => {
  options = Object.assign({}, DEFAULT_OPTIONS, options);

  return new Promise((res, rej) => {
    fetch(url, options).then(res).catch((err) => {
      if(n === 1) return rej(err);
      return res(fetch_retry(url, options, n - 1));
    });
  });
};

module.exports = fetch_retry;
