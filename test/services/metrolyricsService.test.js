const assert = require('assert');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const service = require('../../services/metrolyricsService');

describe('metrolyricsService', function() {
  let $;

  beforeEach(function(done) {
    const options = {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36',
      },
    };
    fetch('http://www.metrolyrics.com/stop-this-train-lyrics-john-mayer.html', options)
      .then(res => res.text())
      .then(html => $ = cheerio.load(html))
      .then(() => done())
      .catch(done);
  });

  it('#parseTitle()', function() {
    assert.equal(service.parseTitle($), 'Stop This Train');
  });

  it('#parseArtist()', function() {
    assert.equal(service.parseArtist($), 'John Mayer');
  });

  it('#parseLyrics()', function() {
    const lyrics = `No I'm not colorblind
I know the world is black and white
Try to keep an open mind but
I just can't sleep on this tonight

Stop this train
I wanna get off
and go home again
I can't take the speed
it's movin in
I know I can't
But honestly
won't someone stop this train?
Don't know how else to say it
Don't wanna see my parents go

One generation's length away
from fighting my life out on my own
Stop this train
I wanna get off

and go home again
I can't take the speed
it's movin in
I know I can't
But honestly
won't someone stop this train?
So scared of getting older
I'm only good at being young
So I play the numbers game
to find a way to say that

life has just begun.
Had a talk with my old man
Said, "Help me understand"
He said, "Turn 68...
You renegotiate.

"Don't stop this train.
Don't for a minute change
the place you're in
And don't think I couldn't
ever understand
"I tried my hand
John, honestly
we'll never stop this train."
Once in a while
when its good
it'll feel like it should
And they're all still around

and you're still safe and sound
And you don't miss a thing
till you cry
when you're drivin
away in the dark.
Singing
"Stop this train.
I wanna get off
and go home again.
I can't take the speed
its movin in
I know I can't
Cause now I see
I'll never stop this train."`;
    assert.equal(service.parseLyrics($), lyrics);
  });
});
