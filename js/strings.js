// 字符串反转
$("#reverse-string").click(function(){
  var origin = $("#string").val();
  $("#reversed-string").val(origin.split("").reverse().join(""));
});


// URL encode and decode
$("#url-encode-btn").click(function(){
  var origin = $("#url-input").val();
  $("#url-output").val(encodeURIComponent(origin));
});

$("#url-decode-btn").click(function(){
  var origin = $("#url-input").val();
  $("#url-output").val(decodeURIComponent(origin));
});
