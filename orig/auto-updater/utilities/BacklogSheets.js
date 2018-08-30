/* globals
SpreadsheetApp
*/

/* exported
SourceSheetService
*/

var SourceSheetService = function () {
  this.inputSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Input");
  //Can add more sheets here as needed.
};