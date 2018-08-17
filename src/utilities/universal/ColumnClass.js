/**
 * Used to set the index of the column being found
 * @param {String} header
 * @param {Array[]} backlogArray
 * @return {Number}
 */
function getColumn(header, backlogArray) {
  var columnNum = getColumnIndex(header, backlogArray);
  return columnNum;
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
 * @param {Array[]} backlogArray pass in for new header assessment
 */
function RedesignColumns(chrono, backlogArray) {
  if (chrono !== undefined) {
    var redesignSheet = chrono.PermitRD;
    var dim = getDimensions(redesignSheet);
    var backlogArray = getBacklogArray(redesignSheet, dim);
  }

  this.serviceNumber = getColumn('Service: Service Name', backlogArray);
  this.solProjName = getColumn('Project Name', backlogArray);
  this.cadObject = getColumn('CAD OBJECT', backlogArray);
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
 * @param {MasterBacklogSheets} chrono undefined for new header assessment
 * @param {Array[]} backlogArray pass in for new header assessment
 */
function PermitColumns(chrono, backlogArray) {
  if (chrono !== undefined) {
    var permitSheet = chrono.Permit;
    var dim = getDimensions(permitSheet);
    var backlogArray = getBacklogArray(permitSheet, dim);
  }

  this.serviceNumber = getColumn('Project: Service', backlogArray);
  this.solProjName = getColumn('Project: Project Name', backlogArray);
  this.cadObject = getColumn('CAD OBJECT', backlogArray);
  this.solProjID = getColumn('Project: Solar Project ID', backlogArray);
  this.regionOffice = getColumn(
    'Service: Regional Operating Center',
    backlogArray
  );
  this.siteSurvey_Date = getColumn(
    'Project: Site Survey Completed',
    backlogArray
  );
  this.welcomeCall_Date = getColumn(
    'Opportunity: Welcome Call Completed Date',
    backlogArray
  );
  this.appSigned_Date = getColumn(
    'Primary Contract: Application Signed',
    backlogArray
  );
  this.custAgree_Date = getColumn(
    'Primary Contract: Customer Agreement Approved',
    backlogArray
  );
  this.contractType = getColumn('Project: Contract Type', backlogArray);
  this.utilityType = getColumn('Project: Utility', backlogArray);
  this.opportunityType = getColumn('Opportunity: Type', backlogArray);
  this.pvDesigner = getColumn('Phase: PV Design Completed By', backlogArray);
  this.permitQA_Date = getColumn(
    'Primary CAD: Permit Packet QA Completed',
    backlogArray
  );
  this.srReview_Date = getColumn(
    'Phase: Structural Review Completed',
    backlogArray
  );
  this.backlog_Date = getColumn('BACKLOG DATE', backlogArray);
  this.due_Date = getColumn('DUE DATE', backlogArray);
}
