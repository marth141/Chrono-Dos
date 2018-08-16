// @flow strict
/**
 * Used to get all of the chrono sheets
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} ss
 */
function MasterBacklogSheets(ss) {
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

/**
 * Used to get all of the report page headers
 * @param {MasterBacklogSheets} chrono
 */
function ReportPageColumns(chrono) {
  var report = chrono.Report;
  var backlogArray = report.getRange('G2:W2').getValues();
  var googleSheetToArrayOffset = 0;

  this.reportRange = report.getRange('G3:W');
  this.service =
    getMeThatColumnNoValidate('SERVICE', backlogArray) +
    googleSheetToArrayOffset;
  this.solarProject =
    getMeThatColumnNoValidate('SOLAR PROJECT', backlogArray) +
    googleSheetToArrayOffset;
  this.cadObject =
    getMeThatColumnNoValidate('CAD OBJECT', backlogArray) +
    googleSheetToArrayOffset;
  this.office =
    getMeThatColumnNoValidate('OFFICE', backlogArray) +
    googleSheetToArrayOffset;
  this.backlogDate =
    getMeThatColumnNoValidate('BACKLOG DATE', backlogArray) +
    googleSheetToArrayOffset;
  this.dueDate =
    getMeThatColumnNoValidate('DUE DATE', backlogArray) +
    googleSheetToArrayOffset;
  this.contractType =
    getMeThatColumnNoValidate('CONTRACT TYPE', backlogArray) +
    googleSheetToArrayOffset;
  this.utilityCompany =
    getMeThatColumnNoValidate('UTILITY COMPANY', backlogArray) +
    googleSheetToArrayOffset;
  this.unitType =
    getMeThatColumnNoValidate('UNIT TYPE', backlogArray) +
    googleSheetToArrayOffset;
  this.assigned =
    getMeThatColumnNoValidate('ASSIGNED', backlogArray) +
    googleSheetToArrayOffset;
  this.priority =
    getMeThatColumnNoValidate('PRIORITY', backlogArray) +
    googleSheetToArrayOffset;
  this.status =
    getMeThatColumnNoValidate('STATUS', backlogArray) +
    googleSheetToArrayOffset;
  this.notes =
    getMeThatColumnNoValidate('NOTES', backlogArray) + googleSheetToArrayOffset;
  this.lastUpdate =
    getMeThatColumnNoValidate('LAST UPDATE', backlogArray) +
    googleSheetToArrayOffset;
  this.initialUpdate =
    getMeThatColumnNoValidate('INITIAL DATE', backlogArray) +
    googleSheetToArrayOffset;
  this.stage =
    getMeThatColumnNoValidate('STAGE', backlogArray) + googleSheetToArrayOffset;
  this.redesignAssignment =
    getMeThatColumnNoValidate('REDESIGN ASSIGNMENT', backlogArray) +
    googleSheetToArrayOffset;
}

/**
 * Used to get all the columns in redesign backlog
 * @param {MasterBacklogSheets} chrono
 */
function RedesignColumns(chrono) {
  var redesignSheet = chrono.PermitRD;
  var dim = getDimensions(redesignSheet);
  var backlogArray = getBacklogArray(redesignSheet, dim);

  this.serviceNumber = getMeThatColumnNoValidate(
    'Service: Service Name',
    backlogArray
  );
  this.projectName = getMeThatColumnNoValidate('Project Name', backlogArray);
  this.solProjID = getMeThatColumnNoValidate('Solar Project ID', backlogArray);
  this.cadName = getMeThatColumnNoValidate('CAD Name', backlogArray);
  this.solCADID = getMeThatColumnNoValidate('Solar CAD ID', backlogArray);
  this.regionOffice = getMeThatColumnNoValidate(
    'Service: Regional Operating Center',
    backlogArray
  );
  this.redesignReqDate = getMeThatColumnNoValidate(
    'Redesign Requested',
    backlogArray
  );
  this.custApproveDate = getMeThatColumnNoValidate(
    'Proposal Customer Approved',
    backlogArray
  );
  this.contractType = getMeThatColumnNoValidate('Contract Type', backlogArray);
  this.utilityType = getMeThatColumnNoValidate('Utility Company', backlogArray);
  this.recordType = getMeThatColumnNoValidate('Record Type', backlogArray);
  this.redesignReason = getMeThatColumnNoValidate(
    'Redesign Primary Reason',
    backlogArray
  );
  this.redesignDesigner = getMeThatColumnNoValidate(
    'Redesign Completed By: Vivint Employee Name',
    backlogArray
  );
  this.originalDesigner = getMeThatColumnNoValidate(
    'Primary CAD: Permit Packet Completed By',
    backlogArray
  );
}

/**
 * Used to get all the columns in a permit backlog
 * @param {MasterBacklogSheets} chrono
 */
function PermitColumns(chrono) {
  var permitSheet = chrono.Permit;
  var dim = getDimensions(permitSheet);
  var backlogArray = getBacklogArray(permitSheet, dim);

  this.serviceNumber = getMeThatColumnNoValidate(
    'Project: Service',
    backlogArray
  );
  this.projectName = getMeThatColumnNoValidate(
    'Project: Project Name',
    backlogArray
  );
  this.solProjID = getMeThatColumnNoValidate(
    'Project: Solar Project ID',
    backlogArray
  );
  this.regionOffice = getMeThatColumnNoValidate(
    'Service: Regional Operating Center',
    backlogArray
  );
  this.siteSurveyDate = getMeThatColumnNoValidate(
    'Project: Site Survey Completed',
    backlogArray
  );
  this.welcomeCallDate = getMeThatColumnNoValidate(
    'Opportunity: Welcome Call Completed Date',
    backlogArray
  );
  this.appSignedDate = getMeThatColumnNoValidate(
    'Primary Contract: Application Signed',
    backlogArray
  );
  this.custAgreeDate = getMeThatColumnNoValidate(
    'Primary Contract: Customer Agreement Approved',
    backlogArray
  );
  this.contractType = getMeThatColumnNoValidate(
    'Project: Contract Type',
    backlogArray
  );
  this.utilityType = getMeThatColumnNoValidate(
    'Project: Utility',
    backlogArray
  );
  this.opportunityType = getMeThatColumnNoValidate(
    'Opportunity: Type',
    backlogArray
  );
  this.pvDesigner = getMeThatColumnNoValidate(
    'Phase: PV Design Completed By',
    backlogArray
  );
  this.permitQADate = getMeThatColumnNoValidate(
    'Primary CAD: Permit Packet QA Completed',
    backlogArray
  );
  this.srReviewDate = getMeThatColumnNoValidate(
    'Phase: Structural Review Completed',
    backlogArray
  );
}

var ServiceOfficeCollection = function() {
  this.GritMovem = ['NJ', 'NY', 'PA'];
  this.Legion = ['FL', 'MD', 'SC', 'VA'];
  this.NewEnglan = ['CT', 'MA', 'NH', 'RI', 'VT'];
  this.NorthCali = [
    '01',
    '03',
    '04',
    '05',
    '07',
    '11',
    '16',
    '18',
    '19',
    '20',
    '22',
    '25',
    '26',
    '28',
    '30'
  ];
  this.SouthCali = [
    '02',
    '06',
    '08',
    '09',
    '10',
    '12',
    '13',
    '14',
    '15',
    '17',
    '21',
    '29',
    '31',
    '32',
    'LA'
  ];
  this.SouthWest = ['AZ', 'CO', 'HI', 'NM', 'NV', 'TX', 'UT'];
  this.Outsource = ['NM', 'NV'];
};

/**
 * This will construct the link and put in the backlog
 * array. This array will be pasted back over the
 * report page.
 *
 * @param {number} linkColumn The ID of the CAD Object for link.
 * @param {number} linkTextColumn The SP- Name of the Solar Project.
 * @param {array} backlogArray The backlog array.
 * @returns The backlog array with new SolProj link.
 */
function constructLink(linkColumn, linkTextColumn, backlogArray) {
  for (var row = 1; row < backlogArray.length; row++) {
    backlogArray[row][linkTextColumn] =
      '=HYPERLINK("https://vivintsolar.my.salesforce.com/' +
      backlogArray[row][linkColumn] +
      '","' +
      backlogArray[row][linkTextColumn] +
      '")';
  }
  return backlogArray;
}
