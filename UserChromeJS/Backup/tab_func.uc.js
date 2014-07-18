var ft_tid=null; var ft_event=null;

(function() {
    /* 双击鼠标左键关闭标签（空白处新开标签），单击中键关闭标签（空白处恢复标签） */
    function TabBarClick(e, DblClick) {
        if (e.ctrlKey || e.shiftKey || e.altKey)
            return;
        if (DblClick==1 && e.button!=0) return;
        if (DblClick==0 && e.button!=1) return;
        
        var aTab = e.originalTarget;
        if (aTab.localName=="toolbarbutton")
            return;
        while(aTab.localName != "tabs") {
            if (aTab.localName == "tab")
                break;
            else
                aTab = aTab.parentNode;
        }
        if (aTab.localName != "tab") {
            if (DblClick == 1)
                openUILinkIn("about:blank", "tab");
            else
                undoCloseTab();
        }
        else {
            if (gBrowser.mTabs.length == 1)
                gBrowser.addTab('about:blank');
            gBrowser.removeTab(aTab);
        }
    }
    
    getBrowser().onTabClick = function (e) {
        if (e) TabBarClick(e, 0);
    }
    getBrowser().onTabBarDblClick = function (e) {
        if (e) TabBarClick(e, 1);
    }


    /* 鼠标移到标签上延时500ms后自动激活标签  */
    function TabMouseOver(e) {
        ft_event = e.target;
        ft_tid = setTimeout("if (ft_event) { \
            gBrowser.selectedTab = ft_event; \
            ft_event=null; }", 500);
    }
    function TabMouseOut(e) {
        ft_event = null; clearTimeout(ft_tid);
    }
    getBrowser().mTabBox.addEventListener('mouseout',
        TabMouseOut, false);
    getBrowser().mTabBox.addEventListener('mouseover',
        TabMouseOver, false);

    /* 标签邮件菜单中增加“最近关闭的标签页” */
    var tabMenu = document.getAnonymousElementByAttribute(
        getBrowser(), "anonid", "tabContextMenu");
    var undoMenu = document.getElementById('historyUndoMenu');
    tabMenu.insertBefore(undoMenu, document.getElementById(
        'context_closeOtherTabs').nextSibling);
    tabMenu.addEventListener('popupshowing', function (evt) {
        try { var ss = Cc["@mozilla.org/browser/sessionstore;1"
            ].getService(Ci.nsISessionStore);
        }catch(e) {}
        undoMenu.setAttribute('disabled', ss.getClosedTabCount(
            window)>0?'false':'true');
        }, false);
    var endSep = document.getElementById('endHistorySeparator');
    if (endSep) endSep.parentNode.removeChild(endSep);

    /* 最后一个标签关闭时，不关闭 firefox（针对firefox 3.1）  */
    try {
        if (gBrowser._endRemoveTab) {
            eval("gBrowser.removeTab = function removeTab(aTab) { \
                if (gBrowser.mTabs.length == 1)                   \
                    gBrowser.addTab('about:blank');               \
                gBrowser._endRemoveTab(gBrowser._beginRemoveTab(  \
                    aTab, true)); }");
        }
    }catch(e) {}
    
    /* 阻止拖拉标签时新开窗口的功能（针对firefox 3.1）   */
    try {
        eval("gBrowser._onDragEnd = " + gBrowser._onDragEnd.toString
            ().replace('this._replaceTabWithWindow(draggedTab);','')
            );
    }catch(e) {}
})();
