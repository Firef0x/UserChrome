//隐藏菜单右侧的 tab 等提示
css('.addMenu .menu-iconic-accel[value="tab"] { display: none; }');
css('.addMenu .menu-iconic-accel[value="tabshifted"] { display: none; }');
css('.addMenu .menu-iconic-accel[value="window"] { display: none; }');
css('.addMenu .menu-iconic-accel[value="current"] { display: none; }');

//添加标签右键菜单项
tab([{
		label:"复制 Favicon 的 URL",
		text:"%FAVICON%",
		image:" "
	}, {
		label:"复制 Favicon 的 Base64",
		text:"%FAVICON_BASE64%",
		image:" "
	},{
		label: "关闭所有标签页",
		oncommand: "gBrowser.removeAllTabsBut(gBrowser.addTab('about:newtab'));",
		insertAfter:"context_closeOtherTabs",
		accesskey: "Q"
	}
]);

//添加页面右键菜单项
page([
	{
		condition: "select",
		insertBefore:"context-selectall"
	},
	// {
	// 	label: "弹窗翻译所选文本",
	// 	condition: "select",
	// 	oncommand: "gTranslator.selectionTranslation();",
	// 	insertBefore: "context-selectall",
	// 	image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAFCSURBVDhPnZExSwNBEEZPESStP8PKP2Fnr1hYiI2dkEoQJKWCnVXEIpDGQsRGJGKhFsKBHpEIFokJ4VQkpFMLm5E3OsvcmRBx4XG3e/u9md2LGB9vPfH0e+3A6/OD6KZhIx+u1Y5kb383I3h5uh8uIURgfaOoLC0vKjaHtNv4m8AHvWikAK7jCw0kjVgDq6UtWYslMH8pMnf2LjMnIlMHn4oK/IVZRTravumPFKjEC7hAaz0fPm+mCpKBgsfWbebshAy6sb/Bu4UL5VQiPnDuiWJT74EumFvLQGXbR6FfAsIGFwicFRBQ+TBOtDoC1girwIcNAiYghHDzNNEgAmRBwPBh5mMLx6FN+60EDdamKx2Z3Kl/C8ZXrjTMExCArzhbvVPoBAHPjCAfNhAQtJaBy4YgYAySsAF82NaMn/h/RxR9Ab4TXij6pKP0AAAAAElFTkSuQmCC"
	// },
	// {
	// 	label:"发送到 OneNote",
	// 	condition: "nolink nomailto noimage nomedia noinput",
	// 	image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHCSURBVDhPrVNJL0NRFO7/EMTC/AvE1i+wsENjHn+A2JAYFhJaMeyI2IlFB68W5hZ92pKUV1NiClFp8Z56nuG1+dx71FyCOMmXfPe9c7977jnfNfxLOLIGwGFP64U1qQf2VDNsX4D+JZspP76dCWQPsI8mTOcPw1sjYKXMBk+5HZ6KBKi0w1fvgJDe9ypgSzFjrmAU+yN+BKf2cL0vQz2UcbUZJkR2znFzpBAPu0+w1bUMfmh8OxNgZUltToRcR+BxuRaEFrwmziP2EMXVVpi4rj1go2UeQmb/myvkDCLQuYh7+ZaSXIVjmMobQkyP0poLikYL8bsLDVLrwoceMAGpw4l75UnA3zQDT9UElcpD9p/BWycQ/1Ig0OF6qcDXMAn1QIa7xEKlq+z+vxLgk9BOI1BY00SjFZHdc6w2TtK/n1VQ44ASb9p2t5vGt948S+sfCYjFFshSiHgsGiN/LBWN0zqhgMBmKrU7Eb3TKUkJhGjjc9yeqWwSp8R1TU8wxtxBbJtEZpJjKOxk9ZCZhl2Bcw5uLG4kzsPLx5+NJGT0w1crQCy1QmSd/xYsx1s98d7KvBz+FujBMFt/i0SP6e9hMDwCEXZqhPWpJdgAAAAASUVORK5CYII=",
	// 	insertBefore: "context-selectall",
	// 	oncommand: function(){
	// 		var onenotePath = "C:\\Program Files\\Microsoft Office\\Office15\\Onenote.exe";
	// 		var focusedWindow = document.commandDispatcher.focusedWindow;
	// 		var selection = new String(focusedWindow.getSelection());
	// 		if (selection.length == 0) {
	// 			 goDoCommand('cmd_selectAll');
	// 			 var allSelection = new String(focusedWindow.getSelection());
	// 			 if (allSelection.length == 0)return;
	// 			 goDoCommand('cmd_copy');
	// 			 goDoCommand('cmd_selectNone');
	// 		}
	// 		else
	// 		{
	// 			 goDoCommand('cmd_copy');
	// 		}
	// 		var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
	// 		file.initWithPath(onenotePath);
	// 		var process = Components.classes["@mozilla.org/process/util;1"].createInstance(Components.interfaces.nsIProcess);
	// 		process.init(file);
	// 		var args = ["/sidenote", "/paste"];
	// 		process.run(false, args, args.length);
	// 	}
	// },
]);

//当前页面
new function () {
	var items = [
	{
		label:"复制此页标题+URL",
		text:"%TITLES%\n%URL%",
		image:" "
	},
	{
		label:"复制此页标题",
		text:"%TITLES%",
		image:" "
	},
	{},
	{
		label:"在隐私窗打开此页",
		oncommand: "privateTab.readyToOpenTab(true); gBrowser.selectedTab=gBrowser.addTab(content.location);"
	},
	{
		label:"在侧栏中打开此页",
		oncommand:"openWebPanel(content.document.title, content.location);",
	},
	// {
	// 	label:"在谷歌缓存打开",
	// 	url:"http://webcache.googleusercontent.com/search?q=cache:%u",
	// 	image:" "
	// },
	{},
	{
		label:"在 IE 中打开此页",
		text:"%u",
		exec:"C:\\Program Files\\Internet Explorer\\iexplore.exe",
		image:" "
	},
	{
		label:"在 Chrome 中打开此页",
		text:"--incognito %u",
		exec:"E:\\PortableApps\\GoogleChromePortable\\GoogleChromePortable.exe",
		image:" "
	}
	];
	
	var menu = PageMenu({condition: 'normal', insertBefore: 'context-openlinkincurrent', onpopupshowing: syncHidden });
	menu(items);
};

