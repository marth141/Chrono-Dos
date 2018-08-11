/**
 *
 * @param {*} backlogArray
 * @param {*} oldData
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
    )
  };

  var {
    serviceCol,
    siteSurveyDateCol,
    welcomeCallDateCol,
    signedDateCol,
    approvedDateCol
  } = columns;

  var dateAdjLog = pp_RemoveLateDates(backlogArray, oldData, columns);
  return dateAdjLog;
}

/**
 *
 * @param {*} backlogArray
 * @param {*} oldData
 * @param {*} columns
 */
function pp_RemoveLateDates(backlogArray, oldData, columns) {
  var {
    serviceCol,
    siteSurveyDateCol,
    welcomeCallDateCol,
    signedDateCol,
    approvedDateCol
  } = columns;
  // Remove column in header
  backlogArray[0].splice(siteSurveyDateCol, 4, 'BACKLOG DATE', 'DUE DATE');
  var dates = {
    dateValue1: undefined,
    dateValue2: undefined,
    dateValue3: undefined,
    dateValue4: undefined
  };
  var { dateValue1, dateValue2, dateValue3, dateValue4 } = dates;
  var serviceNumber;
  for (var row = 1; row < backlogArray.length; row++) {
    dateValue1 = new Date(backlogArray[row][siteSurveyDateCol]);
    dateValue2 = new Date(backlogArray[row][welcomeCallDateCol]);
    dateValue3 = new Date(backlogArray[row][signedDateCol]);
    dateValue4 = new Date(backlogArray[row][approvedDateCol]);
    serviceNumber = backlogArray[row][serviceCol];
    backlogArray = pp_CompareDates(
      backlogArray,
      oldData,
      serviceNumber,
      dates,
      row,
      siteSurveyDateCol
    );
  }
  return backlogArray;
}

/**
 *
 * @param {*} backlogArray
 * @param {*} oldData
 * @param {*} serviceNumber
 * @param {*} dateValue1
 * @param {*} dateValue2
 * @param {*} dateValue3
 * @param {*} dateValue4
 * @param {*} row
 * @param {*} siteSurveyDateCol
 */
function pp_CompareDates(
  backlogArray,
  oldData,
  serviceNumber,
  dates
  row,
  siteSurveyDateCol
) {
  var { dateValue1, dateValue2, dateValue3, dateValue4 } = dates;
  var checkDates = [dateValue1, dateValue2, dateValue3, dateValue4].filter(
    function(x) {
      return x instanceof Date && !isNaN(x.getTime());
    }
  );
  var initialDate = new Date(Math.max.apply(null, checkDates));
  var backlogDate, dueDate;
  var addHours = 24;

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
  backlogArray[row].splice(siteSurveyDateCol, 4, backlogDate, dueDate); // replace and remove the other
  return backlogArray;
}

function checkHibernated(oldData, serviceNumber, initialDate) {
  // Check initail date is over 6 hours
  var hours = (new Date() - initialDate) / 36e5;
  if (hours < 6) { return false};

  // Check if service number existed already in backlog
  var found = oldData.some(function(row) {
    return row[0] === serviceNumber;
  });
  //If found return false, else the account was not in the backlog before
  if (found) return false;
  else return true;
}
