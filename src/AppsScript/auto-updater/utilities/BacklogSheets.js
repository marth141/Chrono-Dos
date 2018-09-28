/**
 * An object used to get sheets
 */
var SourceSheetService = function() {
  this.inputSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Input');
  // Can add more sheets here as needed.
};
