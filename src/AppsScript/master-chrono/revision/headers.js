// TODO: Get headers for backlogs accurately

/**
 * To debug the headers
 */
function debugHeaders() {
  var reportHeaders = new ReportHeaders();
  debugger;
}

/**
 * Used to get headers from REPORT, PERMIT Backlog, and PERMIT RD Backlog
 */
function ReportHeaders() {
  var headerRange = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName('Report')
    .getRange('G2:W2')
    .getValues()[0];
  this.service = headerRange.indexOf('SERVICE');
  this.solarProject = headerRange.indexOf('SOLAR PROJECT');
  this.cadObject = headerRange.indexOf('CAD OBJECT');
  this.office = headerRange.indexOf('OFFICE');
  this.backlogDate = headerRange.indexOf('BACKLOG DATE');
  this.dueDate = headerRange.indexOf('DUE DATE');
  this.contractType = headerRange.indexOf('CONTRACT TYPE');
  this.utilityCompany = headerRange.indexOf('UTILITY COMPANY');
  this.unitType = headerRange.indexOf('UNIT TYPE');
  this.assigned = headerRange.indexOf('ASSIGNED');
  this.priority = headerRange.indexOf('PRIORITY');
  this.status = headerRange.indexOf('STATUS');
  this.notes = headerRange.indexOf('NOTES');
  this.lastUpdate = headerRange.indexOf('LAST UPDATE');
  this.initialDate = headerRange.indexOf('INITIAL DATE');
  this.stage = headerRange.indexOf('STAGE');
  this.redesignAssignment = headerRange.indexOf('REDESIGN ASSIGNMENT');
}
