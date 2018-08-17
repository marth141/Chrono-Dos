/**
 * Used to get all of the chrono sheets
 * @constructor
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} ss
 */
function MasterBacklogSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  /** @type GoogleAppsScript.Spreadsheet.Sheet */
  this.Report = ss.getSheetByName('Report');
  /** @type GoogleAppsScript.Spreadsheet.Sheet */
  this.Permit = ss.getSheetByName('PERMIT BACKLOG');
  /** @type GoogleAppsScript.Spreadsheet.Sheet */
  this.PermitRD = ss.getSheetByName('PERMIT RD BACKLOG');
  /** @type GoogleAppsScript.Spreadsheet.Sheet */
  this.FilterSettings = ss.getSheetByName('Filter Settings');
  /** @type GoogleAppsScript.Spreadsheet.Sheet */
  this.Cache = ss.getSheetByName('Cache');
}
