/*!
 * @file scroll_to_top.js
 * See {@link https://github.com/dettalant/scroll_to_top}
 *
 * @author dettalant
 * @version v0.1.0
 * @license MIT License
 */
(function () {
  'use strict';

  /**
   * @file ease計算式をまとめたファイル
   * 全ての関数は以下のコードを丸パクリして書いた。
   *
   * @see  https://gist.github.com/gre/1650294
   */
  /**
  * ease outさせる関数
  * @see https://gist.github.com/gre/1650294
  * @param  t 入力する0~1のfloat
  * @return   ease outしていく0~1の値
  */
  var easeCubicOut = function (t) {
      return (--t) * t * t + 1;
  };

  var SCROLL_BUTTON_CLASSNAME = "scroll_to_top";
  var SCROLL_BUTTON_ID = "scrollToTop";
  var DEVICE_CLICK_EVENT_TYPE = (window.ontouchend === null) ? "touchend" : "click";
  var addScrollToTopButton = function () {
      var buttonEl = document.createElement("button");
      buttonEl.type = "button";
      buttonEl.className = SCROLL_BUTTON_CLASSNAME;
      buttonEl.id = SCROLL_BUTTON_ID;
      buttonEl.textContent = "トップへ戻る（仮）";
      buttonEl.addEventListener(DEVICE_CLICK_EVENT_TYPE, function () { return scrollToTop(); });
      document.body.appendChild(buttonEl);
  };
  var scrollToTop = function () {
      var pageTopY = 0;
      var pageCurrentY = window.pageYOffset;
      // アニメーション時間をミリ秒指定
      var duration = 500;
      var now = 0;
      var render = function (timestamp) {
          if (!now)
              { now = timestamp; }
          var progress = (timestamp - now) / duration;
          if (progress > 1) {
              progress = 1;
          }
          var tmpY = interpolation(pageCurrentY, pageTopY, easeCubicOut(progress));
          // ウィンドウスクロール処理
          window.scroll(0, tmpY);
          if (progress < 1) {
              requestAnimationFrame(render);
          }
      };
      requestAnimationFrame(render);
  };
  /**
   * 二つの数値での線形補間を行う
   * @param x0 座標数値その一
   * @param x1 座標数値その二
   * @param t  線形補間の上での中点位置(0~1のfloatを入力)
   * @return [description]
   */
  var interpolation = function (x0, x1, t) {
      return x0 * (1 - t) + x1 * t;
  };
  addScrollToTopButton();

}());