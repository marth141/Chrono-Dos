/**
* For debugging dateOperations().
* 
* @returns void
*/
function debugCPRDDateCleaner() {
  var masterBacklogs = new master_Backlogs();
  masterBacklogs = masterBacklogs.Collection;
  cprd_DateCleaner(masterBacklogs[3]);
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
function cprd_DateCleaner(propBacklog) {
  var dim = getDimensions(propBacklog);
  var backlogArray = getBacklogArray(propBacklog, dim);
  var opPropCompCol, initPropCompCol, redesReqCol, stateOfficeCol;
  if (validateHeader('Opportunity: Proposal Requested', backlogArray, dim)) {
    opPropCompCol = getMeThatColumn('Opportunity: Proposal Requested', backlogArray, dim);
    initPropCompCol = getMeThatColumn('Initial Proposal Completed', backlogArray, dim);
    redesReqCol = getMeThatColumn('Redesign Requested', backlogArray, dim);
    stateOfficeCol = getMeThatColumn('Opportunity: Office', backlogArray, dim);
  } else if (validateHeader('Opportunity: Proposal Requested', backlogArray, dim) === false) {
    throw 'Unable to find column: Opportunity: Proposal Requested';
  }
  var dateAdjLog = cprd_RemoveLateDates(backlogArray, dim, opPropCompCol, initPropCompCol, redesReqCol, stateOfficeCol);
  cprd_SortAndCleanDates(propBacklog, dateAdjLog, dim, initPropCompCol, opPropCompCol, redesReqCol);
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
function cprd_RemoveLateDates(backlogArray, dim, phaseSSCompCol, OpPropStatDateCol, ssExtCompCol, stateOfficeCol) {
  if (OpPropStatDateCol !== null) {
    for (var row = 1; row <= dim[0] - 1; row++) {
      var dateValue1 = new Date(backlogArray[row][phaseSSCompCol]);
      var dateValue2 = new Date(backlogArray[row][OpPropStatDateCol]);
      var dateValue3 = new Date(backlogArray[row][ssExtCompCol]);
      var stateAbrv = backlogArray[row][stateOfficeCol].substr(0, 2);
      dateValue1 = invalidFix(dateValue1);
      dateValue2 = invalidFix(dateValue2);
      dateValue3 = invalidFix(dateValue3);
      backlogArray = cprd_CompareDates(backlogArray, dateValue1, dateValue2, dateValue3, row, phaseSSCompCol, OpPropStatDateCol, ssExtCompCol, stateAbrv);
    }
    return backlogArray;
  } else if (OpPropStatDateCol === null) {
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

/**
* 
* 
* @param {Array} backlogArray The backlog array to be edited.
* @param {Date} dateValue1 Phase: Site Survey Completed
* @param {Date} dateValue2 Opportunity: Proposal Status Date
* @param {Date} dateValue3 Phase: Site Survey Exterior Completed
* @param {Number} row The service number to be edited
* @param {Number} phaseSSCompCol The column for phaseSSComp
* @param {Number} OpPropStatDateCol The Column for OpPropStatDate
* @param {Number} ssExtCompCol The Column for ssExtComp
* @param {String} stateAbrv The stateAbrv
* @returns 
*/
function cprd_CompareDates(backlogArray, dateValue1, dateValue2, dateValue3, row, phaseSSCompCol, OpPropStatDateCol, ssExtCompCol, stateAbrv) {
  var fivePM = 17;
  if (dateValue2 <= dateValue1 && dateValue1 >= dateValue3) {
    fivePM += getTimeOffset(stateAbrv);
    dateValue1.setHours(fivePM, 0, 0);
    backlogArray[row][OpPropStatDateCol] = addHours(dateValue1, 24);
    return backlogArray;
  } else if (dateValue1 <= dateValue2 && dateValue2 >= dateValue3) {
    fivePM += getTimeOffset(stateAbrv);
    dateValue2.setHours(fivePM, 0, 0);
    backlogArray[row][OpPropStatDateCol] = addHours(dateValue2, 24);
    return backlogArray;
  } else if (dateValue1 <= dateValue3 && dateValue3 >= dateValue2) {
    fivePM += getTimeOffset(stateAbrv);
    dateValue1.setHours(fivePM, 0, 0);
    backlogArray[row][OpPropStatDateCol] = addHours(dateValue3, 24);
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
* Removes the column that is a copy of the
* date column to keep. This redundancy is
* due to the dates overwriting each other in
* compareDates().
* 
* @param {Sheet} backlogSheet 
* @param {Number} propStatDate 
* @returns void
*/
function cprd_RemoveDoubleDate(backlogSheet, propStatDate) {
  backlogSheet.deleteColumn(propStatDate + 1);
  SpreadsheetApp.flush();
  return;
}
