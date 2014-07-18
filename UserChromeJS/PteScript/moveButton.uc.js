// ==UserScript==
// @name           moveButton.uc.js
// @description    移动或克隆按钮/菜单到任意位置
// @author         ywzhaiqi
// @namespace      ywzhaiqi@gmail.com
// @include        main
// @charset        UTF-8
// @version        v2014.05.05
// @homepageURL    https://github.com/ywzhaiqi/userChromeJS/tree/master/moveButton
// @reviewURL      http://bbs.kafan.cn/thread-1572303-1-1.html
// @note           2013/06/03 ver0.0.3  改进一些情况下无法移动的问题。
// @note           2013/05/22 ver0.0.2，新增参数 clone: true（克隆按钮/菜单，原来的保留）
// @note           2013/05/21 初始版本
// @note           填写的 buttons 说明：
// @note           　　id: 要移动的按钮/菜单的 Id
// @note           - 示例1： 移动 "翻译按钮" 到 "scriptish按钮" 的前面
// @note           　　{ id: "translatorButton", insertBefore: "scriptish-button" },
// @note           - 示例2： 移动 "翻译按钮" 到 "scriptish按钮" 的后面
// @note           　　{ id: "translatorButton", insertAfter: "scriptish-button" },
// @note           - 示例3： 移动 "翻译按钮" 到 "附加组件栏" 的第一个位置
// @note           　　{ id: "translatorButton", bar: "addon-bar", pos: 1 },
// @note           - 示例4：移动 "翻译按钮" 到 原来的第一个位置。（不推荐，建议用css调整）
// @note           　　{ id: "translatorButton", pos: 1 },
// @note           -  示例5：移动 "工具菜单" 到 系统按钮弹出的菜单 "选项" 的下面。
// @note           　　{ id: "tools-menu", insertAfter: "appmenu_customize"},
// @note           - 示例6：克隆 "工具菜单" 到 系统按钮弹出的菜单 "选项" 的下面
// @note           　　 { id: "tools-menu", insertAfter: "appmenu_customize", clone: true },
// ==/UserScript==

/*
    参考的工具栏或按钮的Id：
        nav-bar（导航工具栏）
            unified-back-forward-button（前进后退按钮）
            urlbar-container（整个地址栏）
                urlbar-icons（地址栏图标，如地址栏下拉按钮、刷新按钮等，uc脚本一般插入的位置）
            search-container（整个搜索栏）
            home-button（主页按钮）

        PersonalToolbar（书签栏）
            personal-bookmarks（书签栏中书签部分）
        addon-bar（附加组件栏）
            status-bar（状态栏，在附加组件栏中，按钮为不可移动）
		TabsToolbar_aidBar (自定义标签栏辅助工具栏)
    主要参考了 addMenu.uc.js 和 rebuild_userChrome.uc.xul
 */

location == "chrome://browser/content/browser.xul" && (function(){

var moveButton = {
    buttons:[
        { id: "greasemonkey-tbb", bar: "TabsToolbar_aidBar", pos: 1 },//greasemonkey扩展
		{ id: "stylish-toolbar-button", bar: "TabsToolbar_aidBar", pos: 2 },//stylish 扩展
		//{ id: "abp-toolbarbutton", bar: "TabsToolbar_aidBar", pos: 3 },// ABP、ABE扩展
		{ id: "lpt_lastpass-compact-btn", bar: "TabsToolbar_aidBar", pos: 4 },// Lastpass 扩展
		{ id: "wot-button", bar: "TabsToolbar_aidBar", pos: 5 },// WOT 扩展
		{ id: "pan-toolbarbutton", bar: "TabsToolbar_aidBar", pos: 6 },// AutoProxy 扩展
		{ id: "RIL_toolbar_button", bar: "TabsToolbar_aidBar", pos: 7 },// Pocket 扩展
		{ id: "sessionmanager-undo", bar: "TabsToolbar_aidBar", pos: 8 },// SessionManager 扩展
		//{ id: "sessionmanager-toolbar", bar: "TabsToolbar_aidBar", pos: 9 },// SessionManager 扩展
		{ id: "firebug-badged-button", bar: "TabsToolbar_aidBar", pos: 10 },// Firebug 扩展
		{ id: "redisposition-button", bar: "TabsToolbar_aidBar", pos: 11 },// Firebug 扩展
    ],

    interval: 200, // 0.2秒间隔
    maxcount: 100, // 最大100回，至少 interval * maxcount 秒
    count: 0,
    timer: null,

    init: function(){
        this.delayRun();

        window.addEventListener('aftercustomization', this.delayRun.bind(this), false);
    },
    delayRun: function(time){
        var self = this;
        setTimeout(function(){
            self.run();
        }, time || 100);
    },
    run: function(){
        // debug('run');
        this.timer = setInterval(function(self) {
            if (++self.count > self.maxcount || self.move())
                clearInterval(self.timer);
        }, this.interval, this);
    },
    move: function(){
        var i = 0;
        while (i < this.buttons.length){
            var info = this.buttons[i];
            var button = $(info.id);
            if(button){
                if(info.clone === true){
                    button = button.cloneNode(true);
                }
                let ins;

                if (info.insertBefore && (ins = $(info.insertBefore))){
                    ins.parentNode.insertBefore(button, ins);

                    this.buttons.splice(i, 1);
                    continue;
                }

                if (info.insertAfter && (ins = $(info.insertAfter))){
                    ins.parentNode.insertBefore(button, ins.nextSibling);

                    this.buttons.splice(i, 1);
                    continue;
                }

                if (info.pos && (parseInt(info.pos, 10) > 0)){
                    let bar = $(info.bar) || button.parentNode;
                    ins = bar.children[parseInt(info.pos, 10) - 1];
                    if(ins){
                        bar.insertBefore(button, ins);
                    }else{
                        bar.appendChild(button);
                    }

                    this.buttons.splice(i, 1);
                    continue;
                }
            }
            i++;
        }
        return this.buttons.length === 0 ? true : false;
    }
};

moveButton.init();

function debug() { Application.console.log('[moveButton DEBUG] ' + Array.slice(arguments)); }
function $(id) { return document.getElementById(id); }
function $A(args) { return Array.prototype.slice(args); }

})();