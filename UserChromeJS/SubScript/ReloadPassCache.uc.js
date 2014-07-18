// ==UserScript==
// @name            ReloadPassCache.uc.js
// @description     ��Ctrl+F5����frame��������ˢ��
// ==/UserScript==

location == "chrome://browser/content/browser.xul" && addEventListener("keydown", function (event) {
	if (event.which === 116 && event.ctrlKey) {
		event.preventDefault();
		event.stopPropagation();
		(function (content) {
			gBrowser.mCurrentBrowser.addEventListener("DOMContentLoaded", function self() {
				this.removeEventListener("DOMContentLoaded", self, false);
				Array.prototype.slice.call(content.frames).forEach(function (win) {
					win.location.reload(true);
				})
			}, false);
			content.location.reload(true);
		})(content)
	}
}, true)
