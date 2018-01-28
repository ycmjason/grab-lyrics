#!/usr/bin/env node
const path = require('path');
const fs = require('fs');

const fetch = require('node-fetch');
const zipObject = require('lodash.zipobject');

const fetchText = (url) => fetch(url).then(res => res.text());

const TEST_PAGES_DIST = path.join(__dirname, '../test/services/specs/testPages.json');


const serviceSpecMap = require('../test/services/specs');

const urls = [].concat(...Object.entries(serviceSpecMap).map(([, testCases]) => testCases.map(({ url }) => url)));

Promise.all(urls.map(fetchText)).then(contents => {
  fs.writeFileSync(TEST_PAGES_DIST, JSON.stringify(zipObject(urls, contents)), { flag: 'w' });
});
