rules = [
	// {
	// 	name: "about:haoutil",                  // 规则名称
	// 	from: "about:haoutil",                  // 需要重定向的地址
	// 	to: "https://haoutil.googlecode.com",   // 目标地址
	// 	wildcard: false,                        // 可选，true 表示 from 是通配符
	// 	regex: false,                           // 可选，true 表示 from 是正则表达式
	// 	resp: false                             // 可选，true 表示替换 response body
	// },
	// {
	//     name: "google链接加密",
	//     from: /^http:\/\/(([^\.]+\.)?google\..+)/i,
	//     exclude: /google\.cn/i,                 // 可选，排除例外规则
	//     to: "https://$1",
	//     regex: true
	// },
	// {
	//     name: "google搜索结果禁止跳转",
	//     from: /^https?:\/\/www\.google\.com\/url\?.*url=([^&]*).*/i,
	//     to: "$1",
	//     regex: true
	// },
	// {
	// 	name: "wiki中文>>简体中文",
	// 	from: /\:\/\/zh\.wikipedia\.org\/(?!zh\-cn\/)[^\/]+/i,
	// 	exclude: /favicon\.ico/i,  
	// 	to: '://zh.wikipedia.org/zh-cn',
	// 	regex: true
	// },
	{
		name: "userscripts重定向",
		from: /^https?:\/\/userscripts\.org\/(.*)/i,
		to: "http:\/\/userscripts.org:8080/$1",
		regex: true
	},
	// {
	//	name: "WiKi链接加密",
	//	from: /^http:\/\/([^\/]+\.wikipedia\.org\/.+)/i,
	//	to: "https://$1",
	//	regex: true
	// },
	{
	    // 包含手机版界面
	    name: "百度随心听（音质改320）",
	    from: /^http:\/\/music\.baidu\.com\/data\/music\/fmlink(.*[&\?])rate=[^3]\d+(.*)/i,
	    to: "http://music.baidu.com/data/music/fmlink$1rate=320$2",
	    regex: true
	},
	{
	    // 包含手机版界面
	    name: "防御路由DNS劫持",
	    from: /^192\.168\.3\.1\/.*/i,
	    to: "http://localhost/",
	    regex: true
	},
	{
	    name: "Google搜索跳转到wen.lu",
	    from: /^https?:\/\/(www\.)?google\.[^\/]+\/(.*)$/i,
	    exclude: /translate\.google\./i,
		to: "https://wen.lu/$2",
	    regex: true
	},
	{
		name: "重定向Google公共库到国内镜像",
		from: /^https?:\/\/(.*?)googleapis\.[^\/]+\/(.*)$/,
		to: "http://$1useso.com/$2",
		regex: true
	}
];
