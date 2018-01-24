const assert = require('assert');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const service = require('../../services/mojimService');

describe('metrolyricsService', function() {
  let $;

  before(function(done) {
    const options = {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36',
      },
    };
    fetch('http://mojim.com/twy104775x5x6.htm', options)
      .then(res => res.text())
      .then(html => $ = cheerio.load(html))
      .then(() => done())
      .catch(done);
  });

  it('#parseTitle()', function() {
    assert.equal(service.parseTitle($), '黑洞裡');
  });

  it('#parseArtist()', function() {
    assert.equal(service.parseArtist($), '方大同');
  });

  it('#parseLyrics()', function() {
    const lyrics = `作詞：周耀輝
作曲：方大同
編曲：方大同

你的太陽系　活在陽光裡　為何總是跟著不變的舊軌跡
我的一片地　藏在黑洞裡　彷彿都是超乎意料的好東西
怎樣教你相信 怎樣教你也發現神秘的生命
也許太多猜疑　也許不夠好奇　也許是你的世界太真實

閉上眼睛　我好想帶你到我的星星　看我看的風景　樹上長愛情　河水洗回憶
什麼都可以　只要你願意　屏住呼吸　我好想帶你離開這裡
你不用飛機　只要放肆　萬里以外更美麗

我越想靠近　你越想逃避　難道外星人是可怕的大騙子
那是織女星　那是牽牛星　只怪地球人有無聊的老傳奇
怎樣叫你相信　怎樣叫你想跨過陌生的距離
也許太多猜疑　也許不夠好奇　也許是你的世界太真實

閉上眼睛　我好想帶你到我的星星　看我看的風景　樹上長愛情　河水洗回憶
什麼都可以　只要你願意　屏住呼吸　我好想帶你離開這裡
你不用飛機　只要放肆　萬里以外更加愛你
放開你雙手的武器　拋棄你背後的歷史
因為在我住的黑洞裡　從來沒有引力　從來不懂什麼腳踏實地

閉上眼睛　我好想帶你到我的星星　看我看的風景　樹上長愛情　河水洗回憶
什麼都可以　只要你願意　屏住呼吸　我好想帶你離開這裡
我沒有證明　只能答應　萬里以外更美麗　我在黑洞裡`;
    assert.equal(service.parseLyrics($), lyrics);
  });
});
