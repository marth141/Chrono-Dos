/**
 * Used on open
 */
function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var menu = [{ name: 'Refresh Queue', functionName: 'arrangeQueue' }];
  ss.addMenu('SCRIPTS', menu);
}