// 页面信息右键菜单
new function () {
	var items = [
	{
		label:"繁体转简体",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADlSURBVDhPrVPJDYQwDEwRroMKkPJLFUj8+NNBPjxSwn4ogBrogAq2hW3Cm8NOAgkR0m6kUWTkGQ9jEH85r/cHm1gnBADs9HF6TvSrwIFDDwi9wcUR7T2MtrYCARPO9wJEdo3jhMpPNf5OAoBqrQpk5AiathvsXO1cxWEVB4uWliRx2PP6LMrTqwKMnBiDq7gg+k2IJODhSVvIoilA64LeBmhF3HR2k8JsbYFsdnorXDwTIJvcnK9QrfQKTxy4pOfi42GBtCWilxnkq0rpy3A3BfwGUkMEi3g0M2iB80k/FNF/OUJ8Aad+5VEArUCmAAAAAElFTkSuQmCC",
		oncommand: function(){
			content.document.documentElement.appendChild(content.document.createElement("script")).src = "http://tongwen.openfoundry.org/NewTongWen/tools/bookmarklet_cn2.js";
		}
	}, {
		label:"自动刷新",
		url: "javascript:(function(p)%7Bopen('','',p).document.write('%3Cbody%20id=1%3E%3Cnobr%20id=2%3E%3C/nobr%3E%3Chr%3E%3Cnobr%20id=3%3E%3C/nobr%3E%3Chr%3E%3Ca%20href=%22#%22onclick=%22return!(c=t)%22%3E%E7%82%B9%E5%87%BB%E5%BC%BA%E5%88%B6%E5%88%B7%E6%96%B0%3C/a%3E%3Cscript%3Efunction%20i(n)%7Breturn%20d.getElementById(n)%7Dfunction%20z()%7Bc+=0.2;if(c%3E=t)%7Bc=0;e.location=u;r++%7Dx()%7Dfunction%20x()%7Bs=t-Math.floor(c);m=Math.floor(s/60);s-=m*60;i(1).style.backgroundColor=(r==0%7C%7Cc/t%3E2/3?%22fcc%22:c/t%3C1/3?%22cfc%22:%22ffc%22);i(2).innerHTML=%22%E5%88%B7%E6%96%B0%E8%AE%A1%E6%95%B0:%20%22+r;i(3).innerHTML=%22%E5%88%B7%E6%96%B0%E5%80%92%E8%AE%A1%E6%97%B6:%20%22+m+%22:%22+(s%3C10?%220%22+s:s)%7Dc=r=0;d=document;e=opener.top;u=prompt(%22%E9%93%BE%E6%8E%A5%E5%9C%B0%E5%9D%80%22,e.location.href);t=u?prompt(%22%E5%88%B7%E6%96%B0%E9%97%B4%E9%9A%94/%E7%A7%92%EF%BC%9A%22,300):0;setInterval(%22z()%22,200);if(!t)%7Bwindow.close()%7D%3C/script%3E%3C/body%3E')%7D)('status=0,scrollbars=0,width=240,height=160,left=1,top=1')",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAK2SURBVDhPY0AGq/6HMs9/YFo794Hp8oUPrTIWP3Aymn/fXqC+noEJqoQwmHpT2nvybZlPU24p/pl0Tft130Xzox1n7YKg0vjBkmde8vMemkycekvu28Qb0v87Lyn8rzuu9q/ysG4DUJoRogoHWPLE3mD2PZ3DU27J/Zl8S+p/3zXZ/63nlP5XHtL4VLRP0xmqDDuY/9JUYvY97b2Tb0n/m3Jb6v+E69L/Oi/J/qg/qfKvdJ/WueKdemJQpWDwH+iaVaGhzFAuA8Os+zoZQH//mnRTCmTAvUk3ZTrazymmVB1Re160R2ti6CoGhGIgOCYjw3lYWVkbzJn535h1+h2lVZNuSnyfckNq6dS70nqr/jMw11/RYivZp92Wv0vPHawQCZy1sFA5qKraeMbYmJVh5lNJLmDIb5h8W7Jy4i0hPqgaMKifry+wONcMRey8u7vCUX39tfvl5HZukpTkYph5xph10i3J5CkvRXmgauDgsIGB/hETk/pjFhac++3tWU47OFgf1tU9sFdO7u9eaelVYBeAwJyH6lKrViEFChRsU1FJ2qqg8GafqWneAVPTtu1KSk+2SEn93ywp+WublFQmVBl2AAxppjVyctNXiIn9XyMl9XO1pOTfVUD2SjGxf2tERfevFRGRhCrFDlYpKfEvlpA4Ol9Y+D8ILwDihcLCfxeKiJxaKiJiDFWGG8yWl9ecLir6dKqg4P9pQDwdRAsJbZ8jLKwOlMafKoGAcaKoqHKvgMD+bn7+V718fD97+Pn/dfPwbAeyhaBqIGDlypWiixcvNl24cKH7okWLgoF0FJBOXrJwYeq87u7y2cXFk6bHx2+e7ONzo9/a+vn0zMxqkFqQHpBeBqBixSVLlgQB6WygYBWQ3QKkO4D0JKDYVBAGsRcvWNC5aN689oXz51eD1EL0LFIEAGnEJwptdKj6AAAAAElFTkSuQmCC"
	}, {
	    label: "GBK <-> UTF-8",
	    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAC3SURBVDhPY6AKmGs//z85GKp9WBlwtP/Yf2RwY/PN/xeXX4Ly/v+/f/D+/9XRa7EbsDV/O1gRSNNCj8X/T886A+aDAEhuV+UeMBtkCFYD0DFMw/OLz+FiMACyAMSHakcYALL1/aMPUGW4wYbUTZgG7G8+CJYE2QhSAPMSspPRMVQ7xABYAILoZYErwAbBACjgQGIgw0AAqxdAgjAFIAAyABQOyAaB2CCXYXUBORiqfTAYQD5gYAAArhcq19H6/18AAAAASUVORK5CYII=",
	    oncommand: function() {
	        var charset = gBrowser.mCurrentBrowser._docShell.charset;
	        BrowserSetForcedCharacterSet(charset == "UTF-8" ? "GBK" : "UTF-8");
	    }
	},
	{},
	{
		label:"全页面截图",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABISURBVDhPY6AOWPnmPwpGBuhy6PJggE8Buhy6PBjglEADA2/AMAAUhwHtDUDGyACbPAjDAV5JIMAmD8IkA7I1wgDFBmAABgYA9oelARp3ZZ4AAAAASUVORK5CYII=",
		oncommand: function () {
			var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
			canvas.width = content.document.documentElement.scrollWidth;
			canvas.height = content.document.documentElement.scrollHeight;
			var ctx = canvas.getContext("2d");
			ctx.drawWindow(content, 0, 0, canvas.width, canvas.height, "rgb(255,255,255)");
			saveImageURL(canvas.toDataURL(), content.document.title + ".png", null, null, null, null, document);
		}
	}, {
		label: "宽度匹配",
		url: "javascript:(function(){function%20t(f){a=d.createNodeIterator(d,1,f,false);while(a.nextNode()){}}var%20d=document;t(function(e){x=e.offsetLeft;l=e.offsetParent;while(l!=null){x+=l.offsetLeft;l=l.offsetParent}var%20w=d.documentElement.clientWidth-x;var%20s=e.style;if(s.marginLeft)w-=s.marginLeft;if(s.marginRight)w-=s.marginRight;if(s.paddingLeft)w-=s.paddingLeft;if(s.paddingRight)w-=s.paddingRight;if(s.borderSize)w-=s.borderSize;w-=d.defaultView.innerWidth-d.documentElement.offsetWidth;if(e.tagName=='IMG'){h=e.clientHeight*w/e.clientWidth;s.maxHeight=h}s.maxWidth=w+'px'})})();",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGXSURBVDhPYxh4MHHiRPv///8zQrlEA5Ce/v5+B4aWlpZX9fX1TFBxogFIT3Nz8yu4AatWrWI+fPiwIFAOp2tAtoLUgNSiGLB//36WdevWuU2YMKEZKMECVY8BQHIgNRs2bHABscEGtLa2vt66dasrkHOdm5v77Zw5c3iBhhpkZ2ebAA0W2bZtmyiI3d7ert/Z2ckLUgNUew1kCFDda4a2trbP4uLi30RERP5zcXG9rays1BESEvouLCz8u66uLrampiYOyP8NEisrK9MGqQGpFRMT+wbSCzLgG5Dzi4+P7z8nJ+fb9PR0fUFBwV8CAgL/srKykjIyMlJAbCD+mZycrMfBwfGWl5cXZMAvoOu/gb2wePHilLS0tBcgA2bOnCkC9F8YUGPsmjVrVEE4NTU1FuiaUJAcyACgQc8XLVqUDPYCKCCAfuVYsGBBOtC50/AFItASVqA3pgPVpoH0gAMRRAA1MQEDi/3IkSPK+BIVSA6kBqQWpAfFAKgaogHcAGDUhJOblDs6OiIYQKkKKkYyoEQvFDAwAACRUudRsBI1mwAAAABJRU5ErkJggg==",
	}, {
		label: "破解右键防复制",
		url: "javascript:alert(document.body.oncontextmenu=document.body.onmouseup=document.body.onmousemove=document.body.onclick=document.body.onselectstart%20=document.body.oncopy=document.onmousedown%20=%20document.onkeydown%20=null)",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEZSURBVDhPjZExisJQEIYfrIW4HsBOq8VLLCoiKjYeQNAykHZBRQW9gPZewkJBiwVLL7B3sBRLC2c2M5mJL9FH/OEneZP//5L3Ykjj6Rxd5kCaXhVtS8wtDSb1NsQG2KWkJf4sDaQByFKJSx/aANjvEQYDnpFodqjVcdPuPEOSgNloglAoYJBEWK14vu71eX37yODS8+OQJIDvj8cQkM0i7HZ4/czzettoRhmpOwCBfr8r0VsZ1u3yXDNSdwNIUCyG5VwO8XLhmWak7gbovu8ECEyfT9KM1B8A23g+Pw7S98MrncfpFGWk/hoA1SqX/r7KvNbzgFIJFz9Dnkk9LnrAv9HzOKz7JhEUWq10gFqDrrVU4rIDaTbGmH8Vxu1dx2qGHAAAAABJRU5ErkJggg==",
   	},
	{},
	{
		label:"编辑当前网页",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAK1SURBVDhPY6AGYHn14fOqt2+/3MaHQWoYGCS5GLi5xRgY+BUYGHhEgXpZQQbwPH/z8Ty3pPIzRi6xx4w8oo9QMFCMTUju1cNnby4ANets3L53xa0HT3/NWLB6DgOPpAjIAKEnL9+dAip+6M8edguGmXhET/lHJYNpkEH7j5y6uGL1pi33n775f+LS7f9N05Z+YWDgUwYZIPz01bsTDFySd5i4xA5hYvHDIMNX7zrxY9aK7f93HTv/v2fu2v8dU2bvhhvw8NX7Y4xc4jcZeST2RgfIXYRhIH8/v1PM9aaeSV+Xbzn43zeu6H/HnDX/y5t6LzLxiKUC9cqADXj0/P0RBk7Rq4w84jsQWGIX0AUHW3snvoQ5G6RZN7f9NQOHRDUDt7gDMDAFwAY8fvHhEAOHyGVGLolNCUHKJ2ND5E/5ecpemDlr2nuYZpCzkyra7jDwSNUyMIu5MHBxSQD1soANePry436gqReA3ljLyC2+npFHbHvnxCnPkDU390//wsgp0YauGQSEH738sJeJX/IM0Nkrov0Uj02fNfN99+w1/5ds3AvWnJJT/S01p+QuA5tEELpmEBB+9OrdbiZu0ZMMfCKLgS5Y1zhh0S/v+ML/aX1L/2eUVL0HpYVpC5aeZWCQ0ASqR9EMAsKPX73bycgtcTwjp2QPv6z2Vp+E4v8xrbP/miRXfgJ65ywwgK+dOHPlAAMw5KB6UIDwk+fvtwMD8AQDn8R8bhGljVwSqkeBMXEOJAaKEZD3Hjx5vQOkFqIFFQg/ffF+q4SK/kURGY29glJqB3hEVU7xiiueAybvk3zSKodFFHSugNSA1EK0oAKhq3ceTnn17vOJd+8+nwQl68s37p69dP3uuXuPX5x5+e7dKZAcSA1ILUQLKuABJggloPe0GXiENbBiBh4tsBqwWmTAwAAAYo9bM5woFn0AAAAASUVORK5CYII=",
		oncommand: 'content.document.body.contentEditable = content.document.body.contentEditable == "true" ? "false" : "true";'
	}, {
		label:"为此页搜索油猴脚本",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADSSURBVDhPnZK9DcIwEIXTsQBL0CAU15RQUtKwRAbIAlmCPuzADExAmwUyQHjPvrNs6zA/T/p0jvPe6Sy7MXQEE1ikXsBPWtzNRfD9DNvfqysadGH7s3RkMkh4kH2LLciUjW5Bj4prn0pkhlLoUXHtU1APHsAMpdAD9JixwSQ/r250cxlKgYesGYJ2UkODdmx9rQGvkkkn8JShEvGtQNQecPPMaoVSxLsBpv46xgGkP6pIE95ClNxsXfQVU0SJpS763jU4gTvgY9JHUjILGpY30DQvwsxGGOnZ9v8AAAAASUVORK5CYII=",
		oncommand: function () {
			var domain = content.location.hostname;
			gBrowser.selectedTab = gBrowser.addTab('https://www.google.de/search?hl=en-US&newwindow=1&nfpr=1&safe=off&q=site:userscripts.org%20' + domain);
			gBrowser.selectedTab = gBrowser.addTab('https://www.google.de/search?hl=en-US&newwindow=1&nfpr=1&safe=off&q=site:greasyfork.org%20' + domain);
		}
	},
	{},
    {
        label: "重新加载配置",
        accesskey: "r",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABCklEQVRYhe2W3RGDIAyAM4IjOQIjuJEjMIAwS0dgAPkZwT5Ye1dBm5BYzrvmLm+QfOQXgL9Ii4kP0K5rB2Dj0hbCxqUtxAZwCYTxCkzQYKP7cHSmIhDT3JOcikLYMFY7ZgOs4W7k/PjlCWwYwXgF09xnKuJ8b+htMOivBmXyXio4PyDvMp0br4ovR9/ntl1eeIlkkN3zWfjDyDNIB9iF36u2ANPc3xeg1M5kAE4KSh2FAJArwnyaOgQ1sw030a5bxzZ1nnAH0fFDCOnkjGIAAOuHwi5BhH+T2mWkXXe4wsndRFnHxqvX+VS+U1vIIh+SivpBRgKhUnuE/il114zw82+5AxP075fX3eUJ4eD6CMeTckUAAAAASUVORK5CYII=",
        oncommand: "setTimeout(function(){ addMenu.rebuild(true); }, 10);"
    }];
	var menu = PageMenu({
		label: "多功能菜单",
		condition: 'normal',
		insertBefore: 'context-openlinkincurrent'
	});
	menu(items);
};

//复制链接文本地址
new function () {
	var items = [
	{ command: 'context-copylink' },
	{
		label:"复制链接文本+URL",
		text:"%LINK_TEXT%\n%l",
		image:" "
	},
	{
		label:"复制链接文本",
		text:"%LINK_TEXT%",
		image:" "
	},
	{},
	{
		label:"搜索链接文本",
		url:"https://www.google.de/search?hl=en-US&newwindow=1&nfpr=1&safe=off&q=%LINK_TEXT%",
		where : "tab",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHDSURBVDhPpVJbKENhHJ887NmLcnmQZ+U6SZ7mEk+ur8qDXEpMLBSRJbRHlzSRDFuNkkQRHoaiXE44LxbTssk0zhpDdj7/H0ecsYflV//+5/+7fN853/kUf4ExFkkVJYpiElUhVbnUk8BDl6y/AZGMcbu2O41+lecrDFYhu38jgI4ZPPSQi2CHXdutRmM6uMnUrbHgAg8dPikiB15Tv3LGq3pWmdZ86OQcnok3UWxExwweOnxSRA4SCiuGtwRV1zLjrjwTNMdTKdExg4cOnxSRg4TyrLalQEbHIsPOCEu8EjN46PB9BIKBlcsG1oV07Tzj7G75G9AMHjp8UuQbdDARJKj7zXv2tGYT005uO7kL9+cZUMcMftCy//sMpHCMwy30Fncv+PJaLf60BiMLrvqRzRsrfy3/C1/hS9dDe2m32ZtaN8lyWo3Pupmdq1LdgqCqmQqg95mtvPXEIb8HP8MlnXPelGoDy20y+k/ttyPEF1AVUYW+iURGX7jutSUdc97kqlGmbjT4OZtLT6YEmTEUfL6XlLKWKU9y5RBTN4yFFwZgnl45ms2vHX86PncOhhUG6BOUFEh8fHzNpOfYsML/h0LxDlnLtXo5zlbFAAAAAElFTkSuQmCC"
	}];
	var menu = PageMenu({ condition:'link', insertBefore:'context-openlink', onpopupshowing: syncHidden });
	menu(items);
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="link"] #' + it.command + '{ display: none !important; }')
	});
};

//打开链接的各种方法
new function () {
	var items = [
	{ command: 'context-openlinkintab' },
	// {
	// 	label:"在谷歌缓存打开",
	// 	url:"http://webcache.googleusercontent.com/search?q=cache:%l",
	// 	image:" "
	// },
	{},
	{ command: 'context-copyemail' },
	{
		label:"在隐私窗口打开",
		oncommand:"gContextMenu.openLinkInPrivateWindow();",
	},
	{
		label:"在侧边栏中打开",
		oncommand:"openWebPanel(gContextMenu.linkText(), gContextMenu.linkURL);",
	},
	{},
	{
		label:"在 IE 中打开",
		text:"%l",
		exec:"C:\\Program Files\\Internet Explorer\\iexplore.exe",
		image:" "
	},
	{
		label:"在 Chrome 中打开",
		text:"--incognito %l",
		exec:"E:\\PortableApps\\GoogleChromePortable\\GoogleChromePortable.exe",
		image:" "
	}
	];
	var menu = PageMenu({ condition: 'link', insertBefore:'context-openlink', onpopupshowing: syncHidden});
	menu(items);
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="link"] #' + it.command + '{ display: none !important; }')
	});
};

