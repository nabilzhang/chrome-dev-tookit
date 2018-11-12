console.log('content script loading');

// 注意，必须设置了run_at=document_start 此段代码才会生效
document.addEventListener('DOMContentLoaded', function()
{
	// 注入自定义JS
	injectCustomJs();
	// 给谷歌搜索结果的超链接增加 _target="blank"
	if(location.host == 'www.google.com')
	{
		var objs = document.querySelectorAll('h3.r a');
		for(var i=0; i<objs.length; i++)
		{
			console.log('已处理谷歌超链接！'+i);
			objs[i].setAttribute('_target', 'blank');
		}
		console.log('已处理谷歌超链接！');
	}
});

// 向页面注入JS
function injectCustomJs(jsPath)
{
	jsPath = jsPath || 'js/inject.js';
	var temp = document.createElement('script');
	temp.setAttribute('type', 'text/javascript');
	// 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
	temp.src = chrome.extension.getURL(jsPath);
	temp.onload = function()
	{
		// 放在页面不好看，执行完后移除掉
		this.parentNode.removeChild(this);
	};
	document.body.appendChild(temp);
}
