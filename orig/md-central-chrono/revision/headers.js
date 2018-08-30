/**
 * Debugs the headers
 */
function debugHeaders() {
  var chronoHeaders = new ChronoHeaders();
  debugger;
}

/**
 * Gets the headers from the report page
 * A1 origin at 1,1
 */
function ChronoHeaders() {
  var headers = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName('Report')
    .getRange('2:2')
    .getValues()[0];
  var offset = 1;
  this.dueIn = headers.indexOf('DUE IN: (hh:mm)') + offset;
  this.dueStatus = headers.indexOf('DUE STATUS') + offset;
  this.region = headers.indexOf('REGION') + offset;
  this.service = headers.indexOf('SERVICE') + offset;
  this.solarProject = headers.indexOf('SOLAR PROJECT') + offset;
  this.cadObject = headers.indexOf('CAD OBJECT') + offset;
  this.office = headers.indexOf('OFFICE') + offset;
  this.backlogDate = headers.indexOf('BACKLOG DATE') + offset;
  this.dueDate = headers.indexOf('DUE DATE') + offset;
  this.contractType = headers.indexOf('CONTRACT TYPE') + offset;
  this.utilityCompany = headers.indexOf('UTILITY COMPANY') + offset;
  this.unitType = headers.indexOf('UNIT TYPE') + offset;
  this.assigned = headers.indexOf('ASSIGNED') + offset;
  this.priority = headers.indexOf('PRIORITY') + offset;
  this.status = headers.indexOf('STATUS') + offset;
  this.notes = headers.indexOf('NOTES') + offset;
  this.lastUpdate = headers.indexOf('LAST UPDATE') + offset;
  this.initialDate = headers.indexOf('INITIAL DATE') + offset;
  this.stage = headers.indexOf('STAGE') + offset;
  this.redesignAssignment = headers.indexOf('REDESIGN ASSIGNMENT') + offset;
}
