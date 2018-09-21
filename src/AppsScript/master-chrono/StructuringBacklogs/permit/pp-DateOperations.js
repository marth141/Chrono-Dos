/* exported
debugPropDateCleaner
validatePropHeaders
prop_SortAndCleanDates
*/

/* global
ServiceMasterBacklog
getMeThatColumn
timeAddHours
timeStateOffset
validateHeader
*/

/**
 *
 *
 * @returns
 */
function debugPermitDateCleaner() {
  var masterBacklogs = new ServiceMasterBacklog();
  pp_DateCleaner(masterBacklogs.Collection[4]);
  return;
}

/**
 *
 *
 * @param {any} propBacklog
 * @returns
 */
function pp_DateCleaner(backlogArray, oldData) {
  var serviceCol,
    siteSurveyDateCol,
    welcomeCallDateCol,
    signedDateCol,
    approvedDateCol,
    leaseApprovedCol,
    proposalApprovedCol;
  serviceCol = getMeThatColumn('Project: Service', backlogArray);
  siteSurveyDateCol = getMeThatColumn(
    'Project: Site Survey Completed',
    backlogArray
  );
  welcomeCallDateCol = getMeThatColumn(
    'Opportunity: Welcome Call Completed Date',
    backlogArray
  );
  signedDateCol = getMeThatColumn(
    'Primary Contract: Application Signed',
    backlogArray
  );
  approvedDateCol = getMeThatColumn(
    'Primary Contract: Customer Agreement Approved',
    backlogArray
  );
  leaseApprovedCol = getMeThatColumn(
    'Primary Contract: Lease Approved',
    backlogArray
  );
  proposalApprovedCol = getMeThatColumn(
    'Proposal CAD: Proposal Customer Approved',
    backlogArray
  );
  var dateAdjLog = pp_RemoveLateDates(
    backlogArray,
    oldData,
    serviceCol,
    siteSurveyDateCol,
    welcomeCallDateCol,
    signedDateCol,
    approvedDateCol,
    leaseApprovedCol,
    proposalApprovedCol
  );
  return dateAdjLog;
}

/**
 *
 *
 * @param {array} backlogArray
 * @param {number} propReqDateCol
 * @param {number} propStatDateCol
 * @param {number} stateOfficeCol
 * @returns
 */
function pp_RemoveLateDates(
  backlogArray,
  oldData,
  serviceCol,
  siteSurveyDateCol,
  welcomeCallDateCol,
  signedDateCol,
  approvedDateCol,
  leaseApprovedCol,
  proposalApprovedCol
) {
  // Remove column in header
  backlogArray[0].splice(siteSurveyDateCol, 6, 'BACKLOG DATE', 'DUE DATE');
  for (var row = 1; row < backlogArray.length; row++) {
    var dateValue1 = new Date(backlogArray[row][siteSurveyDateCol]);
    var dateValue2 = new Date(backlogArray[row][welcomeCallDateCol]);
    var dateValue3 = new Date(backlogArray[row][signedDateCol]);
    var dateValue4 = new Date(backlogArray[row][approvedDateCol]);
    var dateValue5 = new Date(backlogArray[row][leaseApprovedCol]);
    var dateValue6 = new Date(backlogArray[row][proposalApprovedCol]);
    var serviceNumber = backlogArray[row][serviceCol];
    backlogArray = pp_CompareDates(
      backlogArray,
      oldData,
      serviceNumber,
      dateValue1,
      dateValue2,
      dateValue3,
      dateValue4,
      dateValue5,
      dateValue6,
      row,
      siteSurveyDateCol
    );
  }
  return backlogArray;
}

/**
 *
 *
 * @param {array} backlogArray
 * @param {Date} dateValue1
 * @param {Date} dateValue2
 * @param {number} row
 * @param {number} propReqDateCol
 * @param {number} propStatDateCol
 * @param {string} stateAbrv
 * @returns
 */
function pp_CompareDates(
  backlogArray,
  oldData,
  serviceNumber,
  dateValue1,
  dateValue2,
  dateValue3,
  dateValue4,
  dateValue5,
  dateValue6,
  row,
  siteSurveyDateCol
) {
  var backlogDate, initialDate, dueDate;
  var addHours = 24;
  var checkDates = [
    dateValue1,
    dateValue2,
    dateValue3,
    dateValue4,
    dateValue5,
    dateValue6
  ].filter(function(x) {
    return x instanceof Date && !isNaN(x.getTime());
  });
  initialDate = new Date(Math.max.apply(null, checkDates));

  //If the initail date is 6 hours past now and new to the backlog give new date
  if (checkHibernated(oldData, serviceNumber, initialDate)) {
    initialDate = new Date();
    backlogDate = 'CHRONO STAMP';
  } else {
    backlogDate = initialDate;
  }
  if (initialDate.getDay() === 5) {
    addHours = 72;
  } else if (initialDate.getDay() === 6) {
    addHours = 48;
  }
  dueDate = timeAddHours(new Date(initialDate.getTime()), addHours); // add 24 hours to initial date
  backlogArray[row].splice(siteSurveyDateCol, 6, backlogDate, dueDate); // replace and remove the other
  return backlogArray;
}

function checkHibernated(oldData, serviceNumber, initialDate) {
  if (serviceNumber === 'S-5939376' || serviceNumber === 'S-5932481') var x = 0;
  // Check initail date is over 6 hours
  var hours = (new Date() - initialDate) / 36e5;
  if (hours < 6) return false;

  // Check if service number existed already in backlog
  var found = oldData.some(function(row) {
    return row[0] === serviceNumber;
  });
  //If found return false, else the account was not in the backlog before
  if (found) return false;
  else return true;
}
