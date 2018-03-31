/**
 * For debugging dateOperations().
 * 
 * @returns void
 */
function debugDateOp() {
  var masterBacklogs = new master_Backlogs();
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
 * Checks that there is a date under the header
 * specified.
 * 
 * @param {String} searchString 
 * @param {Array} backlogArray 
 * @param {Array} dim 
 * @returns True - If instance of date; False - If not instance of date.
 */
function prop_CheckForDates(searchString, backlogArray, dim) {
  for (var col = 0; col <= dim[1] - 1; col++) {
    if (backlogArray[0][col].match(searchString)) {
      if (backlogArray[1][col] instanceof Date) {
        return true;
      } else {
        throw 'The backlog has a date column but no date in first row. Is it corrupted?';
      }
    } else if (col === dim[1] - 1) {
      throw 'The column \'' + searchString + '\' string could not be found.';
    }
  }
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
    fivePM += getTimeOffset(stateAbrv);
    dateValue1.setHours(fivePM, 0, 0);
    backlogArray[row][propStatDate] = addHours(dateValue1, 24);
    return backlogArray;
  } else if (dateValue1 < dateValue2) {
    fivePM += getTimeOffset(stateAbrv);
    dateValue2.setHours(fivePM, 0, 0);
    backlogArray[row][propReqDate] = addHours(dateValue2, 24);
    return backlogArray;
  } else {
    fivePM += getTimeOffset(stateAbrv);
    dateValue1.setHours(fivePM, 0, 0);
    backlogArray[row][propReqDate] = addHours(dateValue1, 24);
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

/**
 * Adds hours to a date value.
 * 
 * @param {Date} date 
 * @param {Number} h 
 * @returns The date with hours adjusted.
 */
function addHours(date, h) {
  date.setTime(date.getTime() + h * 60 * 60 * 1000); return date;
}

/**
 * Will determine 1700 hour offset to MST
 * by matching the state abreviation with
 * the cases listed.
 * 
 * @param {String} stateAbrv 
 * @returns A number to offset 1700 by.
 */
function getTimeOffset(stateAbrv) {
  switch (stateAbrv) {
    case 'HI':
      return 4;
    case 'WA':
    case 'OR':
    case 'CA':
    case 'NV':
      return 1;
    case 'AZ':
    case 'MT':
    case 'ID':
    case 'WY':
    case 'UT':
    case 'CO':
    case 'NM':
      return 0;
    case 'AL':
    case 'AR':
    case 'IL':
    case 'IA':
    case 'KS':
    case 'KY':
    case 'LA':
    case 'MN':
    case 'MS':
    case 'MO':
    case 'NE':
    case 'ND':
    case 'OK':
    case 'SD':
    case 'TN':
    case 'TX':
    case 'WI':
      return -1;
    case 'CT':
    case 'DE':
    case 'FL':
    case 'GA':
    case 'IN':
    case 'ME':
    case 'MD':
    case 'MA':
    case 'MI':
    case 'NH':
    case 'NJ':
    case 'NY':
    case 'NC':
    case 'OH':
    case 'PA':
    case 'RI':
    case 'SC':
    case 'VT':
    case 'VA':
    case 'DC':
    case 'WV':
      return -2;
  }
}
