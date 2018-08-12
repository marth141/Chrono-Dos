/**
 *
 * @param {*} backlogArray
 * @param {*} oldData
 * @return {*} dateAdjLog
 */
function pp_DateCleaner(backlogArray, oldData) {
  var columns = {
    serviceCol: getMeThatColumnNoValidate('Project: Service', backlogArray),
    siteSurveyDateCol: getMeThatColumnNoValidate(
      'Project: Site Survey Completed',
      backlogArray
    ),
    welcomeCallDateCol: getMeThatColumnNoValidate(
      'Opportunity: Welcome Call Completed Date',
      backlogArray
    ),
    signedDateCol: getMeThatColumnNoValidate(
      'Primary Contract: Application Signed',
      backlogArray
    ),
    approvedDateCol: getMeThatColumnNoValidate(
      'Primary Contract: Customer Agreement Approved',
      backlogArray
    ),
    leaseApproved: getMeThatColumnNoValidate(
      'Primary Contact: Lease Approved',
      backlogArray
    ),
    proposalApproved: getMeThatColumnNoValidate(
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
  var serviceCol = columns.serviceCol,
    siteSurveyDateCol = columns.siteSurveyDateCol,
    welcomeCallDateCol = columns.welcomeCallDateCol,
    signedDateCol = columns.signedDateCol,
    approvedDateCol = columns.approvedDateCol,
    leaseApproved = columns.leaseApproved,
    proposalApproved = columns.proposalApproved;

  var datesObject = {
    dateValue1: undefined,
    dateValue2: undefined,
    dateValue3: undefined,
    dateValue4: undefined,
    // dateValue5: undefined,
    // dateValue6: undefined,
    serviceNumber: undefined,
    row: undefined
  };

  var backlogArrayHeaders = backlogArray[0];
  // Remove column in header
  backlogArrayHeaders.splice(siteSurveyDateCol, 4, 'BACKLOG DATE', 'DUE DATE');

  for (
    datesObject.row = 1;
    datesObject.row < backlogArray.length;
    datesObject.row++
  ) {
    var account = backlogArray[datesObject.row];
    datesObject.serviceNumber = account[serviceCol];
    datesObject.dateValue1 = new Date(account[siteSurveyDateCol]);
    datesObject.dateValue2 = new Date(account[welcomeCallDateCol]);
    datesObject.dateValue3 = new Date(account[signedDateCol]);
    datesObject.dateValue4 = new Date(account[approvedDateCol]);
    // datesObject.dateValue5 = new Date(account[leaseApproved]);
    // datesObject.dateValue6 = new Date(account[proposalApproved]);
    backlogArray = pp_CompareDates(backlogArray, oldData, datesObject, columns);
  }
  return backlogArray;
}

/**
 *
 * @param {*} backlogArray
 * @param {*} oldData
 * @param {*} datesObject
 * @param {*} columns
 * @return {*} backlogArray
 */
function pp_CompareDates(backlogArray, oldData, datesObject, columns) {
  var siteSurveyDateCol = columns.siteSurveyDateCol;
  var dateValue1 = datesObject.dateValue1,
    dateValue2 = datesObject.dateValue2,
    dateValue3 = datesObject.dateValue3,
    dateValue4 = datesObject.dateValue4,
    // dateValue5 = datesObject.dateValue5,
    // dateValue6 = datesObject.dateValue6,
    serviceNumber = datesObject.serviceNumber,
    row = datesObject.row;

  var compareDatesObject = {
    backlogDate: undefined,
    dueDate: undefined,
    addHours: undefined,
    checkDates: undefined,
    initialDate: undefined
  };

  compareDatesObject.checkDates = [
    dateValue1,
    dateValue2,
    dateValue3,
    dateValue4
    // dateValue5,
    // dateValue6
  ].filter(function(datesToFilter) {
    var filteredDate =
      datesToFilter instanceof Date && !isNaN(datesToFilter.getTime());
    return filteredDate;
  });

  compareDatesObject.initialDate = new Date(
    Math.max.apply(null, compareDatesObject.checkDates)
  );
  compareDatesObject.addHours = 24;

  // If the initail date is 6 hours past now and new to the backlog give new date
  if (checkHibernated(oldData, serviceNumber, compareDatesObject.initialDate)) {
    compareDatesObject.initialDate = new Date();
    compareDatesObject.backlogDate = 'CHRONO STAMP';
  } else {
    compareDatesObject.backlogDate = compareDatesObject.initialDate;
  }
  if (compareDatesObject.initialDate.getDay() === 5) {
    compareDatesObject.addHours = 72;
  } else if (compareDatesObject.initialDate.getDay() === 6) {
    compareDatesObject.addHours = 48;
  }
  // add 24 hours to initial date
  compareDatesObject.dueDate = timeAddHours(
    new Date(compareDatesObject.initialDate.getTime()),
    compareDatesObject.addHours
  );
  // replace and remove the other
  backlogArray[row].splice(
    siteSurveyDateCol,
    4,
    compareDatesObject.backlogDate,
    compareDatesObject.dueDate
  );
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
