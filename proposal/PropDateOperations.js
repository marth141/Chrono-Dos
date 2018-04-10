/**
* For debugging dateOperations().
* 
* @returns void
*/
function debugPropDateCleaner() {
  var masterBacklogs = new serviceMasterBacklog();
  prop_DateCleaner(masterBacklogs.Collection);
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
function prop_DateCleaner(propBacklog) {
  var dim = getDimensions(propBacklog);
  var backlogArray = getBacklogArray(propBacklog, dim);
  var propReqDate, propStatDate, stateOffice;
  if (validateHeader('Opportunity: Proposal Requested', backlogArray, dim) &&
      validateHeader('Opportunity: Proposal Status Date', backlogArray, dim)) {
    propReqDate = getMeThatColumn('Opportunity: Proposal Requested', backlogArray, dim);
    propStatDate = getMeThatColumn('Opportunity: Proposal Status Date', backlogArray, dim);
    stateOffice = getMeThatColumn('Opportunity: Office: Office Name', backlogArray, dim);
  } else if (validateHeader('Opportunity: Proposal Requested', backlogArray, dim) === false) {
    throw 'Unable to find column: Opportunity: Proposal Requested';
  } else if (validateHeader('Opportunity: Proposal Status Date', backlogArray, dim) === false) {
    throw 'Unable to find column: Opportunity: Proposal Status Date';
  }
  var dateAdjLog = prop_RemoveLateDates(backlogArray, dim, propReqDate, propStatDate, stateOffice);
  prop_SortAndCleanDates(propBacklog, dateAdjLog, dim, propReqDate, propStatDate);
}

/**
* Sets up variables for comparing dates by
* locating the columns and state abreviations
* for the rest of the dateOperations().
* 
* @param {Array} backlogArray 
* @param {Array} dim 
* @param {Number} propReqDate 
* @param {Number} propStatDate 
* @param {String} stateOffice
* @returns If dateCol2 is not null, corrected dates backlog is returned.
* @returns If dateCol2 is null, the backlog is returned unchanged.
*/
function prop_RemoveLateDates(backlogArray, dim, propReqDate, propStatDate, stateOffice) {
  if (propStatDate !== null) {
    for (var row = 1; row <= dim[0] - 1; row++) {
      var dateValue1 = new Date(backlogArray[row][propReqDate]);
      var dateValue2 = new Date(backlogArray[row][propStatDate]);
      var stateAbrv = backlogArray[row][stateOffice].substr(0, 2);
      backlogArray = prop_CompareDates(backlogArray, dateValue1, dateValue2, row, propReqDate, propStatDate, stateAbrv);
    }
    return backlogArray;
  } else if (propStatDate === null) {
    return backlogArray;
  }
}

/**
* Compares two dates and will overwrite the
* oldest date with the earliest.
* 
* @param {Array} backlogArray 
* @param {Date} dateValue1 
* @param {Date} dateValue2 
* @param {Number} row 
* @param {Number} propReqDate 
* @param {Number} propStatDate 
* @param {String} stateAbrv 
* @returns a new backlogArray with the dates "Normalized".
*/
function prop_CompareDates(backlogArray, dateValue1, dateValue2, row, propReqDate, propStatDate, stateAbrv) {
  var fivePM = 17;
  if (dateValue1 > dateValue2) {
    fivePM += timeStateOffset(stateAbrv);
    dateValue1.setHours(fivePM, 0, 0);
    backlogArray[row][propStatDate] = timeAddHours(dateValue1, 24);
    return backlogArray;
  } else if (dateValue1 < dateValue2) {
    fivePM += timeStateOffset(stateAbrv);
    dateValue2.setHours(fivePM, 0, 0);
    backlogArray[row][propReqDate] = timeAddHours(dateValue2, 24);
    return backlogArray;
  } else {
    fivePM += timeStateOffset(stateAbrv);
    dateValue1.setHours(fivePM, 0, 0);
    backlogArray[row][propReqDate] = timeAddHours(dateValue1, 24);
    return backlogArray;
  }
}

/**
* Will sort the date column within the google
* sheet then Removes the redundant date column.
* 
* @param {Sheet} backlogSheet 
* @param {Array} dateAdjLog 
* @param {Array} dim 
* @param {Number} dateCol 
* @param {Number} propStatDate 
* @returns void
*/
function prop_SortAndCleanDates(backlogSheet, dateAdjLog, dim, propReqDate, propStatDate) {
  backlogSheet.getRange(1, 1, dim[0], dim[1]).setValues(dateAdjLog);
  backlogSheet.getRange(2, 1, dim[0], dim[1]).sort([
    { column: propReqDate + 1, ascending: true }
  ]);
  backlogSheet.getRange(1, propReqDate + 1).setValue('Proposal Date');
  SpreadsheetApp.flush();
  prop_RemoveDoubleDate(backlogSheet, propStatDate);
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
function prop_RemoveDoubleDate(backlogSheet, propStatDate) {
  backlogSheet.deleteColumn(propStatDate + 1);
  SpreadsheetApp.flush();
  return;
}
