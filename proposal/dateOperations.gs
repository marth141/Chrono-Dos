function debug() {
	var masterBacklogs = new master_Backlogs();
	dateOperations(masterBacklogs.Collection);
	return;
}

/**
 * Begins the process for filtering dates in backlogs.
 * 
 * @param {[Sheet]} masterBacklogs 
 */
function dateOperations(masterBacklogs) {
	for (var backlog in masterBacklogs) {
		if (masterBacklogs[backlog].getName() === 'DEPT Proposal') {
			var propBacklog = masterBacklogs[backlog];
			// Above is a set up, below is an action.
			proposalDateCleaner(propBacklog);
		} else if (masterBacklogs[backlog] === null) {
			throw 'The backlog was null in dateOperations()';
		} else {
			console.log('This backlog: ' + masterBacklogs[backlog].getName() + ' is not being worked.');
			continue;
		}
	}
}

/**
 * For the proposal backlog, checks for date
 * columns, verifies they are dates, removes
 * the late dates and will sort and clean the
 * backlog.
 * 
 * @param {any} propBacklog 
 */
function proposalDateCleaner(propBacklog) {
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
	var dateAdjLog = removeLateDates(backlogArray, dim, propReqDate, propStatDate, stateOffice);
	sortAndCleanDates(propBacklog, dateAdjLog, dim, propReqDate, propStatDate);
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
function checkForDates(searchString, backlogArray, dim) {
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
 * @returns If dateCol2 is not null, corrected dates backlog is returned.
 * @returns If dateCol2 is null, the backlog is returned unchanged.
 */
function removeLateDates(backlogArray, dim, propReqDate, propStatDate, stateOffice) {
	if (propStatDate !== null) {
		for (var row = 1; row <= dim[0] - 1; row++) {
			var dateValue1 = new Date(backlogArray[row][propReqDate]);
			var dateValue2 = new Date(backlogArray[row][propStatDate]);
			var stateAbrv = backlogArray[row][stateOffice].substr(0, 2);
			backlogArray = compareDates(backlogArray, dateValue1, dateValue2, row, propReqDate, propStatDate, stateAbrv);
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
function compareDates(backlogArray, dateValue1, dateValue2, row, propReqDate, propStatDate, stateAbrv) {
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
function sortAndCleanDates(backlogSheet, dateAdjLog, dim, propReqDate, propStatDate) {
	backlogSheet.getRange(1, 1, dim[0], dim[1]).setValues(dateAdjLog);
	backlogSheet.getRange(2, 1, dim[0], dim[1]).sort([
		{ column: propReqDate + 1, ascending: true }
	]);
	backlogSheet.getRange(1, propReqDate + 1).setValue('Proposal Date');
	SpreadsheetApp.flush();
	removeDoubleDate(backlogSheet, propStatDate);
	return;
}

/**
 * Removes the column that is a copy of the
 * date column to keep. This redundancy is
 * due to the dates overwriting each other in
 * compareDates().
 * 
 * @param {Sheet} backlogSheet 
 * @param {Number} dateCol 
 * @param {Number} propStatDate 
 * @returns void
 */
function removeDoubleDate(backlogSheet, propStatDate) {
	backlogSheet.deleteColumn(propStatDate + 1);
	SpreadsheetApp.flush();
	return;
}

function addHours(date, h) {
	date.setTime(date.getTime() + h * 60 * 60 * 1000); return date;
}

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
