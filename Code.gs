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
	unitTypeMarker(masterBacklogs.Collection);
	return;
}

function unitTypeMarker(masterBacklogs) {
	for (var backlog in masterBacklogs) {
		if (masterBacklogs[backlog].getName() === 'DEPT Proposal') {
			var propBacklog = masterBacklogs[backlog];
			var dim = getDimensions(propBacklog);
			var backlogArray = getBacklogArray(propBacklog, dim);
			var designPath = getMeThatColumn('Opportunity: Design Path', backlogArray, dim);
			var markedUnits = markUnits(propBacklog, backlogArray, designPath, dim);
			propBacklog.getRange(1, 1, dim[0], dim[1] + 1).setValues(markedUnits);
			propBacklog.deleteColumn(designPath + 1);
			SpreadsheetApp.flush();
			return;
		} else if (masterBacklogs[backlog] === null) {
			throw 'The backlog was null in dateOperations()';
		} else {
			console.log('This backlog: ' + masterBacklogs[backlog].getName() + ' is not being worked.');
			continue;
		}
	}
}

function markUnits(propBacklog, backlogArray, col, dim) {
	backlogArray[0][dim[1]] = 'Unit Type';
	for (var row = 1; row <= dim[0] - 1; row++) {
		if (backlogArray[row][col].match(/GSR/i)) {
			
		} else if (backlogArray[row][col].match(/AURORA/i)) {
			backlogArray[row][dim[1]] = 'AURORA';
		}
	}
	return backlogArray;
}

function otsMarker(backlogArray, dim) {
	var contractType = getMeThatColumn('Project: Contract Type', backlogArray, dim);
	var utilityType = getMeThatColumn('Project: Utility', backlogArray, dim);
	var oppType = getMeThatColumn('Opportunity: Type', backlogArray, dim);
	var region = getMeThatColumn('Region', backlogArray, dim);

	if (contractType !== ['lease'] &&
		utilityType !== ['smud'] &&
		region !== ['Southwest']) {
		backlogArray[row][dim[1]] = 'OTS GSR';
	}
}

/**
 * Begins the process for filtering dates in backlogs.
 * 
 * @param {any} masterBacklogs 
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
	var dateCol1;
	var dateCol2;
	var stateCol;
	if (validateHeader('Opportunity: Proposal Requested', backlogArray, dim) &&
		validateHeader('Opportunity: Proposal Status Date', backlogArray, dim)) {
		dateCol1 = getMeThatColumn('Opportunity: Proposal Requested', backlogArray, dim);
		dateCol2 = getMeThatColumn('Opportunity: Proposal Status Date', backlogArray, dim);
		stateCol = getMeThatColumn('Opportunity: Office: Office Name', backlogArray, dim);
	} else {
		throw 'Unable to find all date columns for proposalDateCleaner()';
	}
	var dateAdjLog = removeLateDates(backlogArray, dim, dateCol1, dateCol2, stateCol);
	sortAndCleanDates(propBacklog, dateAdjLog, dim, dateCol1, dateCol2);
}

/**
 * used to validate headers if the data below is
 * something to be validated. Can be expanded.
 * 
 * @param {String} header 
 * @param {Array} backlogArray 
 * @param {Array} dim 
 * @returns True - Header has valid data; False - Header is corrupted.
 */
function validateHeader(header, backlogArray, dim) {
	if (checkForDates(header, backlogArray, dim)) {
		return true;
	} else {
		throw 'validateDates() cannot find: ' + header;
	}
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
				throw 'The backlog has a date column but no dates. Is it corrupted?';
			}
		} else if (col === dim[1] - 1) {
			throw 'The column \'' + searchString + '\' string could not be found.';
		}
	}
}

/**
 * Compares date values for Proposal Backlog.
 * Will overwrite the oldest date with the
 * earliest date.
 * 
 * @param {Array} backlogArray 
 * @param {Array} dim 
 * @param {Number} dateCol1 
 * @param {Number} dateCol2 
 * @returns The date corrected backlog.
 */
function removeLateDates(backlogArray, dim, dateCol1, dateCol2, stateCol) {
	if (dateCol2 !== null) {
		for (var row = 1; row <= dim[0] - 1; row++) {
			var dateValue1 = new Date(backlogArray[row][dateCol1]);
			var dateValue2 = new Date(backlogArray[row][dateCol2]);
			var stateAbrv = backlogArray[row][stateCol].substr(0, 2);
			backlogArray = compareDates(backlogArray, dateValue1, dateValue2, row, dateCol1, dateCol2, stateAbrv);
		}
		return backlogArray;
	} else if (dateCol2 === null) {
		return backlogArray;
	}
}

