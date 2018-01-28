#!/usr/bin/env node
const grabLyrics = require('../index');

if (process.argv.length <= 2) console.log('Usage: grab-lyrics [url ...]');

Promise.all(process.argv.slice(2).map(grabLyrics))
  .then(songs => songs.map(({ lyrics }) => lyrics))
  .then(lyricss => lyricss.forEach(lyrics => console.log(lyrics)));
