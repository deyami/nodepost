var timer;
var currentRect;
var SVG_NS = "http://www.w3.org/2000/svg";
var XLINK_NS = "http://www.w3.org/1999/xlink";
var counter = 0;

var fixWidth = function (rect, span) {
    var textLength = span.getComputedTextLength();
    if (textLength < 30) textLength = 30;
    rect.width.baseVal.value = textLength;
}

function input_txt(obj) {
    var x = obj.getAttribute('x');
    var y = obj.getAttribute('y');
    var height = obj.getAttribute('height');

    var text_id = "text_" + obj.id;
    var span_id = "span_" + obj.id;

    var text = document.getElementById(text_id);

    if (!text || text == null) {
        text = document.createElementNS(SVG_NS, 'text');
        text.setAttribute("id", text_id);
        text.setAttribute("xml:space", "preserve");
        text.setAttribute("x", 0);
        text.setAttribute("y", 0);
        text.setAttribute("style", "font-size:" + (parseInt(height) - 4) + "px");

        var newH = parseInt(y) + parseInt(height) - 3;
        text.setAttribute("transform", "translate(" + x + "," + newH + ")");

        var tspan = document.createElementNS(SVG_NS, 'tspan');
        tspan.setAttribute("id", span_id);
        tspan.setAttribute("data-toggle", "modal");
        tspan.setAttribute("data-target", "#inputModal");
        tspan.innerHTML = $('#answer').val();
        text.appendChild(tspan);
        document.getElementById("layer1").appendChild(text);
    } else {
        var tspan = document.getElementById(span_id);
        tspan.innerHTML = $('#answer').val();
    }
    $('#answer').val("")
    fixWidth(obj, document.getElementById(span_id));
}

function refresh() {
    totalTime -= 1000;
    counter +=1000;
    if (totalTime <= 0) {
        window.clearTimeout(timer);
        $('#endExam').click(function () {
            $('#endModal').modal('hide');
            var spanList = document.getElementsByTagNameNS(SVG_NS, 'tspan');
            var exam = {};
            for(var i=0;i<spanList.length ;i++){
                var span = spanList[i];
                exam[span.getAttribute("id").split("_")[1]]=span.innerHTML
            }
            $('#examResult').val(JSON.stringify(exam));
            $('#resultForm').submit();

        });
        $("#endModal").modal({
            keyboard: false
        });
        $("#end").html("时间到，本次用时："+parseInt(counter / 60 / 1000) + "分" + parseInt((counter - parseInt(counter / 60 / 1000) * 60 * 1000) / 1000) + "秒");

    } else {
        $("#alert").html(parseInt(totalTime / 60 / 1000) + "分" + parseInt((totalTime - parseInt(totalTime / 60 / 1000) * 60 * 1000) / 1000) + "秒");
    }
}

$(function () {

    var rectList = document.getElementsByTagNameNS(SVG_NS, 'rect');
    for(var i=0;i<rectList.length ;i++){
        var rect = rectList[i];
        rect.setAttribute("data-toggle", "modal");
        rect.setAttribute("data-target", "#inputModal");
    }

    $('[data-toggle="popover"]').popover();

    $('#inputModal').on('show.bs.modal', function (e) {
        var tagName = e.relatedTarget.tagName;
        if (tagName == "rect") {
            currentRect = e.relatedTarget;
        } else {
            var span_id = e.relatedTarget.id;
            currentRect = document.getElementById(span_id.split("_")[1]);
        }
    });

    $('#inputModal').on('shown.bs.modal', function (e) {
        $("#answer").focus();
    });

    $('#answer').bind('keypress',function(event){
        if(event.keyCode == "13")
        {
            $('#endInput').click();
        }
    });


    $('#finishExam').click(function () {
        totalTime = 0;
    });

    $('#endInput').click(function () {
        $('#inputModal').modal('hide');
        input_txt(currentRect)
    });

    $('#beginExam').click(function () {
        timer = window.setInterval(refresh, 1000);
        $('#beginModal').modal('hide');
    });

    $("#begin").html("准备好考试了吗？时长" + (totalTime / 60 / 1000) + "分钟");


    $("#beginModal").modal({
        keyboard: false
    });
})
