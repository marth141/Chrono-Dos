/**
 * Used to get index page on first load
 * @param {*} e
 * @return {*}
 */
function doGet(e) {
  Logger.log(Utilities.jsonStringify(e));
  if (!e.parameter.page) {
    // When no specific page requested, return "home page"
    return HtmlService.createTemplateFromFile('index').evaluate();
  }
  // else, use page parameter to pick an html file from the script
  return HtmlService.createTemplateFromFile(e.parameter['page'])
    .evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Get the URL for the Google Apps Script running as a WebApp
 * @return {*}
 */
function getScriptUrl() {
  var url = ScriptApp.getService().getUrl();
  return url;
}

/**
 * Used to get content of a file
 * @param {*} filename
 * @return {*}
 */
function getContent(filename) {
  var return1 = HtmlService.createTemplateFromFile(filename).getRawContent();
  return return1;
}

/**
 * Used for testing
 */
function test() {
  var accountInfo = {
    'region': 'PERMIT',
    'serviceNumber': 'S-5881734',
    'designer': 'Eric Van Wagoner',
    'notes': 'Test',
    'unitType': 'OUTSOURCE',
    'status': 'On Hold'
  };
  var para = {
    'dept': 'PP',
    'name': 'Eric Van Wagoner',
    'sfName': 'Eric Van Wagoner (114607)',
    'email': 'eric.vanwagoner@vivintsolar.com',
    'team': 'Test',
    'includeOwnRegion': '',
    'regions': ['Test PP'],
    //    "regions": ["West","East", "New England", "Grit Empire"],
    'settings': {
      'GSR': 1,
      'AURORA': 0,
      'SNOW PROP': 0,
      'PART 1': 1,
      'CP RD': 0,
      'OTS GSR': 1,
      'OTS AURORA': 0,
      'PERMIT': 3,
      'CP MATCH': 1,
      'PERMIT RD': 2,
      'OUTSOURCE': 4
    },
    'filterRegions': {
      'exclude': false,
      'include': false,
      'offices': []
    }
  };
  try {
    var designer = getFilterSettings('eric.vanwagoner@vivintsolar.com');
    var check = getAssignment(designer);
    //    statusUpdate(accountInfo);
    //    var backlog = getMyAccounts(designer)
  } catch (e) {
    Logger.log('ERROR:', e);
  }
  var end = 0;
}

var cpChronoIds = [
  ['NIS', '1_qXC4VFhTth_SIaBMs8RGuGvvZVUjWPLmRKH_jxgVYQ'],
  ['Dealer', '1YIfEfnpL-aWqKQtDM5Pc2n8gzajkq_hudXOxZUBQS6k'],
  ['ONE', '1lGXtQB23DM9BErKP9Bgk-oOzIOXXirj9fPpOmLnChm8']
];

var ppChronoIds = [['PERMIT', '121UKskNpiVK2ocT8pFIx9uO6suw3o7S7C4VhiIaqzI0']];
