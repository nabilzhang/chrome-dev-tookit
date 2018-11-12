// 字符串反转
$("#reverse-string").click(function(){
  var origin = $("#string").val();
  $("#reversed-string").val(origin.split("").reverse().join(""));
});
