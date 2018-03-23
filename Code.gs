// Column C contains link for Column B.
// Create link for Column B.
// Column C needs to be blanked or erased or something.
// Compare F and G, whichever is newer keep and add 24 hours.

var master_Backlogs = function () {
	this.Collection = SpreadsheetApp.getActiveSpreadsheet().getSheets();
};

var office_Collection = function () {
	this.SouthWest = ['AZ', 'CO', 'HI', 'NM', 'NV', 'TX', 'UT'];
	this.SouthCali = ['02', '06', '08', '09', '10', '12', '13', '14', '15', '17', '21', '29', '31', '32', 'LA'];
	this.NorthCali = ['01', '03', '04', '05', '07', '11', '16', '18', '19', '20', '22', '25', '26', '28', '30'];
	this.NewEnglan = ['CT', 'MA', 'NH', 'RI', 'VT'];
	this.Legion = ['FL', 'MD', 'SC', 'VA'];
	this.GritMovem = ['NJ', 'NY', 'PA'];
};

function main() {
	var masterBacklogs = new master_Backlogs();

	dateOperations(masterBacklogs.Collection);
	regionMarker(masterBacklogs.Collection);
	return;
}

/**
 * Takes in a masterBacklogs {Array} to give access to each backlog {Sheet} in the Master Backlog.
 * For each backlog in this Array, check if it needs to go down a specific path.
 * masterBacklogs[backlog] will be assigned to a backlogSheet variable as a singular {Sheet}.
 * That backlog will be passed into it's specific backlog functions.
 * 
 * @param {Array} masterBacklogs
 * @returns null
 * @throws If unable to find any dates or if the backlog is null.
 */
