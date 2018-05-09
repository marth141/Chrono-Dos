/* exported
debugPartOneDateCleaner
partone_RemoveDoubleDate
*/

/* global
ServiceMasterBacklog
SpreadsheetApp
getMeThatColumn
timeAddHours
*/

function debugPartOneDateCleaner() {
  var masterBacklogs = new ServiceMasterBacklog();
  masterBacklogs = masterBacklogs.Collection;
  partOne_DateCleaner(masterBacklogs[4]);
  return;
}

/**
 *
 * 
 * @param {any} propBacklog
 * @returns 
 */
function partOne_DateCleaner(backlogArray) {

  var phaseSSCompCol, ssExtCompCol;
  phaseSSCompCol = getMeThatColumn("Project: Site Survey Completed", backlogArray);
  ssExtCompCol = getMeThatColumn("Phase: Site Survey Exterior Completed", backlogArray);
  var dateAdjBacklog = partOne_RemoveLateDates(backlogArray, phaseSSCompCol, ssExtCompCol);
  
  return dateAdjBacklog;
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
function partOne_RemoveLateDates(backlogArray, phaseSSCompCol, ssExtCompCol) {

  for (var row = 1; row < backlogArray.length - 1; row++) {
    var dateValue1 = new Date(backlogArray[row][phaseSSCompCol]);
    var dateValue2 = new Date(backlogArray[row][ssExtCompCol]);
    dateValue1 = invalidFix(dateValue1);
    dateValue2 = invalidFix(dateValue2);
    backlogArray = partone_CompareDates(backlogArray, dateValue1, dateValue2, row, phaseSSCompCol, ssExtCompCol);
  }
  return backlogArray;
}

/**
 *
 *
 * @param {Date} dateValue
 * @returns 
 */
function invalidFix(dateValue) {
  if (dateValue.toString() === "Invalid Date") {
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
function partone_CompareDates(backlogArray, dateValue1, dateValue2, row, phaseSSCompCol, ssExtCompCol) {
  if (dateValue1 >= dateValue2) {
    backlogArray[row].splice(ssExtCompCol, 1, timeAddHours(dateValue1, 24));
    return backlogArray;
  } 
  else {
    backlogArray[row].splice(ssExtCompCol+1, 0, timeAddHours(dateValue2, 24));
    backlogArray[row].splice(phaseSSCompCol, 1);
    return backlogArray;
  }
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
