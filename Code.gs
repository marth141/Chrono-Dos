// Column C contains link for Column B.
// Create link for Column B.
// Column C needs to be blanked or erased or something.
// Compare F and G, whichever is newer keep and add 24 hours.

var master_Backlog = function () {
	this.PROPBackLog = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('DEPT Proposal');
	// this.CPRDBacklog = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('DEPT CP RD BACKLOG');
	// this.SNWPBacklog = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('DEPT SNOW PROPOSAL BACKLOG');
	// this.CADLBacklog = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Dept CAD Lite Backlog');
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
	var masterBacklog = new master_Backlog();	

	dateOperations(masterBacklog);
	regionMarker(masterBacklog);
}

function dateOperations(masterBacklogs) {
	for (var backlog in masterBacklogs) {
		if (masterBacklogs[backlog] !== null) {
			var backlogSheet = masterBacklogs[backlog];
			var dim = getDimensions(backlogSheet);
			removeLateDates(backlogSheet, dim);
			sortAndCleanDates(backlogSheet, dim);
		}
	}
}

function regionMarker(backlogSheet) {
	var dim = getDimensions(backlogSheet);
	var backlogRange = getBacklogRange(backlogSheet, dim);
	find_OpCenterHead(backlogSheet, dim, backlogRange);
}

function getDimensions(backlogSheet) {
	if (backlogSheet !== null) {
		var lastRow = backlogSheet.getLastRow();
		var lastCol = backlogSheet.getLastColumn();
		var dimensions = [];
		dimensions.push(lastRow);
		dimensions.push(lastCol);
		return dimensions;
	}
}

function getBacklogRange(backlogSheet, dim) {
	var backlogRange = backlogSheet.getRange(1, 1, dim[0], dim[1]).getValues(); // for each backlog in masterbacklogs...
	return backlogRange;
}

function removeLateDates(backlogSheet, dim) {
	if (checkForDates('Opportunity: Proposal Requested', dim, backlogSheet) &&
		checkForDates('Opportunity: Proposal Status Date', dim, backlogSheet)) {
		var date1 = giveMeThatColumn('Opportunity: Proposal Requested', dim, backlogSheet);
		var date2 = giveMeThatColumn('Opportunity: Proposal Status Date', dim, backlogSheet);
		for (var row = 2; row < dim[0]; row++) {
			var dateValue1 = backlogSheet.getRange(row, date1).getValue();
			var dateValue2 = backlogSheet.getRange(row, date2).getValue();
			if (dateValue1 > dateValue2) {
				backlogSheet.getRange(row, date2).setValue(dateValue1);
			} else if (dateValue1 < dateValue2) {
				backlogSheet.getRange(row, date1).setValue(dateValue2);
			} else if (dateValue1 === dateValue2) {
				continue;
			}
		}
	} else {
		console.error('No backlog found.');
	}
}

function checkForDates(searchString, dim, backlogSheet) {
	for (var col = 1; col < dim[1]; col++) {
		if (backlogSheet.getRange(1, col).getValue().match(searchString)) { // 'Opportunity: Proposal Requested'
			if (backlogSheet.getRange(2, col).getValue() instanceof Date) {
				return true;
			}
		}
	}
}

function giveMeThatColumn(searchString, dim, backlogSheet) {
	for (var col = 1; col < dim[1]; col++) {
		if (backlogSheet.getRange(1, col).getValue().match(searchString)) { // 'Opportunity: Proposal Requested'
			if (backlogSheet.getRange(2, col).getValue() instanceof Date) {
				return col;
			}
		}
	}
}

function sortAndCleanDates(backlogSheet, dim) {
	var dateCol = giveMeThatColumn('Opportunity: Proposal Status Date', dim, backlogSheet);
	var delCol = giveMeThatColumn('Opportunity: Proposal Requested', dim, backlogSheet);
	backlogSheet.getRange('A2:Z').sort([
		{ column: dateCol, ascending: true }
	]);
	removeDoubleDate(backlogSheet, delCol, dateCol);
}

function removeDoubleDate(backlogSheet, delCol, dateCol) {
	backlogSheet.getRange(1, dateCol).setValue('Proposal Date');
	backlogSheet.deleteColumn(delCol);
}

function find_OpCenterHead(backlogSheet, dim, backlogRange) {
	for (var col = 0; col < dim[1]; col++) {
		if (backlogRange[0][col].match('Service: Regional Operating Center*')) {
			mark_Region(backlogSheet, col, backlogRange, dim);
		}
	}
}

function mark_Region(backlogSheet, col, backlogRange, dim) {
	var offices = new office_Collection();
	var region;
	backlogSheet.getRange(1, dim[1] + 1).setValue('Region');
	for (var row = 1; row < dim[0]; row++) {
		var stateAbrv = backlogRange[row][col].substr(0, 2);
		if (offices.SouthWest.indexOf(stateAbrv) > -1) {
			region = 'Southwest';
			writeRegion(backlogSheet, row, dim, region);
		} else if (stateAbrv === 'CA') {
			mark_CaliRegion(backlogRange, offices, region, backlogSheet, row, col, dim);
		} else if (offices.NewEnglan.indexOf(stateAbrv) > -1) {
			region = 'New England';
			writeRegion(backlogSheet, row, dim, region);
		} else if (offices.Legion.indexOf(stateAbrv) > -1) {
			region = 'Legion';
			writeRegion(backlogSheet, row, dim, region);
		} else if (offices.GritMovem.indexOf(stateAbrv) > -1) {
			region = 'Grit Movement';
			writeRegion(backlogSheet, row, dim, region);
		}
	}
}

function mark_CaliRegion(spot_Range, offices, region, backlogSheet, row, col, dim) {
	var stateAbrv = spot_Range[row][col].substr(3, 2);
	if (offices.SouthCali.indexOf(stateAbrv) > -1) {
		region = 'SoCal';
		writeRegion(backlogSheet, row, dim, region);
	} else if (offices.NorthCali.indexOf(stateAbrv) > -1) {
		region = 'NorCal';
		writeRegion(backlogSheet, row, dim, region);
	}
}

function writeRegion(backlogSheet, row, dim, region) {
	console.log(row + 1, dim[1] + 1);
	backlogSheet.getRange(row + 1, dim[1] + 1).setValue(region);
}
