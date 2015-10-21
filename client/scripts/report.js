var labelJson = [];
$(function() {
    $(".imageSpinner").click(function() {
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
var wsJson = "";

function doReportIntegrationUpdates() {
    updateWalkScore();
    updateShowingTimeListings();
    updateDocCentralPublicListings()
}

function doSpreadsheetIntegrationUpdates() {
    if (typeof isShowingTimeActionIconEnabled !== "undefined" && isShowingTimeActionIconEnabled) {
        updateShowingTimeListings()
    }
    if (typeof isDocCentralPublicActionIconEnabled !== "undefined" && isDocCentralPublicActionIconEnabled) {
        updateDocCentralPublicListings()
    }
}

function updateWalkScore() {
    var a = $("a.f-integration-walkscore");
    var b = "";
    if (a.length > 0) {
        showBlockUiMessage("Updating Walk Score...");
        try {
            $.each(a, function(d, f) {
                if (b.length < 1) {
                    var e = this.firstChild.getAttribute("listingid");
                    getWalkScoreJson(e);
                    if (wsJson.indexOf("Error") == -1) {
                        b = displayWalkScore(wsJson)
                    }
                }
                f.parentElement.innerHTML = b
            })
        } catch (c) {}
        hideBlockUiMessage()
    }
}

function getWalkScoreJson(a) {
    $.ajax({
        type: "GET",
        dataType: "json",
        data: {
            listingId: a,
            testing: false
        },
        url: walkScoreUrl,
        success: function(c, b) {
            if (c.status == "OK") {
                wsJson = c.message;
                return
            } else {
                $.jGrowl(c.message);
                wsJson = "Error Updating Walk Score";
                return
            }
        },
        error: function(d, c, b) {
            if (!this.ajaxRetryOnError(d, b)) {
                hideBlockUiMessage();
                wsJson = "Error Updating Walk Score"
            }
        }
    })
}

function displayWalkScore(jsonStr) {
    var json = (jsonStr) ? eval("(" + jsonStr + ")") : "";
    if (json && json.status == 1) {
        var htmlStr = '<a target="_blank" href="' + json.ws_link + '"><img src="' + json.logo_url + '" /><span class="walkscore-scoretext">' + json.walkscore + "</span></a>"
    } else {
        if (json && json.status == 2) {
            var htmlStr = '<a target="_blank" href="' + json.ws_link + '"><img src="' + json.logo_url + '" /> <span class="walkscore-noscoretext">Get Score</span></a>'
        } else {
            var htmlStr = '<a target="_blank" href="http://www.walkscore.com"><img src="http://www2.walkscore.com/images/api-logo.gif" /> <span class="walkscore-noscoretext">Get Score</span></a> '
        }
    }
    var infoIconHtml = '<span id="ws_info"><a href="http://www.walkscore.com/how-it-works.shtml" target="_blank"><img src="http://cdn.walkscore.com/images/api-more-info.gif" width="13" height="13"" /></a></span>';
    htmlStr = "<p>" + htmlStr + infoIconHtml + "</p>";
    return htmlStr
}

function updateShowingTimeListings() {
    if (typeof(isShowingTimeEnabled) == "undefined" || !isShowingTimeEnabled) {
        return false
    }
    var c = document.getElementById(dataController.getTargetFrame()).contentWindow;
    var f = c.$(".skittles").length;
    var d = c.$(".links").length;
    if (f + d < 1) {
        return false
    }
    var b = (dataController.CurrentPageSize * dataController.CurrentPage) - dataController.CurrentPageSize;
    var e = b + dataController.CurrentPageSize;
    var a = dataController.getListingSet(b, (e > dataController.TotalRecords ? dataController.TotalRecords : e), false);
    showBlockUiMessage("Updating Showing Time Listing(s)...");
    $.ajax({
        type: "POST",
        dataType: "json",
        timeout: 30000,
        data: {
            ids: a
        },
        url: showingTimeListingStatusUrl,
        success: function(h, g) {
            if (h.status == "OK") {
                showShowingTimeIcons(h.message)
            } else {
                $.jGrowl(h.message);
                cleanupContextMenu();
                hideBlockUiMessage();
                return false
            }
        },
        error: function(i, h, g) {
            if (!this.ajaxRetryOnError(i, g)) {
                cleanupContextMenu();
                hideBlockUiMessage()
            }
        }
    })
}

function showShowingTimeIcons(c) {
    showBlockUiMessage("Processing Received Listing(s) List...");
    var a = JSON.parse(c);
    var b = document.getElementById(dataController.getTargetFrame()).contentWindow;
    jQuery.each(a, function(e, d) {
        b.$(".f-integration-showingtime[class*=f-listing-" + d + "\\:],.f-integration-showingtime.f-listing-" + d).show().addClass("f-integration-showingtime-enabled")
    });
    cleanupShowingTimeItems(b.$);
    cleanupContextMenu();
    hideBlockUiMessage()
}

function updateDocCentralPublicListings() {
    if (typeof(isDocCentralPublicEnabled) == "undefined" || !isDocCentralPublicEnabled) {
        return false
    }
    var c = document.getElementById(dataController.getTargetFrame()).contentWindow;
    var f = c.$(".skittles").length;
    var d = c.$(".links").length;
    if (f + d < 1) {
        return false
    }
    var b = (dataController.CurrentPageSize * dataController.CurrentPage) - dataController.CurrentPageSize;
    var e = b + dataController.CurrentPageSize;
    var a = dataController.getListingSet(b, (e > dataController.TotalRecords ? dataController.TotalRecords : e), false);
    showBlockUiMessage("Updating DocCentral Public Documents Listing(s)...");
    $.ajax({
        type: "POST",
        dataType: "json",
        data: {
            ids: a
        },
        url: docCentralPublicListingStatusUrl,
        success: function(h, g) {
            if (h.status == "OK") {
                showDocCentralPublicIcons(h.message)
            } else {
                $.jGrowl(h.message);
                cleanupContextMenu();
                hideBlockUiMessage();
                return false
            }
        },
        error: function(i, h, g) {
            if (!this.ajaxRetryOnError(i, g)) {
                cleanupContextMenu();
                hideBlockUiMessage()
            }
        }
    })
}

function showDocCentralPublicIcons(c) {
    if (c.length < 1) {
        return false
    }
    showBlockUiMessage("Processing Received Listing(s) List...");
    var b = document.getElementById(dataController.getTargetFrame()).contentWindow;
    var a = JSON.parse(c);
    jQuery.each(a, function(e, h) {
        var d = h.ListingID;
        var f = h.AccessCode;
        var g = b.$("[class*=f-listing-" + d + "][class*=f-integration-doccentralpublic]");
        g.parent().attr("rel", f);
        g.show().addClass("f-integration-doccentralpublic-enabled")
    });
    cleanupDocCentralItems(b.$);
    cleanupContextMenu();
    hideBlockUiMessage()
}

function showBlockUiMessage(b) {
    var c = document.getElementById(dataController.getTargetFrame()).contentWindow.$;
    var a = c("#BlockUiMessage");
    if (a.length == 0) {
        c('<div id="BlockUiMessage" />').appendTo("body");
        a = c("#BlockUiMessage").css({
            position: "absolute",
            top: c(document.getElementById(dataController.getTargetFrame()).contentWindow).height() - 17,
            height: 16,
            width: "100%",
            zIndex: 999
        })
    }
    a.show().block({
        message: b,
        fadeIn: 0,
        overlayCSS: {
            backgroundColor: "#000",
            opacity: 0.2
        },
        css: {
            border: "none",
            backgroundColor: "#000",
            "-webkit-border-radius": "10px",
            "-moz-border-radius": "10px",
            opacity: 0.85,
            color: "#fff",
            fontSize: "125%",
            fontWeight: "bold"
        }
    })
}

function hideBlockUiMessage() {
    var a = document.getElementById(dataController.getTargetFrame()).contentWindow.$;
    a("#BlockUiMessage").unblock().hide()
}

function cleanupShowingTimeItems(a) {
    a(".f-integration-showingtime:not(.f-integration-showingtime-enabled)").parent().parent("li.f-context-menu-item").andSelf().remove()
}

function cleanupDocCentralItems(a) {
    a(".f-integration-doccentralpublic:not(.f-integration-doccentralpublic-enabled)").parent().parent("li.f-context-menu-item").andSelf().remove()
}

function cleanupContextMenu() {
    var a = document.getElementById(dataController.getTargetFrame()).contentWindow.$;
    a("img.f-integration-context").each(function() {
        var b = a("#" + a(this).attr("rel"));
        var c = b.find("li.f-context-menu-item");
        if (c.length == 0) {
            b.remove();
            a(this).remove()
        }
    })
}
var integrationSkittles = function() {
    return {
        RedirectAndDocCentralClickHandler: function() {
            $("a img.f-integration-redirect,a img.f-integration-postredirect,a [class*=f-integration-doccentralpublic]").siblings("span").andSelf().click(function(d) {
                d.preventDefault();
                d.stopImmediatePropagation();
                var a = $(this).parent();
                var g = a.attr("hideaddressbar") == "True";
                var c = a.attr("hideaddressbar") == "True";
                var b = a.prop("rel").length > 0 ? "?accesskey=" + a.prop("rel") : "";
                var f = a.attr("href") + b;
                if (parent.parent.window.openNewBrowser && (c || g)) {
                    parent.parent.window.openNewBrowser(f, c, g)
                } else {
                    window.open(f)
                }
            })
        },
        ApplyAdvancedTooltips: function() {
            var a = new RegExp(/(?=.*\bf-integrationPointId-(\d+)\b)(?=.*\bf-listing-(\d+)\b)(?=.*\bf-integration-template-id-(\d+)\b)/);
            $("img[class*=f-integration]").each(function() {
                if ($(this).data("useadvancedtooltip") !== true) {
                    return true
                }
                var c = $(this).attr("class");
                if (c.length < 1) {
                    return true
                }
                var b = a.exec(c);
                if (!b || b.length < 4) {
                    return true
                }
                var d = toolTipUrl + "/" + b[3] + "/" + b[2] + "?point=" + b[1];
                $(this).qtip({
                    style: {
                        name: "cream",
                        tip: true
                    },
                    position: {
                        corner: {
                            target: "bottomMiddle",
                            tooltip: "topMiddle",
                        },
                        adjust: {
                            screen: true
                        }
                    },
                    content: {
                        url: d,
                    }
                })
            })
        },
        RedirectSupraKeyboxSettingsClickHander: function() {
            $("a img.f-integration-supra").on("click", function(b) {
                b.preventDefault();
                var c = 858,
                    a = 606;
                if ($(this).attr("cboxwidth")) {
                    c = $(this).attr("cboxwidth")
                }
                if ($(this).attr("cboxheight")) {
                    a = $(this).attr("cboxheight")
                }
                parent.$.fn.colorbox({
                    href: $(this).parent().attr("href") + "?viewOptions=2",
                    iframe: true,
                    width: c,
                    height: a,
                    title: "Supra Keybox Settings Report",
                    close: '<button onclick="$.fn.colorbox.close();" id="Close">Cancel</button>',
                    onClosed: false
                })
            })
        }
    }
}();
$(function() {
    $("a.f-integration-redirect,a.f-integration-postredirect,a.f-integration-doccentralpublic").click(function(a) {
        a.preventDefault();
        var b = $(this).attr("fullWindow");
        var e = $(this).attr("hideAddressBar");
        var f = null;
        var c = null;
        var d = null;
        DoIntegrationPointReDirect(this.href, f, c, b, e, d)
    });
    $("a.f-integration-multiredirect").click(function(a) {
        a.preventDefault();
        var g = $(this);
        var b = g.attr("fullWindow") || g.hasClass("f-integration-full-window");
        var i = g.attr("hideAddressBar") || g.hasClass("f-integration-hide-address-bar");
        var j = null;
        var c = null;
        var d = null;
        var k = window.dataController.getSelectedListings();
        if (k == "") {
            $.jGrowl("Please select one or more listings.");
            return
        }
        if (g.attr("rel") != "") {
            var e = k.split(",").length;
            var f = g.attr("rel");
            if (f < e) {
                $.jGrowl("You have selected too many listings for this integration (maximum: " + f + ").  Please reduce the number of selected listings and try again.", {
                    life: 5000
                });
                return
            }
        }
        var h = this.href.replace(/%7BlistingId%7D/i, k);
        DoIntegrationPointReDirect(h, j, c, b, i, d)
    })
});

function DoIntegrationPointReDirect(g, c, b, e, a, d) {
    var f = getWindowSettings(c, b, e, a, d);
    var h = getWindowOptions(f);
    window.open(g, f.name, h.join(","));
    return false
}

function DoIntegrationPointRequestRedirect(e, f, g, c, a, b) {
    if (e.length > 0) {
        var d = (e.indexOf("MlsAdvantage") > 0);
        $.ajax(e, {
            timeout: 8000,
            success: function(k, i) {
                if (k == null || k.status == "error" || k.message.length < 1) {
                    $.jGrowl((d ? "MlsAdvantage" : "Form Simplicity") + " denied service access.", {
                        life: 5000
                    });
                    return
                }
                e = k.message;
                if (parent.parent.window.openNewBrowser && (c || a)) {
                    parent.parent.window.openNewBrowser(e, c, a)
                } else {
                    var h = getWindowSettings(winHeight, winWidth, c, a, b);
                    var j = getWindowOptions(h);
                    window.open(e, h.name, j.join(","))
                }
            },
            error: function() {
                $.jGrowl((d ? "MlsAdvantage" : "Form Simplicity") + " service is not available.", {
                    life: 5000
                });
                return
            }
        })
    } else {
        $.jGrowl("Form Simplicity/MlsAdvantage service is not available.", {
            life: 5000
        });
        return
    }
}

function getWindowSettings(c, b, e, a, d) {
    var f = {
        name: "_blank",
        windowOpts: {
            status: "yes",
            titlebar: "yes",
            toolbar: "yes",
            left: null,
            top: null,
            width: null,
            height: null,
            location: "yes",
            scrollbars: "yes"
        }
    };
    if (c != null || b != null) {
        f.windowOpts.width = b;
        f.windowOpts.height = c
    }
    if (e !== undefined && ((typeof(e) === "string" && e.toLowerCase() == "true") || (typeof(e) === "boolean" && e))) {
        var h = 1020;
        var g = 713;
        if (screen) {
            h = parseInt(screen.width, 10) - 16;
            g = parseInt(screen.height, 10) - 60
        }
        f.windowOpts.status = "no";
        f.windowOpts.titlebar = "no";
        f.windowOpts.toolbar = "no";
        f.windowOpts.left = "0";
        f.windowOpts.top = "0";
        f.windowOpts.width = h;
        f.windowOpts.height = g
    }
    if (a !== undefined && ((typeof(a) === "string" && a.toLowerCase() == "true") || (typeof(a) === "boolean" && a))) {
        f.windowOpts.location = "no"
    }
    $.extend(f, d);
    return f
}

function getWindowOptions(a) {
    var c = [];
    for (var b in a.windowOpts) {
        if (a.windowOpts.hasOwnProperty(b) && a.windowOpts[b] != null) {
            c.push(b + "=" + a.windowOpts[b])
        }
    }
    return c
};
$(function() {
    $("a.f-integration-hillsidecart-link").click(function(a) {
        a.preventDefault();
        var e = $(this);
        var b = "What list would you like to add this listing to?";
        var c = prompt(b, "");
        if (c == null) {
            return
        }
        var d = e.attr("href") + "?ids=" + e.find("img.f-integration-hillsidecart-link").attr("listingid") + "&name=" + encodeURIComponent(c);
        UpdateHillside(d)
    });
    $("a.f-integration-multihillsidecart").click(function(b) {
        b.preventDefault();
        var e = $(this);
        var g = window.dataController.getSelectedListings();
        if (g == "") {
            $.jGrowl("Please select one or more listings.");
            return
        }
        var c = g.split(",").length;
        if (e.attr("rel") != "") {
            var d = e.attr("rel");
            if (d < c) {
                $.jGrowl("You have selected too many listings for this integration (maximum: " + d + ").  Please reduce the number of selected listings and try again.", {
                    life: 5000
                });
                return
            }
        }
        var a = c == 1 ? "What list would you like to add this listing to?" : "What list would you like to add these listings to?";
        var h = prompt(a, "");
        if (h == null) {
            return
        }
        var f = this.href + "?ids=" + g + "&name=" + encodeURIComponent(h);
        UpdateHillside(f)
    })
});

function UpdateHillside(a) {
    $.ajax({
        url: a
    }).done(function(b) {
        $.jGrowl(b.result)
    })
};
var _inColorBox = false;
$(function() {
    var a = function(c) {
        var b = /f-listing-(\d+:*\d+)/.exec(c.attr("class"));
        if (b != null && b.length > 1) {
            b = b[1].split(":")
        } else {
            b = []
        }
        return b
    };
    if (parent.dataController != null) {
        parent.dataController.syncView(currentViewId);
        if (parent.dataController.CurrentViewID == 26) {
            $("input.selectDoc").click(PushSelectedDoc);
            if (parent.dataController.SelectedDocs.length > 0) {
                syncDoc();
                parent.$("#Email").removeClass("sf-disabled")
            } else {
                parent.$("#Email").addClass("sf-disabled")
            }
        }
    } else {
        $("a[class^='f-integration-'],a[class*=' f-integration-']").remove()
    }
    _inColorBox = (parent.parent.$("#cboxIframe").length > 0);
    if (typeof(parent.doReportIntegrationUpdates) != "undefined") {
        setTimeout(function() {
            parent.doReportIntegrationUpdates()
        }, 100)
    }
    $("a.DefaultLinkDetail").click(function() {
        var b = $(this).text();
        parent.dataController.loadDefaultView(b, 0, false)
    });
    $("a[modalType]").click(function(b) {
        var g = $(this).attr("rel");
        var f = $(this).attr("modalType");
        var d = $(this).attr("modalTitle");
        var c = parent.parent.$;
        if (_inColorBox) {
            c = $
        }
        if (d == "") {
            d = "Modal Report"
        }
        c.fn.colorbox({
            href: modalReportUrl + "?sharedID=" + g + "&modalType=" + f,
            open: true,
            iframe: true,
            width: 700,
            height: 400,
            title: d,
            close: '<button id="Close">Close</button>'
        })
    });
    $("a.f-integration-TaxListingView-link").click(function(b) {
        b.preventDefault();
        parent.parent.$.fn.colorbox({
            href: parent.dataController.loadIntegrationView($(this).attr("listid"), "", "Paragon Tax"),
            open: true,
            iframe: true,
            width: $(this).attr("cboxwidth"),
            height: $(this).attr("cboxheight"),
            close: '<button id="Close" onClick="javascript:$.fn.colorbox.close();">Close</button>',
            title: $(this).text(),
            onClosed: false
        })
    });
    $("a img.f-integration-colorbox-link, a img.f-integration-minbox-link").click(function(g) {
        g.preventDefault();
        var h = $(this);
        var i = a(h);
        var b = h.attr("cboxwidth");
        b = b != null && b.length > 0 ? b : 875;
        var j = h.attr("cboxheight");
        j = j != null && j.length > 0 ? j : 500;
        var d = window.top.getAppHeight();
        j = d > j ? j : d - 50;
        parent.dataController.ShowAds = false;
        var c = parent.dataController.loadIntegrationView(i[0], i.length > 1 ? i[1] : 0, h.attr("alt"));
        if (c == "") {
            c = $(this).parent().attr("href")
        }
        var f = {
            href: c,
            open: true,
            iframe: true,
            width: b,
            height: j,
            close: '<button id="Close" onClick="javascript:$.fn.colorbox.close();">Close</button>',
            title: $(this).attr("alt"),
            onClosed: false
        };
        if (h.hasClass("f-integration-minbox-link")) {
            $.extend(f, {
                minUrl: f.href,
                minName: h.attr("alt"),
                alwaysOverwrite: true,
                close: '<button id="Minimize">Minimize</button><button id="Close">Close</button>'
            });
            f.href = null;
            parent.parent.$.fn.minbox(f)
        } else {
            parent.parent.$.fn.colorbox(f)
        }
    });
    $("a img.f-integration-searchview-link").click(function(b) {
        b.preventDefault();
        var c = a($(this));
        location.href = parent.dataController.loadIntegrationView(c[0], c.length > 1 ? c[1] : 0, $(this).attr("alt"))
    });
    $(".listingCheckBox").each(function() {
        if (parent.dataController != null) {
            var b = String($(this).attr("rel")).split(":");
            if (b.length == 2) {
                $(this).prop("checked", parent.dataController.isSelected(b[0], b[1]))
            }
        }
    });
    $(".listingCheckBox").click(function() {
        if (parent.dataController != null) {
            var e = String($(this).attr("rel")).split(":");
            if (e.length == 2) {
                var d = $(this).prop("checked");
                var b = e[0];
                var c = e[1];
                if (e[0] == "") {
                    e = String($(this).attr("id")).split("_");
                    b = e[1];
                    c = e[2]
                }
                parent.dataController.selectID(b, c, d)
            }
        }
    });
    $(".f-audit-detail-report-hide-trans-link").click(function() {
        if (parent.dataController != null) {
            var e = String($(this).attr("rel")).split(":");
            if (e.length == 2) {
                var d = $(this).prop("checked");
                var b = e[0];
                var c = e[1];
                hideListingTransaction(b, c, d)
            }
        }
    });
    if (parent.$("#cboxClose").length > 0 && parent.$("#cboxClose").html().indexOf("Print") < 0) {
        parent.$("#cboxClose").append('<button id="Print">Print</button>');
        parent.$("#Print").insertBefore("#Close")
    } else {
        parent.$("#cboxClose").html("");
        parent.$("#cboxClose").append('<button id="Print">Print</button><button id="Close">Close</button>')
    }
    parent.$("#Close").click(function() {
        parent.$.fn.colorbox.close()
    });
    parent.$("#Print").click(function() {
        var b = parent.document.getElementById("cboxIframe").contentWindow;
        b.focus();
        DoPrintWithBrowserCheck(b)
    });
    if (_inColorBox && isTabletDevice()) {
        $("#divHtmlReport").css("overflow", "auto").height("530px")
    }
    integrationSkittles.ApplyAdvancedTooltips();
    // if (autoPrint) {
    //     window.setTimeout(function() {
    //         window.focus();
    //         if ($.browser.msie) {
    //             window.document.execCommand("print", false, null)
    //         } else {
    //             DoPrintWithBrowserCheck(window)
    //         }
    //     }, 100)
    // }
});

function syncDoc() {
    var a = parent.dataController.SelectedDocs;
    $("input.selectDoc").each(function() {
        var c = $(this).attr("rel");
        for (var b = 0; b < a.length; b++) {
            if (a[b] == c) {
                $(this).prop("checked", true);
                break
            }
        }
    })
}

function PushSelectedDoc() {
    var a = parent;
    var c = $(this).prop("checked");
    var b = $(this).attr("rel");
    if (c == false) {
        a.dataController.popSelectedDoc(b)
    } else {
        a.dataController.pushSelectedDoc(b)
    }
    if (a.dataController.SelectedDocs.length > 0) {
        a.$("#Email").removeClass("sf-disabled")
    } else {
        a.$("#Email").addClass("sf-disabled")
    }
}

function ShowEmail(a, c) {
    var b = "";
    if (parent.dataController.SelectedDocs.length > 0) {
        b = parent.dataController.SelectedDocs.join()
    }
    parent.parent.$.fn.minbox({
        minUrl: emailManagerUrl + "?to=" + a + "&subject=" + c + "&attachments=" + b,
        minName: "email",
        open: true,
        width: "905px",
        height: "620px",
        title: "Compose E-Mail",
        close: '<button id="sendMail">Send</button><button id="Minimize">Minimize</button><button id="cancel">Cancel</button>',
        onClosed: false
    })
}

function GetContent(d) {
    var c = "22";
    if (parent.dataController != null) {
        c = parent.dataController.getDefaultViewID()
    } else {
        var e = $("#searchId").val();
        var a = parent.document.getElementById(e);
        if (a != null && a.contentWindow.dataController != null) {
            c = a.contentWindow.dataController.getDefaultViewID()
        }
    }
    var b = reportUrl + "&listingIDs=" + d + "&viewID=" + c;
    parent.parent.$.fn.colorbox({
        href: b,
        transition: "none",
        open: true,
        iframe: true,
        width: "840",
        height: "600",
        close: '<button id="Close">Close</button>',
        title: "Listing Report"
    });
    parent.parent.$("#Close").click(function() {
        parent.parent.$.fn.colorbox.close()
    })
}

function showFullAuditDetail(f, c, a, b, e) {
    var d = reportUrl + "&outputtype=HTML&IsCurrent=" + f.toString() + "&num=" + c + "&listingIDs=" + a + "&viewID=" + b + "&AuditFullDetailAuditNum=" + e;
    parent.parent.$.fn.colorbox({
        href: d,
        transition: "none",
        open: true,
        iframe: true,
        width: "930",
        height: "600",
        close: '<button id="Close">Close</button>',
        title: "Audit Detail",
        onClosed: false
    });
    parent.parent.$("#Close").click(function() {
        parent.parent.$.fn.colorbox.close()
    });
    parent.parent.$("#Email").click(function() {
        var g;
        if (e == 999) {
            g = "Audit Detail Report for " + window.top.$.focusFx.mlsText + " " + a + " - Current Audit Version"
        } else {
            g = "Audit Detail Report for " + window.top.$.focusFx.mlsText + " " + a + " - Audit Version " + e
        }
        ShowEmail("", g)
    });
    parent.parent.$("#Print").click(function() {
        DoPrintWithBrowserCheck(window)
    })
}

function hideListingTransaction(c, b, a) {
    $.ajax({
        url: window.auditDetailHideTransactionUrl,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            id: c,
            id2: b,
            isChecked: a
        }),
        datatype: "json",
        beforeSend: function(d) {
            $.blockUI({
                message: "<h1>Processing Request</h1>"
            })
        },
        success: function(e, d) {
            $.unblockUI();
            if (e.status == "OK") {
                $.jGrowl("Property History Updated.")
            } else {
                $.jGrowl(e.result, {
                    sticky: true
                })
            }
        },
        error: function(e, f, d) {
            $.unblockUI();
            this.ajaxRetryOnError(e, "Could not hide property history.")
        }
    })
}

function getCurrentView(b, a) {
    if (typeof(parent.dataController) != "undefined") {
        parent.dataController.loadDefaultView(b, a, false)
    } else {
        $.jGrowl("Default view can only be loaded from search results.", {
            life: 5000
        })
    }
}

function selectSSRow(c) {
    var b = c.id.split("_");
    var a = {
        ID: b[1],
        UniqueID: b[2]
    };
    if ($("#" + c.id).prop("checked")) {
        parent.dataController.SelectedIDs.push(a)
    }
}

function doAssocDocs(b, a) {
    window.location = parent.dataController.loadIntegrationView(b, "0", "Associated Docs")
};
var _SmartMap = null;
var _QuickMap = null;
$(function() {
    $(".f-integration-digimap-link").click(function(a) {
        setupDigiMap(a, $(this))
    })
});

function setupDigiMap(b, a) {
    b.preventDefault();
    b.stopImmediatePropagation();
    var c = a.attr("url");
    if (c == null || c.length == 0) {
        c = a.parent().attr("href")
    }
    $.blockUI();
    $.ajax({
        url: c,
        dataType: "json",
        success: function(d) {
            if (d.status == "OK" || d.status == "WARNING") {
                if (d.status == "OK" || confirm(d.message)) {
                    doDigiMap(d.result.url, d.result.addressNumber, d.result.addressDirection, d.result.addressStreet, d.result.address2, d.result.city, d.result.state, d.result.zip, d.result.zip6, d.result.app, d.result.userCode)
                }
            } else {
                $.jGrowl(d.result)
            }
        },
        error: function(d) {
            this.ajaxRetryOnError(d, "The server encountered an unexpected error with Digital Mapping.")
        }
    }).always(function() {
        $.unblockUI()
    })
}

function doDigiMap(a, h, i, f, c, g, b, j, k, d, e) {
    gAddr = "";
    gCity = "";
    gZip = "";
    gState = "";
    if (!h.length == 0) {
        gAddr += h
    }
    if (!i.length == 0) {
        gAddr += " " + i
    }
    if (!f.length == 0) {
        gAddr += " " + f
    }
    if (!c.length == 0) {
        gAddr += " " + c
    }
    gCity = g;
    gZip = j;
    if (!k.length == 0) {
        gZip += " " + k
    }
    gState = b;
    if (_SmartMap == null) {
        _SmartMap = new __DMPSmartMapInterface(a, "_SmartMap", 800, 600, e)
    }
    if (_QuickMap == null) {
        _QuickMap = new __DMPQuickMapInterface(a, "_QuickMap", _SmartMap, e)
    }
    if (d == "pinpoint") {
        _SmartMap.queryByAddress(gAddr, gCity, gState, gZip)
    } else {
        _QuickMap.queryByLocation(null, null, gAddr, gCity, gState, gZip)
    }
}

function __DMPSmartMapInterface(l, q, e, n, u) {
    var k = "toolbar=no,menubar=no,location=no,resizable=yes";
    if (e == null || isNaN(e) || e < 100) {
        e = 800
    }
    if (n == null || isNaN(n) || n < 100) {
        n = 600
    }
    k += ",height=" + n + ",width=" + e;
    var m = "SmartMap";
    var c = "MSXML2.DOMDocument.3.0";
    var d = null;
    var t = false;
    var o = null;
    var i = null;
    var v = null;
    var f = null;
    var b = null;
    var s = null;
    var g = null;
    var p = null;
    var j = null;
    var a = null;
    var r = null;
    var h = null;
    this.mapWindowExists = function() {
        try {
            if (o != null && o.closed != true) {
                return true
            }
        } catch (w) {}
        return false
    };
    this.isMapReady = function() {
        if (this.mapWindowExists() == false) {
            t = false;
            this.openMap()
        }
        return t
    };
    this.getMapReferenceOnAncestor = function(w) {
        try {
            if (w == null) {
                return null
            }
            if (w._SmartMapWindow != null && w._SmartMapWindow.window.closed != true) {
                return w._SmartMapWindow
            }
            var y = null;
            if (w.parent != w) {
                y = this.getMapReferenceOnAncestor(w.parent)
            }
            if (y != null) {
                return y
            }
            return this.getMapReferenceOnAncestor(w.opener)
        } catch (x) {
            return null
        }
    };
    this.setMapReferenceOnAncestor = function(x, w) {
        try {
            if (x == null) {
                return
            }
            x._SmartMapWindow = w;
            if (x.parent != x) {
                this.setMapReferenceOnAncestor(x.parent, w)
            }
            if (x.opener != null) {
                this.setMapReferenceOnAncestor(x.opener, w)
            }
        } catch (y) {}
    };
    this.openMap = function() {
        try {
            if (this.mapWindowExists()) {
                o.focus();
                return
            }
            o = this.getMapReferenceOnAncestor(window);
            if (o == null) {
                o = window.open(l + "?APPLICATION=" + m + "&AgentId=" + u, q, k);
                this.setMapReferenceOnAncestor(window, o)
            } else {
                t = true;
                d = o.window.gObjectManager
            }
            o.opener = window;
            o.window.focus()
        } catch (w) {
            alert(m + ".openMap(): " + w.description)
        }
    };
    this.callBack = function(y) {
        try {
            var w = y.replace(/[\w|\s|>|<|"|']*eventName='([\w]+)'[\w|\s|>|<|/|'|"]*/g, "$1");
            if (w == "MapLoad") {
                t = true;
                d = o.window.gObjectManager;
                if (h == "address" && s == "" && g == "" && p == "" && j == "") {
                    h = "query"
                }
                if (h == "query") {
                    this.query(i, v)
                } else {
                    if (h == "apn") {
                        this.queryByAPNs(f, b)
                    } else {
                        if (h == "address") {
                            this.queryByAddress(s, g, p, j)
                        } else {
                            if (h == "intersection") {
                                this.queryByIntersection(a, r, b)
                            } else {
                                if (h == "Location") {
                                    this.queryByLocation(f, b, s, g, p, j)
                                }
                            }
                        }
                    }
                }
            }
        } catch (x) {
            alert(m + ".callBack(): " + x.description)
        }
    };
    this.query = function(x, w) {
        try {
            h = "query";
            i = x;
            v = w;
            if (this.isMapReady() != true) {
                return
            }
            if (x == null || w == null) {
                return
            }
            var z = d.constructObject("SmartMapCatalog:QueryHandler");
            z.setResourceName(x);
            o.window.focus();
            z.query(w)
        } catch (y) {
            alert(m + '.query(resource="' + x + '", condition="' + w + '"): ' + y.description)
        }
    };
    this.queryByAPNs = function(w, y) {
        try {
            h = "apn";
            f = w;
            b = y;
            if (this.isMapReady() != true) {
                return
            }
            if (w == null || y == null) {
                return
            }
            var z = d.constructObject("SmartMapCatalog:QueryHandler");
            o.window.focus();
            z.queryByAPNs(w, y)
        } catch (x) {
            alert(m + '.queryByAPNs(APN="' + w + '", fips="' + y + '"): ' + x.description)
        }
    };
    this.queryByAddress = function(y, A, w, z) {
        try {
            h = "address";
            s = y;
            g = A;
            p = w;
            j = z;
            if (this.isMapReady() != true) {
                return
            }
            if (y == null || (A == null && z == null)) {
                return
            }
            var x = d.constructObject("SmartMapCatalog:QueryHandler");
            o.window.focus();
            x.queryByAddress(y, A, w, z)
        } catch (B) {
            alert(m + '.queryByAddress(address="' + y + '", city="' + A + '", state="' + w + '", zip="' + z + '"): ' + B.description)
        }
    };
    this.queryByLocation = function(C, w, z, x, B, A) {
        try {
            h = "Location";
            f = C;
            b = w;
            s = z;
            g = x;
            p = B;
            j = A;
            if (this.isMapReady() != true) {
                return
            }
            if (z == null || (x == null && A == null)) {
                return
            }
            var y = d.constructObject("SmartMapCatalog:QueryHandler");
            o.window.focus();
            y.queryByLocation(C, w, z, x, B, A)
        } catch (D) {
            alert(m + '.queryByLocation(apn="' + C + '", fips="' + w + '", address="' + z + '", city="' + x + '", state="' + B + '", zip="' + A + '"): ' + D.description)
        }
    };
    this.queryByIntersection = function(w, y, z) {
        try {
            h = "intersection";
            a = w;
            r = y;
            b = z;
            if (this.isMapReady() != true) {
                return
            }
            if (w == null && y == null && z == null) {
                return
            }
            var A = d.constructObject("SmartMapCatalog:QueryHandler");
            o.window.focus();
            A.queryByIntersection(w, y, z)
        } catch (x) {
            alert(m + '.queryByIntersection(street1="' + w + '", street2="' + y + '", fips="' + z + '"): ' + x.description)
        }
    }
}

function __DMPQuickMapInterface(h, o, d, r) {
    var a = "MSXML2.DOMDocument.3.0";
    var j = "QuickMap";
    var b = 509;
    var k = 455;
    var g = "status=yes,toolbar=no,menubar=no,location=no,fullscreen=no";
    g += ",height=" + k + ",width=" + b;
    var q = false;
    var l = null;
    var i = null;
    var c = null;
    var m = null;
    var p = null;
    var e = null;
    var n = null;
    var f = null;
    this.exists = function() {
        return true
    };
    this.mapWindowExists = function() {
        try {
            if (l != null && l.closed != true) {
                var t = l.window.environment.packages.getValue("ExternalAppIntegration");
                if (t != null) {
                    return true
                }
            }
        } catch (s) {}
        return false
    };
    this.isMapReady = function() {
        if (this.mapWindowExists() == false) {
            q = false;
            this.openMap()
        }
        return q
    };
    this.getMapReferenceOnAncestor = function(s) {
        try {
            if (s == null) {
                return null
            }
            if (s._QuickMapWindow != null && s._QuickMapWindow.window.closed != true) {
                return s._QuickMapWindow
            }
            var u = null;
            if (s.parent != s) {
                u = this.getMapReferenceOnAncestor(s.parent)
            }
            if (u != null) {
                return u
            }
            return this.getMapReferenceOnAncestor(s.opener)
        } catch (t) {
            return null
        }
    };
    this.setMapReferenceOnAncestor = function(t, s) {
        try {
            if (t == null) {
                return
            }
            t._QuickMapWindow = s;
            if (t.parent != t) {
                this.setMapReferenceOnAncestor(t.parent, s)
            }
            if (t.opener != null) {
                this.setMapReferenceOnAncestor(t.opener, s)
            }
        } catch (u) {}
    };
    this.openMap = function() {
        try {
            if (this.mapWindowExists()) {
                l.focus();
                return
            }
            l = this.getMapReferenceOnAncestor(window);
            if (l == null) {
                l = window.open(h + "?APPLICATION=" + j + "&AgentId=" + r, o, g);
                this.setMapReferenceOnAncestor(window, l)
            } else {
                q = true
            }
            l.opener = window;
            l.window.focus()
        } catch (s) {
            alert(j + ".openMap(): " + s.description)
        }
    };
    this.callBack = function(u) {
        try {
            q = true;
            var s = u.replace(/[\w|\s|>|<|"|']*eventName='([\w]+)'[\w|\s|>|<|/|'|"]*/g, "$1");
            if (s == "MapLoad") {
                q = true;
                gObjectManager = l.window.gObjectManager;
                if (i == "APN") {
                    this.queryByAPNs(c, m)
                } else {
                    if (i == "Location") {
                        this.queryByLocation(c, m, p, e, n, f)
                    }
                }
            } else {
                if (s == "OpenSmartMap") {
                    this.openSmartMap(c, m, p, e, n, f)
                }
            }
        } catch (t) {
            alert(j + ".callBack(): " + t.description)
        }
    };
    this.queryByAPNs = function(s, u) {
        try {
            c = s;
            m = u;
            i = "APN";
            if (this.isMapReady() != true) {
                return
            }
            if (s == null || u == null) {
                return
            }
            l.window.focus();
            var v = l.window.environment.packages.getValue("ExternalAppIntegration");
            v.queryByAPNs(s, u)
        } catch (t) {
            alert(j + '.queryByAPNs(APN="' + s + '", fips="' + u + '"): ' + t.description)
        }
    };
    this.queryByLocation = function(y, s, v, t, x, w) {
        try {
            if (y != null) {
                y = y.toString()
            }
            c = y;
            m = s;
            p = v;
            e = t;
            n = x;
            f = w;
            i = "Location";
            if (this.isMapReady() != true) {
                return
            }
            l.window.focus();
            var u = l.window.environment.packages.getValue("ExternalAppIntegration");
            u.queryByLocation(y, s, v, t, x, w)
        } catch (z) {
            alert(j + '.queryByAPNs(APN="' + y + '", fips="' + s + '"): ' + z.description)
        }
    };
    this.openSmartMap = function(x, s, u, t, w, v) {
        try {
            if (d == null) {
                return
            }
            if (x == null && (u == null || (t == null && v == null))) {
                d.openMap()
            } else {
                d.queryByLocation(x, s, u, t, w, v)
            }
        } catch (y) {
            alert("QuickMap.openSmartMap('" + apns + "', " + s + ") error: " + y.description)
        }
    }
};
