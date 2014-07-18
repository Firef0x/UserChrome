/* Open URL With
* nanto_vi (TOYAMA Nao), 2006-12-26
*
* Open an application with the current page's URL.
*/

(function OpenURLWith() {
    
    const MENU_LABEL = "Open With";
    const MENU_ACCESSKEY = "O";
    
    const IE_PATH = "C:\\Program Files\\Internet Explorer\\iexplore.exe";
    
    var mMenus = [
        {
            label: "Internet Explorer(link)",
            accesskey: "L",
            application: IE_PATH,
            get url() { return gContextMenu.linkURL; },
            get shouldDisplay() { return gContextMenu.onLink; }
        },
        {
            label: "-",
            get shouldDisplay() { return gContextMenu.onLink; }
        },
        {
            label: "Internet Explorer(page)",
            accesskey: "I",
            application: IE_PATH,
            get url() { return content.location.href; },
        },
        {
            label: "-",
            get shouldDisplay() { return gContextMenu.inFrame; }
        },
        {
            label: "Internet Explorer",
            accesskey: "F",
            application: IE_PATH,
            get url() { return document.commandDispatcher.focusedWindow.location.href; },
            get shouldDisplay() { return gContextMenu.inFrame; }
        }
    ];
    
    init: {
        let parentMenu = document.createElement("menu");
        parentMenu.setAttribute("label", MENU_LABEL);
        if (typeof MENU_ACCESSKEY != "undefined" && MENU_ACCESSKEY)
            parentMenu.setAttribute("accesskey", MENU_ACCESSKEY);
        document.getElementById("contentAreaContextMenu").insertBefore(
            parentMenu, document.getElementById("context-sep-properties"));
        
        let parentPopup = document.createElement("menupopup");
        parentPopup.id = "openurlwith-popup";
        parentPopup.addEventListener("command", openApplication, false);
        parentMenu.appendChild(parentPopup);
        
        for (let i = 0, menu; menu = mMenus[i]; i++) {
            let menuItem;
            if (menu.label == "-") {
                menuItem = document.createElement("menuseparator");
            } else {
            menuItem = document.createElement("menuitem");
            menuItem.setAttribute("label", menu.label);
            if ("accesskey" in menu)
                menuItem.setAttribute("accesskey", menu.accesskey);
            menuItem.ouwMenu = menu;
        }
        parentPopup.appendChild(menuItem);
    }
    
    parentMenu.parentNode.addEventListener("popupshowing", setMenuDisplay, false);
}

function openApplication(aEvent) {
    var menu = aEvent.target.ouwMenu;
    
    var app = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
    app.initWithPath(menu.application);
    if (!app.exists()) {
        alert("File doesn't exist: " + menu.application);
        return;
    }
    
    Cc["@mozilla.org/browser/shell-service;1"]
    .getService(Ci.nsIShellService_MOZILLA_1_8_BRANCH || Ci.nsIShellService)
    .openApplicationWithURI(app, menu.url);
}

function setMenuDisplay() {
    var menuItems = document.getElementById("openurlwith-popup").childNodes;
    for (var i = 0, menu; menu = mMenus[i]; i++)
        menuItems[i].hidden = "shouldDisplay" in menu && !menu.shouldDisplay;
}

})();