// @flow strict
/**
 * Will create the backlog date and due date columns
 * @param {Array[]} backlogArray
 * @param {PermitColumns} permitColumns
 * @param {Array[]} reportBacklog
 * @return {Array[]}
 */
function BacklogWithDateColumns(backlogArray, permitColumns, reportBacklog) {
  var backlogDateColumn = new BacklogDateColumn(backlogArray, permitColumns);
  var dueDateColumn = new DueDateColumn(backlogArray, permitColumns);
  var siteSurveyDateCol = permitColumns.siteSurvey_Date;
  var columnsToRemove = 6;
  var headers = backlogArray[0];
  headers.splice(
    siteSurveyDateCol,
    columnsToRemove,
    backlogDateColumn.headerToAdd,
    dueDateColumn.headerToAdd
  );
  for (var row = 1; row < backlogArray.length; row++) {
    var account = backlogArray[row];
    var lateDates = new LateDatesConstructor(account, row, permitColumns);
    debugger;
    account.splice(
      siteSurveyDateCol,
      columnsToRemove,
      backlogDateColumn.headerToAdd_Data,
      dueDateColumn.headerToAdd_Data
    );
  }
  debugger;
  return backlogArray;
}

/**
 * Will create the backlog date column
 * @param {Array[]} backlogArray
 * @param {PermitColumns} permitColumns
 */
function BacklogDateColumn(backlogArray, permitColumns) {
  var data = new Date();
  this.headerToAdd = 'BACKLOG DATE';
  this.headerToAdd_Data = data;
}

/**
 * Will create the backlog date column
 * @param {Array[]} backlogArray
 * @param {PermitColumns} permitColumns
 */
function DueDateColumn(backlogArray, permitColumns) {
  var data = new Date();
  this.headerToAdd = 'DUE DATE';
  this.headerToAdd_Data = data;
}

/**
 * Removes late dates from backlog
 * @param {Array[]} backlogArray
 * @param {Array[]} oldData
 * @param {DateColumnsConstructor} columns
 * @return {Array[]} backlogArray with removed dates
 */
function pp_RemoveLateDates(
  backlogArray,
  oldData,
  permitColumns,
  redesignColumns
) {
  var headers = backlogArray[0];
  var siteSurveyDateCol = columns.siteSurveyDateCol;
  var spliceDeleteCount = 6;
  headers.splice(
    siteSurveyDateCol,
    spliceDeleteCount,
    'BACKLOG DATE',
    'DUE DATE'
  );
  for (var row = 1; row < backlogArray.length; row++) {
    var account = backlogArray[row];
    var lateDates = new LateDatesConstructor(backlogArray, row, columns);
    backlogArray = pp_CompareDates(
      backlogArray,
      oldData,
      lateDates,
      account,
      columns,
      spliceDeleteCount
    );
  }
  return backlogArray;
}

/**
 * Compares dates to be removed in backlog
 * @param {Array[]} backlogArray
 * @param {Array[]} oldData
 * @param {LateDatesConstructor} lateDates
 * @param {Array} account
 * @param {DateColumnsConstructor} columns
 * @param {Number} spliceDeleteCount
 * @return {Array[]} backlogArray with compared dates
 */
function pp_CompareDates(
  backlogArray,
  oldData,
  lateDates,
  account,
  columns,
  spliceDeleteCount
) {
  var addHours = 24,
    serviceNumber = lateDates.serviceNumber,
    siteSurveyDateCol = columns.siteSurveyDateCol,
    initialDate = new CompareDatesConstructor(lateDates).initialDate,
    backlogDate,
    dueDate;

  // If the initail date is 6 hours past now and new to the backlog give new date
  if (checkHibernated(oldData, serviceNumber, initialDate)) {
    initialDate = new Date();
    backlogDate = 'CHRONO STAMP';
  } else {
    backlogDate = initialDate;
  }
  if (initialDate.getDay() === 5) {
    addHours = 71;
  } else if (initialDate.getDay() === 6) {
    addHours = 47;
  }
  // add 24 hours to initial date
  dueDate = timeAddHours(new Date(initialDate.getTime()), addHours);
  // replace and remove the other
  account.splice(siteSurveyDateCol, spliceDeleteCount, backlogDate, dueDate);
  return backlogArray;
}

/**
 * Checks if the account is hibernated
 * @param {Array[]} oldData
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
  var now = new Date();
  var hours = (now - initialDate) / 36e5;
  if (hours < 6) {
    return false;
  }

  // Check if service number existed already in backlog
  var found = oldData.some(function(account) {
    var checkServiceCol = 0;
    var trueFalse = account[checkServiceCol] === serviceNumber;
    return trueFalse;
  });
  // If found return false, else the account was not in the backlog before
  if (found) {
    return false;
  } else {
    return true;
  }
}
