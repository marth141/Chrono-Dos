/* exported
debugPartOneDateCleaner
*/

/* global
ServiceMasterBacklog
SpreadsheetApp
getBacklogArray
getDimensions
getMeThatColumn
timeAddHours
timeStateOffset
validateHeader
*/

function debugPartOneDateCleaner() {
  var masterBacklogs = new ServiceMasterBacklog();
  masterBacklogs = masterBacklogs.Collection;
  partone_DateCleaner(masterBacklogs[4]);
  return;
}

function partone_DateCleaner(propBacklog) {
  var dim = getDimensions(propBacklog);
  var backlogArray = getBacklogArray(propBacklog, dim);
  var phaseSSCompCol, ssExtCompCol, stateOfficeCol;
  if (validateHeader('Phase: Site Survey Completed', backlogArray, dim)) {
    phaseSSCompCol = getMeThatColumn('Phase: Site Survey Completed', backlogArray, dim);
    ssExtCompCol = getMeThatColumn('Phase: Site Survey Exterior Completed', backlogArray, dim);
    stateOfficeCol = getMeThatColumn('Opportunity: Office: Office Name', backlogArray, dim);
  } else if (validateHeader('Opportunity: Proposal Status Date', backlogArray, dim) === false) {
    throw 'Unable to find column: Opportunity: Proposal Status Date';
  }
  var dateAdjLog = partone_RemoveLateDates(backlogArray, dim, phaseSSCompCol, ssExtCompCol, stateOfficeCol);
  partone_SortAndCleanDates(propBacklog, dateAdjLog, dim, phaseSSCompCol, ssExtCompCol);
  return;
}

function partone_RemoveLateDates(backlogArray, dim, phaseSSCompCol, ssExtCompCol, stateOfficeCol) {
  if (phaseSSCompCol !== null) {
    for (var row = 1; row <= dim[0] - 1; row++) {
      var dateValue1 = new Date(backlogArray[row][phaseSSCompCol]);
      var dateValue2 = new Date(backlogArray[row][ssExtCompCol]);
      var stateAbrv = backlogArray[row][stateOfficeCol].substr(0, 2);
      dateValue1 = invalidFix(dateValue1);
      dateValue2 = invalidFix(dateValue2);
      backlogArray = partone_CompareDates(backlogArray, dateValue1, dateValue2, row, phaseSSCompCol, ssExtCompCol, stateAbrv);
    }
    return backlogArray;
  } else if (phaseSSCompCol === null) {
    return backlogArray;
  }
}

function invalidFix(dateValue) {
  if (dateValue.toString() === 'Invalid Date') {
    dateValue = new Date(1970, 1, 1, 0, 0, 0, 0);
    return dateValue;
  } else {
    return dateValue;
  }
}

function partone_CompareDates(backlogArray, dateValue1, dateValue2, row, phaseSSCompCol, stateAbrv) {
  var fivePM = 17;
  if (dateValue1 > dateValue2) {
    fivePM += timeStateOffset(stateAbrv);
    dateValue1.setHours(fivePM, 0, 0);
    backlogArray[row][phaseSSCompCol] = timeAddHours(dateValue1, 24);
    return backlogArray;
  } else if (dateValue1 < dateValue2) {
    fivePM += timeStateOffset(stateAbrv);
    dateValue2.setHours(fivePM, 0, 0);
    backlogArray[row][phaseSSCompCol] = timeAddHours(dateValue2, 24);
    return backlogArray;
  } else {
    fivePM += timeStateOffset(stateAbrv);
    dateValue1.setHours(fivePM, 0, 0);
    backlogArray[row][phaseSSCompCol] = timeAddHours(dateValue1, 24);
    return backlogArray;
  }
}

function partone_SortAndCleanDates(backlogSheet, dateAdjLog, dim, phaseSSCompCol, ssExtCompCol) {
  backlogSheet.getRange(1, 1, dim[0], dim[1]).setValues(dateAdjLog);
  backlogSheet.getRange(2, 1, dim[0], dim[1]).sort([
    { column: phaseSSCompCol + 1, ascending: true }
  ]);
  backlogSheet.getRange(1, phaseSSCompCol + 1).setValue('Proposal Date');
  partone_RemoveDoubleDate(backlogSheet, ssExtCompCol);
  SpreadsheetApp.flush();
  // Removing for debugging
  return;
}

function partone_RemoveDoubleDate(backlogSheet, propStatDate) {
  backlogSheet.deleteColumn(propStatDate + 1);
  SpreadsheetApp.flush();
  return;
}
