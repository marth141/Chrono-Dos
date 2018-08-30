function createSomeSheets() {
  SpreadsheetApp.getActiveSpreadsheet().insertSheet("DOS PERMIT SHEET");
  SpreadsheetApp.getActiveSpreadsheet().insertSheet("DOS PERMIT RD SHEET");
  SpreadsheetApp.flush();
}
