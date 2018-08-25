/**
 * Used to set up columns in the date operations
 * @param {Array[]} backlogArray
 */
function DateColumnsConstructor(backlogArray) {
  /** @type Number */
  this.serviceCol = getMeThatColumnNoValidate('Project: Service', backlogArray);
  /** @type Number */
  this.siteSurveyDateCol = getMeThatColumnNoValidate(
    'Project: Site Survey Completed',
    backlogArray
  );
  /** @type Number */
  this.welcomeCallDateCol = getMeThatColumnNoValidate(
    'Opportunity: Welcome Call Completed Date',
    backlogArray
  );
  /** @type Number */
  this.signedDateCol = getMeThatColumnNoValidate(
    'Primary Contract: Application Signed',
    backlogArray
  );
  /** @type Number */
  this.approvedDateCol = getMeThatColumnNoValidate(
    'Primary Contract: Customer Agreement Approved',
    backlogArray
  );
  /** @type Number */
  this.leaseDateCol = getMeThatColumnNoValidate(
    'Primary Contract: Lease Approved',
    backlogArray
  );
  /** @type Number */
  this.proposalDateCol = getMeThatColumnNoValidate(
    'Proposal CAD: Proposal Customer Approved',
    backlogArray
  );
}

/**
 * Used to reduce the complexity in remove late dates.
 * @param {Array} backlogArray
 * @param {Number} row
 * @param {DateColumn} columns
 */
function LateDatesConstructor(backlogArray, row, columns) {
  this.serviceNumber = backlogArray[row][columns.serviceCol];
  this.dateValue1 = new Date(backlogArray[row][columns.siteSurveyDateCol]);
  this.dateValue2 = new Date(backlogArray[row][columns.welcomeCallDateCol]);
  this.dateValue3 = new Date(backlogArray[row][columns.signedDateCol]);
  this.dateValue4 = new Date(backlogArray[row][columns.approvedDateCol]);
  this.dateValue5 = new Date(backlogArray[row][columns.leaseDateCol]);
  this.dateValue6 = new Date(backlogArray[row][columns.proposalDateCol]);
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
