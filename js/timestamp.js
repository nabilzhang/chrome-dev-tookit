$(function() {
  var now_format = moment().format('YYYY-MM-DD HH:mm:ss');
  var now_timestamp = moment().format('X');
  $("#js_timestamp").val(now_timestamp);
  $("#js_datetime_o").val(now_format);
});

// 时间戳转时间
$("#js_convert_timestamp").click(function(){
  var timestamp = $("#js_timestamp").val();
  var unit = $("#js_timestamp_unit").val();
  if(unit == 's'){
    $("#js_datetime").val(moment.unix(parseInt(timestamp)).format('YYYY-MM-DD HH:mm:ss'));
  } else {
    $("#js_datetime").val(moment(parseInt(timestamp)).format('YYYY-MM-DD HH:mm:ss'));
  }
});

// 时间转时间戳
$("#js_convert_datetime").click(function(){
  var datetime = $("#js_datetime_o").val();
  var unit = $("#js_timestamp_unit_o").val();
  var time = moment(datetime, "YYYY-MM-DD HH:mm:ss");
  if(unit == 's'){
    $("#js_timestamp_o").val(time.format('X'));
  } else {
    $("#js_timestamp_o").val(time.format('x'));
  }
});
