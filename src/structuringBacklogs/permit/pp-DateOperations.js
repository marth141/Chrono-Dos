/**
 * Starts the dates cleaner
 * @param {Array} backlogArray
 * @param {Array} oldData
 * @return {Array} dateAdjLog
 */
function pp_DateCleaner(backlogArray, oldData) {
  var columns = new DateColumns(backlogArray);
  var dateAdjLog = pp_RemoveLateDates(backlogArray, oldData, columns);
  return dateAdjLog;
}

/**
 * Removes late dates from backlog
 * @param {Array} backlogArray
 * @param {Array} oldData
 * @param {DateColumns} columns
 * @return {Array} backlogArray with removed dates
 */
function pp_RemoveLateDates(backlogArray, oldData, columns) {
  backlogArray[0].splice(
    columns.siteSurveyDateCol,
    4,
    'BACKLOG DATE',
    'DUE DATE'
  );
  for (var row = 1; row < backlogArray.length; row++) {
    var lateDates = new LateDatesConstructor(backlogArray, row, columns);
    backlogArray = pp_CompareDates(
      backlogArray,
      oldData,
      lateDates,
      row,
      columns
    );
  }
  return backlogArray;
}

/**
 * Compares dates to be removed in backlog
 * @param {Array} backlogArray
 * @param {Array} oldData
 * @param {LateDatesConstructor} lateDates
 * @param {Number} row
 * @param {DateColumns} columns
 * @return {Array} backlogArray with compared dates
 */
function pp_CompareDates(backlogArray, oldData, lateDates, row, columns) {
  var addHours = 24,
    backlogDate,
    initialDate = new CompareDatesConstructor(lateDates).initialDate,
    dueDate;

  // If the initail date is 6 hours past now and new to the backlog give new date
  if (checkHibernated(oldData, lateDates.serviceNumber, initialDate)) {
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
  backlogArray[row].splice(columns.siteSurveyDateCol, 4, backlogDate, dueDate);
  return backlogArray;
}

/**
 * Checks if the account is hibernated
 * @param {Array} oldData
 * @param {Number} serviceNumber
 * @param {Date} initialDate
 * @return {Boolean} Boolean
 */
function checkHibernated(oldData, serviceNumber, initialDate) {
  /**
   * !Use for debugging
   * if (serviceNumber === 'S-5939376' || serviceNumber === 'S-5932481') var x = 0;
   */

  // Check initail date is over 6 hours
  var hours = (new Date() - initialDate) / 36e5;
  if (hours < 6) {
    return false;
  }

  // Check if service number existed already in backlog
  var found = oldData.some(function(row) {
    var trueFalse = row[0] === serviceNumber;
    return trueFalse;
  });
  // If found return false, else the account was not in the backlog before
  if (found) {
    return false;
  } else {
    return true;
  }
}
