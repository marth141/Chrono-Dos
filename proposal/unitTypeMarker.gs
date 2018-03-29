function debug() {
	var masterBacklogs = new master_Backlogs();
	unitTypeMarker(masterBacklogs.Collection);
	return;
}

function unitTypeMarker(masterBacklogs) {
	// masterBacklogs = new master_Backlogs(); // Debug starter.
	// masterBacklogs = masterBacklogs.Collection; // Debug starter.
	for (var backlog in masterBacklogs) {
		if (masterBacklogs[backlog].getName() === 'DEPT Proposal') {
			var propBacklog = masterBacklogs[backlog];
			var dim = getDimensions(propBacklog);
			var backlogArray = getBacklogArray(propBacklog, dim);
			// Above is a set up, below is an action.
			var designPath = getMeThatColumn('Opportunity: Design Path', backlogArray, dim);
			var opporType = getMeThatColumn('Opportunity: Type', backlogArray, dim);
			var markedUnits = markUnits(backlogArray, designPath, opporType, dim);
			// Above is a set up, below is an action.
			propBacklog.getRange(1, 1, dim[0], dim[1] + 1).setValues(markedUnits);
			propBacklog.deleteColumn(designPath + 1);
			propBacklog.deleteColumn(opporType + 1);
			SpreadsheetApp.flush();
			return;
		} else if (masterBacklogs[backlog] === null) {
			throw 'The backlog was null in unitTypeMarker()';
		} else {
			console.log('This backlog: ' + masterBacklogs[backlog].getName() + ' is not being worked.');
			continue;
		}
	}
}

function markUnits(backlogArray, designPath, opporType, dim) {
	backlogArray[0][dim[1]] = 'Unit Type';
	var designPathString;
	for (var row = 1; row <= dim[0] - 1; row++) {
		if (backlogArray[row][designPath].match(/GSR/i)) {
			designPathString = 'GSR';
			otsMarker(backlogArray, opporType, row, dim, designPathString);
		} else if (backlogArray[row][designPath].match(/AURORA/i) ||
			backlogArray[row][designPath].match(/ADDRESS NOT FOUND/i)) {
			designPathString = 'AURORA';
			otsMarker(backlogArray, opporType, row, dim, designPathString);
		}
	}
	return backlogArray;
}

function otsMarker(backlogArray, opporType, row, dim, designPathString) {
	var contractCol = getMeThatColumn('Project: Contract Type', backlogArray, dim);
	var utilityCol = getMeThatColumn('Project: Utility', backlogArray, dim);
	var regionCol = getMeThatColumn('Region', backlogArray, dim);
	var serviceNumber = backlogArray[row];

	if (serviceNumber[contractCol].match(/lease/i) &&
		serviceNumber[utilityCol].match(/smud/i) &&
		serviceNumber[opporType].match(/add-on/i) &&
		serviceNumber[regionCol].match(/southwest/i) !== null) {
		backlogArray[row][dim[1]] = 'OTS ' + designPathString;
	} else {
		backlogArray[row][dim[1]] = designPathString;
	}
}