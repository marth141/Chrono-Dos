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

/**
* For debugging dateOperations().
* 
* @returns void
*/
function debugPartOneDateCleaner() {
  var masterBacklogs = new ServiceMasterBacklog();
  masterBacklogs = masterBacklogs.Collection;
  partone_DateCleaner(masterBacklogs[4]);
  return;
}

/**
* For the proposal backlog, checks for date
* columns, verifies they are dates, removes
* the late dates and will sort and clean the
* backlog.
* 
* @param {Sheet} propBacklog The backlog to be edited.
*/
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

/**
* Sets up variables for comparing dates by
* locating the columns and state abreviations
* for the rest of the dateOperations().
* 
* @param {Array} backlogArray 
* @param {Array} dim 
* @param {Number} phaseSSCompCol 
* @param {Number} OpPropStatDateCol 
* @param {String} ssExtCompCol
* @returns If dateCol2 is not null, corrected dates backlog is returned.
* @returns If dateCol2 is null, the backlog is returned unchanged.
*/
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

/**
* Will sort the date column within the google
* sheet then Removes the redundant date column.
* 
* @param {Sheet} backlogSheet The backlog Google Sheet
* @param {Array} dateAdjLog The Date Adjusted Backlog Array
* @param {Array} dim The dimensions of the backlog Google Sheet
* @param {Number} OpPropStatDateCol
* @param {Number} propStatDate 
* @returns void
*/
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

/**
* Removes the column that is a copy of the
* date column to keep. This redundancy is
* due to the dates overwriting each other in
* compareDates().
* 
* @param {Sheet} backlogSheet 
* @param {Number} propStatDate 
* @returns void
*/
function partone_RemoveDoubleDate(backlogSheet, propStatDate) {
  backlogSheet.deleteColumn(propStatDate + 1);
  SpreadsheetApp.flush();
  return;
}
