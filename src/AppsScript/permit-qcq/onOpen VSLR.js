/**
 * Used when the ppQCQ Chrono opens to create scripts dropdown
 */
function ppQCQ_onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var menu = [{
    'name': 'Refresh Queue',
    'functionName': 'arrangeQueue'
  }];
  ss.addMenu('SCRIPTS', menu);
}
