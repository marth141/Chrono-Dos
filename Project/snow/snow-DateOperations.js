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

function snow_DateCleaner(propBacklog) {
  propBacklog = propBacklog[2];
  var dim = getDimensions(propBacklog);
  var backlogArray = getBacklogArray(propBacklog, dim);
  var assignmentDate;
  if (validateHeader('Assignment Finish', backlogArray, dim)) {
    assignmentDate = getMeThatColumn('Assignment Finish', backlogArray);
  } else if (validateHeader('Assignment Finish', backlogArray, dim) === false) {
    throw 'Unable to find column: Assignment Finish';
  }
  var dateAdjLog = snow_RemoveLateDates(backlogArray, dim, assignmentDate);
  snow_SortAndCleanDates(propBacklog, dateAdjLog, dim, assignmentDate);
}

function snow_RemoveLateDates(backlogArray, dim, assignmentDate) {
  if (assignmentDate !== null) {
    for (var row = 1; row <= dim[0] - 1; row++) {
      var dateValue = new Date(backlogArray[row][assignmentDate]);
      backlogArray[row][assignmentDate] = timeAddHours(dateValue, 24);
    }
    return backlogArray;
  } else if (assignmentDate === null) {
    return backlogArray;
  }
}

function snow_SortAndCleanDates(backlogSheet, dateAdjLog, dim, assignmentDate) {
  backlogSheet.getRange(1, 1, dim[0], dim[1]).setValues(dateAdjLog);
  backlogSheet.getRange(2, 1, dim[0], dim[1]).sort([
    { column: assignmentDate + 1, ascending: true }
  ]);
  backlogSheet.getRange(1, assignmentDate + 1).setValue('Due Date');
  SpreadsheetApp.flush();
  return;
}
