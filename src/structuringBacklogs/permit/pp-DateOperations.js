/**
 *
 * @param {*} backlogArray
 * @param {*} oldData
 * @return {*} dateAdjLog
 */
function pp_DateCleaner(backlogArray, oldData) {
  var columns = {
    serviceCol: getMeThatColumn('Project: Service', backlogArray),
    siteSurveyDateCol: getMeThatColumn(
      'Project: Site Survey Completed',
      backlogArray
    ),
    welcomeCallDateCol: getMeThatColumn(
      'Opportunity: Welcome Call Completed Date',
      backlogArray
    ),
    signedDateCol: getMeThatColumn(
      'Primary Contract: Application Signed',
      backlogArray
    ),
    approvedDateCol: getMeThatColumn(
      'Primary Contract: Customer Agreement Approved',
      backlogArray
    ),
    leaseApproved: getMeThatColumn(
      'Primary Contact: Lease Approved',
      backlogArray
    ),
    proposalApproved: getMeThatColumn(
      'Proposal CAD: Proposal Customer Approved',
      backlogArray
    )
  };

  var dateAdjLog = pp_RemoveLateDates(backlogArray, oldData, columns);
  return dateAdjLog;
}

/**
 *
 * @param {*} backlogArray
 * @param {*} oldData
 * @param {*} columns
 * @return {*} backlogArray
 */
function pp_RemoveLateDates(backlogArray, oldData, columns) {
  var removeLateDatesObject = {
    dateValue1: undefined,
    dateValue2: undefined,
    dateValue3: undefined,
    dateValue4: undefined,
    dateValue5: undefined,
    dateValue6: undefined,
    serviceNumber: undefined,
    row: undefined
  };
  var dateValue1 = removeLateDatesObject.dateValue1,
    dateValue2 = removeLateDatesObject.dateValue2,
    dateValue3 = removeLateDatesObject.dateValue3,
    dateValue4 = removeLateDatesObject.dateValue4,
    dateValue5 = removeLateDatesObject.dateValue5,
    dateValue6 = removeLateDatesObject.dateValue6,
    serviceNumber = removeLateDatesObject.serviceNumber,
    row = removeLateDatesObject.row;
  var serviceCol = columns.serviceCol,
    siteSurveyDateCol = columns.siteSurveyDateCol,
    welcomeCallDateCol = columns.welcomeCallDateCol,
    signedDateCol = columns.signedDateCol,
    approvedDateCol = columns.approvedDateCol,
    leaseApproved = columns.leaseApproved,
    proposalApproved = columns.proposalApproved;

  // Remove column in header

  var backlogArrayHeaders = backlogArray[0];
  backlogArrayHeaders.splice(siteSurveyDateCol, 4, 'BACKLOG DATE', 'DUE DATE');

  for (row = 1; row < backlogArray.length; row++) {
    var account = backlogArray[row];
    serviceNumber = account[serviceCol];
    dateValue1 = new Date(account[siteSurveyDateCol]);
    dateValue2 = new Date(account[welcomeCallDateCol]);
    dateValue3 = new Date(account[signedDateCol]);
    dateValue4 = new Date(account[approvedDateCol]);
    dateValue5 = new Date(account[leaseApproved]);
    dateValue6 = new Date(account[proposalApproved]);
    backlogArray = pp_CompareDates(
      backlogArray,
      oldData,
      removeLateDatesObject,
      columns
    );
  }
  return backlogArray;
}

/**
 *
 * @param {*} backlogArray
 * @param {*} oldData
 * @param {*} removeDatesObject
 * @param {*} columns
 * @return {*} backlogArray
 */
function pp_CompareDates(backlogArray, oldData, removeDatesObject, columns) {
  var compareDatesObject = {
    backlogDate: undefined,
    dueDate: undefined,
    addHours: undefined,
    checkDates: undefined,
    initialDate: undefined
  };
  var backlogDate = compareDatesObject.backlogDate,
    dueDate = compareDatesObject.dueDate,
    addHours = compareDatesObject.addHours,
    checkDates = compareDatesObject.checkDates,
    initialDate = compareDatesObject.initialDate;
  var dateValue1 = removeDatesObject.dateValue1,
    dateValue2 = removeDatesObject.dateValue2,
    dateValue3 = removeDatesObject.dateValue3,
    dateValue4 = removeDatesObject.dateValue4,
    dateValue5 = removeDatesObject.dateValue5,
    dateValue6 = removeDatesObject.dateValue6,
    serviceNumber = removeDatesObject.serviceNumber;
  var siteSurveyDateCol = columns.siteSurveyDateCol;

  checkDates = [
    dateValue1,
    dateValue2,
    dateValue3,
    dateValue4,
    dateValue5,
    dateValue6
  ].filter(function(datesToFilter) {
    var filteredDate =
      datesToFilter instanceof Date && !isNaN(datesToFilter.getTime());
    return filteredDate;
  });

  initialDate = new Date(Math.max.apply(null, checkDates));
  addHours = 24;

  // If the initail date is 6 hours past now and new to the backlog give new date
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
  // add 24 hours to initial date
  dueDate = timeAddHours(new Date(initialDate.getTime()), addHours);
  // replace and remove the other
  backlogArray[row].splice(siteSurveyDateCol, 4, backlogDate, dueDate);
  return backlogArray;
}

/**
 *
 * @param {*} oldData
 * @param {*} serviceNumber
 * @param {*} initialDate
 * @return {Boolean} Boolean
 */
function checkHibernated(oldData, serviceNumber, initialDate) {
  // Check initail date is over 6 hours
  var hours = (new Date() - initialDate) / 36e5;
  if (hours < 6) {
    return false;
  } else {
    // Check if service number existed already in backlog
    var found = oldData.some(function(row) {
      var bool = row[0] === serviceNumber;
      return bool;
    });
    // If service number was found,
    // return false,
    // else the account was not in the backlog before
    if (found) {
      return false;
    } else {
      return true;
    }
  }
}
