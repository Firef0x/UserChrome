// ==UserScript==
// @name           StatusbarInURLBar3.uc.js
// @namespace      http://d.hatena.ne.jp/Griever/
// @include        main
// @compatibility  Firefox 4.0b7
// @note           Firefox 3.6, 4.0b6 はこちら https://gist.github.com/67460/d87a8f38280d26f1ccb81fcbb1c3b6a1fcb07e90
// ==/UserScript==

(function(CSS){
        if (!isElementVisible(gURLBar)) return;//アドレスバーが無かったらストップ
        var urlbarIcons = document.getElementById('urlbar-icons');
        var statusBar = document.getElementById('status-bar');

        statusBar.setAttribute("context", "");//ツールバーのコンテキストメニューがでないように
        urlbarIcons.insertBefore(statusBar, urlbarIcons.firstChild);

        addStyle(CSS);
function addStyle(css) {
	var pi = document.createProcessingInstruction(
		'xml-stylesheet',
		'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(css) + '"'
	);
	return document.insertBefore(pi, document.documentElement);
}

})('\
@namespace url(http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul);\
\
@-moz-document url("chrome://browser/content/browser.xul") {\
#status-bar {\
  min-height: 18px !important;\
  margin: 0px !important;\
  border: none !important;\
  background-color: transparent !important;\
}\
\
.urlbar-textbox-container-children {\
  opacity: 1 !important;\
  -moz-transition: none !important;\
}\
\
#urlbar {\
    position: relative !important;\
}\
\
.urlbar-over-link-box:not([overlinkstate]) {\
    position: fixed !important;\
    left: -1000px !important;\
    -moz-transition: left .5s .2s ease-in;\
}\
\
.urlbar-over-link-box {\
    position: fixed !important;\
    bottom: 0px;\
    left: 0px;\
    opacity: 0.85 !important;\
    max-width: -moz-max-content !important;\
    width: -moz-max-content;\
    height: 24px !important;  \
    padding: 2px 5px 2px 5px !important;\
    border-radius: 0 4px 0 0;\
    border-top: 1px solid rgba(0,0,0,.25) !important;\
    border-right: 1px solid rgba(0,0,0,.25) !important;\
    background-color: #DFDFDF !important;  \
    background-image: none !important;\
    -moz-transition: left .5s .2s ease-out;\
}\
\
\
.urlbar-over-link-host-label {\
   color: #006600 !important;\
}\
\
\
.urlbar-over-link-host-label,\
.urlbar-over-link-path-label {\
   font-size: 12px !important;\
}\
\
}\
');