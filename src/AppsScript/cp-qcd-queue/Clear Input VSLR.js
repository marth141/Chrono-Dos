var ss = SpreadsheetApp.getActiveSpreadsheet();

/**
 * Used to clear tabs
 */
function clearAllTabs() {
  ss.getSheetByName('Queue')
    .getRange('H2')
    .setValue('REPORT BEING RUN');

  var check = ss.getSheetByName('Report Input');

  check
    .getRange('A:P')
    .clearContent()
    .clearFormat();
}