//复制文本
new function () {
	var items = [
	{ command: 'context-copy' },
	{
		label:"复制纯文本",
		text:"%SEL%",
		image:" "
	},
	{
		label:"复制 BBCode",
		image:" ",
		oncommand: function () {
			var div = content.document.createElement('div');
			div.appendChild(content.getSelection().getRangeAt(0).cloneContents());
			function HTMLtoBBCode(a){function b(k,g,j,h,f){this.pos=k;this.font=g;this.face=j;this.size=h;this.color=f}fl=new b(50);fc=new b(50);al=new b(50);function e(h){var g=0;var f=0;var m;var l;var k;h=h.toUpperCase();for(l=0;l!=-1;l){l=h.indexOf("<FONT",l);if(l!=-1){m=h.indexOf(">",l);fl[g]=new b(0,0,0,0,0);fl[g].pos=l;fl[g].font=1;k=h.substring(l,m);if(k.search(/FACE/)!=-1){fl[g].face=1}else{fl[g].face=0}if(k.search(/SIZE/)!=-1){fl[g].size=1}else{fl[g].size=0}if(k.search(/COLOR/)!=-1){fl[g].color=1}else{fl[g].color=0}l++;g++}}for(l=0;l!=-1;l){l=h.indexOf("</FONT>",l++);if(l!=-1){fc[f]=new b(0,0,0,0,0);fc[f].pos=l;fc[f].font=1;for(ii=g-1;ii>=0;ii--){if(fl[ii].pos<l){if(fl[ii].font==1){fl[ii].font=0;fc[f].color=fl[ii].color;fc[f].size=fl[ii].size;fc[f].face=fl[ii].face;ii=-1}}}l++;f++}else{fc[f]=new b(0,0,0,0,0);fc[f].font=0}}}function d(h){var g=0;var f=0;var m;var l;var k;h=h.toUpperCase();for(l=0;l!=-1;l){l=h.indexOf("<A HREF",l);if(l!=-1){m=h.indexOf(">",l);al[g]=new b(0,0,0,0,0);al[g].font=1;k=h.substring(l,m);if(k.search(/MAILTO:/)!=-1){k=k.replace(/<A HREF=MAILTO:/,"");k=k.replace(/\"/,"");k=k.replace(/\'/,"");al[g].pos=1;k=k.toLowerCase();al[g].face=k}else{al[g].pos=2}l++;g++}else{al[g]=new b(0,0,0,0,0);al[g].pos=0}}}e(a);a=a.replace(/<SCRIPT[^>]*>/gi,"<TEXTAREA>");a=a.replace(/<\/SCRIPT>/gi,"</TEXTAREA>");a=a.replace(/ = /gi,"=");a=a.replace(/=\"/gi,"=");a=a.replace(/=\'/gi,"=");a=a.replace(/<param name=movie[^>]*value=/gi,"<movie=");a=a.replace(/\s+BORDER=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+TARGET=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+CLASSID=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+ID=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+NAME=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+STYLE=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+CLASS=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+ALT=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+TITLE=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+REL=[^\'\">]*[\'\">]/gi,"");a=a.replace(/\s+ONCLICK=[^\'\">]*[\'\">]/gi,"");a=a.replace(/<A\s*HREF/i,"<A HREF");d(a);a=a.replace(/<BR>/gi,"\r");a=a.replace(/<BR(.*?)\/>/gi,"\r");a=a.replace(/<P>/gi,"\r\r");a=a.replace(/<P [^>]*>/gi,"\r\r");a=a.replace(/<CODE>/gi,"[code]");a=a.replace(/<\/CODE>/gi,"[/code]");a=a.replace(/<BLOCKQUOTE>/gi,"[quote]");a=a.replace(/<\/BLOCKQUOTE>/gi,"[/quote]");a=a.replace(/<UL[^>]*>/gi,"[list]");a=a.replace(/<\/UL>/gi,"[/list]");a=a.replace(/<OL[^>]*>/gi,"[list=1]");a=a.replace(/<\/OL>/gi,"[/list]");a=a.replace(/<LI>/gi,"[*]");a=a.replace(/<IMG[\s\S]*?SRC=([\s\S]*?)\"[\s\S]*?>/gi,"[img]$1[/img]");a=a.replace(/<IMG[\s\S]*?SRC=([\s\S]*?)'[\s\S]*?>/gi,"[img]$1[/img]");a=a.replace(/<BIG>/gi,"[b]");a=a.replace(/<\/BIG>/gi,"[/b]");a=a.replace(/<B>/gi,"[b]");a=a.replace(/<\/B>/gi,"[/b]");a=a.replace(/<U>/gi,"[u]");a=a.replace(/<\/U>/gi,"[/u]");a=a.replace(/<I>/gi,"[i]");a=a.replace(/<\/I>/gi,"[/i]");a=a.replace(/<EM>/gi,"[i]");a=a.replace(/<\/EM>/gi,"[/i]");a=a.replace(/<h\d>/gi,"\r\r[b]");a=a.replace(/<\/h\d>/gi,"[/b]");a=a.replace(/&nbsp;/gi," ");a=a.replace(/<FONT Face[^\'\">]*[\'\">]/gi,"<FONT");a=a.replace(/ FACE=[^\'\"]*[\'\"]/gi,"");a=a.replace(/<STRONG>/gi,"[b]");a=a.replace(/<\/STRONG>/gi,"[/b]");a=a.replace(/<TR[^>]*>/gi,"\r");a=a.replace(/<TD[^>]*>/gi," ");a=a.replace(/<TH[^>]*>/gi," ");a=a.replace(/<\/TR>/gi," ");a=a.replace(/<\/TD>/gi," ");a=a.replace(/<\/TH>/gi," ");a=a.replace(/<FONT SIZE=/gi,"[size=");a=a.replace(/<FONT color=/gi,"[color=");a=a.replace(/ color=/gi,"][color=");a=a.replace(/ size=/gi,"][size=");var c;for(i=0;fc[i].font!=0;i++){c="";if(fc[i].color==1){c=c+"[/color]"}if(fc[i].size==1){c=c+"[/size]"}a=a.replace(/<\/FONT>/i,c)}for(i=0;al[i].pos!=0;i++){if(al[i].pos==2){a=a.replace(/<A HREF/i,"[url");a=a.replace(/<\/A>/i,"[/url]")}if(al[i].pos==1){a=a.replace(/<A HREF[^<]*<\/A>/i,al[i].face)}}a=a.replace(/<[^>]*>/g,"");a=a.replace(/>/g,"]");a=a.replace(/\'>/g,"]");a=a.replace(/\">/g,"]");a=a.replace(/\']/g,"]");a=a.replace(/\"]/g,"]");a = a.replace(/\[url\=([^\]]+?)\]|\[img\](.+?)\[\/img\]/g, function($0,$1,$2){if($0.indexOf("http://")<0){var u = $1||$2,b="/";if(u){if(/^\.?\//.test(u)) b = "";return $0.replace(u,content.location.origin+b+u)}}else{return $0}});return a};
			Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper).copyString(HTMLtoBBCode(div.innerHTML));
		}
	}];
	
	var menu = PageMenu({ condition:'select', insertBefore:'context-paste', onpopupshowing: syncHidden });
	menu(items);
	//page({ condition:'select', insertBefore:'context-sep-copylink' });
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="select"] #' + it.command + '{ display: none !important; }')
	});
};

//图片
new function () {
	var items = [
	{command: 'context-copyimage'},
	{command: 'context-reloadimage'},
	{ // 替换 openImgRar.uc.js
		label: "打开图像RAR",
		oncommand: function(){
			var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
			try {
				var path = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getCharPref("browser.cache.disk.parent_directory") + "\\Cache\\" + new Date().getTime() + ".rar";
				file.initWithPath(path);
			} catch (e) {
				var path = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfLD", Components.interfaces.nsILocalFile).path + "\\Cache\\" + new Date().getTime() + ".rar";
			}
			file.initWithPath(path);
			Components.classes["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(Components.interfaces.nsIWebBrowserPersist).saveURI(Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI((gContextMenu.mediaURL || gContextMenu.imageURL), null, null), null, null, null, null, file, null);
			setTimeout(function () {
				file.launch();
			}, 100);
		}
	},
	{command: 'context-sep-copyimage'},
	{command: 'context-viewimageinfo'},
	{
		label:"复制图片 Base64",
		text:"%IMAGE_BASE64%",
		image:" "
	}];
	
	var menu = PageMenu({ condition:'image', insertBefore:'context-saveimage', icon:'image', onpopupshowing: syncHidden});
	menu(items);
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="image"] #' + it.command + '{ display: none !important; }')
	});
};

