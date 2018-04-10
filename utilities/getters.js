/**
 * Gets the dimensions of a backlog sheet.
 * Sheets start at 1 index, so the dimensions
 * will worked with this same way.
 * Remember, when going from Sheet dimensions
 * to array dimensions to -1 or +1.
 * 
 * @param {Sheet} backlogSheet The sheet to get dimensions from.
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
 * @param {Sheet} backlogSheet The sheet to turn into an array.
 * @param {Array} dim The sheet dimensions of the sheet data.
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
 * @param {String} searchString The header of the column to find.
 * @param {Array} backlogArray The backlog data array to search.
 * @param {Array} dim The dimensions of the backlog sheet, not the array.
 * @returns Header's column number.
 */
function getMeThatColumn(searchString, backlogArray, dim) {
  for (var col = 1; col <= dim[1] - 1; col++) {
    if (backlogArray[0][col].match(searchString)) {
      return col;
    } else if (col === dim[1] - 1) {
      throw "getMeThatColumn() could not find: " + searchString;
    }
  }
}

/**
 * used to validate headers if the data below is
 * something to be validated. Can be expanded.
 * 
 * @param {String} header A column head to be found in the backlog.
 * @param {Array} backlogArray The backlog data to be searched through.
 * @param {Array} dim The dimensions of the backlog sheet, not the array.
 * @returns True - Header has valid data; False - Header is corrupted.
 */
function validateHeader(header, backlogArray, dim) {
  if (CheckForDates(header, backlogArray, dim)) {
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
function CheckForDates(searchString, backlogArray, dim) {
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