location == "chrome://browser/content/browser.xul" && (function () {
	(function (m) {
		m.id = "CBIR-search";
		m.addEventListener("command", function () {
			var url = encodeURIComponent(gContextMenu.mediaURL || gContextMenu.imageURL || gContextMenu.bgImageURL);
			gBrowser.addTab('http://www.google.nl/searchbyimage?hl=en-US&safe=off&image_url=' + url);
		}, false);
		m.setAttribute("label", "\u641C\u7D22\u7C7B\u4F3C\u56FE\u7247");
	})(document.getElementById("contentAreaContextMenu").insertBefore(document.createElement("menuitem"), document.getElementById("context-viewimage")));
	document.getElementById("contentAreaContextMenu").addEventListener("popupshowing", function () {
		gContextMenu.showItem("CBIR-search", gContextMenu.onImage || (gContextMenu.hasBGImage && !gContextMenu.isTextSelected));
	}, false);
})()
