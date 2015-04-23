// ==UserScript==
// @name			FeiRuoTabplus.uc.js
// @description		标签管理
// @author	        feiruo
// @charset       	UTF-8
// @include			main
// @id              [ACCDD25E]
// @inspect         window.FeiRuoTabplus
// @startup         window.FeiRuoTabplus.init();
// @shutdown        window.FeiRuoTabplus.onDestroy();
// @optionsURL		about:config?filter=FeiRuoTabplus.
// @config 			window.FeiRuoTabplus.openPref();
// @reviewURL		http://bbs.kafan.cn/thread-1822408-1-1.html
// @homepageURL		https://github.com/feiruo/userChromeJS/tree/master/FeiRuoTabplus
// @downloadURL		https://github.com/feiruo/userChromeJS/raw/master/FeiRuoTabplus/FeiRuoTabplus.uc.js
// @note            Begin 	2015-04-01
// @version      	0.4.3 	2015.04.23	15:00 	修复判断逻辑。
// @version      	0.4.2 	2015.04.23	11:00 	修复判断逻辑。
// @version      	0.4.1 	2015.04.23	00:00 	修复“域名相同”排除列表不生效问题。
// @version      	0.4 	2015.04.22	20:00 	去除一个无用项目。
// @version      	0.3 	2015.04.20	20:00 	更加自由的定制。
// @version      	0.2 	2015.04.18	20:00 	增加侧栏和“我的足迹”窗口新标签打开，修复某个选项不生效的问题。
// @version      	0.1 	2015.04.05	11:41 	Build。
// @note			标签
// @note			新标签、关闭、打开、鼠标悬停激活标签等。
// @note			自定义鼠标键盘操作组合。
// @note			自定义标签和标签栏事件。
// ==/UserScript==
(function() {
	if (window.FeiRuoTabplus) {
		window.FeiRuoTabplus.onDestroy();
		delete window.FeiRuoTabplus;
	}

	var FeiRuoTabplus = {
		Default_gURLBar: gURLBar.handleCommand.toString(),
		Default_whereToOpenLink: whereToOpenLink.toString(),
		Default_BookmarksEventHandler: BookmarksEventHandler.onClick.toString(),
		Default_checkForMiddleClick: checkForMiddleClick.toString(),
		Default_gBrowser: gBrowser.mTabProgressListener.toString(),
		Default_openNodeWithEvent: PlacesUIUtils.openNodeWithEvent.toString(),
		Default_BrowserGoHome: BrowserGoHome.toString(),

		get prefs() {
			delete this.prefs;
			return this.prefs = Services.prefs.getBranch("userChromeJS.FeiRuoTabplus.");
		},
		get file() {
			let aFile;
			aFile = Services.dirsvc.get("UChrm", Ci.nsILocalFile);
			aFile.appendRelativePath("local");
			aFile.appendRelativePath("_FeiRuoTabplus.js");
			try {
				this._modifiedTime = aFile.lastModifiedTime;
			} catch (e) {}
			delete this.file;
			return this.file = aFile;
		},
		get Content() {
			var Content, Contents;
			var windowMediator = Cc["@mozilla.org/appshell/window-mediator;1"]
				.getService(Ci.nsIWindowMediator);
			var topWindowOfType = windowMediator.getMostRecentWindow("navigator:browser");
			if (topWindowOfType)
				Contents = topWindowOfType.document.getElementById("content").currentURI;
			if (Contents) {
				Content = {
					url: Contents.asciiSpec,
					host: Contents.asciiHost
				}
			}
			return Content;
		},

		init: function() {
			var ins = $("devToolsSeparator");
			ins.parentNode.insertBefore($C("menuitem", {
				id: "FeiRuoTabplus_set",
				label: "FeiRuoTabplus配置",
				oncommand: "FeiRuoTabplus.openPref();",
				image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAxUlEQVQ4jaXSsW0CQRCF4U+OyC4hgqvARZAQUgUNEOEaXAIt4EZIXIJD3wEHLWAfgeckZPZgESM9aaSd949mdmCAJWq0Cf3iG29RexUz7HvMlzpgmgKsMsyd3lOArwcAG7xijCFexIy5gFOMW+MTc/HwgyaWdUtVmI/RuO4ADSYYobyjUdQ24dUGvUwtqCfK8PQCikTnIhdQYI1dzFhHvr6A3AV8/ANsHwE8PUJOXAGe+sbK31HkHFKnJjwVLCLJPedOFRZnf9aScov1PDsAAAAASUVORK5CYII=",
				class: "menuitem-iconic",
			}), ins);

			this.loadCustomCommand();
			this.loadSetting();
			this.prefs.addObserver('', this.PrefKey, false);
			location == "chrome://browser/content/browser.xul" && eval("gURLBar.handleCommand=" + this.handleCommand.toString());
			eval("PlacesUIUtils.openNodeWithEvent = " + this.Default_openNodeWithEvent.replace("window.whereToOpenLink", "FeiRuoTabplus.whereToOpenLink"));
			window.addEventListener("unload", function() {
				FeiRuoTabplus.onDestroy();
			}, false);
		},

		onDestroy: function() {
			this.prefs.removeObserver('', this.PrefKey, false);
			if ($("FeiRuoTabplus_set")) $("FeiRuoTabplus_set").parentNode.removeChild($("FeiRuoTabplus_set"));
			if (this.getWindow(0)) this.getWindow(0).close();
			if (this.getWindow(1)) this.getWindow(1).close();
			if (this.UCustom) this.CustomListen(false, this.UCustom);
			//this.Cutover("NewTabUrlbar");
			location == "chrome://browser/content/browser.xul" && eval("gURLBar.handleCommand=" + this.Default_gURLBar);
			eval("PlacesUIUtils.openNodeWithEvent = " + this.Default_openNodeWithEvent);
			this.AddListener(false, "NewTabNear", null, 'TabOpen', "tabContainer");
			this.AddListener(false, "ColseToNearTab", null, 'TabClose', "tabContainer");
			this.Cutover("TabFocus");
			this.Cutover("TabFocus_Time");
			this.Cutover("CloseDownloadBankTab");
			this.Cutover("KeepBookmarksOnMiddleClick");
			Services.obs.notifyObservers(null, "startupcache-invalidate", "");
		},

		loadCustomCommand: function(isAlert) {
			if (this.file && this.file.exists() && this.file.isFile())
				var data = this.loadFile(this.file);

			var sandbox = new Cu.Sandbox(new XPCNativeWrapper(window));
			sandbox.Components = Components;
			sandbox.Cc = Cc;
			sandbox.Ci = Ci;
			sandbox.Cr = Cr;
			sandbox.Cu = Cu;
			sandbox.Services = Services;
			sandbox.locale = Services.prefs.getCharPref("general.useragent.locale");

			if (data) {
				try {
					var lineFinder = new Error();
					Cu.evalInSandbox(data, sandbox, "1.8");
				} catch (e) {
					let line = e.lineNumber - lineFinder.lineNumber - 1;
					var ErrMsg = e + "\n请重新检查配置文件第 " + line + " 行！";
					if (isAlert) this.alert(ErrMsg);
					log(ErrMsg);
				}
			}
			delete this.CustomCommand;

			this.CustomCommand = sandbox.CustomCommand || {};

			if (this.UCustom) {
				this.CustomListen(false, this.UCustom);
				this.CustomListen(true, this.UCustom);
			}

			if (isAlert)
				this.alert("自定义命令重载完成");
		},

		PrefKey: function(subject, topic, data) {
			if (topic == 'nsPref:changed') {
				switch (data) {
					case 'Custom':
					case 'NewTabUrlbar':
					case 'NewTabNear':
					case 'ColseToNearTab':
					case 'TabFocus':
					case 'ShowBorderChange':
					case 'ShowBorder':
					case 'TabFocus_Time':
					case 'CloseDownloadBankTab':
					case 'KeepBookmarksOnMiddleClick':
					case 'SideBarNewTab':
					case 'HomeNewTab':
					case 'NewTabExcludePage':
					case 'NewTabExcludeUrl':
					case 'SideBarNewTab_SH':
					case 'NewTabUrlbar_SH':
					case 'SameHostEX':
					case 'NewTabExKey':
						FeiRuoTabplus.loadSetting(data);
						break;
				}
			}
		},

		loadSetting: function(type) {
			if (!type || type === "Custom") {
				var Custom = this.getPrefs(2, "Custom", "");
				if (this.Custom === Custom) return;
				if (this.UCustom)
					this.CustomListen(false, this.UCustom);
				if (Custom !== "")
					this.CustomListen(true, Custom);
				this.Custom = this.UCustom = Custom;
			}

			if (!type || type === "NewTabUrlbar")
				this.NewTabUrlbar = this.getPrefs(0, "NewTabUrlbar", false);

			if (!type || type === "NewTabUrlbar_SH")
				this.NewTabUrlbar_SH = this.getPrefs(0, "NewTabUrlbar_SH", false);

			if (!type || type === "ShowBorderChange")
				this.Cutover("ShowBorderChange", this.getPrefs(0, "ShowBorderChange", false));

			if (!type || type === "ShowBorder")
				this.ShowBorder = this.getPrefs(2, "ShowBorder", "0,7,7,7");

			if (!type || type === "NewTabExKey")
				this.NewTabExKey = this.getPrefs(2, "NewTabExKey", "");

			if (!type || type === "NewTabNear") {
				var NewTabNear = this.getPrefs(1, "NewTabNear", 0);
				var enable = false;
				if (NewTabNear != 0)
					enable = true;
				this.AddListener(enable, "NewTabNear", NewTabNear, 'TabOpen', "tabContainer");
			}

			if (!type || type === "ColseToNearTab") {
				var ColseToNearTab = this.getPrefs(1, "ColseToNearTab", 0);
				var enable = false;
				if (ColseToNearTab != 0)
					enable = true;
				this.AddListener(enable, "ColseToNearTab", ColseToNearTab, 'TabClose', "tabContainer");
			}

			if (!type || type === "TabFocus")
				this.Cutover("TabFocus", this.getPrefs(0, "TabFocus", false));

			if (!type || type === "NewTabExcludePage")
				this.PrefStrTrim("NewTabExcludePage", ", about:blank, about:home, about:newtab, http://start.firefoxchina.cn/");

			if (!type || type === "NewTabExcludeUrl")
				this.PrefStrTrim("NewTabExcludeUrl", "^(javascript:)");

			if (!type || type === "SameHostEX")
				this.PrefStrTrim("SameHostEX", "www.nicovideo.jp,www.bilibili.com,www.acfun.tv,www.tucao.cc");

			if (!type || type === "HomeNewTab")
				this.Cutover("HomeNewTab", this.getPrefs(0, "HomeNewTab", false));

			if (!type || type === "TabFocus_Time")
				this.TabFocus_Time = this.getPrefs(1, "TabFocus_Time", 250);

			if (!type || type === "SideBarNewTab")
				this.SideBarNewTab = this.getPrefs(0, "SideBarNewTab", false);

			if (!type || type === "SideBarNewTab_SH")
				this.SideBarNewTab_SH = this.getPrefs(0, "SideBarNewTab_SH", false);

			if (!type || type === "CloseDownloadBankTab")
				this.Cutover("CloseDownloadBankTab", this.getPrefs(0, "CloseDownloadBankTab", false));

			if (!type || type === "KeepBookmarksOnMiddleClick")
				this.Cutover("KeepBookmarksOnMiddleClick", this.getPrefs(0, "KeepBookmarksOnMiddleClick", false));
		},

		AddListener: function(enable, name, val, action, gbs) {
			gBrowser[gbs].removeEventListener(action, FeiRuoTabplus["SwitchListener_" + name], true);
			if (!enable) return;

			(function(name, val) {
				FeiRuoTabplus["SwitchListener_" + name] = function(e) {
					FeiRuoTabplus.SwitchListener(e, name, val);
				};
			})(name, val);

			try {
				gBrowser[gbs].addEventListener(action, FeiRuoTabplus["SwitchListener_" + name], true);
			} catch (e) {
				log(e)
			}
		},

		SwitchListener: function(e, name, val) {
			if (val === 0) return;
			try {
				if (!gBrowser) return;
			} catch (e) {
				return;
			}
			var tab = e.target;
			switch (name) {
				case "NewTabNear":
					if (val === 1)
						gBrowser.moveTabTo(tab, gBrowser.mCurrentTab._tPos - 1);
					if (val === 2)
						gBrowser.moveTabTo(tab, gBrowser.mCurrentTab._tPos + 1);
					break;
				case "ColseToNearTab":
					if (tab.linkedBrowser.contentDocument.URL == 'about:blank') return;
					if (tab._tPos <= gBrowser.mTabContainer.selectedIndex) {
						if (tab.previousSibling) {
							if (val === 1)
								gBrowser.mTabContainer.selectedIndex--;
							if (val === 2)
								gBrowser.mTabContainer.selectedIndex++;
						}
					}
					break;
			}
		},

		Cutover: function(name, val) {
			switch (name) {
				case "TabFocus":
					gBrowser.tabContainer.removeEventListener("mouseover", FeiRuoTabplus.TabFocus_onMouseOver, false);
					gBrowser.tabContainer.removeEventListener("mouseout", FeiRuoTabplus.TabFocus_onMouseOut, false);
					if (val || val === 0) {
						gBrowser.tabContainer.addEventListener("mouseover", FeiRuoTabplus.TabFocus_onMouseOver, false);
						gBrowser.tabContainer.addEventListener("mouseout", FeiRuoTabplus.TabFocus_onMouseOut, false);
					}
					break;
				case "CloseDownloadBankTab":
					location == eval("gBrowser.mTabProgressListener=" + this.Default_gBrowser);
					if (!val) return;
					eval("gBrowser.mTabProgressListener = " + this.Default_gBrowser.replace(/(?=var location)/, '\
							if (aWebProgress.DOMWindow.document.documentURI == "about:blank"\
							&& aRequest.QueryInterface(nsIChannel).URI.spec != "about:blank") {\
							aWebProgress.DOMWindow.setTimeout(function() {\
							!aWebProgress.isLoadingDocument && aWebProgress.DOMWindow.close();\
							}, 100);\
							}\
						'));
					break;
				case "KeepBookmarksOnMiddleClick":
					eval('BookmarksEventHandler.onClick =' + this.Default_BookmarksEventHandler);
					eval('checkForMiddleClick =' + this.Default_checkForMiddleClick);
					if (!val) return;
					eval('BookmarksEventHandler.onClick =' + this.Default_BookmarksEventHandler.replace('node.hidePopup()', ''));
					eval('checkForMiddleClick =' + this.Default_checkForMiddleClick.replace('closeMenus(event.target);', ''));
					break;
				case "ShowBorderChange":
					window.removeEventListener("resize", FeiRuoTabplus.NoShowBorder, false);
					window.removeEventListener("aftercustomization", FeiRuoTabplus.NoShowBorder, false);
					window.removeEventListener("customizationchange", FeiRuoTabplus.NoShowBorder, false);
					document.documentElement.setAttribute("chromemargin", "0,2,2,2");
					if (!val) return;
					window.addEventListener("resize", FeiRuoTabplus.NoShowBorder, false);
					window.addEventListener("aftercustomization", FeiRuoTabplus.NoShowBorder, false);
					window.addEventListener("customizationchange", FeiRuoTabplus.NoShowBorder, false);
					this.NoShowBorder();
					break;
				case "HomeNewTab":
					eval("BrowserGoHome = " + this.Default_BrowserGoHome);
					if (!val) return;
					eval("BrowserGoHome = " + this.Default_BrowserGoHome.replace(/switch \(where\) {/, "where = (!FeiRuoTabplus.IsBlankPage(gBrowser.currentURI.spec) || gBrowser.webProgress.isLoadingDocument" + ") ? 'tab' : 'current'; $&"));
					break;
			}
		},

		/*****************************************************************************************/
		CustomListen: function(enable, val) {
			val = val.split(",");
			for (var i in val) {
				var w = val[i].split("|");
				var isEnable = w[0],
					gbs = w[1],
					action = w[2],
					tag = w[3],
					btn = w[4],
					command = w[5],
					tkey = w[6] || null,
					keys = w[7] || null;

				if (action != "click" && action != "dblclick") {
					btn = action;
					action = "DOMMouseScroll";
				}

				try {
					gBrowser[gbs].removeEventListener(action, FeiRuoTabplus["Listener_" + i], false);
				} catch (e) {
					log(e)
				}

				if (!enable || !isEnable) continue;

				var CN;
				if (command.match("CCommand_")) {
					CN = command;
					CN = CN.substring(CN.indexOf("_"));
					CN = CN.substring(1, CN.length);
					command = "CCommand"
				}

				(function(i, tag, btn, command, tkey, keys, CN) {
					FeiRuoTabplus["Listener_" + i] = function(e) {
						FeiRuoTabplus.Listener(e, tag, btn, command, tkey, keys, CN);
					};
				})(i, tag, btn, command, tkey, keys, CN);

				try {
					gBrowser[gbs].addEventListener(action, FeiRuoTabplus["Listener_" + i], false);
				} catch (e) {
					log(e)
				}
			};
		},

		Listener: function(e, tag, btn, command, tkey, keys, CN) {
			if (btn == "MouseScrollUp") {
				if (tag === "Tab" && e.target.localName == "tab" && e.detail < 0)
					FeiRuoTabplus.Listen_AidtKey(e, command, tkey, keys, CN);
				if (tag === "TabBar" && e.target.localName != "tab" && e.detail < 0)
					FeiRuoTabplus.Listen_AidtKey(e, command, tkey, keys, CN);
			} else if (btn == "MouseScrollDown") {
				if (tag === "Tab" && e.target.localName == "tab" && e.detail > 0)
					FeiRuoTabplus.Listen_AidtKey(e, command, tkey, keys, CN);
				if (tag === "TabBar" && e.target.localName != "tab" && e.detail > 0)
					FeiRuoTabplus.Listen_AidtKey(e, command, tkey, keys, CN);
			} else {
				if (tag === "Tab" && e.target.localName == "tab" && e.button == btn)
					FeiRuoTabplus.Listen_AidtKey(e, command, tkey, keys, CN);
				if (tag === "TabBar" && e.target.localName != "tab" && e.button == btn)
					FeiRuoTabplus.Listen_AidtKey(e, command, tkey, keys, CN);
			}
		},

		Listen_AidtKey: function(e, command, tkey, keys, CN) {
			if (!keys) {
				FeiRuoTabplus.Listen_Command(e, command, CN);
				return;
			}

			function TKSwitch(key, func) {
				if (key == "Alt" && !e.altKey)
					func();
				if (key == "Ctrl" && !e.ctrlKey)
					func();
				if (key == "Shift" && !e.shiftKey)
					func();
			}

			function KSwitch(key, func) {
				if (key == "Alt" && e.altKey)
					func();
				if (key == "Ctrl" && e.ctrlKey)
					func();
				if (key == "Shift" && e.shiftKey)
					func();
			}

			function doact() {
				FeiRuoTabplus.Listen_Command(e, command, CN);
			}

			keys = keys.split("+");
			if (tkey) {
				if (keys.length == 1)
					TKSwitch(keys, doact);
				if (keys.length == 2)
					TKSwitch(keys[0], TKSwitch(keys[1], doact));
				if (keys.length == 3)
					TKSwitch(keys[0], TKSwitch(keys[1], TKSwitch(keys[2], doact)));
			} else {
				if (keys.length == 1)
					KSwitch(keys, doact);
				if (keys.length == 2)
					KSwitch(keys[0], KSwitch(keys[1], doact));
				if (keys.length == 3)
					KSwitch(keys[0], KSwitch(keys[1], KSwitch(keys[2], doact)));
			}
		},

		Listen_Command: function(e, command, CN) {
			e.stopPropagation();
			e.preventDefault();
			switch (command) {
				case 'AddTab':
					BrowserOpenTab();
					break;
				case 'CloseTargetTab':
					gBrowser.removeTab(e.target);
					break;
				case 'UndoCloseTab':
					$('History:UndoCloseTab').doCommand();
					break;
				case 'ReloadTarget':
					getBrowser().getBrowserForTab(e.target).reload();
					break;
				case 'PinTargetTab':
					var subTab = e.originalTarget;
					while (subTab.localName != "tab") {
						subTab = subTab.parentNode;
					}
					if (subTab.pinned) {
						gBrowser.unpinTab(subTab);
					} else {
						gBrowser.pinTab(subTab);
					}
					break;
				case 'LoadWithIE':
					try {
						var file = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProgF", Components.interfaces.nsILocalFile);
						file.append("Internet Explorer");
						file.append("iexplore.exe");
						var process = Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);
						process.init(file);
						process.run(false, [content.location.href], 1);
					} catch (ex) {
						alert("\u6253\u5f00IE\u5931\u8d25!")
					}
					break;
				case 'MouseScrollTabL':
					gBrowser.mTabContainer.advanceSelectedTab(-1, true);
					break;
				case 'MouseScrollTabR':
					gBrowser.mTabContainer.advanceSelectedTab(+1, true);
					break;
				case 'UnloadedToReload':
					if (e.target.hasAttribute("busy")) {
						$('cmd_close').doCommand();
					} else {
						getBrowser().getBrowserForTab(e.target).reload();
					}
					break;
				case 'CCommand':
					if (CN)
						FeiRuoTabplus.CustomCommand[CN].Command(e);
					break;
			}
		},

		/*****************************************************************************************/
		TabFocus_onMouseOver: function(event) {
			FeiRuoTabplus.tab_hover = setTimeout(function() {
				gBrowser.selectedTab = event.target;
			}, FeiRuoTabplus.TabFocus_Time);
		},

		TabFocus_onMouseOut: function() {
			clearTimeout(FeiRuoTabplus.tab_hover);
		},

		NoShowBorder: function(e) {
			setTimeout(function() {
				document.documentElement.setAttribute("chromemargin", FeiRuoTabplus.ShowBorder);
			}, 1);
		},

		/*****************************************************************************************/
		whereToOpenLink: function(e, ignoreButton, ignoreAlt) {
			if (!e)
				return "current";

			var shift = e.shiftKey;
			var ctrl = e.ctrlKey;
			var meta = e.metaKey;
			var alt = e.altKey && !ignoreAlt;
			var middle = !ignoreButton && e.button == 1;
			var middleUsesTabs = getBoolPref("browser.tabs.opentabfor.middleclick", true);
			if (ctrl || (middle && middleUsesTabs))
				return shift ? "tabshifted" : "tab";

			if (alt && getBoolPref("browser.altClickSave", false))
				return "save";

			if (shift || (middle && !middleUsesTabs))
				return "window";

			var Class = e.target ? e.target.getAttribute('class') : null;

			try {
				if (Class == '')
					Class = e.target.parentNode.getAttribute('class');
			} catch (e) {}

			if ((!this.IsExclude(0) || gBrowser.webProgress.isLoadingDocument ? true : false) && Class && (Class.indexOf('bookmark-item') >= 0 || Class.indexOf('placesTree') >= 0 || Class == 'subviewbutton' || Class == 'sidebar-placesTreechildren') && this.IsInNewTab(1, null, e))
				return 'tab';

			return "current";
		},

		IsSameHost: function(name, url, key, Exclude) {
			let IS = false;

			if (!this[name]) return IS;

			var host0, host1;
			host0 = this.getDomain(url);
			if (this.Content.host)
				host1 = this.Content.host;
			if (host0 == host1)
				IS = true;
			if (!IS)
				return IS;


			if (key) {
				if (!Exclude) IS = false;
				else IS = true;
			} else {
				if (!Exclude) IS = true;
				else IS = false;
			}
			return IS;
		},

		IsExclude: function(type, url) {
			var IsExclude = false,
				Exclude;

			if (type === 0)
				Exclude = this.NewTabExcludePage;
			else if (type === 1)
				Exclude = this.NewTabExcludeUrl;
			else if (type === 2)
				Exclude = this.SameHostEX;

			if (!url)
				url = this.Content.url;

			if (!Exclude)
				return false;

			for (var i in Exclude) {
				var rex = new RegExp(Exclude[i]);
				if (!rex.test(url)) continue;
				IsExclude = true;
				break;
			}

			return IsExclude;
		},

		IsInNewTab: function(type, Uri, e) {
			var IS = false;
			var Enable = this.NewTabUrlbar,
				name = "NewTabUrlbar_SH";

			if (type === 1) {
				Enable = this.SideBarNewTab;
				name = "SideBarNewTab_SH";
				Uri = this.getNode(e.target);
			}

			if (!Enable) return IS;

			let Page = this.IsExclude(0);
			let Url = this.IsExclude(1, Uri);
			let Exclude = this.IsExclude(2, Uri);
			let key = this.IsExcludeKey(e, type);
			let SameHost = this.IsSameHost(name, Uri, key, Exclude);
			if (type === 0) {
				if (Url || Page)
					IS = true;

				if (key)
					IS = false;

				if (SameHost)
					IS = true;
			}

			if ((type === 1) && !Url && !key && !SameHost)
				IS = true;

			return IS;
		},

		IsExcludeKey: function(e, nu) {
			let Is = false;
			let keys = this.NewTabExKey.split("|");
			if (!keys[0]) return Is;

			function KSwitch(key, func) {
				if (key == "Alt" && e.altKey)
					func();
				if (key == "Ctrl" && e.ctrlKey)
					func();
				if (key == "Shift" && e.shiftKey)
					func();
			}

			function doact() {
				Is = true;
			}

			keys = keys[nu].split("+");
			if (keys.length == 1)
				KSwitch(keys, doact);
			if (keys.length == 2)
				KSwitch(keys[0], KSwitch(keys[1], doact));
			if (keys.length == 3)
				KSwitch(keys[0], KSwitch(keys[1], KSwitch(keys[2], doact)));
			return Is;
		},

		handleCommand: function(aTriggeringEvent) {
			if (aTriggeringEvent instanceof MouseEvent && aTriggeringEvent.button == 2)
				return;

			var url = this.value;
			if ((url.indexOf('chromejs:') == 0) && FeiRuoTabplus.UrlbarChromeJs)
				return eval(url.slice(9));
			var mayInheritPrincipal = false;
			var postData = null;

			let action = this._parseActionUrl(this._value);
			let lastLocationChange = gBrowser.selectedBrowser.lastLocationChange;

			let matchLastLocationChange = true;
			if (action) {
				if (action.type == "switchtab") {
					url = action.params.url;
					if (this.hasAttribute("actiontype")) {
						this.handleRevert();
						let prevTab = gBrowser.selectedTab;
						if (switchToTabHavingURI(url) &&
							isTabEmpty(prevTab))
							gBrowser.removeTab(prevTab);
						return;
					}
				} else if (action.type == "keyword") {
					url = action.params.url;
				} else if (action.type == "searchengine") {
					let engine = Services.search.getEngineByName(action.params.engineName);
					let submission = engine.getSubmission(action.params.searchQuery);

					url = submission.uri.spec;
					postData = submission.postData;
				} else if (action.type == "visiturl") {
					url = action.params.url;
				}
				continueOperation.call(this);
			} else {
				this._canonizeURL(aTriggeringEvent, response => {
					[url, postData, mayInheritPrincipal] = response;
					if (url) {
						matchLastLocationChange = (lastLocationChange ==
							gBrowser.selectedBrowser.lastLocationChange);
						continueOperation.call(this);
					}
				});
			}

			function continueOperation() {
				this.value = url;
				gBrowser.userTypedValue = url;
				try {
					addToUrlbarHistory(url);
				} catch (ex) {
					Cu.reportError(ex);
				}

				let loadCurrent = () => {
					openUILinkIn(url, "current", {
						allowThirdPartyFixup: true,
						disallowInheritPrincipal: "0",
						allowPinnedTabHostChange: true,
						postData: postData
					});
					this.selectionStart = this.selectionEnd = 0;
				};
				gBrowser.selectedBrowser.focus();

				let isMouseEvent = aTriggeringEvent instanceof MouseEvent;
				let altEnter = !isMouseEvent && aTriggeringEvent &&
					aTriggeringEvent.altKey && !isTabEmpty(gBrowser.selectedTab);

				if (isMouseEvent || altEnter) {
					let where = "tab";
					if (isMouseEvent)
						where = whereToOpenLink(aTriggeringEvent, false, false);

					if (where == "current") {
						if (matchLastLocationChange) {
							if (isTabEmpty(gBrowser.selectedTab) || FeiRuoTabplus.IsInNewTab(0, url, aTriggeringEvent)) {
								loadCurrent();
							} else {
								this.handleRevert();
								gBrowser.loadOneTab(url, {
									postData: postData,
									inBackground: false,
									allowThirdPartyFixup: true
								});
							}
						}
					} else {
						this.handleRevert();
						let params = {
							allowThirdPartyFixup: true,
							postData: postData,
							initiatingDoc: document
						};
						openUILinkIn(url, where, params);
					}
				} else {
					if (matchLastLocationChange) {
						if (isTabEmpty(gBrowser.selectedTab) || FeiRuoTabplus.IsInNewTab(0, url, aTriggeringEvent)) {
							loadCurrent();
						} else {
							this.handleRevert();
							gBrowser.loadOneTab(url, {
								postData: postData,
								inBackground: false,
								allowThirdPartyFixup: true
							});
						}
					}
				}
			}
		},

		/*****************************************************************************************/
		getPrefs: function(type, name, val) {
			switch (type) {
				case 0:
					if (!this.prefs.prefHasUserValue(name) || this.prefs.getPrefType(name) != Ci.nsIPrefBranch.PREF_BOOL)
						this.prefs.setBoolPref(name, val ? val : false);
					return this.prefs.getBoolPref(name);
					break;
				case 1:
					if (!this.prefs.prefHasUserValue(name) || this.prefs.getPrefType(name) != Ci.nsIPrefBranch.PREF_INT)
						this.prefs.setIntPref(name, val ? val : 0);
					return this.prefs.getIntPref(name);
					break;
				case 2:
					if (!this.prefs.prefHasUserValue(name) || this.prefs.getPrefType(name) != Ci.nsIPrefBranch.PREF_STRING)
						this.prefs.setCharPref(name, val ? val : "");
					return this.prefs.getCharPref(name);
					break;
			}
		},

		PrefStrTrim: function(name, str, set) {
			var val;
			if (!set)
				val = this.getPrefs(2, name, str);
			else
				val = str;
			val = val.trim();
			if (val.indexOf(',') != -1)
				val = val.replace(/,\s*/g, '\n');
			this.prefs.setCharPref(name, val);
			if (set) return;
			val = val.split(/\n+/).map(function(s) s.trim());
			this[name] = val;
		},

		getWindow: function(num) {
			var windowsMediator = Components.classes["@mozilla.org/appshell/window-mediator;1"]
				.getService(Components.interfaces.nsIWindowMediator);
			if (num === 0)
				return windowsMediator.getMostRecentWindow("FeiRuoTabplus:Preferences");
			if (num === 1)
				return windowsMediator.getMostRecentWindow("FeiRuoTabplus:DetailWindow");
		},

		getNode: function(target) {
			if (!target) return false;
			var node;
			if (target._placesNode)
				node = target._placesNode;
			if (!node && (target.parentNode.id == 'placeContent' || target.parentNode.id == 'bookmarks-view') && target.parentNode.selectedNode)
				node = target.parentNode.selectedNode;
			return node.uri;
		},

		getDomain: function(url) {
			if (/^(https?|ftps?:\/\/)/.test(url))
				url = url.replace(/^(https?|ftps?):\/\//, '')
			var durl = /([^\/]+)\//i;
			domain = (url + '/').match(durl);
			if (domain)
				return domain[1];
		},

		updateFile: function(isAlert) {
			if (!this.file || !this.file.exists() || !this.file.isFile()) return;

			if (this._modifiedTime != this.file.lastModifiedTime) {
				this._modifiedTime = this.file.lastModifiedTime;
				setTimeout(function() {
					FeiRuoTabplus.loadCustomCommand(true);
				}, 10);
			}
		},

		editFile: function(file) {
			var aFile;
			if (file) {
				aFile = Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIDirectoryService).QueryInterface(Ci.nsIProperties).get('UChrm', Ci.nsILocalFile);
				aFile.appendRelativePath(file);
			} else aFile = this.file;
			if (!aFile) return this.alert("配置文件不存在！");
			if (!aFile.exists() || !aFile.isFile()) return;
			var editor;
			try {
				editor = Services.prefs.getComplexValue("view_source.editor.path", Ci.nsILocalFile);
			} catch (e) {
				this.alert("请设置编辑器的路径。\nview_source.editor.path");
				toOpenWindowByType('pref:pref', 'about:config?filter=view_source.editor.path');
				return;
			}
			var UI = Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Ci.nsIScriptableUnicodeConverter);
			UI.charset = window.navigator.platform.toLowerCase().indexOf("win") >= 0 ? "gbk" : "UTF-8";
			var process = Cc['@mozilla.org/process/util;1'].createInstance(Ci.nsIProcess);

			try {
				var path = UI.ConvertFromUnicode(aFile.path);
				var args = [path];
				process.init(editor);
				process.run(false, args, args.length);
			} catch (e) {
				this.alert("编辑器不正确！")
			}
		},

		loadFile: function(aFile) {
			var fstream = Cc["@mozilla.org/network/file-input-stream;1"].createInstance(Ci.nsIFileInputStream);
			var sstream = Cc["@mozilla.org/scriptableinputstream;1"].createInstance(Ci.nsIScriptableInputStream);
			fstream.init(aFile, -1, 0, 0);
			sstream.init(fstream);
			var data = sstream.read(sstream.available());
			try {
				data = decodeURIComponent(escape(data));
			} catch (e) {}
			sstream.close();
			fstream.close();
			return data;
		},

		alert: function(aString, aTitle) {
			Cc['@mozilla.org/alerts-service;1'].getService(Ci.nsIAlertsService)
				.showAlertNotification("", aTitle || "FeiRuoTabplus", aString, false, "", null);
		},

		openPref: function() {
			if (this.getWindow(0))
				this.getWindow(0).focus();
			else {
				var option = this.option();
				window.openDialog("data:application/vnd.mozilla.xul+xml;charset=UTF-8," + option, '', 'chrome,titlebar,toolbar,centerscreen,dialog=no');
			}
		},
	};

	FeiRuoTabplus.option = function() {
		var xul = '<?xml version="1.0"?><?xml-stylesheet href="chrome://global/skin/" type="text/css"?>\
					<prefwindow xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul"\
					id="FeiRuoTabplus_Settings"\
					ignorekeys="true"\
					title="FeiRuoTabplus 设置"\
					onload="opener.FeiRuoTabplus.OptionScript.init();"\
					onunload="opener.FeiRuoTabplus.updateFile(true);"\
					buttons="accept,cancel,extra1,extra2"\
					ondialogextra1="opener.FeiRuoTabplus.OptionScript.Resets();"\
					ondialogextra2="opener.FeiRuoTabplus.editFile();"\
					ondialogaccept="opener.FeiRuoTabplus.OptionScript.Save();"\
					windowtype="FeiRuoTabplus:Preferences">\
					<prefpane id="main" flex="1">\
						<preferences>\
							<preference id="NewTabUrlbar_SH" type="bool" name="userChromeJS.FeiRuoTabplus.NewTabUrlbar_SH"/>\
							<preference id="SideBarNewTab_SH" type="bool" name="userChromeJS.FeiRuoTabplus.SideBarNewTab_SH"/>\
							<preference id="SameHostEX" type="string" name="userChromeJS.FeiRuoTabplus.SameHostEX"/>\
							<preference id="NewTabExcludePage" type="string" name="userChromeJS.FeiRuoTabplus.NewTabExcludePage"/>\
							<preference id="NewTabExcludeUrl" type="string" name="userChromeJS.FeiRuoTabplus.NewTabExcludeUrl"/>\
							<preference id="HomeNewTab" type="bool" name="userChromeJS.FeiRuoTabplus.HomeNewTab"/>\
							<preference id="SideBarNewTab" type="bool" name="userChromeJS.FeiRuoTabplus.SideBarNewTab"/>\
							<preference id="NewTabUrlbar" type="bool" name="userChromeJS.FeiRuoTabplus.NewTabUrlbar"/>\
							<preference id="NewTabNear" type="int" name="userChromeJS.FeiRuoTabplus.NewTabNear"/>\
							<preference id="ColseToNearTab" type="int" name="userChromeJS.FeiRuoTabplus.ColseToNearTab"/>\
							<preference id="Custom" type="string" name="userChromeJS.FeiRuoTabplus.Custom"/>\
							<preference id="ShowBorderChange" type="bool" name="userChromeJS.FeiRuoTabplus.ShowBorderChange"/>\
							<preference id="ShowBorder" type="string" name="userChromeJS.FeiRuoTabplus.ShowBorder"/>\
							<preference id="TabFocus" type="bool" name="userChromeJS.FeiRuoTabplus.TabFocus"/>\
							<preference id="TabFocus_Time" type="int" name="userChromeJS.FeiRuoTabplus.TabFocus_Time"/>\
							<preference id="CloseDownloadBankTab" type="bool" name="userChromeJS.FeiRuoTabplus.CloseDownloadBankTab"/>\
							<preference id="KeepBookmarksOnMiddleClick" type="bool" name="userChromeJS.FeiRuoTabplus.KeepBookmarksOnMiddleClick"/>\
							<preference id="loadBookmarksInBackground" name="browser.tabs.loadBookmarksInBackground" type="bool"/>\
							<preference id="open_newwindow" name="browser.link.open_newwindow" type="int"/>\
							<preference id="open_newwindow.restriction" name="browser.link.open_newwindow.restriction" type="int"/>\
							<preference id="searchloadInBackground" name="browser.search.context.loadInBackgroundn" type="bool"/>\
							<preference id="tabsloadInBackground" name="browser.tabs.loadInBackground" type="bool"/>\
						</preferences>\
						<script>\
							function Change() {\
								opener.FeiRuoTabplus.OptionScript.changeStatus();\
							}\
						</script>\
						<tabbox class="text">\
							<tabs>\
								<tab label="新建标签"/>\
								<tab label="打开和关闭/其他功能"/>\
								<tab label="标签/标签栏 事件"/>\
							</tabs>\
							<tabpanels flex="1">\
								<tabpanel orient="vertical" flex="1">\
									<groupbox>\
										<caption label="在新标签中打开(默认【Alt+回车】为新标签打开)"/>\
											<row align="center">\
												<checkbox id="HomeNewTab" label="主页" preference="HomeNewTab"/>\
											</row>\
											<row align="center">\
												<checkbox id="NewTabUrlbarr" label="地址栏" preference="NewTabUrlbar" oncommand="Change();"/>\
											</row>\
											<row align="center" class="indent">\
												<checkbox id="NewTabUrlbar_SH" label="域名相同当前页" preference="NewTabUrlbar_SH" tooltiptext="URL与当前页的域名相同时,则使用当前标签打开!"/>\
												<label class="indent" value="排除键：" tooltiptext="对同一行前2个选项都生效。"/>\
												<checkbox id="CtrlKey0" label="Ctrl" tooltiptext="对同一行前2个选项都生效。"/>\
												<checkbox id="AltKey0" label="Alt" tooltiptext="对同一行前2个选项都生效。"/>\
												<checkbox id="ShiftKey0" label="Shift" tooltiptext="对同一行前2个选项都生效。"/>\
											</row>\
											<row align="center">\
												<checkbox id="SideBarNewTabr" label="侧栏、书签、书签工具栏、【我的足迹】窗口" preference="SideBarNewTab" oncommand="Change();"/>\
											</row>\
											<row align="center" class="indent">\
												<checkbox id="SideBarNewTab_SH" label="域名相同当前页" preference="SideBarNewTab_SH" tooltiptext="URL与当前页的域名相同时,则使用当前标签打开!"/>\
												<label class="indent" value="排除键：" tooltiptext="对同一行前2个选项都生效。"/>\
												<checkbox id="CtrlKey1" label="Ctrl" tooltiptext="对同一行前2个选项都生效。"/>\
												<checkbox id="AltKey1" label="Alt" tooltiptext="对同一行前2个选项都生效。"/>\
												<checkbox id="ShiftKey1" label="Shift" tooltiptext="对同一行前2个选项都生效。"/>\
											</row>\
									</groupbox>\
									<hbox>\
										<groupbox>\
											<caption label="以下【页面】重用标签，支持正则"/>\
												<vbox flex="1" style="height:80px;">\
													<textbox flex="1" preference="NewTabExcludePage" tooltiptext="一行一个" multiline="true" cols="35"/>\
												</vbox>\
										</groupbox>\
										<groupbox>\
											<caption label="以下【URL】在当前标签打开，支持正则"/>\
												<vbox flex="1">\
													<textbox flex="1" preference="NewTabExcludeUrl" tooltiptext="一行一个" multiline="true" cols="35"/>\
												</vbox>\
										</groupbox>\
									</hbox>\
									<groupbox>\
											<caption label="以下【域名相同】在新标签打开，支持正则"/>\
												<vbox flex="1" style="height:80px;">\
													<textbox flex="1" id="SameHostEX" preference="SameHostEX" tooltiptext="一行一个" multiline="true" cols="70"/>\
												</vbox>\
										</groupbox>\
								</tabpanel>\
								<tabpanel orient="vertical" flex="1">\
									<groupbox>\
										<caption label="打开和关闭"/>\
											<grid>\
												<rows>\
													<row align="center">\
														<checkbox id="loadBookmarksInBackground" label="后台打开书签" preference="loadBookmarksInBackground"/>\
														<checkbox id="tabsloadInBackground" label="后台打开标签" preference="tabsloadInBackground"/>\
														<checkbox id="searchloadInBackground" label="后台打开搜索" preference="searchloadInBackground"/>\
													</row>\
													<row align="center">\
														<label value="新建标签在："/>\
														<menulist preference="NewTabNear" id="NewTabNear" style="width:100px">\
															<menupopup>\
																<menuitem label="不做任何修改" value="0"/>\
																<menuitem label="当前标签左边" value="1"/>\
																<menuitem label="当前标签右边" value="2"/>\
															</menupopup>\
														</menulist>\
													</row>\
													<row align="center">\
														<label value="关闭标签后转到："/>\
														<menulist preference="ColseToNearTab" id="ColseToNearTab" style="width:100px">\
															<menupopup>\
																<menuitem label="不做任何修改" value="0"/>\
																<menuitem label="当前标签左边" value="1"/>\
																<menuitem label="当前标签右边" value="2"/>\
															</menupopup>\
														</menulist>\
													</row>\
													<row align="center">\
														<label value="新窗口打开到："/>\
														<menulist preference="open_newwindow" style="width:100px">\
															<menupopup>\
																<menuitem label="当前标签页" value="1"/>\
																<menuitem label="新窗口" value="2"/>\
																<menuitem label="新标签页" value="3"/>\
															</menupopup>\
														</menulist>\
														<menulist preference="open_newwindow.restriction" style="width:120px">\
															<menupopup>\
																<menuitem label="没有例外" value="0"/>\
																<menuitem label="全部在新窗口" value="1"/>\
																<menuitem label="弹出窗口除外" value="2"/>\
															</menupopup>\
														</menulist>\
													</row>\
												</rows>\
											</grid>\
									</groupbox>\
									<groupbox>\
										<caption label="其他功能" />\
											<checkbox id="TabFocusr" label="自动聚焦" preference="TabFocus" oncommand="Change();"/>\
											<row class="indent">\
												<label value="聚焦延时："/>\
												<textbox id="TabFocus_Time" type="number" preference="TabFocus_Time" style="width:125px" tooltiptext="单位：毫秒！"/>\
											</row>\
											<checkbox id="CloseDownloadBankTab" label="关闭下载空白页(E10S可能不支持)" preference="CloseDownloadBankTab" />\
											<checkbox id="KeepBookmarksOnMiddleClick" label="鼠标中键点击时bookmark菜单不关闭" preference="KeepBookmarksOnMiddleClick" />\
											<checkbox id="ShowBorderChanges" label="窗口边框调整(去边框)" preference="ShowBorderChange" oncommand="Change();"/>\
											<row class="indent">\
												<label value="边框像素："/>\
												<textbox id="ShowBorder" preference="ShowBorder" style="width:125px" tooltiptext="顺序依次为【上，左，下，右】"/>\
											</row>\
									</groupbox>\
								</tabpanel>\
								<tabpanel orient="vertical" flex="1" style="width:500px">\
									<vbox>\
										<hbox id="listarea" flex="1">\
											<tree id="ruleTree" seltype="single" flex="1" enableColumnDrag="true" class="tree" rows="18"\
												onclick="opener.FeiRuoTabplus.OptionScript.onTreeclick(event);"\
												ondblclick="opener.FeiRuoTabplus.OptionScript.onTreedblclick(event);">\
												<treecols>\
													<treecol id="Command-col2" label="行为命令" flex="10" persist="width hidden ordinal" primary="true"/>\
													<splitter class="tree-splitter"/>\
													<treecol id="gBrowser-col2" label="gBrowser" flex="1" persist="width hidden ordinal" hidden="true"/>\
													<splitter class="tree-splitter"/>\
													<treecol id="action-col2" label="监听事件" flex="1" persist="width hidden ordinal"/>\
													<splitter class="tree-splitter"/>\
													<treecol id="tag-col2" label="事件对象" flex="1" persist="width hidden ordinal"/>\
													<splitter class="tree-splitter"/>\
													<treecol id="btn-col2" label="鼠标按钮" flex="1" persist="width hidden ordinal" hidden="true"/>\
													<splitter class="tree-splitter"/>\
													<treecol id="keys-col2" label="键盘按键" flex="5" persist="width hidden ordinal"/>\
													<splitter class="tree-splitter"/>\
													<treecol id="tkey-col2" label="按键排除" flex="1" persist="width hidden ordinal"/>\
													<splitter class="tree-splitter"/>\
													<treecol id="enable-col2" label="启用" flex="1" type="checkbox" persist="width hidden ordinal"/>\
												</treecols>\
												<treechildren id="customList"\
													ondragstart="opener.FeiRuoTabplus.OptionScript.onDragstart(event);"\
													ondragover="opener.FeiRuoTabplus.OptionScript.onDragover(event);"\
													ondrop="opener.FeiRuoTabplus.OptionScript.onDrop(event);">\
												</treechildren>\
											</tree>\
										</hbox>\
										<hbox>\
											<spacer flex="1"/>\
											<button label="添加" id="newButton" oncommand="opener.FeiRuoTabplus.OptionScript.onNewButtonClick();"/>\
											<button label="修改" id="editButton" oncommand="opener.FeiRuoTabplus.OptionScript.onEditButtonClick();"/>\
											<button label="移除" id="deleteButton" oncommand="opener.FeiRuoTabplus.OptionScript.onDeleteButtonClick()"/>\
										</hbox>\
									</vbox>\
								</tabpanel>\
							</tabpanels>\
						</tabbox>\
						<hbox flex="1">\
							<button dlgtype="extra1" label="还原默认值"/>\
							<button dlgtype="extra2" label="自定义命令"/>\
							<spacer flex="1" />\
							<button label="应用" oncommand="opener.FeiRuoTabplus.OptionScript.Save();"/>\
							<button dlgtype="accept"/>\
							<button dlgtype="cancel"/>\
						</hbox>\
					</prefpane>\
					</prefwindow>\
          			';
		return encodeURIComponent(xul);
	};

	FeiRuoTabplus.OptionScript = {
		Rules: [],
		ruleOption: [{
			name: 'enabled',
			default: '1'
		}, {
			name: 'gBrowser',
			default: ''
		}, {
			name: 'action',
			default: ''
		}, {
			name: 'tag',
			default: ''
		}, {
			name: 'btn',
			default: ''
		}, {
			name: 'command',
			default: ''
		}, {
			name: 'tkey',
			default: ''
		}, {
			name: 'keys',
			default: ''
		}, ],
		ActionToString: {
			"click": "单击",
			"dblclick": "双击",
			"MouseScrollUp": "上滚轮",
			"MouseScrollDown": "下滚轮"
		},
		Commands: {
			"CloseTargetTab": "关闭当前标签",
			"AddTab": "新建标签",
			"UndoCloseTab": "撤销关闭",
			"ReloadTarget": "刷新当前标签",
			"ReloadSkipCache": "强制刷新当前标签",
			"PinTargetTab": "锁定标签",
			"UnloadedToReload": "刷新未载入的标签",
			"LoadWithIE": "用IE打开当前页",
			"MouseScrollTabL": "滚动切换标签(向左)",
			"MouseScrollTabR": "滚动切换标签(向右)"
		},

		init: function(isAlert) {
			if (!window.Services) Components.utils.import("resource://gre/modules/XPCOMUtils.jsm");
			this.KeyClicked();

			with(_$("customList")) {
				while (hasChildNodes()) {
					removeChild(lastChild);
				}
			}


			var checkboximg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAaCAYAAABsONZfAAABD0lEQVQ4je2TMa5FQBSGrUIURiURhVJH3BXYgg1IprYGHa1FCGtheslf0UgkFMZ51ZUn3rvkJvdVr/iLKb4z55z5Ronj+ME5p7uJ4/ihcM5pmiYQ0a9ZlgVEhGmawDknhXNOr4BxHBFFEYQQIKJraBgG+L4PxhjSNIWU8git6woiwrZteJ7DMISqqsiybC90gNq2RV3XO1gUBRhjSJJkL3SCgiCAYRioqgp938OyLLiui3meDy0foKZp4DgOGGPwPA+6rqMsy9Ocp0U0TQPbtqFpGhhj+5wvISKCEAKmaSLPc0gp70FSSggh0HXdj8+wQ1dGPLMb8ZZ7HxP21N6VsLe29w+9C33/bJ+56U+E/QKpA0b/pEOBQAAAAABJRU5ErkJggg==";

			var cssStr = ('\
					treechildren::-moz-tree-checkbox(unchecked){\
						list-style-image: url(' + checkboximg + ');\
						-moz-image-region: rect(13px 13px 26px 0px);\
					}\
					treechildren::-moz-tree-checkbox(checked){\
						list-style-image: url(' + checkboximg + ');\
						-moz-image-region: rect(0px 13px 13px 0px);\
					}\
					');

			var doc = FeiRuoTabplus.getWindow(0).document;

			var style = doc.createProcessingInstruction('xml-stylesheet', 'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(cssStr) + '"');
			doc.insertBefore(style, doc.documentElement);

			this.changeStatus();
			if (!FeiRuoTabplus.Custom) return;
			var Custom = FeiRuoTabplus.Custom.split(",");
			if (Custom && !isAlert) {
				for (var i in Custom) {
					this.createTreeitem("customList", this.str2Obj(Custom[i]));
				}
			}
			this.changeStatus();
		},

		str2Obj: function(str) {
			var tempArr = str.split("|");
			var ret = {};
			var i = 0;
			var tempStr = '';
			for (var k = 0; k < this.ruleOption.length; k++) {
				var o = this.ruleOption[k];
				if (i < tempArr.length) {
					tempStr = tempArr[i];
					i = i + 1;
				} else {
					tempStr = o.default;
				}
				ret[o.name] = tempStr;
			}
			return ret;
		},

		createTreeitem: function(listName, params) {
			var treecell1 = _$C("treecell");
			var treecell2 = _$C("treecell");
			var treecell3 = _$C("treecell");
			var treecell4 = _$C("treecell");
			var treecell5 = _$C("treecell");
			var treecell6 = _$C("treecell");
			var treecell7 = _$C("treecell");
			var treecell8 = _$C("treecell");
			var treerow = _$C("treerow");
			treerow.appendChild(treecell1);
			treerow.appendChild(treecell2);
			treerow.appendChild(treecell3);
			treerow.appendChild(treecell4);
			treerow.appendChild(treecell5);
			treerow.appendChild(treecell6);
			treerow.appendChild(treecell7);
			treerow.appendChild(treecell8);
			var treeitem = _$C("treeitem");
			treeitem.setAttribute("container", "false");
			treeitem.appendChild(treerow);
			this.setTreeitem(treeitem, params);
			_$(listName).appendChild(treeitem);
		},

		setTreeitem: function(treeitem, params) {
			var that = FeiRuoTabplus;
			with(treeitem.firstChild) {
				var name = this.Commands[params["command"]];
				if (!name) {
					var word = params["command"];
					word = word.substring(word.indexOf("_"));
					word = word.substring(1, word.length);
					var CCommand = that.CustomCommand[word];
					if (CCommand)
						name = that.CustomCommand[word].label;
				}
				childNodes[0].setAttribute("label", name);
				childNodes[0].setAttribute("command", params["command"]);
				childNodes[1].setAttribute("label", params["gBrowser"]);
				childNodes[1].setAttribute("gBrowser", params["gBrowser"]);
				childNodes[2].setAttribute("label", this.ActionToString[params["action"]]);
				childNodes[2].setAttribute("action", params["action"]);
				childNodes[3].setAttribute("label", params["tag"] == "Tab" ? "标签" : "标签栏");
				childNodes[3].setAttribute("tag", params["tag"]);
				childNodes[4].setAttribute("label", params["btn"] == "0" ? "左键" : (params["btn"] == "1" ? "中键" : "右键"));
				childNodes[4].setAttribute("btn", params["btn"]);
				childNodes[5].setAttribute("label", params["keys"]);
				childNodes[5].setAttribute("keys", params["keys"]);
				childNodes[6].setAttribute("label", params["tkey"] == "1" ? "排除" : !params["keys"] ? "" : "辅助");
				childNodes[6].setAttribute("tkey", params["tkey"]);
				this.setCheckbox(treeitem, params["enabled"]);
			}
		},

		setCheckbox: function(treeitem, checked) {
			var checkboxCell = treeitem.firstChild.childNodes[7];
			var currentValue = checkboxCell.getAttribute("value");
			var newValue = "";
			if (checked == "reverse") {
				if (currentValue == null || currentValue == "0") {
					newValue = "1";
				} else if (currentValue == "1") {
					newValue = "0";
				} else {
					return;
				}
			} else {
				newValue = checked;
			}

			checkboxCell.setAttribute("value", newValue);
			if (newValue == "1") {
				checkboxCell.setAttribute("properties", "checked");
			} else if (newValue == "0") {
				checkboxCell.setAttribute("properties", "unchecked");
			}
		},

		/******************************************************************/
		onTreeclick: function(event) {
			with(_$("ruleTree")) {
				if (event.button != 0) return;

				var row = {};
				var col = {};
				var obj = {};
				treeBoxObject.getCellAt(event.clientX, event.clientY, row, col, obj);

				if (col.value == null || row.value == null || obj.value == null) return;
				if (col.value.type == Components.interfaces.nsITreeColumn.TYPE_CHECKBOX) {
					var treeitem = view.getItemAtIndex(row.value);
					if (treeitem != null) {
						this.setCheckbox(treeitem, "reverse");
					}
				}
			}
		},

		onTreedblclick: function(event) {
			if (event.button != 0) return;
			if (this.getEventRow(event) == null) return;
			var treeitem = _$("ruleTree").view.getItemAtIndex(_$("ruleTree").currentIndex);
			this.jumptoDetailWindow(treeitem);
		},

		getTreeitem: function(treeitem) {
			with(treeitem.firstChild) {
				return {
					command: childNodes[0].getAttribute("command"),
					gBrowser: childNodes[1].getAttribute("gBrowser"),
					action: childNodes[2].getAttribute("action"),
					tag: childNodes[3].getAttribute("tag"),
					btn: childNodes[4].getAttribute("btn"),
					keys: childNodes[5].getAttribute("keys"),
					tkey: childNodes[6].getAttribute("tkey"),
					enabled: childNodes[7].getAttribute("value")
				}
			}
		},

		openWindow: function(params, retParams) {
			var win = "FeiRuoTabplus:DetailWindow";
			var thisWindow = FeiRuoTabplus.getWindow(1);
			if (thisWindow) {
				thisWindow.focus();
			} else {
				var detaill = this.detaill();
				thisWindow = window.openDialog("data:application/vnd.mozilla.xul+xml;charset=UTF-8," + detaill, win, "modal, chrome=yes,centerscreen", params, retParams);
			}
			return thisWindow;
		},

		detaill: function() {
			var xu = '<?xml version="1.0"?><?xml-stylesheet href="chrome://global/skin/" type="text/css"?>\
					<prefwindow xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul"\
					id="FeiRuoTabplus_Detail"\
					ignorekeys="true"\
					title="FeiRuoTabplus 鼠标键盘事件"\
					onload="init();"\
					onunload="WindoFocus();"\
					buttons="accept, cancel, extra1"\
					ondialogextra1="opener.FeiRuoTabplus.Detaill_OptionScript.Resets();"\
					ondialogaccept="Save();"\
					windowtype="FeiRuoTabplus:DetailWindow">\
						<prefpane id="main" flex="1">\
						<script>\
							function init() {\
								var param=window.arguments[0];\
								opener.FeiRuoTabplus.Detaill_OptionScript.init(param);\
							}\
							function Save() {\
								var retparam=window.arguments[1];\
								opener.FeiRuoTabplus.Detaill_OptionScript.Save(retparam);\
							}\
							function WindoFocus(){\
								if (opener.FeiRuoTabplus.getWindow(0))\
									opener.FeiRuoTabplus.getWindow(0).focus();\
							}\
							function MouseChanged(type){\
								opener.FeiRuoTabplus.Detaill_OptionScript.MouseChanged();\
							}\
						</script>\
							<vbox style = "width:400px; min-height:275px;">\
								<groupbox>\
									<caption label="键盘辅助键"/>\
										<row align="center">\
											<checkbox label="Alt" id="CAlt" oncommand="opener.FeiRuoTabplus.Detaill_OptionScript.KeyChanged();"/>\
											<label value="+"/>\
											<checkbox label="Ctrl" id="CCtrl" oncommand="opener.FeiRuoTabplus.Detaill_OptionScript.KeyChanged();"/>\
											<label value="+"/>\
											<checkbox label="Shift" id="CShift" oncommand="opener.FeiRuoTabplus.Detaill_OptionScript.KeyChanged();"/>\
											<spacer flex="1" />\
											<checkbox label="作为排除键" id="Ctkey"/>\
										</row>\
								</groupbox>\
								<groupbox>\
									<radiogroup id="MouseAction">\
										<hbox>\
											<vbox>\
												<radio label="鼠标点击" id="MouseClick" value="MouseClick" style="width:190px;" oncommand="opener.FeiRuoTabplus.Detaill_OptionScript.MouseChanged(0);"/>\
												<row align="center">\
													<menulist id="MouseBtn" style="width:100px;">\
														<menupopup>\
															<menuitem label="左键" value="0"/>\
															<menuitem label="中键" value="1"/>\
															<menuitem label="右键" value="2"/>\
														</menupopup>\
													</menulist>\
													<checkbox label="双击" id="MouseDblClick"/>\
												</row>\
											</vbox>\
											<vbox>\
												<radio label="鼠标中键滚轮" id="MouseMidScroll" value="MouseMidScroll" style="width:190px;" oncommand="opener.FeiRuoTabplus.Detaill_OptionScript.MouseChanged(1);"/>\
												<row align="center">\
													<menulist id="MouseScroll" style="width:190px;">\
														<menupopup>\
															<menuitem label="上滚轮" value="MouseScrollUp"/>\
															<menuitem label="下滚轮" value="MouseScrollDown"/>\
														</menupopup>\
													</menulist>\
												</row>\
											</vbox>\
										</hbox>\
									</radiogroup>\
								</groupbox>\
								<groupbox>\
									<radiogroup id="EventTag">\
											<vbox>\
												<radio label="标签事件" id="TabEvent" value="Tab" oncommand="opener.FeiRuoTabplus.Detaill_OptionScript.TagChanged();"/>\
												<row align="center">\
													<menulist id="TabEventCommand" style="width:390px;"/>\
												</row>\
											</vbox>\
											<vbox>\
												<radio label="标签栏事件" id="TabBarEvent" value="TabBar" oncommand="opener.FeiRuoTabplus.Detaill_OptionScript.TagChanged();"/>\
												<row align="center">\
													<menulist id="TabBarEventCommand" style="width:390px;"/>\
												</row>\
											</vbox>\
									</radiogroup>\
								</groupbox>\
							</vbox>\
							<hbox flex="1">\
								<button dlgtype="extra1" label="重置" />\
								<spacer flex="1" />\
								<button dlgtype="accept"/>\
								<button dlgtype="cancel"/>\
							</hbox>\
						</prefpane>\
					</prefwindow>\
					';
			return encodeURIComponent(xu);
		},

		jumptoDetailWindow: function(treeitem) {
			var params = {};
			if (treeitem == null) {
				params = {
					command: "",
					gBrowser: "",
					action: "",
					tag: "",
					btn: "",
					keys: "",
					tkey: "",
					enabled: "1"
				};
			} else {
				params = this.getTreeitem(treeitem);
			}
			var retParams = {
				command: "",
				gBrowser: "",
				action: "",
				tag: "",
				btn: "",
				keys: "",
				changed: "",
				tkey: "",
				enabled: params["enabled"]
			};
			this.openWindow(params, retParams);
			if (retParams["changed"] != "") {
				if (treeitem == null) {
					this.createTreeitem("customList", retParams);
				} else {
					this.setTreeitem(treeitem, retParams);
				}
			}
		},

		/******************************************************************/
		getEventRow: function(event) {
			var row = {};
			var col = {};
			var obj = {};
			_$("ruleTree")
				.treeBoxObject.getCellAt(event.clientX, event.clientY, row, col, obj);

			if (col.value == null || row.value == null || obj.value == null) return null;
			else return row.value;
		},

		onDragstart: function(event) {
			var row = this.getEventRow(event);
			if (row == null) return false;
			var treeitem = _$("ruleTree").view.getItemAtIndex(row);
			var dt = event.dataTransfer;
			dt.setData('FeiRuoTabplus/row', row);
		},

		onDragover: function(event) {
			var row = this.getEventRow(event);
			if (row == null) return;
			var treeitem = _$("ruleTree").view.getItemAtIndex(row);
			event.preventDefault();
		},

		moveItemBeforeItem: function(treeitem, pTreeitem) {
			var item = this.getTreeitem(pTreeitem);
			treeitem.parentNode.removeChild(treeitem);
			pTreeitem.parentNode.insertBefore(treeitem, pTreeitem);
		},

		onDrop: function(event) {
			var dtRow = event.dataTransfer.getData('FeiRuoTabplus/row');
			var row = this.getEventRow(event);
			if (row == null) return;
			if (row == dtRow) return;
			var pTreeitem = _$("ruleTree").view.getItemAtIndex(row);
			var treeitem = _$("ruleTree").view.getItemAtIndex(dtRow);
			this.moveItemBeforeItem(treeitem, pTreeitem);
		},

		/******************************************************************/
		onNewButtonClick: function() {
			with(_$("ruleTree")) {
				var parentId = "customList";
				this.jumptoDetailWindow(null, parentId);
			}
		},

		onEditButtonClick: function() {
			this.editRuleList("edit");
		},

		onDeleteButtonClick: function() {
			this.editRuleList("delete");
		},

		editRuleList: function(mode) {
			with(_$("ruleTree")) {
				var idx = currentIndex;
				if (idx < 0) {
					return;
				}
				var treeitem = view.getItemAtIndex(idx);
				if (mode == "edit") {
					this.jumptoDetailWindow(treeitem);
				} else if (mode == "delete") {
					treeitem.parentNode.removeChild(treeitem);
					view.selection.select(idx);
				}
				treeBoxObject.ensureRowIsVisible(currentIndex);
			}
			this.changeStatus();
		},

		/******************************************************************/
		obj2Str: function(myArr) {
			var tempArr = [];
			for (var k = 0; k < this.ruleOption.length; k++) {
				var o = this.ruleOption[k];
				var tempStr = (myArr[o.name] == undefined) ? o.default : myArr[o.name];
				if (o.needEncode) tempStr = fctConfig.encode(tempStr);
				tempArr.push(tempStr);
			}
			return tempArr.join("|");
		},

		KeyRead: function() {
			var keys = [];
			for (var i = 0; i <= 1; i++) {
				var akey = "AltKey" + i,
					ckey = "CtrlKey" + i,
					skey = "ShiftKey" + i;
				var key = "";
				if (_$(akey).checked)
					key = "Alt";
				if (_$(ckey).checked)
					key = (key ? (key + "+") : "") + "Ctrl";
				if (_$(skey).checked)
					key = (key ? (key + "+") : "") + "Shift";
				keys.push(key)
			};
			return keys.join("|");
		},

		KeyClicked: function() {
			let keys = FeiRuoTabplus.NewTabExKey.split("|");
			if (!keys[0]) return;
			for (var i in keys) {
				var akey = "AltKey" + i,
					ckey = "CtrlKey" + i,
					skey = "ShiftKey" + i;
				_$(akey).checked = keys[i].match("Alt") ? true : false;
				_$(ckey).checked = keys[i].match("Ctrl") ? true : false;
				_$(skey).checked = keys[i].match("Shift") ? true : false;
			}
		},

		Save: function() {
			FeiRuoTabplus.prefs.setBoolPref("NewTabUrlbar", _$("NewTabUrlbar").value);
			FeiRuoTabplus.prefs.setIntPref("NewTabNear", _$("NewTabNear").value);
			FeiRuoTabplus.prefs.setIntPref("ColseToNearTab", _$("ColseToNearTab").value);
			FeiRuoTabplus.prefs.setBoolPref("TabFocus", _$("TabFocus").value);
			FeiRuoTabplus.prefs.setIntPref("TabFocus_Time", _$("TabFocus_Time").value);
			FeiRuoTabplus.prefs.setBoolPref("CloseDownloadBankTab", _$("CloseDownloadBankTab").value);
			FeiRuoTabplus.prefs.setBoolPref("KeepBookmarksOnMiddleClick", _$("KeepBookmarksOnMiddleClick").value);
			FeiRuoTabplus.prefs.setBoolPref("SideBarNewTab", _$("SideBarNewTab").value);
			FeiRuoTabplus.prefs.setCharPref("ShowBorder", _$("ShowBorder").value);
			FeiRuoTabplus.prefs.setBoolPref("HomeNewTab", _$("HomeNewTab").value);
			FeiRuoTabplus.prefs.setBoolPref("SideBarNewTab_SH", _$("SideBarNewTab_SH").value);
			FeiRuoTabplus.prefs.setBoolPref("NewTabUrlbar_SH", _$("NewTabUrlbar_SH").value);

			Services.prefs.setBoolPref("browser.tabs.loadBookmarksInBackground", _$("loadBookmarksInBackground").value);
			Services.prefs.setIntPref("browser.link.open_newwindow", _$("open_newwindow").value);
			Services.prefs.setIntPref("browser.link.open_newwindow.restriction", _$("open_newwindow.restriction").value);
			Services.prefs.setBoolPref("browser.search.context.loadInBackgroundn", _$("searchloadInBackground").value);
			Services.prefs.setBoolPref("browser.tabs.loadInBackground", _$("tabsloadInBackground").value);

			var ShowBorderChange = FeiRuoTabplus.getPrefs(0, "ShowBorderChange", false)
			if (_$("ShowBorderChange").value != ShowBorderChange)
				FeiRuoTabplus.prefs.setBoolPref("ShowBorderChange", _$("ShowBorderChange").value);

			FeiRuoTabplus.PrefStrTrim("SameHostEX", _$("SameHostEX").value, true);
			FeiRuoTabplus.PrefStrTrim("NewTabExcludePage", _$("NewTabExcludePage").value, true);
			FeiRuoTabplus.PrefStrTrim("NewTabExcludeUrl", _$("NewTabExcludeUrl").value, true);
			var keyssss = this.KeyRead();
			FeiRuoTabplus.prefs.setCharPref("NewTabExKey", keyssss);

			var Rules = [];
			var list = _$("customList");
			if (!list.hasChildNodes()) return;
			for (var i = 0; i < list.childNodes.length; i++) {
				var rule = this.getTreeitem(list.childNodes[i]);
				Rules.push(rule);
			}
			var objArr = [];
			for (var i in Rules) {
				var currentObj = this.obj2Str(Rules[i]);
				objArr.push(currentObj);
			}
			var Custom = objArr.join(",");
			if (!FeiRuoTabplus.prefs.prefHasUserValue("Custom") || FeiRuoTabplus.prefs.getPrefType("Custom") != Ci.nsIPrefBranch.PREF_STRING)
				FeiRuoTabplus.prefs.setCharPref("Custom", "");
			FeiRuoTabplus.prefs.setCharPref("Custom", Custom);
		},

		changeStatus: function() {
			if ((_$("NewTabUrlbarr").checked) || (_$("SideBarNewTabr").checked))
				_$("SameHostEX").disabled = false;
			else
				_$("SameHostEX").disabled = true;
			_$("NewTabUrlbar_SH").disabled = _$("CtrlKey0").disabled = _$("AltKey0").disabled = _$("ShiftKey0").disabled = !(_$("NewTabUrlbarr").checked);
			_$("SideBarNewTab_SH").disabled = _$("CtrlKey1").disabled = _$("AltKey1").disabled = _$("ShiftKey1").disabled = !(_$("SideBarNewTabr").checked);
			_$("ShowBorder").disabled = !(_$("ShowBorderChanges").checked);
			_$("TabFocus_Time").disabled = !(_$("TabFocusr").checked);
			var status = !(_$("customList").hasChildNodes());
			_$("editButton").disabled = status;
			_$("deleteButton").disabled = status;
			_$("deleteButton").disabled = status;
		},

		Resets: function() {
			this.init(true);
			_$("tabsloadInBackground").value = false;
			_$("loadBookmarksInBackground").value = false;
			_$("open_newwindow").value = 3;
			_$("open_newwindow.restriction").value = 2;
			_$("NewTabUrlbar").value = false;
			_$("NewTabUrlbar_SH").value = false;
			_$("NewTabNear").value = 0;
			_$("ColseToNearTab").value = 0;
			_$("TabFocus").value = false;
			_$("TabFocus_Time").value = 250;
			_$("CloseDownloadBankTab").value = false;
			_$("KeepBookmarksOnMiddleClick").value = false;
			_$("ShowBorderChange").value = false;
			_$("searchloadInBackground").value = false;
			_$("SideBarNewTab").value = false;
			_$("SideBarNewTab_SH").value = false;
			_$("ShowBorder").value = "0,7,7,7";
			_$("NewTabExcludePage").value = "about:blank\nabout:home\nabout:newtab\nhttp://start.firefoxchina.cn/";
			_$("HomeNewTab").value = false;
			this.changeStatus();
		}
	};

	FeiRuoTabplus.Detaill_OptionScript = {
		RemoveChild: function(menu) {
			with(_$D(menu)) {
				while (hasChildNodes()) {
					removeChild(lastChild);
				}
			}
		},

		init: function(param) {
			FeiRuoTabplus.updateFile(true);
			var keys = param["keys"];
			if (keys) {
				keys = keys.split("+");
				for (var i in keys) {
					if (keys[i] == "Alt")
						_$D("CAlt").checked = true;

					if (keys[i] == "Ctrl") {
						_$D("CCtrl").checked = true;
					}

					if (keys[i] == "Shift")
						_$D("CShift").checked = true;
				}
			}
			_$D("Ctkey").checked = param["tkey"] ? true : false;

			_$D("MouseBtn").selectedIndex = param["btn"] || 0;

			_$D("MouseDblClick").checked = (param["action"] == "dblclick" ? true : false);

			if (param["action"] == "dblclick" || param["action"] == "click" || !param["action"])
				_$D("MouseAction").value = "MouseClick";
			else
				_$D("MouseAction").value = "MouseMidScroll";

			this.MouseChanged();

			_$D("EventTag").value = param["tag"] || "Tab";

			if (param["tag"] == "Tab")
				_$D("TabEventCommand").value = param["command"];
			else if (param["tag"] == "TabBar")
				_$D("TabBarEventCommand").value = param["command"];
			else {
				_$D("TabEventCommand").selectedIndex = 0;
				_$D("TabBarEventCommand").selectedIndex = 0;
			}

			this.KeyChanged();
			this.TagChanged();
		},

		Resets: function() {
			_$D("CAlt").checked = _$D("CCtrl").checked = _$D("CShift").checked = false;
			_$D("MouseAction").value = "MouseClick";
			_$D("MouseBtn").disabled = _$D("MouseDblClick").disabled = false;
			_$D("MouseScroll").disabled = true;
			_$D("EventTag").value = "Tab";
			_$D("TabEventCommand").disabled = false;
			_$D("TabBarEventCommand").disabled = true;
			this.CreateEventMenu("Click");
			this.KeyChanged();
			this.TagChanged();
			this.MouseChanged();
		},

		Save: function(retParam) {
			var command, gBrowser, action, tag, btn, tkey, keys;
			if (_$D("CAlt").checked)
				keys = "Alt";
			if (_$D("CCtrl").checked)
				keys = (keys ? (keys + "+") : "") + "Ctrl";
			if (_$D("CShift").checked)
				keys = (keys ? (keys + "+") : "") + "Shift";
			if (keys && _$D("Ctkey").checked)
				tkey = "1";

			if (_$D("MouseAction").value == "MouseClick") {
				btn = _$D("MouseBtn").value;
				action = _$D("MouseDblClick").checked ? "dblclick" : "click";
			} else if (_$D("MouseAction").value == "MouseMidScroll") {
				btn = "1";
				action = _$D("MouseScroll").value;
			}

			tag = _$D("EventTag").value;

			var menu;

			if (tag == "Tab") {
				menu = _$D("TabEventCommand");
				command = _$D("TabEventCommand").value;
			} else if (tag == "TabBar") {
				menu = _$D("TabBarEventCommand");
				command = _$D("TabBarEventCommand").value;
			}

			for (var i = 0; i < menu.itemCount; i++) {
				if (menu.getItemAtIndex(i).getAttribute("value") == command) {
					gBrowser = menu.getItemAtIndex(i).getAttribute("description")
					break;
				}
			}

			if (command == "" && gBrowser == "" && action == "" && tag == "" && btn == "" && tkey == "" && keys == "") return;

			retParam["command"] = command || "";
			retParam["gBrowser"] = gBrowser || "";
			retParam["action"] = action || "";
			retParam["tag"] = tag || "";
			retParam["btn"] = btn || "";
			retParam["tkey"] = tkey || "";
			retParam["keys"] = keys || "";
			retParam["changed"] = "1";
			setTimeout(function() {
				FeiRuoTabplus.OptionScript.changeStatus();
			}, 10);
			return true;
		},

		TagChanged: function() {
			if (_$D("EventTag").value != _$D("TabEvent").value) {
				_$D("TabEventCommand").disabled = true;
				_$D("TabBarEventCommand").disabled = false;
			} else {
				_$D("TabEventCommand").disabled = false;
				_$D("TabBarEventCommand").disabled = true;
			}
		},

		KeyChanged: function() {
			if (!_$D("CAlt").checked && !_$D("CCtrl").checked && !_$D("CShift").checked)
				_$D("Ctkey").disabled = true;
			else
				_$D("Ctkey").disabled = false;
		},

		MouseChanged: function(type) {
			var status;

			if (!type || type != 1)
				status = true;
			else
				status = false;

			_$D("MouseScroll").disabled = status;
			_$D("MouseBtn").disabled = _$D("MouseDblClick").disabled = !status;

			if (status)
				this.CreateEventMenu("Click");
			else
				this.CreateEventMenu("Scroll");
		},

		CreateEventMenu: function(Mouse) {
			var that = FeiRuoTabplus;
			this.RemoveChild("TabEventCommand");
			this.RemoveChild("TabBarEventCommand");
			var TabEventMenu = _$D("TabEventCommand");
			var TabBarEventMenu = _$D("TabBarEventCommand");
			if (Mouse == "Scroll") {
				TabEventMenu.appendItem("滚动切换标签(向左)", "MouseScrollTabL", "mTabContainer");
				TabEventMenu.appendItem("滚动切换标签(向右)", "MouseScrollTabR", "mTabContainer");
				TabBarEventMenu.appendItem("滚动切换标签(向左)", "MouseScrollTabL", "mTabContainer");
				TabBarEventMenu.appendItem("滚动切换标签(向右)", "MouseScrollTabR", "mTabContainer");

			}

			TabEventMenu.appendItem("关闭当前标签", "CloseTargetTab", "mTabContainer");
			TabEventMenu.appendItem("新建标签", "AddTab", "mTabContainer");
			TabEventMenu.appendItem("撤销关闭", "UndoCloseTab", "mTabContainer");
			TabEventMenu.appendItem("刷新标签", "ReloadTarget", "mTabContainer");
			TabEventMenu.appendItem("强制刷新标签", "ReloadSkipCache", "mTabContainer");
			TabEventMenu.appendItem("锁定标签", "PinTargetTab", "mTabContainer");
			TabEventMenu.appendItem("刷新未载入的标签", "UnloadedToReload", "mTabContainer");
			TabEventMenu.appendItem("用IE打开当前页", "LoadWithIE", "mTabContainer");
			/************************/
			TabBarEventMenu.appendItem("关闭当前标签", "CloseTargetTab", "mTabContainer");
			TabBarEventMenu.appendItem("新建标签", "AddTab", "mTabContainer");
			TabBarEventMenu.appendItem("撤销关闭", "UndoCloseTab", "mTabContainer");
			TabBarEventMenu.appendItem("刷新标签", "ReloadTarget", "mTabContainer");
			TabBarEventMenu.appendItem("强制刷新标签", "ReloadSkipCache", "mTabContainer");
			TabBarEventMenu.appendItem("刷新未载入的标签", "UnloadedToReload", "mTabContainer");
			TabBarEventMenu.appendItem("用IE打开当前页", "LoadWithIE", "mTabContainer");



			var CCommand = that.CustomCommand;
			if (CCommand) {
				for (var i in CCommand) {
					if (Mouse == "Scroll" && CCommand[i].Mouse.match("Scroll"))
						this.CreateCustomCommandMenu(CCommand[i], i);
					if (Mouse == "Click" && CCommand[i].Mouse.match("Click"))
						this.CreateCustomCommandMenu(CCommand[i], i);
				}
			}
			_$D("TabEventCommand").selectedIndex = 0;
			_$D("TabBarEventCommand").selectedIndex = 0;
		},

		CreateCustomCommandMenu: function(val, c) {
			var TabEventMenu = _$D("TabEventCommand");
			var TabBarEventMenu = _$D("TabBarEventCommand");
			if (val.Tag.match("Tab"))
				TabEventMenu.appendItem(val.label, ("CCommand_" + c), val.gBrowser);
			if (val.Tag.match("TabBar"))
				TabBarEventMenu.appendItem(val.label, ("CCommand_" + c), val.gBrowser);
		},
	};
	/*****************************************************************************************/
	function _$D(id) {
		return FeiRuoTabplus.getWindow(1).document.getElementById(id);
	}

	function _$(id) {
		return FeiRuoTabplus.getWindow(0).document.getElementById(id);
	}

	function _$C(name, attr) {
		var el = FeiRuoTabplus.getWindow(0).document.createElement(name);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}

	function $(id) {
		return document.getElementById(id);
	}

	function log() {
		Application.console.log("[FeiRuoTabplus] " + Array.slice(arguments));
	}

	function $C(name, attr) {
		var el = document.createElement(name);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}

	FeiRuoTabplus.init();
	window.FeiRuoTabplus = FeiRuoTabplus;
})();