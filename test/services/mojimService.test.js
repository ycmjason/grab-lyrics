const assert = require('assert');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const service = require('../../lib/services/mojimService');

describe('mojimService', function() {
  describe('方大同 - 黑洞裡', function() {
    let $;

    beforeEach(function(done) {
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

你的太陽系 活在陽光裡 為何總是跟著不變的舊軌跡
我的一片地 藏在黑洞裡 彷彿都是超乎意料的好東西
怎樣教你相信 怎樣教你也發現神秘的生命
也許太多猜疑 也許不夠好奇 也許是你的世界太真實

閉上眼睛 我好想帶你到我的星星 看我看的風景 樹上長愛情 河水洗回憶
什麼都可以 只要你願意 屏住呼吸 我好想帶你離開這裡
你不用飛機 只要放肆 萬里以外更美麗

我越想靠近 你越想逃避 難道外星人是可怕的大騙子
那是織女星 那是牽牛星 只怪地球人有無聊的老傳奇
怎樣叫你相信 怎樣叫你想跨過陌生的距離
也許太多猜疑 也許不夠好奇 也許是你的世界太真實

閉上眼睛 我好想帶你到我的星星 看我看的風景 樹上長愛情 河水洗回憶
什麼都可以 只要你願意 屏住呼吸 我好想帶你離開這裡
你不用飛機 只要放肆 萬里以外更加愛你
放開你雙手的武器 拋棄你背後的歷史
因為在我住的黑洞裡 從來沒有引力 從來不懂什麼腳踏實地

閉上眼睛 我好想帶你到我的星星 看我看的風景 樹上長愛情 河水洗回憶
什麼都可以 只要你願意 屏住呼吸 我好想帶你離開這裡
我沒有證明 只能答應 萬里以外更美麗 我在黑洞裡`;
      assert.equal(service.parseLyrics($), lyrics);
    });
  });

  describe('張惠妹 - 身後', function() {
    let $;

    beforeEach(function(done) {
      const options = {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36',
        },
      };
      fetch('http://mojim.com/twy100090x50x7.htm', options)
        .then(res => res.text())
        .then(html => $ = cheerio.load(html))
        .then(() => done())
        .catch(done);
    });

    it('#parseTitle()', function() {
      assert.equal(service.parseTitle($), '身後');
    });

    it('#parseArtist()', function() {
      assert.equal(service.parseArtist($), '張惠妹');
    });

    it('#parseLyrics()', function() {
      const lyrics = `作詞：HUSH
作曲：林俊傑

我 喜歡看你孩子般走在前頭
像第一次發現世界的探索
告訴我 鮮艷的顏色好多

你 改不掉突然停下來回過頭
想再一次習慣性確認什麼
像是要牽手 或是一起走
直到風景褪色的時候
你身後 會有我
守護你看見盡頭的背後
那片天空 等著另一端新的生活

能不能答應我
臨別時候或許你就先走
徒留感傷就請你留給我
讓我面對你往後的寂寞
能不能答應我
分開時候放心回頭看我
讓我明白牽掛著你的手
鬆開後還能忍住淚向你告別揮手

記得你愛過 你要記得你愛過
記得你曾經走過 記得繼續向前走
記得我眼中 見過你停留
你的身影一直在我的世界裡駐守

能不能答應我
臨別時你或許就先走
徒留的感傷都留給我
讓我面對你往後的寂寞
能不能答應我
分開時候放心回頭看我
讓我明白牽掛著你的手
鬆開後能拭去淚向你告別揮手

別急著答應我
難過的話現在不要說
好好享受安寧的溫柔
能不能答應我
再見時候就別再認出我
別讓我承受牽過的你的手
再重逢已換作你向我告別揮手`;
      assert.equal(service.parseLyrics($), lyrics);
    });
  });
});
