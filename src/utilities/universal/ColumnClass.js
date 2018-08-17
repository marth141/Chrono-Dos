/**
 * Used to set the index of the column being found
 * @param {String} header
 * @param {Array[]} backlogArray
 * @return {Number}
 */
function getColumn(header, backlogArray) {
  var columnNum = getColumnIndex(header, backlogArray);
  var columnExists = columnNum instanceof Number > -1;
  if (columnExists) {
    return columnNum;
  } else {
    throw columnCreationError(header, columnNum, report);
  }
}

/**
 * Used to get headers
 * @param {String} columnName
 * @param {Object[]} backlogArray
 * @return {Number}
 */
function getColumnIndex(columnName, backlogArray) {
  var backlogHeaders = backlogArray[0];
  return backlogHeaders.indexOf(columnName);
}

/**
 * @param {String} target
 * @param {Number} column
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet
 * @return {String}
 */
function columnCreationError(target, column, sheet) {
  var columnCreationError =
    'Unable to find ' + target + ' in ' + sheet.getName();
  return columnCreationError;
}

/**
 * Used to get all of the report page headers
 * @constructor
 * @param {MasterBacklogSheets} chrono
 */
function ReportPageColumns(chrono) {
  var report = chrono.Report;
  var backlogArray = report.getRange('G2:W2').getValues();

  this.service = getColumn('SERVICE', backlogArray);
  this.solarProject = getColumn('SOLAR PROJECT', backlogArray);
  this.cadObject = getColumn('CAD OBJECT', backlogArray);
  this.office = getColumn('OFFICE', backlogArray);
  this.backlogDate = getColumn('BACKLOG DATE', backlogArray);
  this.dueDate = getColumn('DUE DATE', backlogArray);
  this.contractType = getColumn('CONTRACT TYPE', backlogArray);
  this.utilityCompany = getColumn('UTILITY COMPANY', backlogArray);
  this.unitType = getColumn('UNIT TYPE', backlogArray);
  this.assigned = getColumn('ASSIGNED', backlogArray);
  this.priority = getColumn('PRIORITY', backlogArray);
  this.status = getColumn('STATUS', backlogArray);
  this.notes = getColumn('NOTES', backlogArray);
  this.lastUpdate = getColumn('LAST UPDATE', backlogArray);
  this.initialUpdate = getColumn('INITIAL DATE', backlogArray);
  this.stage = getColumn('STAGE', backlogArray);
  this.redesignAssignment = getColumn('REDESIGN ASSIGNMENT', backlogArray);
}

/**
 * Used to get all the columns in redesign backlog
 * @constructor
 * @param {MasterBacklogSheets} chrono
 */
function RedesignColumns(chrono) {
  var redesignSheet = chrono.PermitRD;
  var dim = getDimensions(redesignSheet);
  var backlogArray = getBacklogArray(redesignSheet, dim);

  this.serviceNumber = getColumn('Service: Service Name', backlogArray);
  this.solProjName = getColumn('Project Name', backlogArray);
  this.solProjID = getColumn('Solar Project ID', backlogArray);
  this.cadName = getColumn('CAD Name', backlogArray);
  this.cadID = getColumn('Solar CAD ID', backlogArray);
  this.regionOffice = getColumn(
    'Service: Regional Operating Center',
    backlogArray
  );
  this.redesignReqDate = getColumn('Redesign Requested', backlogArray);
  this.custApproveDate = getColumn('Proposal Customer Approved', backlogArray);
  this.contractType = getColumn('Contract Type', backlogArray);
  this.utilityType = getColumn('Utility Company', backlogArray);
  this.recordType = getColumn('Record Type', backlogArray);
  this.redesignReason = getColumn('Redesign Primary Reason', backlogArray);
  this.redesignDesigner = getColumn(
    'Redesign Completed By: Vivint Employee Name',
    backlogArray
  );
  this.originalDesigner = getColumn(
    'Primary CAD: Permit Packet Completed By',
    backlogArray
  );
}

/**
 * Used to get all the columns in a permit backlog
 * @constructor
 * @param {MasterBacklogSheets} chrono
 */
function PermitColumns(chrono) {
  var permitSheet = chrono.Permit;
  var dim = getDimensions(permitSheet);
  var backlogArray = getBacklogArray(permitSheet, dim);

  this.serviceNumber = getColumn('Project: Service', backlogArray);
  this.solProjName = getColumn('Project: Project Name', backlogArray);
  this.solProjID = getColumn('Project: Solar Project ID', backlogArray);
  this.regionOffice = getColumn(
    'Service: Regional Operating Center',
    backlogArray
  );
  this.siteSurveyDate = getColumn(
    'Project: Site Survey Completed',
    backlogArray
  );
  this.welcomeCallDate = getColumn(
    'Opportunity: Welcome Call Completed Date',
    backlogArray
  );
  this.appSignedDate = getColumn(
    'Primary Contract: Application Signed',
    backlogArray
  );
  this.custAgreeDate = getColumn(
    'Primary Contract: Customer Agreement Approved',
    backlogArray
  );
  this.contractType = getColumn('Project: Contract Type', backlogArray);
  this.utilityType = getColumn('Project: Utility', backlogArray);
  this.opportunityType = getColumn('Opportunity: Type', backlogArray);
  this.pvDesigner = getColumn('Phase: PV Design Completed By', backlogArray);
  this.permitQADate = getColumn(
    'Primary CAD: Permit Packet QA Completed',
    backlogArray
  );
  this.srReviewDate = getColumn(
    'Phase: Structural Review Completed',
    backlogArray
  );
}
