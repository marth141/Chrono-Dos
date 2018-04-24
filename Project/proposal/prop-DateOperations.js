/* exported
debugPropDateCleaner
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

var SpreadsheetApp = SpreadsheetApp;

/**
 *
 * 
 * @returns 
 */
function debugPropDateCleaner() {
  var masterBacklogs = new ServiceMasterBacklog();
  prop_DateCleaner(masterBacklogs.Collection[1]);
  return;
}

/**
 *
 *
 * @param {any} propBacklog
 * @returns 
 */
function prop_DateCleaner(propBacklog) {
  var dim = getDimensions(propBacklog);
  var backlogArray = getBacklogArray(propBacklog, dim);
  var propReqDateCol, propStatDateCol, stateOfficeCol;
  if (validatePropHeaders(backlogArray, dim) === true) {
    propReqDateCol = getMeThatColumn('Opportunity: Proposal Requested', backlogArray);
    propStatDateCol = getMeThatColumn('Opportunity: Proposal Status Date', backlogArray);
    stateOfficeCol = getMeThatColumn('Service: Regional Operating Center', backlogArray);
  } else if (validateHeader('Opportunity: Proposal Requested', backlogArray, dim) === false) {
    throw 'Unable to find column: Opportunity: Proposal Requested';
  } else if (validateHeader('Opportunity: Proposal Status Date', backlogArray, dim) === false) {
    throw 'Unable to find column: Opportunity: Proposal Status Date';
  }
  var dateAdjLog = prop_RemoveLateDates(backlogArray, dim, propReqDateCol, propStatDateCol, stateOfficeCol);
  prop_SortAndCleanDates(propBacklog, dateAdjLog, dim, propReqDateCol, propStatDateCol);
  SpreadsheetApp.flush();
  return;
}

/**
 *
 * 
 * @param {array} backlogArray
 * @param {array} dim
 * @returns
 */
function validatePropHeaders(backlogArray, dim) {
  if (validateHeader('Opportunity: Proposal Requested', backlogArray, dim)
    && validateHeader('Opportunity: Proposal Status Date', backlogArray, dim) === true) {
    return true;
  }
}

/**
 *
 * 
 * @param {array} backlogArray
 * @param {array} dim
 * @param {number} propReqDateCol
 * @param {number} propStatDateCol
 * @param {number} stateOfficeCol
 * @returns 
 */
function prop_RemoveLateDates(backlogArray, dim, propReqDateCol, propStatDateCol, stateOfficeCol) {
  if (propStatDateCol !== null) {
    for (var row = 1; row <= dim[0] - 1; row++) {
      var dateValue1 = new Date(backlogArray[row][propReqDateCol]);
      var dateValue2 = new Date(backlogArray[row][propStatDateCol]);
      var stateAbrv = backlogArray[row][stateOfficeCol].substr(0, 2);
      backlogArray = prop_CompareDates(backlogArray, dateValue1, dateValue2, row, propReqDateCol, propStatDateCol, stateAbrv);
    }
    return backlogArray;
  } else if (propStatDateCol === null) {
    return backlogArray;
  }
}

/**
 *
 * 
 * @param {array} backlogArray
 * @param {Date} dateValue1
 * @param {Date} dateValue2
 * @param {number} row
 * @param {number} propReqDateCol
 * @param {number} propStatDateCol
 * @param {string} stateAbrv
 * @returns 
 */
function prop_CompareDates(backlogArray, dateValue1, dateValue2, row, propReqDateCol, propStatDateCol, stateAbrv) {
  var fivePM = 17;
  if (dateValue1 > dateValue2) {
    fivePM += timeStateOffset(stateAbrv);
    dateValue1.setHours(fivePM, 0, 0);
    backlogArray[row][propStatDateCol] = timeAddHours(dateValue1, 24);
    return backlogArray;
  } else if (dateValue1 < dateValue2) {
    fivePM += timeStateOffset(stateAbrv);
    dateValue2.setHours(fivePM, 0, 0);
    backlogArray[row][propReqDateCol] = timeAddHours(dateValue2, 24);
    return backlogArray;
  } else {
    fivePM += timeStateOffset(stateAbrv);
    dateValue1.setHours(fivePM, 0, 0);
    backlogArray[row][propReqDateCol] = timeAddHours(dateValue1, 24);
    return backlogArray;
  }
}

/**
 *
 * 
 * @param {any} backlogSheet
 * @param {array} dateAdjLog
 * @param {array} dim
 * @param {number} propReqDateCol
 * @param {number} propStatDateCol
 * @returns
 */
function prop_SortAndCleanDates(backlogSheet, dateAdjLog, dim, propReqDateCol, propStatDateCol) {
  backlogSheet.getRange(1, 1, dim[0], dim[1]).setValues(dateAdjLog);
  backlogSheet.getRange(2, 1, dim[0], dim[1]).sort([
    { column: propReqDateCol + 1, ascending: true }
  ]);
  backlogSheet.getRange(1, propReqDateCol + 1).setValue('Proposal Date');
  prop_RemoveDoubleDate(backlogSheet, propStatDateCol);
  return;
}

/**
 *
 * 
 * @param {any} backlogSheet
 * @param {number} propStatDateCol
 * @returns
 */
function prop_RemoveDoubleDate(backlogSheet, propStatDateCol) {
  backlogSheet.deleteColumn(propStatDateCol + 1);
  return;
}