//右键以图搜图
new function () {
	var items=[
	{
		label: "Google",
		url : "http://www.google.de/searchbyimage?hl=en-US&safe=off&image_url=%IMAGE_URL%",
		where : "tab",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABUUlEQVR42pWTzUsCYRCH9y9zu3SooCCkjhIRRLeIykXokiWCJ7PvDpZRlz6si1lIQZ3SQxQdOhREpgSm0JeQvfu0+i6I7LKLh4F5h5nnnRl+o6jTdHn8omAYbVqhXqvYFXcEBKFDwcoZZB8B4LkEB9cwGGmFKHb01A1EU9JXzfdvDYZi1lwLwBcVAIwsNWPesIwls7gDtB2Z7N9ujVe+IX2LO2AgItB1OL9vJqsmILDrOoK02IkBAdYy4FsQJC5h+VQCHQDWTqYSgo8fuHuRxS4Ae3stQ7UGE5ttAHqCUgfxC7m4ryrowOyeO6CxqHwZxtYFqtYc5+kNan/gDTsAeueEIRj7n/rmRQMwueUAGF0VAAT3rQBTC0Y3DoDOGbm00icML4oWHYSTgo0MFqjlmPpDgqMcFCuQf4erBzjOwXjcriu9qHg0uutO2+es6fl67T9ptebvFRjBVgAAAABJRU5ErkJggg=="
	},
	{
		label: "Bing",
		url : "http://www.bing.com/images/searchbyimage?FORM=IRSBIQ&cbir=sbi&imgurl=%IMAGE_URL%&mkt=en-US",
		where : "tab",
		image:"http://www.bing.com/favicon.ico"
	},
	{
		label: "百度识图",
		url : "http://stu.baidu.com/i?rt=0&rn=10&ct=1&tn=baiduimage&objurl=%IMAGE_URL%",
		where : "tab",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACoklEQVQ4jZ2T6UuUURSHzz9QRhCpJJVZERUFmVmp7bZYZiUttpiEVliEtCctJtGHPgQGEm1EUbQHUlCBWSI1NbagJfheX3XG1LSmhWL0NTtPH6ZmEulLF86XcznPPb/7O0eksAYprEEK3iKHqpED1Uj+a2TvK2TXC2SHG8lzIVufILkVyKZyJLsMySpF1t1HpLCG/z2ScQ+Rgre9LqzaTj1S0K7VVR0KYKxOtY2jvQAr7iBysLpH0nGUPTvaGBVTp5kZzWobh2mTGzVljldt4/QEpJcgsr8qmPj8qRuAXXltTB7fQE5mC26Xn7hx9cyd4cHt8vcEpN1GZN9rADyNXWxY26y5Oa1668ZXcjJbKC7yAVBc5KO4yIfb5cfr6QoBFt1EZPdLAK5d+sKQgZYmxjUogG0cOjtCsm3jsGrZO1YuadLWlh8BwPxriOysBOC5y09CbANLFzZxt+QbtnHYvKGFvC2t2Mbh2NGPTBpfT0ykwe3yK4DMvYLI9mcAdHfDjatftbjIp7ZxSE326ogoo2NibNYsf6e2cViW6iVtvlcb6gOOyKxLiGx7Gmyzo+MntnFIm+dlZJTR6HDDn1ixuElt4/D44XfltzKZfhGR3Iog4E1VJymzvYwYVMffxdHhhnHDbbIymrHrQlZK4nlENpUDoAqH89t18ACjQweaXoDBA4yOHWbzqPR78Gdl6jlEssuCgKMFHzS8r6WR/SwiwywN71OrEWEWUf0tHdTf0mERhssXvoQA8WcRySoNtuRp7GJLdivJSR7SU5o4cdzHieM+Zk1tJHZ0PRvXN9P2/kdIQtxpRNY9+Hu4FKgEnvwjKntM4sRTiKy+F1iK9BJkyW0k9Say4HrA49mXkZkXkaQLSMJ5ZMo5JP5M4OXYU8iEk/wC6ZkDX3ssK20AAAAASUVORK5CYII="
	},
	{
		label: "百度图片",
		url : "http://image.baidu.com/i?rainbow=1&ct=1&tn=shituresultpc&objurl=%IMAGE_URL%",
		where : "tab",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACoklEQVQ4jZ2T6UuUURSHzz9QRhCpJJVZERUFmVmp7bZYZiUttpiEVliEtCctJtGHPgQGEm1EUbQHUlCBWSI1NbagJfheX3XG1LSmhWL0NTtPH6ZmEulLF86XcznPPb/7O0eksAYprEEK3iKHqpED1Uj+a2TvK2TXC2SHG8lzIVufILkVyKZyJLsMySpF1t1HpLCG/z2ScQ+Rgre9LqzaTj1S0K7VVR0KYKxOtY2jvQAr7iBysLpH0nGUPTvaGBVTp5kZzWobh2mTGzVljldt4/QEpJcgsr8qmPj8qRuAXXltTB7fQE5mC26Xn7hx9cyd4cHt8vcEpN1GZN9rADyNXWxY26y5Oa1668ZXcjJbKC7yAVBc5KO4yIfb5cfr6QoBFt1EZPdLAK5d+sKQgZYmxjUogG0cOjtCsm3jsGrZO1YuadLWlh8BwPxriOysBOC5y09CbANLFzZxt+QbtnHYvKGFvC2t2Mbh2NGPTBpfT0ykwe3yK4DMvYLI9mcAdHfDjatftbjIp7ZxSE326ogoo2NibNYsf6e2cViW6iVtvlcb6gOOyKxLiGx7Gmyzo+MntnFIm+dlZJTR6HDDn1ixuElt4/D44XfltzKZfhGR3Iog4E1VJymzvYwYVMffxdHhhnHDbbIymrHrQlZK4nlENpUDoAqH89t18ACjQweaXoDBA4yOHWbzqPR78Gdl6jlEssuCgKMFHzS8r6WR/SwiwywN71OrEWEWUf0tHdTf0mERhssXvoQA8WcRySoNtuRp7GJLdivJSR7SU5o4cdzHieM+Zk1tJHZ0PRvXN9P2/kdIQtxpRNY9+Hu4FKgEnvwjKntM4sRTiKy+F1iK9BJkyW0k9Say4HrA49mXkZkXkaQLSMJ5ZMo5JP5M4OXYU8iEk/wC6ZkDX3ssK20AAAAASUVORK5CYII="
	},
	{
		label: "360识图",
		url: "http://st.so.com/stu?imgurl=%IMAGE_URL%",
		where : "tab",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB6klEQVQ4jaXOz2oTURQG8Ltv7vEZAl1Jsm3VZO7ccdqNlK4sBFd9k0IoCD5BaRYKVtRi5l8zmZTY0o5NoVuhI9KFRbGpLaSkDYEk1s/FnTGDC6l64bf5zncPhxlhRjdDOph5dwt/wwzpwAgzOjN3eXsmJPwLc5e3mblD+B/M3CaklVq3sfPNweWwg8thB60zH4/28/i9l2D3m4TEYmsKF4NzPP34GAvNHBaaOVQ+lHExOMdiawrpboIZmwRjkyAbhL1THyuHSyg6HJqnFB2O1aiMvVMfsqG6acxoEIwGQfcJ/VEP88Ek9BqHDAgyIOg1jrl6Fv1RD7qvumlM1gmyThAex9Wwi/lgEtJXmawTpE+YC7LoDjoQHh/nMSZ9VRIux/YXGyuHS5A1lUmfIGuE1aiMt5/fQLh8nMeYrKmScAkP6zmc9b+iEpVR2sqjtJVHJSpjeD1QFzgcST/B9A2CvkEQHqFocTxws/A/reGkd4yT3jGeRU+QvKthF8JT/QTTPUJCOIRilaOwznHvdewVx/Ra5teS/qgH4Y7/MN0lpAmHoFkErcpjhMI6x/TzDK5/fEfl/TI0a9xnwlGf/kSz1ZI7LzK4+5JDs8YzJhzevumSYlVdJ+wk521WsCZmhU1Hwo4HN3dUsCZmfwKCejnLHZeJTwAAAABJRU5ErkJggg=="
	},
	{
		label: "搜狗",
		url: "http://pic.sogou.com/ris?query=%IMAGE_URL%",
		where : "tab",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB0klEQVQ4jZ3Sv2sUQRQH8FdsZSURK0tB8D/Qa3Iii1oIwcIuSnoLf4AigkUgWqQXLhgQQgqxDUHsrCTFtoJL4G53dmcvs7t37M3uODur97WYuPFMUM8Hr5vvZ+bxhvr9/mIQBHtBEOCkDsMQjDEwxhBFEeI4Bud8L0mSRSIiGgwGSfzgCrjr/Hs/vArGWEZEpykIgvnChy2EABF1ZoDh7XMo367D+B6mSuLX+j5K8PXju/ZslmUgom4LiJWL+JZGbaBhX1DtbKDa2YB6/wbG92B8rwXyPLdAGIbgroNqd3PmxvzJtT+OMB6PLcAYA3cdFK/u4/eqP3+C3F5D/uwmkqUzM0BRFBaIouhIXV+B9j5gqtUxbKoV5PYakhunwF0HUkoLxHF84hPTe5cwef0UxvdmILm1Cu46KMvSApzzNjR6voSD5fNHW7l19thoPzehlLLAcDhsA3+rqVbIHtlPp7W2gBCiBardzXZdTbxv1xnvw/ge5NYqxN0L7dm6ri2Qpul//URjjAWyLIsOXtyZKzx6uQwpZUpEXcrz/LoQIiuKApPJBFJKlGWJqqqglILWGnVdwxgDYwyapkFVVXmv13tMRJfpsBaIqENE3Tm6Q0QLPwAGVa1p0zMtjwAAAABJRU5ErkJggg=="
	},
	{},
	{
		label: "E-Hentai",
		url: "http://ul.exhentai.org/image_lookup.php?sfile=%IMAGE_DATA%f_sfile=File Search&fs_similar=on&fs_exp=on",
		where : "tab",
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMklEQVQ4jWNgGBQgjU3wPzrGJo+LTz0DCLlwCBiALIGNjTOcqGbAwIcB1QKR/ilxQAEAJP+OgQf5ivIAAAAASUVORK5CYII="
	},
	{
		label: "TinEye",
		url : "http://www.tineye.com/search?url=%IMAGE_URL%",
		where : "tab",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADRElEQVQ4jW3Tf0zUdRzH8Y9QkUHLOW9KYEmtGkziPMexDicMuB/Q0TFg2MQK2gkRP+JEQjhyJr8Kji/I7zhghLBkghvS6cFUfhxwcXLFFvpPK4iTWLM/+0NW7dkftwJX7+315+vxx2t7C3X9ZEy8ZWYxt64PveUWGsnxv1E3TJF8yUFK2wKJzXPEW2YW1fWTMSLBMr3Z3VTN2vkIhk1xaKXZf0sZHfPIM84gC1PxbGAI+4JfQhb4ArFqLeUDtzk77N4UGsnBNXMKK4VBTBSEo5EcaCUHxYMuDsmjEUI8lmOh+8mtbya5ppuMum6ERnJgaLCTYniLTGmcU1YXlpvLpGVloZUJSo4KqmOexvKmjK7UA/S2f8JHc79gmlzhw+t3vYBGchD5fhX5fQ4sN5dI77FT+2Uf9p6PGb3aSf9wHy2D/Vzs7KLA0kG+ZKWwyUpRc+828LZkI+ezTnJGnZTZlzFarOiyC4nUGHg5XIHsQBDyqGiSUtKRyWQE+D3JHv/d20DxoIuTHSMUX53myBvH0CTq0adlIHb5IITgOdl+XMvf8+iPP+m/MoKv327vLv8A58fuYbK5OXQkisOvy/n90RYAn7d2Inx8USXo2HkZWUYvoG6cJb5hhrKBWd7ttSF8nyI7J4/fHj5kdXWVv4CjquOEK1UsLC6SlpoKwNDomBeIqryB0mzjvdoh0lqG2RvyGrFqLaXnKjiVmQnA6fwi/J4JwDowRE11NQA9l7/yAkqzDaXZhrZmkqrriyR92o4QgtN5BWx41tna2iI6Ng4hBK+EHmbi1h1u35kiLELBnsCD24DSbMN0+S5VC6skVDQSoT9BZYuV7DPl7A15lefD5BxUqIgwZBKbV05yVQe5Y0uPA0qzjbNDS7S5PFTM/4xxzE32iJOiiXuUzPxE6fw6JY41yhY8SN/9SvP0j/8FlGYbxy/Yye9zUnfjPm1ODy0uD63frNPuXOPS1A9UXnGS1ziCIceMUFaMP9hZTmya4YP+OYq7xiltGsBYWEbSCSP6k7no0rOJM7zDi6EKdvk8gRDigVCUXtNFnvt6M/qCnSLbfWrdHmq/3eCie4PKqRVMrV8QH7qPAH9/goKDdz7Wpr8Qur8B/c1d/jmhRwsAAAAASUVORK5CYII="
	},
	{
		label: "Yandex",
		url : "http://yandex.ru/images/search?img_url=%IMAGE_URL%&rpt=imageview",
		where : "tab",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABjklEQVQ4jY2TTWsTURSGnz+gol0MuJyNSEELRZOKiGjNB0jrUt268GsjbqSL7KS7wPwqpWjJtplpiGUKYWDIxiQzc2fuvC40IQmVzoFn+T73HngPwAZwF9iuyBXWZms8HvdUYaIo+gbcWhfck0pVxfO8N+u/qJVlqdh1KhFF0RFwe1lQL61V7DqXrhC7jkpr5XneW+DqXPDA2qKywNpCUTT6CWzOBQ+LIl8Ifn/f1ORH/b+CoshVFLm63e5H4BrAozw3C8HkaFvTXmMRstauCPLcKM+Nzs/DHnAH4LEx2YUrBL6v169eKgiChcCYTMZkCsOwB2wBPDFZqth1NBqN9OH9Ow0Gpwp8X+1WUzu1mtqtpvr9/l9BlspkqQ4Pv34CrgPsZmmi2HX0Yn9PO7WaWs3GIjyn8WxXsesoSxOd/Rr2/rUSgEaazBS7zkrgImLXUZrM1Ol0PgM35oJWkkwrF2k4OD0G7i8XqZ3MJqrKwcGXldcBnoZnw5PZdKLLCHz/GKivH9NNoAE8r8jGcvgPaCFD9Yl2AZgAAAAASUVORK5CYII="
	},
	{
		label: "IQDB",
		url : "http://iqdb.org/?url=%IMAGE_URL%",
		where : "tab",
		image:"data:image/png;base64,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"
	},
	{
		label: "Regex",
		url : "http://regex.info/exif.cgi/?url=%IMAGE_URL%",
		where : "tab",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADpElEQVQ4jQXB2VPUBQDA8d9qjDwQRzSwhhCwu2MpwR7cIBDbcuoaLQuBICznEldcCxmgAoPAqrASBqikLosIq6BxyiEmKQ7E4TE19eJMM73YQ//Bt89HePvHKzbm7azP3mVjwc72yjRrD8dZvGdjeWqM9blJXv0yw5uns+ysTrO7Os328hRbi3Z2FicR1qZGsbUZGWkuZKytlNykaHzFYqReXiikEhKVQeRrorlmymN5oJGZy7U86K7C3lbCw7YihI15OzdairHU5xKrOIpItB+RSIRo33u4ODkjdnPnk4NeHJPJuFKZzYPLdUx0fIOtpQB7awHCxsI9rG1GOsr07N/ngKeTC0ovbyL8/PlSIeeEXI5CIkX6sS/JIUrsXd/y86Va7O1G5jrLEF48us9YRzk91dkcdHXDoFDSk6DhVkY6c0UGntWVM2WqIFoexGE/CZaGfJ4ON7PYW8ev/fUIm0vT2DoqGTlnJPyIDINcQV9CEqM6PSO6dMxfaXl0tg6bqRyZlw+jNaVs3u5i/VobL62dCFsrs4x3NTLR00ROUhyB4o+Qe/nQHKumPzMDrULJ4Gk9e12NVGrUPD97hnWrhcfXe/jd/gPCwv1xvi/OpsGQSb42kc/9Jah9JJhCotirrmHiZAZbRWX8PWRhq6+dgTIDSdFh9DWU8M/CTYSRwaskRAQTH6pAHaniVEgwdfJwypWhTBaU8qMuF7NOz+vhS+wNm1EHHcXDxYULlXm8WxlFuDk8REJUGOqIYDRRISSHqcgOkhPnK6Eq7gtuFBoxaRIYrTeyM9RNQXwEnh+4Ya4p4N2KDWH89i2+M+Qy2FTFw74uLtSUoQk8Qoq/jAplJAMpGQydysGkO86GuZU961WSQgLpbzTy75NJhN2leV4M9rJ5w8Lr8evsWgcZqa4iPSYavSyAYlUkyYEK6k4kstTTQok2BZX0MA1ZabwZsyD8+WSRv+5c5fngRZZ629kYG+G/7R3WxqwEHDqEt6s7kVIJ9WlJBMtkiJ3dSQ9TUpt8jO7c4whvn63y2zUzPeVFnM83cP/ceSba27E0mTgRFswRTzHhMn8OODji5yEmPyaM0vgIDHHhVKbGIrxcnmV1oBOzPpOfUtMYT89isaSEr0NV+Hp44u3+ISKRA67vO3NSFYg+VEFWlIq8mFBqtWqEx3etzF88x0xzK7OnC5kpqeBOaSnVqRqcDjji7OiE7tMAcpQKtIrPOKkKJCtChVETxRldAv8DCURA7EPC5P4AAAAASUVORK5CYII="
	},
	{
		label: "Saucenao",
		url : "http://saucenao.com/search.php?db=999&url=%IMAGE_URL%",
		where : "tab",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAVElEQVQ4ja2SwQ4AMARD+/8/bbdlw8ogcdK9RQsApNmQal2A359dgCK7j07tBmiBByGzWMjABsBMfaaQgdAYxwGtFVomMiGZDRxSYFLulCtFY8z2AmZhBhe3B+XrAAAAAElFTkSuQmCC"
	}];

	var menu = PageMenu({
		label:"以图搜图",
		accesskey:"t",
		condition:"image",
		where:"tab",
		insertAfter:"context-viewbgimage",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABzklEQVQ4jcXTQUhTARzH8d/JuegwmFBbBDFxOIfVVmPIcEZHh9DBQ0brEkEIQ1qBXgyR2qExQVBoRFAxOkSFUzo1GC3Fiv86qQThePG2HvYO7/AOT3jt/ToEXuzSLv7gc/ndv8CRb2kExeVLkE4sjaCIxWFIo9FgJxaHISgkIIqi8Otr739RFIWFBAT5OERVVW6t+v7Bz+01P3fenTqwvebn1qqfqqoyH4cgF4NomsaXuQg/vghz933gQKPSS6Xax+bmAH/Wz7K5OUCl2sdGpZeapjEXg2A+AtF1nRNDQ0wnkyw9uMhmLcRmLcTWeph79Sj3jXE67ZvcN8a5V4+ytR6mruucj0AwOwgxDIMJn4+j/f2ciMe4fDfKt4UL/PIqxh+fLtNpT5O8R6d9h8ZOkr8+n6dhGJwdhGAmBDFNk1Njbk6NuZm9cpz3r5/k3A0/H946zSdzQTa/p/jbvsbW7lWWH59j5ekZmqbJmRAE2SDEsizWnnkOe+7hRsnDetnLbx9OsF72cqP097csi9kgBJkAxLZtPrrddUh+0sWFjIsrRTerb45xpejmQsbF/KSLtm0zE4Ag3QNxHIedSPdAkOpGcbQL0olUN4pHnSLwB1rO4BkLftLTAAAAAElFTkSuQmCC"
	});
	menu(items);
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="image"] #' + it.command + '{ display: none !important; }')
	});
};

