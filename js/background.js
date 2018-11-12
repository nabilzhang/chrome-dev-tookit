//-------------------- 右键菜单 ------------------------//
// chrome.contextMenus.create({
// 	title: "测试右键菜单",
// 	onclick: function(){
// 		chrome.notifications.create(null, {
// 			type: 'basic',
// 			iconUrl: 'img/icon.png',
// 			title: '这是标题',
// 			message: '您刚才点击了自定义右键菜单！'
// 		});
// 	}
// });

chrome.contextMenus.create({
	title: '反转字符串',
	contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
	onclick: function(params) {
		alert(params.selectionText.split("").reverse().join(""));
	}
});

// 时间工具
var timetool = chrome.contextMenus.create(
	{
		"title": "时间工具",
		contexts: ['selection']
	}
);
chrome.contextMenus.create({
	title: '时间戳(秒)转时间',
	parentId: timetool,
	contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
	onclick: function(params) {
		alert(moment.unix(parseInt(params.selectionText)).format('YYYY-MM-DD HH:mm:ss'));
	}
});
chrome.contextMenus.create({
	title: '时间戳(毫秒)转时间',
	parentId: timetool,
	contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
	onclick: function(params) {
		alert(moment(parseInt(params.selectionText)).format('YYYY-MM-DD HH:mm:ss'));
	}
});
chrome.contextMenus.create({
	title: '时间(YYYY-MM-DD HH:mm:ss)转时间戳(秒)',
	parentId: timetool,
	contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
	onclick: function(params) {
		var time = moment(params.selectionText, "YYYY-MM-DD HH:mm:ss")
		alert(time.format('X'));
	}
});
chrome.contextMenus.create({
	title: '时间(YYYY-MM-DD HH:mm:ss)转时间戳(毫秒)',
	parentId: timetool,
	contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
	onclick: function(params) {
		var time = moment(params.selectionText, "YYYY-MM-DD HH:mm:ss")
		alert(time.format('x'));
	}
});

// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
	console.log('收到来自content-script的消息：');
	console.log(request, sender, sendResponse);
	sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
});

// 获取当前选项卡ID
function getCurrentTabId(callback)
{
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		if(callback) callback(tabs.length ? tabs[0].id: null);
	});
}

// 当前标签打开某个链接
function openUrlCurrentTab(url)
{
	getCurrentTabId(tabId => {
		chrome.tabs.update(tabId, {url: url});
	})
}

// 新标签打开某个链接
function openUrlNewTab(url)
{
	chrome.tabs.create({url: url});
}

// omnibox 演示
chrome.omnibox.onInputChanged.addListener((text, suggest) => {
	console.log('inputChanged: ' + text);
	if(!text) return;
	if(text == '美女') {
		suggest([
			{content: '中国' + text, description: '你要找“中国美女”吗？'},
			{content: '日本' + text, description: '你要找“日本美女”吗？'},
			{content: '泰国' + text, description: '你要找“泰国美女或人妖”吗？'},
			{content: '韩国' + text, description: '你要找“韩国美女”吗？'}
		]);
	}
	else if(text == '微博') {
		suggest([
			{content: '新浪' + text, description: '新浪' + text},
			{content: '腾讯' + text, description: '腾讯' + text},
			{content: '搜狐' + text, description: '搜索' + text},
		]);
	}
	else {
		suggest([
			{content: '百度搜索 ' + text, description: '百度搜索 ' + text},
			{content: '谷歌搜索 ' + text, description: '谷歌搜索 ' + text},
		]);
	}
});

// 当用户接收关键字建议时触发
chrome.omnibox.onInputEntered.addListener((text) => {
    console.log('inputEntered: ' + text);
	if(!text) return;
	var href = '';
    if(text.endsWith('美女')) href = 'http://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word=' + text;
	else if(text.startsWith('百度搜索')) href = 'https://www.baidu.com/s?ie=UTF-8&wd=' + text.replace('百度搜索 ', '');
	else if(text.startsWith('谷歌搜索')) href = 'https://www.google.com.tw/search?q=' + text.replace('谷歌搜索 ', '');
	else href = 'https://www.baidu.com/s?ie=UTF-8&wd=' + text;
	openUrlCurrentTab(href);
});
