/**
* Gets the dimensions of a Google Sheet (Don't use an Array!)
*
* @param {Sheet} sheet to get dimensions for.
* @returns [row,col] dimensions with a start index of 1.
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

/**
* Creates an Array containing the data in the Google Sheet.
* Use a Google Sheet and a [lastRow,lastCol] array from getDimensions().
*
* @param {Sheet} sheet to turn into an array.
* @param {Array} lastIndex of the sheet data.
* @returns the new array. 1:1 sheet:array.
*/
function getBacklogArray(sheet, lastIndex) {
  if (sheet !== null) {
    var backlogData = sheet.getRange(1, 1, lastIndex[0], lastIndex[1]).getValues();
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
* @param {Array} lastIndex of the Google Sheet. Will -1 to for array searching.
* @returns searched header's column number.
*/
function getMeThatColumn(columnName, backlogArray, lastIndex) {
  for (var col = 1; col <= lastIndex[1] - 1; col++) {
    if (backlogArray[0][col].match(columnName)) {
      return col;
    } else if (col === lastIndex[1] - 1) {
      throw "getMeThatColumn() could not find: " + columnName;
    }
  }
}


// var oldBacklog = reportTableFinder(backlogCropper.thisBlankFilteredArray(inputSheet));
  // var newBacklog = reportTableFinder(backlogCropper.thisBlankFilteredArray(updateSheet)).sort();

  function compareBacklogs(oldBacklog, newBacklog) {
    // Find Columns
  
    for (var newRowIndex = 1; newRowIndex < newBacklog.length; newRowIndex++) {
      var found = false;
      var newServiceNumberRow = newBacklog[newRowIndex];
      do {
        for (var oldRowIndex = 1; oldRowIndex < oldBacklog.length; oldRowIndex++) {
          var oldServiceNumberRow = oldBacklog[oldRowIndex];
          if (newServiceNumberRow[0] === oldServiceNumberRow[0]) {
            if (newServiceNumberRow === oldServiceNumberRow)
            found = true;
          }
        }
      } while (found === false);
    }
    return;
  }

