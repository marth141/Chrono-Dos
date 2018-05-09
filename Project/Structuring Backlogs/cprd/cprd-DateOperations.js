/* exported
debugCPRDDateCleaner
cprd_RemoveDoubleDate
*/

/* global
ServiceMasterBacklog
SpreadsheetApp
getMeThatColumn
timeAddHours
*/

function debugCPRDDateCleaner() {
  var masterBacklogs = new ServiceMasterBacklog();
  masterBacklogs = masterBacklogs.Collection;
  cprd_DateCleaner(masterBacklogs[3]);
  return;
}

/**
 *
 * 
 * @param {any} propBacklog 
 * @returns
 */
function cprd_DateCleaner(backlogArray) {

  var opPropCompCol, initPropCompCol, redesReqCol;
  opPropCompCol = getMeThatColumn("Opportunity: Proposal Requested", backlogArray);
  initPropCompCol = getMeThatColumn("Initial Proposal Completed", backlogArray);
  redesReqCol = getMeThatColumn("Redesign Requested", backlogArray);
  var dateAdjBacklog = cprd_RemoveLateDates(backlogArray, opPropCompCol, initPropCompCol, redesReqCol);
  
  return dateAdjBacklog;
}

/**
 *
 * 
 * @param {any} backlogArray 
 * @param {array} dim
 * @param {number} opPropCompCol
 * @param {number} initPropCompCol
 * @param {number} redesReqCol
 * @param {number} stateOfficeCol
 * @returns 
 */
function cprd_RemoveLateDates(backlogArray, opPropCompCol, initPropCompCol, redesReqCol) {

  for (var row = 1; row < backlogArray.length; row++) {
    var dateValue1 = new Date(backlogArray[row][opPropCompCol]);
    var dateValue2 = new Date(backlogArray[row][initPropCompCol]);
    var dateValue3 = new Date(backlogArray[row][redesReqCol]);
    dateValue1 = invalidFix(dateValue1);
    dateValue2 = invalidFix(dateValue2);
    dateValue3 = invalidFix(dateValue3);
    backlogArray = cprd_CompareDates(backlogArray, dateValue1, dateValue2, dateValue3, row, opPropCompCol, initPropCompCol, redesReqCol);
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
 * @param {any} backlogArray 
 * @param {Date} dateValue1
 * @param {Date} dateValue2
 * @param {Date} dateValue3
 * @param {number} row
 * @param {number} opPropCompCol
 * @param {string} stateAbrv
 * @returns 
 */
function cprd_CompareDates(backlogArray, dateValue1, dateValue2, dateValue3, row, opPropCompCol, initPropCompCol, redesReqCol) {
  if (dateValue2 <= dateValue1 && dateValue1 >= dateValue3) {
    backlogArray[row][initPropCompCol] = timeAddHours(dateValue1, 24);
    backlogArray[row].splice(redesReqCol, 1);
    return backlogArray;
  } else if (dateValue1 <= dateValue2 && dateValue2 >= dateValue3) {
    backlogArray[row][redesReqCol] = timeAddHours(dateValue2, 24);
    backlogArray[row].splice(opPropCompCol, 1);
    return backlogArray;
  } else if (dateValue1 <= dateValue3 && dateValue3 >= dateValue2) {
    backlogArray[row].splice(redesReqCol+1, 0, timeAddHours(dateValue3, 24));
    backlogArray[row].splice(opPropCompCol, 2);
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
function cprd_RemoveDoubleDate(backlogSheet, propStatDateCol) {
  backlogSheet.deleteColumn(propStatDateCol + 1);
  SpreadsheetApp.flush();
  return;
}
