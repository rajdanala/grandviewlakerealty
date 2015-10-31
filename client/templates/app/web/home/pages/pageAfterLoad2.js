Template.homePageAfterLoad2.invokeAfterLoad = function () {
  Meteor.defer(
    function() {$("img[rel^=slideshow]").click(function() {
      //alert("clicked slideshow");
        //if (typeof(parent.dataController) != "undefined") {
            var a = $(this);
            var b = parseInt(a.attr("firstImage"), 10) - 1;
            b = b < 0 ? 0 : b;
            var c = a.attr("listingid");
            var d = a.data("displayId");
            loadSlideShow(c, b, d)
            function loadSlideShow(b, e, a) {
                a = (a || b);
                var d = "Listing #" + a;
                var g = getSlideShowPhotoSize();
                var h = getSlideShowWindowDimensions(g);
                var f = getPhotoPageSize(g.height);
                var c = "/images/listings" + "/" + b + "/" + e + "?callingWindow=" + "ifView" + "&height=" + g.height + "&width=" + g.width + "&photoPageSize=" + f + "&displayId=" + a;
                window.top.$.fn.colorbox({
                    href: c,
                    open: true,
                    iframe: true,
                    width: h.width,
                    height: h.height,
                    title: d,
                    close: '<button id="ViewFullImage">View Full Image</button><button id="ToggleSS">Stop Slideshow</button><button id="Print">Print</button><button id="Close">Close</button>',
                    onClosed: false
                })
            }
            function getPhotoPageSize(a) {
                var c = 90;
                var b = 33;
                var d = Math.floor((a - (b * 2)) / c);
                return d
            }
            function getSlideShowWindowDimensions(a) {
                var b = {
                    height: a.height + 95,
                    width: a.width + 215
                };
                return b
            }
            function getSlideShowPhotoSize() {
                var c = {
                    height: 480,
                    width: 640
                };
                // if (typeof (window.top.$.focusFx.photoResolution.Resolutions) == "undefined") {
                //     return c
                // }
                var a = window.innerHeight - 50;
                var b = window.innerWidth;
                // $.each(window.top.$.focusFx.photoResolution.Resolutions, function(e, d) {
                //     if (a > d.Y && b > d.X) {
                //         c.height = d.Y;
                //         c.width = d.X;
                //         return false
                //     }
                // }
                // );
                return c
            }
        // } else {
        //     $.jGrowl("Slideshow can only be loaded from search results.", {
        //         life: 5000
        //     })
        // }
    })
  }
);
  return "";
};
