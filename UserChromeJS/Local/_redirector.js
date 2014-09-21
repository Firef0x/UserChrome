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
		from: /^https?:\/\/userscripts\.org(:8080)?\/(.*)/i,
		to: "http:\/\/userscripts-mirror.org/$2",
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
	    name: "防御路由DNS劫持",
	    from: /^192\.168\.3\.1\/.*/i,
	    to: "http://localhost/",
	    regex: true
	},
	{
	    name: "Google搜索跳转到wen.lu",
	    from: /^https?:\/\/(www\.)?google\.[^\/]+\/(search.*)$/i,
	    exclude: /translate\.google\./i,
		to: "https://wen.lu/$2",
	    regex: true
	},
	{
	    name: "Google学术搜索跳转到wen.lu",
	    from: /^https?:\/\/scholar\.google\.[^\/]+\/(.*)$/i,
		to: "https://scholar.wen.lu/$1",
	    regex: true
	},
	{
	    name: "解决wen.lu无法重定向图片地址",
	    from: /^https?:\/\/wen.lu\/imgres\?.*imgurl=([^&]*).*/i,
		to: "$1",
	    regex: true
	},
	{
		name: "重定向Google公共库到360镜像",
		from: /^http:\/\/(.*?)googleapis\.[^\/]+\/(.*)$/,
		to: "http://$1useso.com/$2",
		regex: true
	},
	{
		// 取自 https://github.com/523860169/list/blob/master/_redirector.js
		name: "重定向Google公共库到科大镜像",
		from: /^https:\/\/(ajax|fonts)\.googleapis\.[^\/]+\/(.*)$/i,
		to: "http://$1lug.ustc.edu.cn/$2",
		regex: true
	},
	{
		// 取自 https://github.com/523860169/list/blob/master/_redirector.js
		name: "科大博客提供Google Themes加速",
		from: /^https?:\/\/themes\.googleuserconten\.[^\/]+\/(.*)$/i,
		to: "http://google-themes.lug.ustc.edu.cn/$1",
		regex: true
	},
	{
		// 取自 https://github.com/523860169/list/blob/master/_redirector.js
		name: "Google Code链接加密",
		from: /^http:\/\/(.*?)googlecode\.com\/(.*)$/i,
		to: "https://$1googlecode.com/$2",
		regex: true
	},
	{
		// 取自 http://tieba.baidu.com/p/3279099939
		name: "重定向Gravatar头像到多说镜像",
		from: /^https?:\/\/([0-9]?)\.gravatar\.com\/avatar\/(.*)$/,
		to: "http://gravatar.duoshuo.com/avatar/$2",
		regex: true
	},
	{
		// 取自 https://github.com/523860169/list/blob/master/_redirector.js
		name: "tumblr链接加密",
		from: /^http:\/\/(.*?)tumblr\.com\/(.*)$/i,
		to: "https://$1tumblr.com/$2",
		regex: true
	},
];
