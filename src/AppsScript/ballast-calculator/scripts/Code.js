var exports = exports || {};
var module = module || { exports: exports };
function doGet() {
    return HtmlService.createTemplateFromFile("index")
        .evaluate()
        .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}
function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename)
        .setSandboxMode(HtmlService.SandboxMode.IFRAME)
        .getContent();
}
function searchContent(template, callbackname) {
    var res = new Array();
    res[0] = HtmlService.createTemplateFromFile(template).getRawContent();
    if (callbackname !== null) {
        res[1] = callbackname;
    }
    return res;
}
