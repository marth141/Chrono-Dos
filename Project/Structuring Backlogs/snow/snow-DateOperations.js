/* exported
debugSnowDateCleaner
*/

/* global
ServiceMasterBacklog
SpreadsheetApp
getBacklogArray
getDimensions
getMeThatColumn
timeAddHours
validateHeader
*/

function debugSnowDateCleaner() {
  var masterBacklogs = new ServiceMasterBacklog();
  snow_DateCleaner(masterBacklogs.Collection);
  return;
}

/**
 *
 * 
 * @param {any} propBacklog 
 */
function snow_DateCleaner(propBacklog) {
  propBacklog = propBacklog[2];
  var dim = getDimensions(propBacklog);
  var backlogArray = getBacklogArray(propBacklog, dim);
  var assignmentDate;
  if (validateHeader('Assignment Finish', backlogArray)) {
    assignmentDate = getMeThatColumn('Assignment Finish', backlogArray);
  } else if (validateHeader('Assignment Finish', backlogArray) === false) {
    throw 'Unable to find column: Assignment Finish';
  }
  var dateAdjLog = snow_RemoveLateDates(backlogArray, assignmentDate);
  snow_SortAndCleanDates(propBacklog, dateAdjLog, dim, assignmentDate);
}

/**
 *
 * 
 * @param {any} backlogArray
 * @param {number} assignmentDateCol
 * @returns
 */
function snow_RemoveLateDates(backlogArray, assignmentDateCol) {
  if (assignmentDateCol !== null) {
    for (var row = 1; row <= backlogArray.length; row++) {
      var dateValue = new Date(backlogArray[row][assignmentDateCol]);
      backlogArray[row][assignmentDateCol] = timeAddHours(dateValue, 24);
    }
    return backlogArray;
  } else if (assignmentDateCol === null) {
    return backlogArray;
  }
}

/**
 *
 *
 * @param {any} backlogSheet
 * @param {array} dateAdjLog
 * @param {array} dim
 * @param {number} assignmentDateCol
 * @returns
 */
function snow_SortAndCleanDates(backlogSheet, dateAdjLog, dim, assignmentDateCol) {
  backlogSheet.getRange(1, 1, dim[0], dim[1]).setValues(dateAdjLog);
  backlogSheet.getRange(2, 1, dim[0], dim[1]).sort([
    { column: assignmentDateCol + 1, ascending: true }
  ]);
  backlogSheet.getRange(1, assignmentDateCol + 1).setValue('Due Date');
  SpreadsheetApp.flush();
  return;
}
