/* exported
getBacklogArray
getDimensions
getMeThatColumn
*/

/* global
*/
function getDimensions(sheet) {
  if (sheet !== null) {
    var dimensions = [];
    var lastRow = sheet.getLastRow();
    var lastCol = sheet.getLastColumn();
    dimensions.push(lastRow);
    dimensions.push(lastCol);
    return dimensions;
  } else {
    throw 'getDimensions() has a null; backlogSheet: ' + sheet;
  }
}

function getBacklogArray(sheet, dimensions) {
  if (sheet !== null) {
    var backlogData = sheet.getRange(1, 1, dimensions[0], dimensions[1]).getValues();
    return backlogData;
  } else {
    throw 'getBacklogArray() has a null; backlogSheet: ' + sheet;
  }
}

/**
* Get's a column header in a 2D array from the
* 0th row of the Array. Returns its index.
*
* @param {String} columnName to look for in the array.
* @param {Array} backlogArray to search for the columnName.
* @param {Array} dimensions of the Google Sheet. Will -1 to for array searching.
* @returns searched header's column number.
*/
function getMeThatColumn(columnName, backlogArray, dimensions) {
  for (var col = 1; col <= dimensions[1] - 1; col++) {
    if (backlogArray[0][col].match(columnName)) {
      return col;
    } else if (col === dimensions[1] - 1) {
      throw 'getMeThatColumn() could not find: ' + columnName;
    }
  }
}
