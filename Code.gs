// Column C contains link for Column B.
// Create link for Column B.
// Column C needs to be blanked or erased or something.
// Compare F and G, whichever is newer keep and add 24 hours.

var master_Backlog = function () {
	this.PROPBackLog = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('DEPT Proposal');
	this.CPRDBacklog = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('DEPT CP RD BACKLOG');
	this.SNWPBacklog = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('DEPT SNOW PROPOSAL BACKLOG');
	this.CADLBacklog = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Dept CAD Lite Backlog');
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
	var dim = getDimensions(masterBacklog.PROPBackLog);
	var backlogRange = getBacklogRange(masterBacklog.PROPBackLog, dim);

	sort(masterBacklog, dim, backlogRange);
	find_OperatingCenter(masterBacklog.PROPBackLog, dim, backlogRange);
}

function sort(backlogCollection) {
	for (var backlog in backlogCollection) {
		if (backlogCollection[backlog] !== null) {
			if (backlogCollection[backlog].getRange('D2').getValue() instanceof Date) {
				backlogCollection[backlog].getRange('A2:Z').sort([
					{ column: 4, ascending: true }
				]);
			}
		} else {
			console.error('No backlog found.');
		}
	}
}

function find_OperatingCenter(backlogSheet, dim, backlogRange) {
	for (var col = 0; col < dim[1]; col++) {
		if (backlogRange[0][col].match('Service: Regional Operating Center*')) {
			mark_OperatingCenter(backlogSheet, col, backlogRange, dim);
		}
	}
}

function mark_OperatingCenter(backlogSheet, col, spot_Range, dim) {
	var offices = new office_Collection();
	var region;
	backlogSheet.getRange(1, dim[1] + 1).setValue('Region');
	for (var row = 1; row < dim[0]; row++) {
		var stateAbrv = spot_Range[row][col].substr(0, 2);
		if (offices.SouthWest.indexOf(stateAbrv) > -1) {
			region = 'Southwest';
			writeRegion(backlogSheet, row, dim, region);
		} else if (stateAbrv === 'CA') {
			caliRegion(spot_Range, offices, region, backlogSheet, row, col, dim);
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

function caliRegion(spot_Range, offices, region, backlogSheet, row, col, dim) {
	var stateAbrv = spot_Range[row][col].substr(3, 2);
	if (offices.SouthCali.indexOf(stateAbrv) > -1) {
		region = 'SoCal';
		writeRegion(backlogSheet, row, dim, region);
	} else if (offices.NorthCali.indexOf(stateAbrv) > -1) {
		region = 'NorCal';
		writeRegion(backlogSheet, row, dim, region);
	}
}

function getBacklogRange(backlogSheet, dim) {
	var backlogRange = backlogSheet.getRange(1, 1, dim[0], dim[1]).getValues(); // for each backlog in masterbacklogs...
	return backlogRange;
}

function writeRegion(backlogSheet, row, dim, region) {
	console.log(row + 1, dim[1] + 1);
	backlogSheet.getRange(row + 1, dim[1] + 1).setValue(region);
}

function getDimensions(masterBacklog) {
	if (masterBacklog !== null) {
		var lastRow = masterBacklog.getLastRow();
		var lastCol = masterBacklog.getLastColumn();
		var dimensions = [];
		dimensions.push(lastRow);
		dimensions.push(lastCol);
		return dimensions;
	}
}