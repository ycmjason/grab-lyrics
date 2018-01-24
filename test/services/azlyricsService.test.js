const assert = require('assert');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const azlyricsService = require('../../services/azlyricsService');

describe('azlyricsService', function() {
  let $;

  before(function(done) {
    const options = {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36',
      },
    };
    fetch('https://www.azlyrics.com/lyrics/johnmayer/stopthistrain.html', options)
      .then(res => res.text())
      .then(html => $ = cheerio.load(html))
      .then(() => done())
      .catch(done);
  });

  it('#parseTitle()', function() {
    assert.equal(azlyricsService.parseTitle($), 'Stop This Train');
  });

  it('#parseArtist()', function() {
    assert.equal(azlyricsService.parseArtist($), 'John Mayer');
  });

  it('#parseLyrics()', function() {
    const lyrics = `No, I'm not color blind
I know the world is black and white
Try to keep an open mind
but I just can't sleep on this tonight

Stop this train
I wanna get off and go home again
I can't take the speed it's moving in
I know I can't
But, honestly, won't someone stop this train?

Don't know how else to say it,
Don't want to see my parents go
One generation's length away
From fighting life out on my own

Stop this train
I wanna get off and go home again
I can't take the speed it's moving in
I know I can't
but, honestly, won't someone stop this train?

So scared of getting older
I'm only good at being young
So I play the numbers game to find a way to say that life has just begun
Had a talk with my old man
Said, "Help me understand."
He said, "Turn 68,
you'll renegotiate
Don't stop this train
Don't for a minute change the place you're in
Don't think I couldn't ever understand
I tried my hand
John, honestly, we'll never stop this train."

Once in a while when it's good
It'll feel like it should
And they're all still around
And you're still safe and sound
And you don't miss a thing
'Til you cry when you're driving away in the dark.

Singing, "Stop this train
I wanna get off and go home again
I can't take this speed it's moving in
I know I can't
'Cause now I see I'll never stop this train."

(think I got 'em now)`;
    assert.equal(azlyricsService.parseLyrics($), lyrics);
  });
});
