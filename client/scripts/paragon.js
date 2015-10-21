
var autoPrint = false;

// $(function() {
//     resizePage();
//     $(window).bind('resize', resizePage);
//     function resizePage() {
//       $("#divHtmlReport").css("cssText", "height: 100% !important;");
//     }
// });

$(function() {$(".imageSpinner").click(function() {
    var j = $(this);
    var b = j.attr("rel");
    var f = $("#labelDiv" + b).length > 0;
    var g = parseInt($("#spnTotImg" + b).text(), 10);
    var i = j.hasClass("imageSpinnerNext") ? 1 : -1;
    var e = parseInt($("#spnCurImg" + b).text(), 10) + i;
    if (e > g) {
        e = 1
    } else {
        if (e <= 0) {
            e = g
        }
    }
    var d = $("#aryPicDataSpinner" + b).val();
    if (d != null && d.length > 0) {
        if (f && labelJson[b] == null) {
            var h = $("#labelDiv" + b).attr("rel");
            if (h.length > 0) {
                h = $("<div/>").html(h).text();
                labelJson[b] = JSON.parse(h)
            } else {
                labelJson[b] = []
            }
        }
        var a = d.split(",");
        var c = $("#img" + b);
        c.attr("src", a[e - 1]);
        $("#spnCurImg" + b).text(e);
        c.attr("firstImage", e);
        if (f && labelJson[b].length >= (e - 1)) {
            $("#labelDiv" + b).text(labelJson[b][e - 1]).attr("title", labelJson[b][e - 1])
        }
    }
});
$("img[rel^=slideshow]").click(function() {
    if (typeof(parent.dataController) != "undefined") {
        var a = $(this);
        var b = parseInt(a.attr("firstImage"), 10) - 1;
        b = b < 0 ? 0 : b;
        var c = a.attr("listingid");
        var d = a.data("displayId");
        loadSlideShow(c, b, d)
    } else {
        $.jGrowl("Slideshow can only be loaded from search results.", {
            life: 5000
        })
    }
})
});
