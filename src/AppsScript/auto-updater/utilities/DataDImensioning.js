/**
 * Used to get dimensions of backlog arrays
 * @param {*} inputSheet
 */
function dataDimensioning(inputSheet) {
  // For all 1:1 moves.
  if (
    updateJSON.identity.team.match(/PP QCD/i) ||
    updateJSON.identity.team.match(/CP QCD/i) ||
    updateJSON.identity.team.match(/CP DIN/i) ||
    updateJSON.identity.team.match(/PP DIN/i) ||
    updateJSON.identity.team.match(/EE/i) ||
    updateJSON.identity.sheetNames.normal.match(/Last 2 Weeks/i)
  ) {
    // Get raw data
    dimensionsJSON.source.data = snagger.toUnfilteredArray(inputSheet);
    // Add Date Timestamp to cell C2
    dimensionsJSON.source.data[1][2] = new Date();
    // Get sheet dimensions
    dimensionsJSON.source.sheetDimensions = getSheetDimensions(inputSheet);
    // Get array dimensions
    dimensionsJSON.source.arrayDimensions = getArrayDimensions(dimensionsJSON.source.data);
    // Get destination dimensions
    dimensionsJSON.destination.sheetDimensions = getSheetDimensions(updateJSON.backlog2Update);
    return;
    // For all cropped table moves.
  } else {
    // Get raw data
    dimensionsJSON.source.data = snagger.toBlankFilteredArray(inputSheet);
    // Crop out table
    dimensionsJSON.source.data = reportTableCropper(dimensionsJSON.source.data);
    // Get sheet dimensions
    dimensionsJSON.source.sheetDimensions = getSheetDimensions(inputSheet);
    // Get array dimensions
    dimensionsJSON.source.arrayDimensions = getArrayDimensions(dimensionsJSON.source.data);
    // Get destination dimensions
    dimensionsJSON.destination.sheetDimensions = getSheetDimensions(updateJSON.backlog2Update);
    return;
  }
}

/**
 * Used to get the dimensions of an array
 * @param {*} array
 * @return {*}
 */
function getArrayDimensions(array) {
  if (array !== null) {
    var rowCount = array.length;
    var colCount = array[0].length;
    var dimensions = [];
    dimensions.push(rowCount);
    dimensions.push(colCount);
    return dimensions;
  } else {
    var getArrayError = 'getArrayDimensions() was given a null.';
    throw getArrayError;
  }
}

/**
 * Used to get the dimensions of a sheet
 * @param {*} sheet
 * @return {*}
 */
function getSheetDimensions(sheet) {
  if (sheet !== null) {
    var dimensions = [];
    var lastRow = sheet.getLastRow();
    var lastCol = sheet.getLastColumn();
    if (lastRow === 0 && lastCol === 0) {
      lastRow = 1;
      lastCol = 1;
    }
    dimensions.push(lastRow);
    dimensions.push(lastCol);
    return dimensions;
  } else {
    var getSheetError = 'getSheetDimensions() was given a null.';
    throw getSheetError;
  }
}