//快捷回复
new function(){
	var items = [
		{label:"谢谢你的解答", input_text: "非常感谢您的解答！！！",accesskey: "T",image:" "},
		{label:"亲，要的就是", input_text: "亲，要的就是这个，非常感谢！！！",accesskey: "D",image:" "},
		{label:"不用客气~~~", input_text: "不用客气，大家互相帮助……\n\u256E\uFF08\u256F\u25C7\u2570\uFF09\u256D",accesskey: "Y",image:" "},
		{label:"反馈情况再说", input_text: "Mark，看反馈情况再说。。。",accesskey: "M",image:" "},
		{label:"收藏备用~~~", input_text: "看起来很不错哦，收藏之~~~\n谢谢LZ啦！！！",accesskey: "G",image:" "},
		{label:"谢谢楼主分享", input_text: "谢谢楼主的分享！！！这个绝对要顶！！！",accesskey: "F",image:" "},
		{label:"楼上正解~~~", input_text: "楼上正解……\u0285\uFF08\u00B4\u25D4\u0C6A\u25D4\uFF09\u0283",accesskey: "R",image:" "},
		{label:"坐等楼下解答", input_text: "坐等楼下高手解答~~~⊙_⊙",accesskey: "V",image:" "},
		{},
		{label:"这个要支持~~~", input_text: "很好、很强大，这个一定得支持！！！",accesskey: "A",image:" "},
		{label:"不明真相的~~~", input_text: "不明真相的围观群众~~~\u0285\uFF08\u00B4\u25D4\u0C6A\u25D4\uFF09\u0283",accesskey: "S",image:" "},
		{label:"没图没真相~~~", input_text: "没图没真相，纯支持下了~~~",accesskey: "C",image:" "},
		{label:"不明觉厉~~~", input_text: "虽然不知道LZ在说什么但是感觉很厉害的样子\n\u2606\u002E\u3002\u002E\u003A\u002A\u0028\u563F\u00B4\u0414\uFF40\u563F\u0029\u002E\u3002\u002E\u003A\u002A\u2606",accesskey: "B",image:" "},
		{label:"嘿嘿~~~", input_text: "\u2606\u002E\u3002\u002E\u003A\u002A\u0028\u563F\u00B4\u0414\uFF40\u563F\u0029\u002E\u3002\u002E\u003A\u002A\u2606",accesskey: "X",image:" "},
		{label:"把同桌手机", input_text: "前天我偷偷把同桌手机里我的号码 名称换成了“爸爸”，上课时发短信给他：“孩子，赶紧回来吧，咱家中了1000万，还上鸡毛学！”同桌看了以后直接往外撒腿就跑，班主任问他干嘛去。他头也不回地说：“滚NMB的！",image:" "},
		{label:"现在的女生会装", input_text: "现在的女生真TM会装，昨晚和几个同学KTV小聚，最后走的时候女神说她喝醉了，要我送她回家，我说你TMD喝果汁也会醉？？？幸亏老子机灵，要不今晚又耽误玩游戏了",image:" "},
		{label:"这篇文章写的", input_text: "不解释，这篇文章写的太烂了，首先对孙悟空这个角度处理就相当敷衍，完全没有表现出唐三藏那种卑鄙无耻的性格。而小燕子总是跟周杰伦唧唧歪歪不务正业，包括白眉鹰王大战令狐冲那段，也写的非常烂，这样的剧情逻辑变得非常矛盾，让观众产生一种厌恶的情绪。比如少林寺厕所里为什么会出现奶罩，沉香为何不顾母亲的危险去救海尔兄弟，沙僧的肚子是被谁搞大，这些问题都表明作者根本就没有读过历史..",image:" "},
		{label:"有个SB告诉我", input_text: "刚才有个SB告诉我鲁迅姓周，真逗啊！周迅是个演员好吗？笑死我了！真想一板砖呼死他！我记得鲁迅原名李大钊，浙江周树人，是著名的反法西斯音乐家，一生有2000多项发明，被称为太空步的创始人。他拥有一个好嗓子，小学时就凭借着90分钟跑100米的优异成绩考上了新东方烹饪学校，毕业后成功加入交通学院吧～",image:" "},
		{label:"曰本艾薇背后", input_text: "曰本艾薇背后隐藏着巨大的阴谋， 小曰本在下一盘很大的棋！还记得鸦片战 争么？ 曰本电影其实也是一场不见销烟的战 争， 他们企图通过电影，让全体国人长期撸 管， 体质每况愈下，最后达到和鸦片一样的效 果。 为何女忧在曰本国内地位并不低？且受人 尊重？ 因为她们是民族英雄，她们背负着政治使 命！ 曰本本国人是从不看电影的，她们将最 漂亮最优秀的女孩挑选出来拍电影， 目的就是残害中国人！！！大家看曰本 电影时常常会心生感慨，有这么漂亮的女 孩干啥不好， 非干这个，或是这么漂亮的女孩来到中国 肯定是大明星或2奶之类想法。如果这么 想，你们就对了， 小曰本正是把他们最出色最优秀的女人挑 出来，用美人计来残害国人！！有没有想 过，为什么别的东西都要钱， 就电影不要钱？因为那是曰本故意给你 们看的！醒醒吧，扔掉你的硬盘，扔掉你 的卫生纸，放开你握着管的手!!!!!!! 中国的年轻一代不沉迷于鸦片毒品，却热 衷于撸管..这是一种怎样的精神摧残， 小曰本不费一兵一卒，不动一枪一炮。就 让中国的后辈纷纷沦陷.. 小曰本用最漂亮的妹子充当炮灰，美人计 用到了极致啊。 少年，醒醒吧，现在把你手中的艾薇网站， 发到我的邮箱里面，让我帮你清除了吧， 记住，要无毒的!!!!",image:" "},
		{label:"楼主搬完整天砖", input_text: "楼主搬完一整天的砖放工了！楼主直奔网吧了！楼主冲到网吧收银台了！楼主押金上机了！楼主开机了！楼主开显示器了！楼主发现机器坏了！楼主换机器了！楼主又开机了！楼主又开显示器了！这一次机器没有坏！楼主开始操作鼠标了！楼主上QQ了！楼主密码忘记了！楼主输入了LZSB250！楼主QQ上去了！楼主开始上网了！楼主开始上你懂得网了！楼主看到苍老师了！楼主可耻的硬了！楼主开始下快播了！楼主快播下好了！楼主发现原来网吧有快播了！楼主感觉被骗了！楼主开始下载了！楼主下载到99%了！楼主到时间了！楼主又冲到网吧收银台了！楼主掏出1元续费了！楼主又冲到电脑前了！楼主机器被旁边小学生重启了！楼主可耻的软了！楼主愤怒了！楼主粗口了！楼主让小学生出去单挑了！楼主开始打小学生了！楼主被小学生打躺了！楼主求饶了！楼主吓出翔了!楼主无奈回家了！楼主到家看14寸黑白电视了！楼主换到了少儿频道了！楼主正在看喜洋洋了！楼主看到美羊羊了！楼主又可耻的硬了！楼主开始狠狠的撸了！楼主撸完发贴了！",image:" "},
		{label:"常年替人报仇:", input_text: "本人常年替人报仇：往人家里扔石头10元，砸窗户20，跺大门50，砸狗，小的30，大的面议，藏獒不砸，点草垛60_80，揭瓦白天不干上半夜300，下半夜200，揍小学生1-3年级50，4-6年级100。120斤以上揍不过，不揍，帮小学生代做作业，帮小学生打架，代开家长会，寒属假作业1-3年级50元。4-6年级100元。 欺负同学，身高1.3-1.4M50元。1.5M-1.6M80元。1.7-1.8M价格面议，1.9以上打不过，骂人面议，有意者联系，非诚勿扰。另招收学徒。",image:" "},
		{label:"看完楼主的帖子", input_text: "看完楼主的这个帖子以后，我的心久久不能平静，震撼啊！为什么会有如此好的帖子！我纵横网络bbs多年，自以为再也不会有任何帖子能打动我，没想到今天看 到了如此精妙绝伦的这样一篇帖子。楼主，是你让我深深地理解了“人外有人，天外有天”这句话。谢谢你！在看完这帖子以后，我没有立即回复，因为我生怕我庸 俗不堪的回复会玷污了这网上少有的帖子。但是我还是回复了，因为我觉得如果不能在如此精彩的帖子后面留下自己的网名，那我死也不会瞑目的！能够在如此精彩 的帖子后面留下自己的网名是多么骄傲的一件事啊！楼主，请原谅我的自私！我知道无论用多么华丽的辞藻来形容楼主您帖子的精彩程度都是不够的，都是虚伪的， 所以我只想说一句：您的帖子太好了！我愿意一辈子的看下去！这篇帖子构思新颖，题材独具匠心，段落清晰，情节诡异，跌宕起伏，主线分明，引人入胜，平淡中 显示出不凡的文学功底，可谓是字字珠玑，句句经典，是我辈应当学习之典范。就小说艺术的角度而言，这篇帖子可能不算太成功，但它的实验意义却远远大于成功 本身。正所谓：“一马奔腾，射雕引弓，天地都在我心中！”楼主真不愧为无厘界新一代的开山怪！本来我已经对这个社区失望了，觉得这个社区没有前途了，心里 充满了悲哀。但是看了你的这个帖子，又让我对社区产生了希望。是你让我的心里重新燃起希望之火，是你让我的心死灰复燃，是你拯救了我一颗拨凉拨凉的心！本 来我决定不会在社区回任何帖子了，但是看了你的帖子，我告诉自己这个帖子是一定要回的！这是百年难得一见的好贴啊！苍天有眼啊，让我在优生之年得以观得 如此精彩绝伦的帖子！楼主的话真如“大音希声扫阴翳”，犹如“拨开云雾见青天”，使我等网民看到了希望，看到了未来！晴天霹雳，醍醐灌顶或许不足以形容大 师文章的万一；巫山行云，长江流水更难以比拟大师的文才！黄钟大吕，振聋发聩！你烛照天下，明见万里；雨露苍生，泽被万方！透过你深邃的文字，我仿佛看到 了你鹰视狼顾，龙行虎步的伟岸英姿；仿佛看到了你手执如椽大笔，写天下文章的智慧神态；仿佛看见了你按剑四顾，江山无数的英武气概！楼主，你说的多好啊！ 我在社区打滚这么多年，所谓阅人无数，见怪不怪了，但一看到楼主的气势，我就觉得楼主同在社区里灌水的那帮小混蛋有着本质的差别，那忧郁的语调，那熟悉的 签名，还有字里行间高屋建瓴的辞藻。没用的，楼主，就算你怎么换马甲都是没有用的，你的亿万拥戴者早已经把你认出来了，你一定就是传说中的最强id。自从 社区改版之后，我就已经心灰意冷，对社区也没抱什么希望了，传说已经幻灭，神话已经终结，留在社区还有什么意思。没想到，没想到，今天可以再睹楼主的风 范，我激动得忍不住就在屏幕前流下了眼泪。是啊，只要在楼主的带领下，社区就有希望了。我的内心再一次沸腾了，我胸腔里的血再一次燃烧了。楼主的话概括扼 要，一语道出了我们苦想多年的而不可得答案的几个重大问题的根本。楼主就好比社区的明灯，楼主就好比社区的方向，楼主就好比社区的栋梁。有楼主在，社区的 明天必将更好！楼主你的高尚情操太让人感动了。在现在这样一个物欲横流的金钱社会里，竟然还能见到楼主这样的性情中人，无疑是我这辈子最大的幸运。让我深 深感受到了人性的伟大。楼主的帖子，就好比黑暗中刺裂夜空的闪电，又好比撕开乌云的阳光，一瞬间就让我如饮甘露，让我明白了永恒的真理在这个世界上是真实 存在着的。只有楼主这样具备广阔胸怀和完整知识体系的人，才能作为这真理的唯一引言者。看了楼主的帖子，让我陷入了严肃的思考中，我认为，如果不把楼主的 帖子顶上去，就是对真理的一种背叛，就是对谬论的极大妥协。因此，我决定义无返顾的顶了！楼主，在遇到你之前，我对人世间是否有真正的圣人是怀疑的；而现 在，我终于相信了！我曾经忘情于汉廷的歌赋，我曾经惊讶于李杜的诗才，我曾经流连于宋元的词曲；但现在，我才知道我有多么浅薄！楼主的帖子实在是写得太好 了。文笔流畅，修辞得体，深得魏晋诸朝遗风，更将唐风宋骨发扬得入木三分，能在有生之年看见楼主的这个帖子。实在是我三生之幸啊。看完楼主的这个帖子之 后，我竟感发生出一种无以名之的悲痛感――啊，这么好的帖子，如果将来我再也看不到了，那我该怎么办？那我该怎么办？直到我毫不犹豫的把楼主的这个帖子收 藏了，我内心的那种激动才逐渐平复下来。可是我立刻想到，这么好的帖子，倘若别人看不到，那么不是浪费楼主的心血吗？经过痛苦的思想斗争，我终于下定决 心，我要把这个帖子一直往上顶，往上顶到所有人都看到为止！我现在终于明白我缺乏的是什么了，正是楼主那种对真理的执着追求和楼主那种对理想的艰苦实践所 产生的厚重感。面对楼主的帖子，我震惊得几乎不能动弹了，楼主那种裂纸欲出的大手笔，竟使我忍不住一次次的翻开楼主的帖子，每看 一次，赞赏之情就激长数分，我总在想，是否有神灵活在它灵秀的外表下，以至能使人三月不知肉味，使人有余音穿梁，三日不绝的感受。楼主，你写得实在是太好 了！我唯一能做的，就只有把这个帖子顶上去这件事了。",image:" "},
		{label:"我顶!--此回复", input_text: "我顶！----此回复虽仅有两个字，却深刻的表达了回复人的深深的祝福与刻骨的情感，可谓言简意赅，一字千金，字字扣人心弦，催人泪下，足见回复人扎实的文字功底和信手拈来的写作技巧及惨绝人寰的创新能力。实在是佩服佩服！再加上以感叹号收尾，点睛之笔，妙笔生花，意境深远，照应前文，升华主题，把回复人的感情表达得淋漓尽致，给人无限感动和惆怅，有浑然天成之感，实属回复中之极品，祝福中之绝笔",image:" "}
	];
	var menu = PageMenu({
		label:"快速回复...",
		condition:"input",
		accesskey: "W",
		position: 1,
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACGSURBVDhPYxh0gAWIw4B4rbe399+AgID/IAxig8SgciA1WIGWv7//b5gmXBikBqQWogUBlJBtJIShLlKCaIWAtdgU4sMgPRCtQODn5/cPKigAwkiKcPJBeoBsCKDYACCgzAtAQHEgggBF0QgDWBMSMoaqIRlEwAyE8skCYkCMEnCDATAwAACbYMG591LPcQAAAABJRU5ErkJggg==",
		oncommand: function(event){
			// var input_text = event.target.getAttribute('input_text');
			// if(input_text) {
			// 	addMenu.copy(input_text);
			// 	setTimeout(function() {
			//		goDoCommand("cmd_paste");
			//	}, 100);
			// }
			var focused    = document.commandDispatcher.focusedElement;
			var input_text = event.target.getAttribute('input_text');
			if(focused) {
				var host = addMenu.convertText("%h"),
					url  = addMenu.convertText("%u");
				if (host.contains("tieba") || url.startsWith("data:text/html")) {
					addMenu.copy(input_text);
					goDoCommand("cmd_paste");
				}
				else {
					var aStart    = aEnd = focused.selectionStart;
					focused.value = focused.value.slice(0, aStart) + input_text + focused.value.slice(aEnd);
					var aOffset   = aStart + input_text.length;
					focused.setSelectionRange(aOffset, aOffset);
				}
				return;
			}
			else {
				addMenu.copy(input_text);
				goDoCommand("cmd_paste");
			}
			return;
		}
	});
	menu(items);
};

