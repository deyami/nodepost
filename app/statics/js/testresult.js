var timer;
var currentRect;
var SVG_NS = "http://www.w3.org/2000/svg";
var XLINK_NS = "http://www.w3.org/1999/xlink";


var fixWidth = function (rect, span) {
    var textLength = span.getComputedTextLength();
    if (textLength < 30) textLength = 30;
    rect.width.baseVal.value = textLength;
}

$(function () {

    $("#score").html("你的得分是:"+scoreData+"分");

    $('#scoreConfirm').click(function () {
        $("#scoreModal").modal('hide');
    });

    $("#scoreModal").modal('show');

    var resultData = document.getElementById("resultData").innerHTML;
    var resultMap = JSON.parse(resultData);
    for (var key in resultMap) {
        var value = resultMap[key]
        var rect = document.getElementById(key);
        var x = rect.getAttribute('x');
        var y = rect.getAttribute('y');
        var height = rect.getAttribute('height');
        var text_id = "text_" + rect.id;
        var span_id = "span_" + rect.id;

        text = document.createElementNS(SVG_NS, 'text');
        text.setAttribute("id", text_id);
        text.setAttribute("xml:space", "preserve");
        text.setAttribute("x", 0);
        text.setAttribute("y", 0);
        text.setAttribute("style", "font-size:" + (parseInt(height) - 4) + "px");

        var newH = parseInt(y) + parseInt(height) - 3;
        text.setAttribute("transform", "translate(" + x + "," + newH + ")");


        var correct = value["correct"];
        var error = value["error"];
        if(error){
            var tspan = document.createElementNS(SVG_NS, 'tspan');
            tspan.setAttribute("id", span_id);
            tspan.setAttribute("data-toggle", "popover");
            tspan.setAttribute("data-trigger", "hover");
            tspan.setAttribute("data-container", "body");
            tspan.setAttribute("data-content", value["correct"]);
            tspan.setAttribute("title", "正确答案");
            text.setAttribute("style", "fill:red");
            tspan.innerHTML = value["error"];
            text.appendChild(tspan);
        }else{
            var tspan = document.createElementNS(SVG_NS, 'tspan');
            tspan.setAttribute("id", span_id);
            text.setAttribute("style", "fill:green");
            tspan.innerHTML = value["correct"];
            text.appendChild(tspan);
        }


        document.getElementById("layer1").appendChild(text);
        fixWidth(rect, document.getElementById(span_id));
    }

    $('[data-toggle="popover"]').popover();

})
