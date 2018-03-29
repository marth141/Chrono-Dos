/**
 * Gets the dimensions of a backlog sheet.
 * Sheets start at 1 index, so the dimensions
 * will worked with this same way.
 * Remember, when going from Sheet dimensions
 * to array dimensions to -1 or +1.
 * 
 * @param {Sheet} backlogSheet 
 * @returns Dimensions at start 1 Index of sheet data.
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
 * Will turn a backlog sheet and range into an
 * array to work with through the script.
 * Remember, Sheet dimensions (dim) starts at 1.
 * An array in Javascript starts at 0.
 * 
 * @param {Sheet} backlogSheet 
 * @param {Array} dim 
 * @returns The backlogSheet's data as an array.
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