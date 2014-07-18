/* 鼠标移动到搜索栏，自动选择里面的文字 */
document.getAnonymousElementByAttribute(document.getElementById(
    "searchbar"),"class","searchbar-textbox").addEventListener(
    "mouseover", function(e) { if (e.target.localName.toLowerCase()
    =='textbox') e.target.select(); }, false);