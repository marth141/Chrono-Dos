/* exported
debugPropDateCleaner
validatePropHeaders
prop_SortAndCleanDates
*/

/* global
ServiceMasterBacklog
getMeThatColumn
timeAddHours
timeStateOffset
validateHeader
*/

/**
 *
 * 
 * @returns 
 */
function debugPropDateCleaner() {
  var masterBacklogs = new ServiceMasterBacklog();
  prop_DateCleaner(masterBacklogs.Collection[4]);
  return;
}

/**
 *
 *
 * @param {any} propBacklog
 * @returns 
 */
function prop_DateCleaner(backlogArray) {

  var propReqDateCol, propStatDateCol, stateOfficeCol;
  propReqDateCol = getMeThatColumn("Opportunity: Proposal Requested", backlogArray);
  propStatDateCol = getMeThatColumn("Opportunity: Proposal Status Date", backlogArray);
  stateOfficeCol = getMeThatColumn("Service: Regional Operating Center", backlogArray);
  var dateAdjLog = prop_RemoveLateDates(backlogArray, propReqDateCol, propStatDateCol, stateOfficeCol);
  return dateAdjLog;
}

/**
 *
 * 
 * @param {array} backlogArray
 * @returns
 */
function validatePropHeaders(backlogArray) {
  if (validateHeader("Opportunity: Proposal Requested", backlogArray)
    && validateHeader("Opportunity: Proposal Status Date", backlogArray)
    && validateHeader("Service: Regional Operating Center", backlogArray) === true) {
    return true;
  }
}

/**
 *
 * 
 * @param {array} backlogArray
 * @param {number} propReqDateCol
 * @param {number} propStatDateCol
 * @param {number} stateOfficeCol
 * @returns
 */
function prop_RemoveLateDates(backlogArray, propReqDateCol, propStatDateCol, stateOfficeCol) {
  if (propStatDateCol !== null) {
    for (var row = 1; row < backlogArray.length; row++) {
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
  if (dateValue1 >= dateValue2) {
    fivePM += timeStateOffset(stateAbrv);
    dateValue1.setHours(fivePM, 0, 0); // Changes date value to 5
    backlogArray[row][propStatDateCol] = timeAddHours(dateValue1, 24); // sets the 5pm date value at service number due date.
    return backlogArray;
  } else if (dateValue1 < dateValue2) {
    fivePM += timeStateOffset(stateAbrv);
    dateValue2.setHours(fivePM, 0, 0);
    backlogArray[row][propReqDateCol] = backlogArray[row][propStatDateCol];
    backlogArray[row][propStatDateCol] = timeAddHours(dateValue2, 24);
    return backlogArray;
  } else {
    fivePM += timeStateOffset(stateAbrv);
    dateValue1.setHours(fivePM, 0, 0);
    backlogArray[row][propStatDateCol] = timeAddHours(dateValue1, 24);
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
  backlogSheet.getRange(1, 1, dim[0], dim[1]).setValues(dateAdjLog); // Pastes new date array into sheet
  backlogSheet.getRange(2, 1, dim[0], dim[1]).sort([ // sort the sheet by date
    { column: propReqDateCol + 1, ascending: true }
  ]);
  backlogSheet.getRange(1, propReqDateCol + 1).setValue("Proposal Date"); // Sets due date column header
  prop_RemoveDoubleDate(backlogSheet, propStatDateCol); // Deletes unneccessary date column
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
