// ==UserScript==
// @name           openM3U8InIPTV
// @version        0.0.2
// @author         Firef0x
// @description    Open M3U8 play list in IPTV page
// @include        /^https?:\/\/[^.]*\.iptv[34]4[45]\.com/
// @require        http://code.jquery.com/jquery-1.9.1.min.js
// @run-at         document-idle
// @namespace      https://greasyfork.org/users/999999
// ==/UserScript==
(function() {
  "use strict";

  $(function() {
    // 获取播放器（video）对象
    var video = $("video");
    var video_url = null;
    if (video) {
      video_url = video.attr("src");
      window.open(video_url, "_top");
    }
  });
})();
