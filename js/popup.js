$(function() {

	// 加载设置
	var defaultConfig = {color: 'white'}; // 默认配置
	chrome.storage.sync.get(defaultConfig, function(items) {
		document.body.style.backgroundColor = items.color;
	});

	// 初始化国际化
	$('#test_i18n').html(chrome.i18n.getMessage("helloWorld"));

  // tab初始化
	$( "#tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
	$( "#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
});

$('#timestamp').click(e => {
	window.open(chrome.extension.getURL('timestamp.html'));
});



// 调用后台JS
$('#invoke_background_js').click(e => {
	var bg = chrome.extension.getBackgroundPage();
	bg.testBackground();
});
