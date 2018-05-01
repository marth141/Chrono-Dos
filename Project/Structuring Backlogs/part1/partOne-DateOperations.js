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

/**
 *
 * 
 * @param {any} propBacklog
 * @returns 
 */
function partone_DateCleaner(propBacklog) {
  var dim = getDimensions(propBacklog);
  var backlogArray = getBacklogArray(propBacklog, dim);
  var phaseSSCompCol, ssExtCompCol, stateOfficeCol;
  if (validateHeader('Phase: Site Survey Completed', backlogArray)) {
    phaseSSCompCol = getMeThatColumn('Phase: Site Survey Completed', backlogArray);
    ssExtCompCol = getMeThatColumn('Phase: Site Survey Exterior Completed', backlogArray);
    stateOfficeCol = getMeThatColumn('Opportunity: Office: Office Name', backlogArray);
  } else if (validateHeader('Opportunity: Proposal Status Date', backlogArray) === false) {
    throw 'Unable to find column: Opportunity: Proposal Status Date';
  }
  var dateAdjLog = partone_RemoveLateDates(backlogArray, dim, phaseSSCompCol, ssExtCompCol, stateOfficeCol);
  partone_SortAndCleanDates(propBacklog, dateAdjLog, dim, phaseSSCompCol, ssExtCompCol);
  return;
}

/**
 *
 * 
 * @param {array} backlogArray
 * @param {array} dim
 * @param {number} phaseSSCompCol
 * @param {number} ssExtCompCol
 * @param {number} stateOfficeCol
 * @returns 
 */
function partone_RemoveLateDates(backlogArray, dim, phaseSSCompCol, ssExtCompCol, stateOfficeCol) {
  if (phaseSSCompCol !== null) {
    for (var row = 1; row <= dim[0] - 1; row++) {
      var dateValue1 = new Date(backlogArray[row][phaseSSCompCol]);
      var dateValue2 = new Date(backlogArray[row][ssExtCompCol]);
      var stateAbrv = backlogArray[row][stateOfficeCol].substr(0, 2);
      dateValue1 = invalidFix(dateValue1);
      dateValue2 = invalidFix(dateValue2);
      backlogArray = partone_CompareDates(backlogArray, dateValue1, dateValue2, row, phaseSSCompCol, stateAbrv);
    }
    return backlogArray;
  } else if (phaseSSCompCol === null) {
    return backlogArray;
  }
}

/**
 *
 *
 * @param {Date} dateValue
 * @returns 
 */
function invalidFix(dateValue) {
  if (dateValue.toString() === 'Invalid Date') {
    dateValue = new Date(1970, 1, 1, 0, 0, 0, 0);
    return dateValue;
  } else {
    return dateValue;
  }
}

/**
 *
 * 
 * @param {array} backlogArray
 * @param {Date} dateValue1
 * @param {Date} dateValue2
 * @param {number} row
 * @param {number} phaseSSCompCol
 * @param {string} stateAbrv
 * @returns 
 */
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
 *
 * 
 * @param {any} backlogSheet 
 * @param {array} dateAdjLog
 * @param {array} dim
 * @param {number} phaseSSCompCol
 * @param {number} ssExtCompCol
 * @returns 
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
 *
 * 
 * @param {any} backlogSheet
 * @param {number} propStatDateCol
 * @returns 
 */
function partone_RemoveDoubleDate(backlogSheet, propStatDateCol) {
  backlogSheet.deleteColumn(propStatDateCol + 1);
  SpreadsheetApp.flush();
  return;
}