function compareDates(backlogArray, dateValue1, dateValue2, row, dateCol1, dateCol2, stateAbrv) {
	var fivePM = 17;
	if (dateValue1 > dateValue2) {
		fivePM += getTimeOffset(stateAbrv);
		dateValue1.setHours(fivePM, 0, 0);
		backlogArray[row][dateCol2] = dateValue1.addHours(24);
		return backlogArray;
	} else if (dateValue1 < dateValue2) {
		fivePM += getTimeOffset(stateAbrv);
		dateValue2.setHours(fivePM, 0, 0);
		backlogArray[row][dateCol1] = dateValue2.addHours(24);
		return backlogArray;
	} else {
		fivePM += getTimeOffset(stateAbrv);
		dateValue1.setHours(fivePM, 0, 0);
		backlogArray[row][dateCol1] = dateValue1.addHours(24);
		return backlogArray;
	}
}

/**
 * Will sort the date column within the google
 * sheet. Removes the redundant date column.
 * 
 * @param {Sheet} backlogSheet 
 * @param {Array} dateAdjLog 
 * @param {Array} dim 
 * @param {Number} dateCol 
 * @param {Number} delCol 
 * @returns 
 */
function sortAndCleanDates(backlogSheet, dateAdjLog, dim, dateCol, delCol) {
	backlogSheet.getRange(1, 1, dim[0], dim[1]).setValues(dateAdjLog);
	backlogSheet.getRange(2, 1, dim[0], dim[1]).sort([
		{ column: dateCol + 1, ascending: true }
	]);
	backlogSheet.getRange(1, dateCol + 1).setValue('Proposal Date');
	SpreadsheetApp.flush();
	removeDoubleDate(backlogSheet, dateCol, delCol);
	return;
}

/**
 * Removes the column that is a copy of the
 * date column to keep. This redundancy is
 * due to the dates overwriting each other.
 * 
 * @param {Sheet} backlogSheet 
 * @param {Number} dateCol 
 * @param {Number} delCol 
 * @returns 
 */
function removeDoubleDate(backlogSheet, dateCol, delCol) {
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
			var col = getMeThatColumn('Service: Regional Operating Center', backlogArray, dim);
			var markedRegions = markRegion(propBacklog, backlogArray, col, dim);
			var markedNatOffices = markNatlRegion(propBacklog, markedRegions, dim);
			propBacklog.getRange(1, 1, dim[0], dim[1] + 1).setValues(markedNatOffices);
			propBacklog.deleteColumn(col + 1);
			SpreadsheetApp.flush();
			return;
		} else if (masterBacklogs[backlog] === null) {
			throw 'The backlog was null in dateOperations()';
		} else {
			console.log('This backlog: ' + masterBacklogs[backlog].getName() + ' is not being worked.');
			continue;
		}
	}
}

function markRegion(backlogSheet, backlogArray, col, dim) {
	var offices = new office_Collection();
	var region;
	backlogArray[0][dim[1]] = 'Region';
	for (var row = 1; row <= dim[0] - 1; row++) {
		var stateAbrv = backlogArray[row][col].substr(0, 2);
		if (offices.SouthWest.indexOf(stateAbrv) > -1) {
			region = 'Southwest';
			backlogArray = writeRegion(backlogArray, row, dim, region);
		} else if (stateAbrv === 'CA') {
			backlogArray = markCaliRegion(offices, region, backlogArray, row, col, dim);
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
	return backlogArray;
}

function markCaliRegion(offices, region, backlogArray, row, col, dim) {
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

function markNatlRegion(backlogSheet, firstMark, dim) {
	var col = getMeThatColumn('Opportunity: Office: Office Name', firstMark, dim);
	var markedNatOffices = markNatOffice(firstMark, col, dim);
	return markedNatOffices;
}

function markNatOffice(firstMark, col, dim) {
	var region;
	for (var row = 1; row <= dim[0] - 1; row++) {
		if (firstMark[row][col].match(/NIS/i)) {
			region = 'NIS';
			firstMark = writeRegion(firstMark, row, dim, region);
		} else if (firstMark[row][col].match(/Dealer/i)) {
			region = 'Dealer';
			firstMark = writeRegion(firstMark, row, dim, region);
		} else if (firstMark[row][col].match(/Retail/i)) {
			region = 'Retail';
			firstMark = writeRegion(firstMark, row, dim, region);
		}
	}
	return firstMark;
}

function writeRegion(backlogArray, row, dim, region) {
	backlogArray[row][dim[1]] = region;
	return backlogArray;
}

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

function getBacklogArray(backlogSheet, dim) {
	if (backlogSheet !== null) {
		var backlogData = backlogSheet.getRange(1, 1, dim[0], dim[1]).getValues();
		return backlogData;
	} else {
		throw 'getBacklogArray() has a null; backlogSheet: ' + backlogSheet;
	}
}

/**
 * Get's a column header in a 2D array from the
 * 0th row of the Array. Returns its index.
 * 
 * @param {String} searchString 
 * @param {Array} backlogArray 
 * @param {Array} dim 
 * @returns Header's column number.
 */
function getMeThatColumn(searchString, backlogArray, dim) {
	for (var col = 1; col <= dim[1] - 1; col++) {
		if (backlogArray[0][col].match(searchString)) {
			return col;
		}
	}
}

Date.prototype.addHours = function (h) {
	this.setTime(this.getTime() + h * 60 * 60 * 1000); return this;
};

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
