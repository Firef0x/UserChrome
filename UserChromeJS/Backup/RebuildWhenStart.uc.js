//防止因加载延迟而没有显示(_addMenu.js的)菜单
//重复加载几次，防止第1次未加载成功

(function() {
setTimeout(function() {addMenu.rebuild(true);}, 1000); //1秒
setTimeout(function() {addMenu.rebuild(true);}, 10000);
setTimeout(function() {addMenu.rebuild(true);}, 60000);
})();