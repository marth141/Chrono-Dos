/**
 * Debugs the headers
 */
function debugHeaders() {
  var chronoHeaders = new ChronoHeaders();
  debugger;
}

/**
 * Gets the headers from the report page
 */
function ChronoHeaders() {
  var headers = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName('Report')
    .getRange('2:2')
    .getValues()[0];
  this.dueIn = headers.indexOf('DUE IN: (hh:mm)');
  this.dueStatus = headers.indexOf('DUE STATUS');
  this.region = headers.indexOf('REGION');
  this.service = headers.indexOf('SERVICE');
  this.solarProject = headers.indexOf('SOLAR PROJECT');
  this.cadObject = headers.indexOf('CAD OBJECT');
  this.office = headers.indexOf('OFFICE');
  this.backlogDate = headers.indexOf('BACKLOG DATE');
  this.dueDate = headers.indexOf('DUE DATE');
  this.contractType = headers.indexOf('CONTRACT TYPE');
  this.utilityCompany = headers.indexOf('UTILITY COMPANY');
  this.unitType = headers.indexOf('UNIT TYPE');
  this.assigned = headers.indexOf('ASSIGNED');
  this.priority = headers.indexOf('PRIORITY');
  this.status = headers.indexOf('STATUS');
  this.notes = headers.indexOf('NOTES');
  this.lastUpdate = headers.indexOf('LAST UPDATE');
  this.initialDate = headers.indexOf('INITIAL DATE');
  this.stage = headers.indexOf('STAGE');
  this.redesignAssignment = headers.indexOf('REDESIGN ASSIGNMENT');
}
