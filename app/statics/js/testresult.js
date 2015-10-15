var timer;
var currentRect;
var SVG_NS = "http://www.w3.org/2000/svg";
var XLINK_NS = "http://www.w3.org/1999/xlink";


$(function () {
    var resultData = document.getElementById("resultData").value;
    alert(resultData);
    var resultMap = JSON.parse(resultData);
    //for(var key in resultMap){
    //
    //    var rect = document.getElementById(key);
    //        rect.setAttribute("data-toggle", "popover");
    //        rect.setAttribute("data-container", "body");
    //        rect.setAttribute("data-content", "123");
    //        rect.setAttribute("title", "正确答案");
    //}
    //
    //$('[data-toggle="popover"]').popover();

})
