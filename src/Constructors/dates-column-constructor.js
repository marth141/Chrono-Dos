/**
 * Used to set up columns in the date operations
 * @param {Array} backlogArray
 */
var DateColumns = function(backlogArray) {
  /** @type Number */
  this.serviceCol = getMeThatColumn('Project: Service', backlogArray);
  /** @type Number */
  this.siteSurveyDateCol = getMeThatColumn(
    'Project: Site Survey Completed',
    backlogArray
  );
  /** @type Number */
  this.welcomeCallDateCol = getMeThatColumn(
    'Opportunity: Welcome Call Completed Date',
    backlogArray
  );
  /** @type Number */
  this.signedDateCol = getMeThatColumn(
    'Primary Contract: Application Signed',
    backlogArray
  );
  /** @type Number */
  this.approvedDateCol = getMeThatColumn(
    'Primary Contract: Customer Agreement Approved',
    backlogArray
  );
  /** @type Number */
  this.leaseDateCol = undefined;
  /** @type Number */
  this.proposalDateCol = undefined;
};

/**
 * Used to reduce the complexity in remove late dates.
 * @param {Array} backlogArray
 * @param {Number} row
 * @param {DateColumn} columns
 */
var LateDatesConstructor = function(backlogArray, row, columns) {
  this.serviceNumber = backlogArray[row][columns.serviceCol];
  this.dateValue1 = new Date(backlogArray[row][columns.siteSurveyDateCol]);
  this.dateValue2 = new Date(backlogArray[row][columns.welcomeCallDateCol]);
  this.dateValue3 = new Date(backlogArray[row][columns.signedDateCol]);
  this.dateValue4 = new Date(backlogArray[row][columns.approvedDateCol]);
};

/**
 *
 * @param {LateDatesConstructor} lateDates
 */
var CompareDatesConstructor = function(lateDates) {
  var checkDates = [
    lateDates.dateValue1,
    lateDates.dateValue2,
    lateDates.dateValue3,
    lateDates.dateValue4
  ].filter(function(x) {
    return x instanceof Date && !isNaN(x.getTime());
  });
  this.initialDate = new Date(Math.max.apply(null, checkDates));
};
