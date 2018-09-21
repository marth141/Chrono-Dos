/**
 * Used to clear tabs
 */
function clearTabs() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.getSheetByName('Backlog')
    .getRange('A2:L')
    .clear();
  ss.getSheetByName('Non Full Process')
    .getRange('A2:L')
    .clear();
}
