/**
 * Used to set up columns in the date operations
 * @param {Array[]} backlogArray
 */
function DateColumnsConstructor(backlogArray) {
  /** @type Number */
  this.serviceCol = getColumnIndex('Project: Service', backlogArray);
  /** @type Number */
  this.siteSurveyDateCol = getColumnIndex(
    'Project: Site Survey Completed',
    backlogArray
  );
  /** @type Number */
  this.welcomeCallDateCol = getColumnIndex(
    'Opportunity: Welcome Call Completed Date',
    backlogArray
  );
  /** @type Number */
  this.signedDateCol = getColumnIndex(
    'Primary Contract: Application Signed',
    backlogArray
  );
  /** @type Number */
  this.approvedDateCol = getColumnIndex(
    'Primary Contract: Customer Agreement Approved',
    backlogArray
  );
  /** @type Number */
  this.leaseDateCol = getColumnIndex(
    'Primary Contract: Lease Approved',
    backlogArray
  );
  /** @type Number */
  this.proposalDateCol = getColumnIndex(
    'Proposal CAD: Proposal Customer Approved',
    backlogArray
  );
}

/**
 * Used to reduce the complexity in remove late dates.
 * @param {Array[]} account
 * @param {Number} row
 * @param {PermitColumns} columns
 */
function LateDatesConstructor(account, row, columns) {
  this.serviceNumber = account[columns.serviceNumber];
  this.siteSurveyDate = new Date(account[columns.appSigned_Date]);
  this.welcomeCallDate = new Date(account[columns.custAgree_Date]);
  this.dateValue3 = new Date(account[columns.permitQA_Date]);
  this.dateValue4 = new Date(account[columns.siteSurvey_Date]);
  this.dateValue5 = new Date(account[columns.srReview_Date]);
  this.dateValu6 = new Date(account[columns.welcomeCall_Date]);
}

/**
 *
 * @param {LateDatesConstructor} lateDates
 */
function CompareDatesConstructor(lateDates) {
  var checkDates = [
    lateDates.dateValue1,
    lateDates.dateValue2,
    lateDates.dateValue3,
    lateDates.dateValue4,
    lateDates.dateValue5,
    lateDates.dateValue6
  ].filter(function(x) {
    return x instanceof Date && !isNaN(x.getTime());
  });
  this.initialDate = new Date(Math.max.apply(null, checkDates));
}
