/* exported
debugCPRDDateCleaner
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
function cprd_DateCleaner(propBacklog) {
  var dim = getDimensions(propBacklog);
  var backlogArray = getBacklogArray(propBacklog, dim);
  var opPropCompCol, initPropCompCol, redesReqCol, stateOfficeCol;
  if (validateHeader('Opportunity: Proposal Requested', backlogArray, dim)) {
    opPropCompCol = getMeThatColumn('Opportunity: Proposal Requested', backlogArray);
    initPropCompCol = getMeThatColumn('Initial Proposal Completed', backlogArray);
    redesReqCol = getMeThatColumn('Redesign Requested', backlogArray);
    stateOfficeCol = getMeThatColumn('Opportunity: Office', backlogArray);
  } else if (validateHeader('Opportunity: Proposal Requested', backlogArray, dim) === false) {
    throw 'Unable to find column: Opportunity: Proposal Requested';
  }
  var dateAdjLog = cprd_RemoveLateDates(backlogArray, dim, opPropCompCol, initPropCompCol, redesReqCol, stateOfficeCol);
  cprd_SortAndCleanDates(propBacklog, dateAdjLog, dim, initPropCompCol, opPropCompCol, redesReqCol);
  return;
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
function cprd_RemoveLateDates(backlogArray, dim, opPropCompCol, initPropCompCol, redesReqCol, stateOfficeCol) {
  if (initPropCompCol !== null) {
    for (var row = 1; row <= dim[0] - 1; row++) {
      var dateValue1 = new Date(backlogArray[row][opPropCompCol]);
      var dateValue2 = new Date(backlogArray[row][initPropCompCol]);
      var dateValue3 = new Date(backlogArray[row][redesReqCol]);
      var stateAbrv = backlogArray[row][stateOfficeCol].substr(0, 2);
      dateValue1 = invalidFix(dateValue1);
      dateValue2 = invalidFix(dateValue2);
      dateValue3 = invalidFix(dateValue3);
      backlogArray = cprd_CompareDates(backlogArray, dateValue1, dateValue2, dateValue3, row, opPropCompCol, stateAbrv);
    }
    return backlogArray;
  } else if (initPropCompCol === null) {
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
 * @param {any} backlogArray 
 * @param {Date} dateValue1
 * @param {Date} dateValue2
 * @param {Date} dateValue3
 * @param {number} row
 * @param {number} opPropCompCol
 * @param {string} stateAbrv
 * @returns 
 */
function cprd_CompareDates(backlogArray, dateValue1, dateValue2, dateValue3, row, opPropCompCol, stateAbrv) {
  var fivePM = 17;
  if (dateValue2 <= dateValue1 && dateValue1 >= dateValue3) {
    fivePM += timeStateOffset(stateAbrv);
    dateValue1.setHours(fivePM, 0, 0);
    backlogArray[row][opPropCompCol] = timeAddHours(dateValue1, 24);
    return backlogArray;
  } else if (dateValue1 <= dateValue2 && dateValue2 >= dateValue3) {
    fivePM += timeStateOffset(stateAbrv);
    dateValue2.setHours(fivePM, 0, 0);
    backlogArray[row][opPropCompCol] = timeAddHours(dateValue2, 24);
    return backlogArray;
  } else if (dateValue1 <= dateValue3 && dateValue3 >= dateValue2) {
    fivePM += timeStateOffset(stateAbrv);
    dateValue1.setHours(fivePM, 0, 0);
    backlogArray[row][opPropCompCol] = timeAddHours(dateValue3, 24);
    return backlogArray;
  }
}

/**
 *
 * 
 * @param {any} backlogSheet 
 * @param {array} dateAdjLog
 * @param {array} dim
 * @param {number} OpPropStatDateCol
 * @param {number} phaseSSCompCol
 * @param {number} ssExtCompCol
 * @returns 
 */
function cprd_SortAndCleanDates(backlogSheet, dateAdjLog, dim, OpPropStatDateCol, phaseSSCompCol, ssExtCompCol) {
  backlogSheet.getRange(1, 1, dim[0], dim[1]).setValues(dateAdjLog);
  backlogSheet.getRange(2, 1, dim[0], dim[1]).sort([
    { column: OpPropStatDateCol + 1, ascending: true }
  ]);
  backlogSheet.getRange(1, OpPropStatDateCol + 1).setValue('Proposal Date');
  cprd_RemoveDoubleDate(backlogSheet, phaseSSCompCol);
  cprd_RemoveDoubleDate(backlogSheet, ssExtCompCol - 1);
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
function cprd_RemoveDoubleDate(backlogSheet, propStatDateCol) {
  backlogSheet.deleteColumn(propStatDateCol + 1);
  SpreadsheetApp.flush();
  return;
}