//搜索链接文本
new function () {
	var items = [
	{label:"搜索此链接文本",url:"https://www.google.de/search?hl=en-US&newwindow=1&nfpr=1&safe=off&ie=utf-8&oe=utf-8&q=%LINK_TEXT%",where : "tab",image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABUUlEQVR42pWTzUsCYRCH9y9zu3SooCCkjhIRRLeIykXokiWCJ7PvDpZRlz6si1lIQZ3SQxQdOhREpgSm0JeQvfu0+i6I7LKLh4F5h5nnnRl+o6jTdHn8omAYbVqhXqvYFXcEBKFDwcoZZB8B4LkEB9cwGGmFKHb01A1EU9JXzfdvDYZi1lwLwBcVAIwsNWPesIwls7gDtB2Z7N9ujVe+IX2LO2AgItB1OL9vJqsmILDrOoK02IkBAdYy4FsQJC5h+VQCHQDWTqYSgo8fuHuRxS4Ae3stQ7UGE5ttAHqCUgfxC7m4ryrowOyeO6CxqHwZxtYFqtYc5+kNan/gDTsAeueEIRj7n/rmRQMwueUAGF0VAAT3rQBTC0Y3DoDOGbm00icML4oWHYSTgo0MFqjlmPpDgqMcFCuQf4erBzjOwXjcriu9qHg0uutO2+es6fl67T9ptebvFRjBVgAAAABJRU5ErkJggg=="},
	{label:"在百度云搜索",url:"https://www.google.de/search?hl=en-US&newwindow=1&nfpr=1&safe=off&ie=utf-8&oe=utf-8&q=site:pan.baidu.com%20%LINK_TEXT%",where : "tab",image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJuSURBVDhPrVNZaxNRGL0/U7JM0yQqCIIEV7CCti+CIm70Uakg+OCDiELNvlobmlQS27Sl2jbJzKRJZslMJmOa5Pjd65T2XQcud5nvnO989zuX/ZdPSqsI5boIJGUEEm2EC334vjRp1jCX6UBKKTQfi7U/3oIv3kSkqMODnxEEKZAH+CkglPX2RCpxcK5HexXz+b6YI6VzBJyZZ/atHkFKdzBPwfP5HoEVXM4quFlScGu9j3DyL3kgJQtyD04E2WOESVK4qAlgkMgkOrv9tYOS6uDAAdItGw+qOoEVQcDL8+CMnUrndQdIwYWEjBBlqxsT/NSGeN0wsLzr4MX3Lu6ukcIsDUrkwRnjkvnFSXQPd8oaPhw6KLQH2NFdLGxoeHfoYqNjo9z9jeUtU1x2lNR6cMb8pMCX6eJiRsGnXwYmADqWi2t5GfGmhVrPwf2KTvegYWnTQGxdh5Q/RxCjH0XKaM+AwciF5bh4uW3h7a6JPXOMqwUVn4+GopwDe4LWcIIndeOMoNpzMZ1OMJ1NacywZ4yxVNGgnQD3qiZW2yOkDk083NTw+IeFR3ULC6TIgzP2cV+HNhxhfHKCGREkZRevGiZ2beB6UcE2lfBs20ZKHqGs2Hi/PxAle3DGomkZKzsG8sdjJCjT05qO51sWlms9oWCloWOx0sebfQexooob33oIkaE8OGO+OPWdentlTUc03UYkR86jNl4qkusSZNuMCinREu3zkwtDBV3Y2oMzxk3BrcstK9GPObHukOdbYh0kq/PWccMJy9OavwcPTgrIQPxxcC/w+TSYvxFhaSLiVudZQ3TO3wN3rQf/l4+xP5yBeeudxxlpAAAAAElFTkSuQmCC"},
	{label:"翻译此链接文本",url:"https://translate.google.cn/#auto/zh-CN/%LINK_TEXT%",where : "tab",image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABs0lEQVQ4jY2SP4viQBiHX0UQWz/AXb+VX8Iu/YqFhdhcd5BKEOTKC9jJFYrFgo3FIjYiCRauhTCQDMp4bJFklzCuLJLOWNj8rpDMJt7u7Q08xQzze953/hAR0el4QJLw8KR4fXkE/Wtch01zjP6gmxLsd9uPJafjAf1BF82WjmZLR61eRa1eVfNmS4cMxP8JksGk6FPB6XjAii1Qq1fBBYMMBL79+InvDIrbB0CzIpSmQHF0RnF0vkiTFxZX7A+6MOzwU0FxdEZKYJpj1fp1eO5KzF0JzYreF/iekzr77QMUhh2q1zDsUIULPQl6fXkEFww53cWKLWCaY3DBVMuaFWHuSsT7fM/5W5DTXYUMBGQgUJoCpelFst9tcc84DDuE7znQrAiFnrwIkuGY/W6rBIYdQgYC7RmHZkXwPQf3jL8JiCglISLKVCaqzfhZfc9RcMFwc/eMfGd9EWQbS+R0F9nGEtnGEpnKBJnKJFWxPNygPNygPePggqE942nBdTjG9xyUhxvVcqEnsWILrNjiTfCRJN9ZI99Zp8LxWsy73ztTmYCI6ObuGV/7Tym+/PqtICL6A7F/dNYyWabFAAAAAElFTkSuQmCC"},
	{label:"搜索此链接文本",url:"http://www.baidu.com/baidu?wd=%LINK_TEXT%",where : "tab",image:"http://www.baidu.com/favicon.ico"},
	];
	var menu = PageMenu({
		condition:"noinput noimage link noselect",
		position: 10,
		where : "tab",
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHDSURBVDhPpVJbKENhHJ887NmLcnmQZ+U6SZ7mEk+ur8qDXEpMLBSRJbRHlzSRDFuNkkQRHoaiXE44LxbTssk0zhpDdj7/H0ecsYflV//+5/+7fN853/kUf4ExFkkVJYpiElUhVbnUk8BDl6y/AZGMcbu2O41+lecrDFYhu38jgI4ZPPSQi2CHXdutRmM6uMnUrbHgAg8dPikiB15Tv3LGq3pWmdZ86OQcnok3UWxExwweOnxSRA4SCiuGtwRV1zLjrjwTNMdTKdExg4cOnxSRg4TyrLalQEbHIsPOCEu8EjN46PB9BIKBlcsG1oV07Tzj7G75G9AMHjp8UuQbdDARJKj7zXv2tGYT005uO7kL9+cZUMcMftCy//sMpHCMwy30Fncv+PJaLf60BiMLrvqRzRsrfy3/C1/hS9dDe2m32ZtaN8lyWo3Pupmdq1LdgqCqmQqg95mtvPXEIb8HP8MlnXPelGoDy20y+k/ttyPEF1AVUYW+iURGX7jutSUdc97kqlGmbjT4OZtLT6YEmTEUfL6XlLKWKU9y5RBTN4yFFwZgnl45ms2vHX86PncOhhUG6BOUFEh8fHzNpOfYsML/h0LxDlnLtXo5zlbFAAAAAElFTkSuQmCC"
	});
	menu(items);
};

//搜索所选文本
new function () {
	var items = [
		{label:"搜索所选文本",url:"https://www.google.de/search?hl=en-US&newwindow=1&nfpr=1&safe=off&ie=utf-8&oe=utf-8&q=%s",where : "tab",image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABUUlEQVR42pWTzUsCYRCH9y9zu3SooCCkjhIRRLeIykXokiWCJ7PvDpZRlz6si1lIQZ3SQxQdOhREpgSm0JeQvfu0+i6I7LKLh4F5h5nnnRl+o6jTdHn8omAYbVqhXqvYFXcEBKFDwcoZZB8B4LkEB9cwGGmFKHb01A1EU9JXzfdvDYZi1lwLwBcVAIwsNWPesIwls7gDtB2Z7N9ujVe+IX2LO2AgItB1OL9vJqsmILDrOoK02IkBAdYy4FsQJC5h+VQCHQDWTqYSgo8fuHuRxS4Ae3stQ7UGE5ttAHqCUgfxC7m4ryrowOyeO6CxqHwZxtYFqtYc5+kNan/gDTsAeueEIRj7n/rmRQMwueUAGF0VAAT3rQBTC0Y3DoDOGbm00icML4oWHYSTgo0MFqjlmPpDgqMcFCuQf4erBzjOwXjcriu9qHg0uutO2+es6fl67T9ptebvFRjBVgAAAABJRU5ErkJggg=="},
		{label:"谷歌站内搜索",url:"https://www.google.de/search?hl=en-US&newwindow=1&nfpr=1&safe=off&ie=utf-8&oe=utf-8&q=site:%HOST% %s",where : "tab",image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHDSURBVDhPpVJbKENhHJ887NmLcnmQZ+U6SZ7mEk+ur8qDXEpMLBSRJbRHlzSRDFuNkkQRHoaiXE44LxbTssk0zhpDdj7/H0ecsYflV//+5/+7fN853/kUf4ExFkkVJYpiElUhVbnUk8BDl6y/AZGMcbu2O41+lecrDFYhu38jgI4ZPPSQi2CHXdutRmM6uMnUrbHgAg8dPikiB15Tv3LGq3pWmdZ86OQcnok3UWxExwweOnxSRA4SCiuGtwRV1zLjrjwTNMdTKdExg4cOnxSRg4TyrLalQEbHIsPOCEu8EjN46PB9BIKBlcsG1oV07Tzj7G75G9AMHjp8UuQbdDARJKj7zXv2tGYT005uO7kL9+cZUMcMftCy//sMpHCMwy30Fncv+PJaLf60BiMLrvqRzRsrfy3/C1/hS9dDe2m32ZtaN8lyWo3Pupmdq1LdgqCqmQqg95mtvPXEIb8HP8MlnXPelGoDy20y+k/ttyPEF1AVUYW+iURGX7jutSUdc97kqlGmbjT4OZtLT6YEmTEUfL6XlLKWKU9y5RBTN4yFFwZgnl45ms2vHX86PncOhhUG6BOUFEh8fHzNpOfYsML/h0LxDlnLtXo5zlbFAAAAAElFTkSuQmCC"},
		{label:"翻译所选文本",url:"https://translate.google.cn/#auto/zh-CN/%s",where : "tab",image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABs0lEQVQ4jY2SP4viQBiHX0UQWz/AXb+VX8Iu/YqFhdhcd5BKEOTKC9jJFYrFgo3FIjYiCRauhTCQDMp4bJFklzCuLJLOWNj8rpDMJt7u7Q08xQzze953/hAR0el4QJLw8KR4fXkE/Wtch01zjP6gmxLsd9uPJafjAf1BF82WjmZLR61eRa1eVfNmS4cMxP8JksGk6FPB6XjAii1Qq1fBBYMMBL79+InvDIrbB0CzIpSmQHF0RnF0vkiTFxZX7A+6MOzwU0FxdEZKYJpj1fp1eO5KzF0JzYreF/iekzr77QMUhh2q1zDsUIULPQl6fXkEFww53cWKLWCaY3DBVMuaFWHuSsT7fM/5W5DTXYUMBGQgUJoCpelFst9tcc84DDuE7znQrAiFnrwIkuGY/W6rBIYdQgYC7RmHZkXwPQf3jL8JiCglISLKVCaqzfhZfc9RcMFwc/eMfGd9EWQbS+R0F9nGEtnGEpnKBJnKJFWxPNygPNygPePggqE942nBdTjG9xyUhxvVcqEnsWILrNjiTfCRJN9ZI99Zp8LxWsy73ztTmYCI6ObuGV/7Tym+/PqtICL6A7F/dNYyWabFAAAAAElFTkSuQmCC"},
		{},
		{label:"百度云搜索",url:"https://www.google.de/search?hl=en-US&newwindow=1&nfpr=1&safe=off&ie=utf-8&oe=utf-8&q=site:pan.baidu.com%20%s",where : "tab",image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAJuSURBVDhPrVNZaxNRGL0/U7JM0yQqCIIEV7CCti+CIm70Uakg+OCDiELNvlobmlQS27Sl2jbJzKRJZslMJmOa5Pjd65T2XQcud5nvnO989zuX/ZdPSqsI5boIJGUEEm2EC334vjRp1jCX6UBKKTQfi7U/3oIv3kSkqMODnxEEKZAH+CkglPX2RCpxcK5HexXz+b6YI6VzBJyZZ/atHkFKdzBPwfP5HoEVXM4quFlScGu9j3DyL3kgJQtyD04E2WOESVK4qAlgkMgkOrv9tYOS6uDAAdItGw+qOoEVQcDL8+CMnUrndQdIwYWEjBBlqxsT/NSGeN0wsLzr4MX3Lu6ukcIsDUrkwRnjkvnFSXQPd8oaPhw6KLQH2NFdLGxoeHfoYqNjo9z9jeUtU1x2lNR6cMb8pMCX6eJiRsGnXwYmADqWi2t5GfGmhVrPwf2KTvegYWnTQGxdh5Q/RxCjH0XKaM+AwciF5bh4uW3h7a6JPXOMqwUVn4+GopwDe4LWcIIndeOMoNpzMZ1OMJ1NacywZ4yxVNGgnQD3qiZW2yOkDk083NTw+IeFR3ULC6TIgzP2cV+HNhxhfHKCGREkZRevGiZ2beB6UcE2lfBs20ZKHqGs2Hi/PxAle3DGomkZKzsG8sdjJCjT05qO51sWlms9oWCloWOx0sebfQexooob33oIkaE8OGO+OPWdentlTUc03UYkR86jNl4qkusSZNuMCinREu3zkwtDBV3Y2oMzxk3BrcstK9GPObHukOdbYh0kq/PWccMJy9OavwcPTgrIQPxxcC/w+TSYvxFhaSLiVudZQ3TO3wN3rQf/l4+xP5yBeeudxxlpAAAAAElFTkSuQmCC"},
		// {label:"BookLink",keyword: 'bl', text:'%SEL%', where:'tab', image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFh0lEQVRYhb1XW0wTaRQ+aRqChhREJIYYH0zfmhBD9oEQHjaGF7Ntp8UuLJXWhkUWpEJFW7AbVxYRASWliIvQoiCl03JxZV3BWzItUC5VwAKF1G5FV9G4xiXGGGJMc/ahLXIZLlrXk5xM8mf++b7zncv/D8DGjAEAIXFxcWylUikjW1pOA0CYf/2rWKh7cICavlA7P5SdhfdVxzAjI0MBAMyvRWDzzNXOWYuAhxYBDymCi3bS6Nm0adNO+EoqhLo62mYCBCwCHg7lZuPRI0dOAUDIWhsjIyNZcrmcDwChwZANmepod1MEFxer8MBw5WV+fr5cLBYncTicneBLSQCEIZFI9kx23xhzlJZ4G2tr6yGIumG6/uhyLiZgEfDQKhLiYNaPOFKoxOn6unf2jnabUqnM5HA47Osmk26i4sx7KpAyRR7qamp0n0OCeUKtlk3V171ZTmC5UwQXh+Q56G66PN8nTkXLMsWcxta56OjohE8hEHrNbNaOqou864Gv58OHc7FAoWgGgF0bJcDsNBo1w/IcpIIAXlDAYHAzmcw9QFO0DAAIi4iIiNi2bVsYAGwGgBC1Wp0+duJnb9DABBcnNFXvExISVAAQRRc9c5yi7rhbDa897eaXj652PnV1tHsmf7vwNljZAwQG2sxPAOAbWunZbPYOl77h7ZJN/o3BggfcUVLsTUpKktISOHTokMiuOPzFwCiCizaZZOm6kI/66uouAGCtIKDVaAocp371rlZotgMSfNhwEWdMRpwxGbEvLWVNAtbvk/Fp17UVpOxXmp+u1gGhBEFIrSQ5cU95dIX0Y+oinL3ZgxYBDz3NTWjPy0VKwMPR4yocyspESsDD3pR96Cj+BfvSUnDop4Po1tWjRchHe5584TvTuob5LVu2JNKmAXwjdLtMJiuwk+RM76Io7xco0N2owyed7fhqcAAtQj669Q04WXEGn/15HS3JBM72dOOYuhAfm004WqTC8dIS/PvaVRxTFy18x6mp8iYmJkphjROUAQBMqVSabs//yNx5rtIXnTgVH9bX4Zi6EGdv3USK4OKjVgPeP1aArroLaBHy8VGrAZ3nKvFfhwNHVMeWKNmbKkLnpca5Oq22IioqKmY1JWDv3r3xD4pPLvT/YzOJo4VKfHDyBD6/fQt7U/bhP7Z+fFhfhxNlp9GeJ8dn3TdwxmTE4Zws9LQ0o026H5/fvY3jJcW4/ADrl6bjlJl8UVZaqqItypiYmChXc9PrwKb+9DQcPV6Ik+VlaN0n8K1JxGg7kI4UwUWK4OJgZgb2pooW3rcIeGgVJaNNJqFtZ4rgoqO0BIVCYTZtKixtbT1fcg7Q+XSjbn7r1q0C2jTIZDLBSJEq6DEciHaF87/Dm3qdCwBiaQmw2ewdf5HGN1+CQL9EjLfNZqdOq7lz5XwN1arV9rXX1g5nHTx4HgC206agy0Se75OIg5dayEe7iXwRGRkpAoAYAIj2g+7wP1e2ZFpaWqKzumo+6BoQ8tFhaJnbvXu3wg+2uO0YsEobbh7v6R60CPm0edxozvul+/GeiZyNjY3NA4CN35wzMzO/ndRUfVgCJuTjhKbqvZUkPeNnKz5YRcI1yVAEF++aza7w8HARTeTrWsi58vKKEXWhlyK4OHw4F6lWg9t/mYiLj49P1lZUkH2XL3mmmi69naqt+dC3/4cVBJqqq63gy/Nn3YBDz5aVnZ1qb5srUCiamUxmEny8yTDAd2PayWKx4jkcjshpaHm1fNoZa7Q28BXdZxkDAELCw8N3+YFDaCIJkGFUlperBzIzlhD4/eLFexCEAp9kLBYr0tnRNkMRXLT4i/WGrsEBn1J8QRqjSKXKnqws9zob9e+69Xqnf8isfuL9DxYmEAhkERERfPCN1+2wzj9jwP4Dbl10ubCceuUAAAAASUVORK5CYII="},
		// {label:"炫电影",url:"http://www.xuandy.com/index.php?s=%s&submit=%E7%AB%99%E5%86%85%E6%90%9C%E7%B4%A2",image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABzUlEQVQ4jX3Ty4uPYRQH8M+MSxq3yCUxiSYLpSTKNcoluWWBZiUL1Eixw0INyt5CYYWkDMolIYsfY4z3fc5JWRDJUvkzbN6ffmZwVk895/me7+U8NBVsCFqFzTqqxcSKtaP0DdLtXzXKwuRb4dhYgMKl4GvhyP8AZgelZg90TktmJjeSF0nP/wBGko2F9cmFFtPa9xUzalYXems2BceT8zqmzAleBweCx8lwzeqadcHh5HLwMKmCCN4kT1UsbwAWBB+CJ8Hp5GAyFNwObiU/gpPJior5SU+LiZLPwfaaJUFdWNM27y2zkknJ2STfsbiwtWbZb+rB8+ROYU3QSuZ0elPYmbyoWNsAVsnV3w2NxgPJ7uBJiymNpEnJ/uRt0F/obcdZs2lcCoVTwfUOZkuTT8HX5Gbyvjnv+FuKXU3OL5Mzw8xtGKyqWBTsa5jsQte4103Tq8LeYCS4396BxpvHwZZgW+HcO+b9AZAcDW4NMaHx5O4wcwsrk6dB/yh9QX/wPXhWsaitvTd41PGJupKeZvKX4GfwILlSOFE4lHwMrrX34GIyMFZbYWWzkQOj9A0xucPgfcm9EaYLTr9k6lhfBuluPs4404aYXLNkkO5fnNPM2ace42kAAAAASUVORK5CYII="},
		// {label:"YouTube",url:"https://www.youtube.com/results?search_query=%s",image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACPElEQVRYhe3Wz0tUURjG8Xc195xz77n3nmv2AyIoccToT2jlPxCEIC7aiLjIoBa1cCm0bBSxCZ1EDKQGBCMoFGsSHXVm0EUuxkJIEUajceEsxmBAeFokA2rmK4XTYh747M75nu0hqq66/2UZI++lAzuRDtRSOlBLGaM2MoGNf8KojXI3UONpI28eeDwVqPF0YOMspYwdJyKieU82LwQ2KmHek800a+x40tiohFljx2nGl5kZo1ARvsxQwsjcR6PANXP5PPvsSRJG5mjKl3vvjQJH4lINfmxtorj2Fdn7nUhc8Fn3jjPlyz2a9BW4EjfCKJVKZcVvW1jpeoQPVy6yG4fRO1+B7XoYxWLxgN3dXRQ2c1h++AATtT6/tY/e+ApsjfXY2dn5rUKhgO+fV5C608rv+Qo07iuwNdYjn8//0fb2Nr68HMXrGs1q0pgnwdZQh1wud6LkyDDGAofVpLgnwdZQh/X19WN9WphH5PYtdNkhvGI2adSTYAtfw+rq6hHLi4uItreh07MR0YLf8yTohSfBFr6KbDZbtjg3h6ftbbhbG+CxY2HkNK19NKxFadiV4Bg85yM1PY3k5ASetLagw7XRbVuIMe8foUWJYq7YeO5KcAy6Eh2Bh3YZQrcjEGPeO07MFWs0oEVywJXgip7i7Im0SFJUW0PPXIFKiGpriPod0dSvBSrCEU1ERNSnrUifFjhbVuTAvzDihFp6tPW2V4ulMkfke7XAX/nVKDd7tDURcUItZ/PVrq46xn4C/yowaRwJnAkAAAAASUVORK5CYII="},
		// {label:"搜库搜索",url:"http://www.soku.com/search_video/q_%s",image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABUUlEQVQ4jZ2RzY2EMAyFXQLHlYKIS6AESpgSKGFL8FbACaHkQgmUQAkcZp3rlBCJcGcPweFnZrWajRQplvM+28/gCbNAeli+cE2X9GMmvMF2ZsLbQvqx54veE2YAABCoaE7i7QbSYxK/yC+kpw2gx0PVeiasAyFJB6ky6ckTZjNhLZCZsP61QqCiAQA4fE4jLaSn+Adp6wKrhYpeEjsEqz8B4kGgovGEeOwogvcRYoyfpxGeNrCb6K/AVyZDXCOSmBlI+0B68ISltBwIq1QodkJpjR/dhLnhQRnXiEB1XCvrRtVyqcz3p7wlnxsecsNDDLp7lVu35tatIpY4N0zKulHeCSD57l6dACexZa9aLt8CXMUAAP8CKMtT1kzZ+wDDwxUiAGW5v3qmWi6fTbTcn4CGaYe6Mbfsc+tWZdwjrqzlUuZOa9wgyrgmdnGAbmLx6AeFqfCwQvMXAAAAAABJRU5ErkJggg=="},
		{},
		{label:"搜索相关图片",url:"https://www.google.de/search?hl=en-US&nfpr=1&safe=off&newwindow=1&site=imghp&tbm=isch&source=hp&q=%s",where : "tab", image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAH9SURBVDhPzVE7i5pREP1+gYWFIMKCIPgHfKyFoCkEwdbKQny/xbeCoCK4i6KfqCyCCGIlbGN+wgrCohAUY20TXEgXWEg7uWfwC0tIlSoDhzv3zpkzjyv9v2axWD4ZjUbv3d2dV6/X8wkYDAavzWbzqlQq9Y36d3t4eHgtlUqUTCYpk8kQ/EQiwVgsFiSE7pnocrme3G63bDKZZKEsW61W2Ww2yyLxLZfL0Wg0+sFEYcFg8HO326VarUYibwWeVC6XCUin01QoFPgURCoWi7TZbOh8Pv8Mh8PPgUDgWVQ+Hg4Hmk6n3Al4UiqVIuBWRPJ4PKtYLEar1Youlws9Pj6yWD6fp1arxaKn04mazSbF43GSIpEIAbd8yW63y9Vqle+z2ewNsWg0ytWQ0O/3OSbuX/AuifYIQEuohBHq9TqTRMVvSBLtswg4jUaDY8J/RadQYvVQKMQkPGazWXI6nZH5fP5dScQ7Cg2HQ/L5fHW/3/+VBZQRlKUo/nK5pOv1SpPJhLeOsTqdDm23W9rv91SpVLjg7xHw30oXEMK/r9dr2u1272gZNh6PX47HIw0GA+6IdwcHQKIygiKCzfd6vXeHwyGLf5dF7AU/ofBYoN1uE4C2P3aBIBYIIcSwF8ThA+DwN2q1WrtOp7tXq9UMjUbD+OgrAO/P+226fzVJ+gV+cHLx+IUV6AAAAABJRU5ErkJggg=="},
		{label:"搜索所选文本",url:"http://www.baidu.com/baidu?wd=%s",where : "tab",image:"http://www.baidu.com/favicon.ico"},
		// {label:"360网盘搜索",url:"https://www.google.de/search?q=site:yunpan.cn%20%s",image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAChklEQVQ4jZ3Q3UtTcRgH8N9fEupetOlQ3Jmbk0wIuojuCsIgqsvuCsR5tplFVrbedLo5l0o1kUSKQJxtOydfVphKYstWzKDUnDq3s/myt7PtfLuxESiCXnxuvs/D8zw8hBBC5C3e6sqGkaTGwApVTaM4iMbACJrrg5ny+98VhBBCSm7N1FQ1sjjRFz8UTSMLefNsNVFrHQmNPYajUGmHY6TSwED1fGdfZwZiuDwUR01fbN+6WucWiNrAgurd2uPRVBJZAQCAGC+gjonv6VHrGRCVgUFZdxRl3VFoXmziytAOTvdv4c3XCK7aPuJ82xgGphYR4wX0fEnipH0z16/Su0FUegaltijOvtoCl9hdCWA+sINz9j8oaVtC1cPPeO3xgfVHsZ0ScOntNkptUVTo3CAVegbyrgh+htNgfet4511Bgs8AAPiMAONkHCWWdYi0LogN4xicXoJ3LQV5V+T/ARz6JxdxyjgBkWEclbdH8MEfzF3TM5dAsZVDsZWDaXQZCT6LYisHJe0CUeoYyCxhtDq+4c57DrJODsdNq8inWTwe9iGz+8mxRR4vvUkk0ln8CGxC1smBanAJRKljUGQJ48KzOfAZAeyvFCaWeHjX0yhrmcVFsweh7WTumkgshVrrNIosYShoZ5ZQOjcKzSGIjQuoNXtg8yzDxP6GqnkMUtMqxEY/ZA0O3LDP4FrvJ0jqhiA2LqDQHIKSdqUJRbvS0o4QpB0hiB74kXdzCnlNM5C0BvAvl5jWUHB3HgX3fJC2B3O5gnamiFI7vCbp2MBRUPWOABE9CYoVtCsrbt/AYVC0K33MtCojhBCS9zRYRmlHQuW0M6ug3TiQ1pmh6h3B/NaVQkII+QtqncEVt0PFzwAAAABJRU5ErkJggg=="},
		{},
		// {label:"汉典查寻",url:"http://www.zdic.net/search?lb=1&q=%s", image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANrSURBVDhPTZNrTJNXHMb7ZR/3abdkY0vmIlumyy4CKqszBtHAihM0wBxDB1IRlMiGy9yi2wyKSmHlYvv2Sgd2OlEWDSNDcWFrjKKRFC/0QilYLa2lpoKiMpi/nb66bB/e9z3vyTm/8/z/z3MUBvctJE+U+gBoR2eQvFGM7hCSmG+fBLP/DgZ3BGVGFmVao/yvuzaGwROR1yiahu5gHxjkQlcjvb/b+al/gGbfJLrL11meX0hNzwU6gaT0DLK3fMGRGDIgvjkOURgGg0hDMSJNabBNgddejuHaTWyBu7y5IIW1lV+xvcXOK3MTeUe5lPSPC9l/uk9Woh8MofjBf5+T53sJSlnMfv00Y9Y8zAPDrK2oIvHtd1m5Xk1pnZ55C5LZ2XGaurNXxcb/lSC5RA/8UWyDIziPf8/Z3wy0XXJiHJ2kVHOQ/O07KTnQTFruJxyJzNIaFn16Il8uwTh0i8Zzt4XsCMZADO3wQ3SecSwjEzT2eUic/xbzklLYUq8nZUUmJfsasAp4XL4MaBsPUaW5T5ZqlpqOKIfCE5TVG1jxaTG72k+Qvm4D769aQ023g4RX58iAlsC9/wCSN4zJNY7qw0cUqB+ILs/wTfspFmeuEpvOkCq+SgHYprOhKirF7Is+LuFfF/RCumkkjPaPCLWdM2iu/EKD00nJ3iaqzIdZuFLFEgHYuKeeXce6MQ3H0LvCSOKRAfFXXI7ZL2p2O6joVXMo9DcH+318LgBvCCuVWTl8truWbztOIYm1+qtBzE9ACkmkTi/kWLyTFJxYzI5OI9W/XqLSZKe8wUTCa3NZtiafnK1VpKqyef29ZOYnL2JvlwOryIpCL2xs80NRVzbF3ZlU1LaxLDdfPrFo9wGeefY5MtYVonFcZv+fA9Sdc1Enxk39foy+2yjMngDlPWpSbQo0zjO0XJ/GFpyS47s0J4+N+xr50vozq8sqOToBxqF4E4Xl4s7IQbK4vaTZn+KjY3NEGTER6wjNzlGW5xXwgWiexR+jNfiAhSIDytW5wrEQrWPT8ukyoNX/iD0XD7PDUY1tZJrqkz1kb9rKJpHCH29OPbbMO45BxPf5F1/ihYSXKRaOaPvcYl64oHMFsfoe0uL7S1xrYed5F7Yb9zh6F5qv3JD9jt8+i0if7qKHzOLNJKUqUX9XI5RN8Q9zteNcnUu7SgAAAABJRU5ErkJggg=="},
		// {label:"Wiki-DE该词条",url:"https://de.wikipedia.org/wiki/%s",image:"http://bits.wikimedia.org/favicon/wikipedia.ico"},
		{label:"Wiki-EN该词条",url:"https://en.wikipedia.org/wiki/%s",where : "tab",image:"http://bits.wikimedia.org/favicon/wikipedia.ico"},
		{label:"Wiki-CN该词条",url:"https://zh.wikipedia.org/wiki/%s",where : "tab",image:"http://bits.wikimedia.org/favicon/wikipedia.ico"}
		];
	var menu = PageMenu({
		condition:"select",
		position: 10,
		image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHDSURBVDhPpVJbKENhHJ887NmLcnmQZ+U6SZ7mEk+ur8qDXEpMLBSRJbRHlzSRDFuNkkQRHoaiXE44LxbTssk0zhpDdj7/H0ecsYflV//+5/+7fN853/kUf4ExFkkVJYpiElUhVbnUk8BDl6y/AZGMcbu2O41+lecrDFYhu38jgI4ZPPSQi2CHXdutRmM6uMnUrbHgAg8dPikiB15Tv3LGq3pWmdZ86OQcnok3UWxExwweOnxSRA4SCiuGtwRV1zLjrjwTNMdTKdExg4cOnxSRg4TyrLalQEbHIsPOCEu8EjN46PB9BIKBlcsG1oV07Tzj7G75G9AMHjp8UuQbdDARJKj7zXv2tGYT005uO7kL9+cZUMcMftCy//sMpHCMwy30Fncv+PJaLf60BiMLrvqRzRsrfy3/C1/hS9dDe2m32ZtaN8lyWo3Pupmdq1LdgqCqmQqg95mtvPXEIb8HP8MlnXPelGoDy20y+k/ttyPEF1AVUYW+iURGX7jutSUdc97kqlGmbjT4OZtLT6YEmTEUfL6XlLKWKU9y5RBTN4yFFwZgnl45ms2vHX86PncOhhUG6BOUFEh8fHzNpOfYsML/h0LxDlnLtXo5zlbFAAAAAElFTkSuQmCC"
	});
	menu(items);
};

//撤销关闭二级菜单
new function () {
	var items = [
		{label: "恢复上一次会话",command: "Browser:RestoreLastSession"}
		];
	var menu = PageMenu({
		label: '撤销关闭',
		position: 2,
		tooltiptext: "右键显示所有历史记录",
		onclick: "if (event.button == 2) {PlacesCommandHook.showPlacesOrganizer('History');}",
		onpopupshowing: function(e) {
			var popup = e.target;
			popup.setAttribute('id', 'addUndoMneun');
			var items = popup.querySelectorAll('.bookmark-item');
			[].forEach.call(items, function(item) {
				item.parentNode.removeChild(item);
			});
			var undoItems = JSON.parse(Cc['@mozilla.org/browser/sessionstore;1'].getService(Ci.nsISessionStore).getClosedTabData(window));
			if (undoItems.length == 0) {
				popup.setAttribute('oncommand', 'this.parentNode._placesView._onCommand(event);');
				if (!this.parentNode._placesView) new HistoryMenu(event);
			} else {
				undoItems.map(function(item, id) {
					var m = document.createElement('menuitem');
					m.setAttribute('label', item.title);
					m.setAttribute('image', item.image ? 'moz-anno:favicon:' + item.image : '');
					m.setAttribute('class', 'menuitem-iconic bookmark-item closedtab');
					m.setAttribute('oncommand', 'undoCloseTab(' + id + ')');
					m.setAttribute('type', 'unclose-menuitem');
					popup.appendChild(m);
				});
			}
		},
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAABDklEQVQ4jZ3SPShFcRjH8Q8JN2IgI4pJorxkMJDNYlE27AZWG4vBJoOymewMshtsdzHIQilKUl7SDde9hnNuTqdzLuc+9UzP8/2e/uf3kFyNWMVwyrxqNWEddxjPCuewiQJeMJYFbsU2PlDGM0b/C7dhF58hXA5FR9jDBhbQh/o43IV9FCNwUhdxgx30RwWHKP0BxzuPiYpgCbcZBWWco7cimcV1bKGEJzziPUHwja3oU2ZwFVl4xTwGMYUVHMdkl/EfOokLvzGOxOY5LOI+3CnEBQTHk8eb9ENaw1fYiTWEU+mn3C2I9CFNAD3oTJm1CFI4qSaoVu04w3KtggEcoKMWuA5zmK71682CeBvgB+93YAIjVuYDAAAAAElFTkSuQmCC"
	});
	menu(items);
};

//隐藏相同项。必须，不能删除
function syncHidden(event) {
	Array.slice(event.target.children).forEach(function(elem){
		var command = elem.getAttribute('command');
		if (!command) return;
		var original = document.getElementById(command);
		if (!original) {
				elem.hidden = true;
				return;
		};
		elem.hidden = original.hidden;
		elem.collapsed = original.collapsed;
		elem.disabled = original.disabled;
	});
};