function dateOperations(masterBacklogs) {
	for (var backlog in masterBacklogs) {
		if (masterBacklogs[backlog].getName() === 'DEPT Proposal') {
			var propBacklog = masterBacklogs[backlog];
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
 * A function for cleaning the Proposal Backlog specifically.
 * Will getDimensions() of the propBacklog and will make it an array
 * with getBacklogArray(). Then, validateDates() will check that the
 * date columns belonging to the propBacklog are there with a date.
 * If it cannot find the date columns, it'll error.
 * If both date columns are found, it'll clear out all of the latest dates,
 * then rename a column to keep and delete the redundant column.
 * 
 * @param {any} propBacklog The backlog to be cleaned up.
 */
function proposalDateCleaner(propBacklog) {
	var dim = getDimensions(propBacklog);
	var backlogArray = getBacklogArray(propBacklog, dim);
	var dateCol1;
	var dateCol2;
	if (validateHeader('Opportunity: Proposal Requested', backlogArray, dim) &&
		validateHeader('Opportunity: Proposal Status Date', backlogArray, dim)) {
		dateCol1 = giveMeThatColumn('Opportunity: Proposal Requested', backlogArray, dim);
		dateCol2 = giveMeThatColumn('Opportunity: Proposal Status Date', backlogArray, dim);
	} else {
		throw 'Unable to find all date columns for proposalDateCleaner()';
	}
	var dateAdjLog = removeLateDates(backlogArray, dim, dateCol1, dateCol2);
	sortAndCleanDates(propBacklog, dateAdjLog, dim, dateCol1, dateCol2);
}

/**
 * Check for date column headers.
 * If there are date headers with a date under it, it'll return true.
 * If there are no date headers, it'll throw an error.
 * 
 * @param {String} header The column header to look for.
 * @param {Array} backlogArray The array to examine for dates.
 * @param {Array} dim The dimensions of the array.
 * @returns {Boolean} Will return true if any dates were found.
 * @throws If it cannot find any date headers, it'll error.
 */
function validateHeader(header, backlogArray, dim) {
	if (checkForDates(header, backlogArray, dim)) {
		return true;
	} else {
		throw 'validateDates() cannot find: ' + header;
	}
}

/**
 * Checks that there is a date in the backlogArray that is being acted on.
 * It'll loop through all of the columns in the 0th row of the array, looking for the searchString.
 * If it finds it, it'll check if there is a date below it.
 * If there is a date, it'll return true.
 * 
 * @param {String} searchString The column header to be found.
 * @param {Array} backlogArray The backlog Array to be searched.
 * @param {Array} dim The range of the array starting at Index 1.
 * @returns {Boolean} Returns true if column exists with a date below it.
 */
function checkForDates(searchString, backlogArray, dim) {
	for (var col = 0; col <= dim[1] - 1; col++) {
		if (backlogArray[0][col].match(searchString)) {
			if (backlogArray[1][col] instanceof Date) {
				return true;
			} else {
				throw 'The backlog has a date column but no dates. Is it corrupted?';
			}
		} else if (col === dim[1] - 1) {
			throw 'The column ' + searchString + ' string could not be found.';
		}
	}
}

/**
 * This will compare the date columns that were found by validateHeaders().
 * If there is a dateCol2, it'll compare the dates between both columns.
 * The later one will be overwritten with the earlier one.
 * It'll return the new array with no late dates.
 * If there is no dateCol2, it'll return the array with no actions done.
 * 
 * @param {any} backlogArray The backlog to be edited.
 * @param {any} dim The dimensions of the backlog starting Index 1.
 * @param {any} dateCol1 The first Date Column Index.
 * @param {any} dateCol2 The second Date Column Index.
 * @returns {Array} The date edited Array.
 */
function removeLateDates(backlogArray, dim, dateCol1, dateCol2) {
	if (dateCol2 !== null) {
		for (var row = 1; row <= dim[0] - 1; row++) {
			var dateValue1 = backlogArray[row][dateCol1];
			var dateValue2 = backlogArray[row][dateCol2];
			if (dateValue1 > dateValue2) {
				backlogArray[row][dateCol2] = dateValue1;
			} else if (dateValue1 < dateValue2) {
				backlogArray[row][dateCol1] = dateValue2;
			} else if (dateValue1 === dateValue2) {
				continue;
			}
			return backlogArray;
		}
	} else if (dateCol2 === null) {
		return backlogArray;
	}
}

/**
 * This will paste over the backlog sheet with the dateAdjLog Array.
 * Then it'll sort by the dateCol + 1 because it's a postion from an Array that starts at 0.
 * Because it sets all of the date values to the earliest value, it'll delete the redundant column.
 * 
 * @param {Sheet} backlogSheet The backlog sheet to be edited.
 * @param {Array} dateAdjLog The array to paste over the backlog sheet.
 * @param {Array} dim The dimensions of the backlog sheet.
 * @param {Number} dateCol The date column to keep.
 * @param {Number} delCol The date column to remove.
 * @returns 
 */
function sortAndCleanDates(backlogSheet, dateAdjLog, dim, dateCol, delCol) {
	backlogSheet.getRange(1, 1, dim[0], dim[1]).setValues(dateAdjLog);
	backlogSheet.getRange(2, 1, dim[0], dim[1]).sort([
		{ column: dateCol + 1, ascending: true }
	]);
	SpreadsheetApp.flush();
	removeDoubleDate(backlogSheet, dateCol, delCol);
	return;
}

/**
 * Will take in the backlogSheet and set the kept column's header as 'Proposal Date'.
 * Then, it'll delete the redundant column.
 * 
 * @param {any} backlogSheet 
 * @param {any} dateCol 
 * @param {any} delCol 
 * @returns The end of the dateOperations().
 */
function removeDoubleDate(backlogSheet, dateCol, delCol) {
	backlogSheet.getRange(1, dateCol + 1).setValue('Proposal Date');
	backlogSheet.deleteColumn(delCol + 1);
	SpreadsheetApp.flush();
	return;
}

function regionMarker(masterBacklogs) {
	for (var backlog in masterBacklogs) {
		if (masterBacklogs[backlog].getName() === 'DEPT Proposal') {
			var propBacklog = masterBacklogs[backlog];
			var dim = getDimensions(propBacklog);
			var backlogArray = getBacklogArray(propBacklog, dim);
			var col = giveMeThatColumn('Service: Regional Operating Center*', backlogArray, dim);
			mark_Region(propBacklog, backlogArray, col, dim);
		} else if (masterBacklogs[backlog] === null) {
			throw 'The backlog was null in dateOperations()';
		} else {
			console.log('This backlog: ' + masterBacklogs[backlog].getName() + ' is not being worked.');
			continue;
		}
	}
}

function mark_Region(backlogSheet, backlogArray, col, dim) {
	var offices = new office_Collection();
	var region;
	backlogArray[0][dim[1]] = 'Region';
	for (var row = 1; row <= dim[0] - 1; row++) {
		var stateAbrv = backlogArray[row][col].substr(0, 2);
		if (offices.SouthWest.indexOf(stateAbrv) > -1) {
			region = 'Southwest';
			backlogArray = writeRegion(backlogArray, row, dim, region);
		} else if (stateAbrv === 'CA') {
			backlogArray = mark_CaliRegion(offices, region, backlogArray, row, col, dim);
		} else if (offices.NewEnglan.indexOf(stateAbrv) > -1) {
			region = 'New England';
			backlogArray = writeRegion(backlogArray, row, dim, region);
		} else if (offices.Legion.indexOf(stateAbrv) > -1) {
			region = 'Legion';
			backlogArray = writeRegion(backlogArray, row, dim, region);
		} else if (offices.GritMovem.indexOf(stateAbrv) > -1) {
			region = 'Grit Movement';
			backlogArray = writeRegion(backlogArray, row, dim, region);
		}
	}
	console.log(dim[1]);
	backlogSheet.getRange(1, 1, dim[0], dim[1] + 1).setValues(backlogArray);
	SpreadsheetApp.flush();
	return;
}

function mark_CaliRegion(offices, region, backlogArray, row, col, dim) {
	var stateAbrv = backlogArray[row][col].substr(3, 2);
	if (offices.SouthCali.indexOf(stateAbrv) > -1) {
		region = 'SoCal';
		backlogArray = writeRegion(backlogArray, row, dim, region);
		return backlogArray;
	} else if (offices.NorthCali.indexOf(stateAbrv) > -1) {
		region = 'NorCal';
		backlogArray = writeRegion(backlogArray, row, dim, region);
		return backlogArray;
	}
}

function writeRegion(backlogArray, row, dim, region) {
	backlogArray[row][dim[1]] = region;
	return backlogArray;
}

/**
 * Will take in a backlog sheet and double-check that it isn't null.
 * It'll getLastRow() & getLastColumn of the sheet. This is a count starting at index 1.
 * These counts will be stored into the dimensions array and returned.
 * 
 * @param {Sheet} backlogSheet The backlog to getDimensions of.
 * @returns {Array} dimensions Array.
 * @throws If the backlogSheet for some reason is not a sheet anymore, will error.
 */
function getDimensions(backlogSheet) {
	if (backlogSheet !== null) {
		var lastRow = backlogSheet.getLastRow();
		var lastCol = backlogSheet.getLastColumn();
		var dimensions = [];
		dimensions.push(lastRow);
		dimensions.push(lastCol);
		return dimensions;
	} else {
		throw 'getDimensions() has a null; backlogSheet: ' + backlogSheet;
	}
}

/**
 * This will return the backlog's range as an array.
 * 
 * @param {any} backlogSheet The backlog source for array.
 * @param {any} dim The dimensions of the backlog's data.
 * @returns {Array} backlogData Array.
 */
function getBacklogArray(backlogSheet, dim) {
	if (backlogSheet !== null) {
		var backlogData = backlogSheet.getRange(1, 1, dim[0], dim[1]).getValues();
		return backlogData;
	} else {
		throw 'getBacklogArray() has a null; backlogSheet: ' + backlogSheet;
	}
}

/**
 * Will give the user the Index of a column in the backlogArray.
 * The column will need to be found by column header, but is using Regex.
 * This means that you could find any column that contains a string, e.g.
 * "*Dates*" Will find any column that contains the Dates, regardless of
 * the text that comes before or after it.
 * 
 * @param {any} searchString The Regex string to be matched.
 * @param {any} backlogArray The array to be searched.
 * @param {any} dim The dimensions of the array starting at Index 1.
 * @returns {Number} The column index of the string passed.
 */
function giveMeThatColumn(searchString, backlogArray, dim) {
	for (var col = 1; col <= dim[1] - 1; col++) {
		if (backlogArray[0][col].match(searchString)) {
			return col;
		}
	}
}
