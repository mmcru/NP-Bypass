var tabs = require("sdk/tabs");
var events = require("sdk/system/events");
var utils = require("sdk/window/utils");
const { Cc, Ci, Cr } = require("chrome");


function listener(event) {
    var channel = event.subject.QueryInterface(Ci.nsIHttpChannel);
    var url = event.subject.URI.spec;

    if (url.match(/^https?\:\/\/np\.reddit\.com\/?$|^https?\:\/\/np\.reddit\.com\/r\//)) {

        var newUrl = url.replace("np.reddit.com", "www.reddit.com");

        channel.cancel(Cr.NS_BINDING_ABORTED);

        var gBrowser = utils.getMostRecentBrowserWindow().gBrowser;
        var domWin = channel.notificationCallbacks.getInterface(Ci.nsIDOMWindow);
        var browser = gBrowser.getBrowserForDocument(domWin.top.document);

        browser.loadURI(newUrl);
    }
}

exports.main = function() {
    events.on("http-on-modify-request", listener);
}
