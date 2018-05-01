/* exported
getBacklogArray
getDimensions
getMeThatColumn
getMeThatIndexOf
*/

/* global
*/

/**
 *
 *
 * @param {any} sheet
 * @returns 
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
 *
 *
 * @param {any} sheet
 * @param {array} dimensions
 * @returns 
 */
function getBacklogArray(sheet, dimensions) {
  if (sheet !== null) {
    var backlogData = sheet.getRange(1, 1, dimensions[0], dimensions[1]).getValues();
    return backlogData;
  } else {
    throw 'getBacklogArray() has a null; backlogSheet: ' + sheet;
  }
}

/**
 *
 *
 * @param {RegExp|String} columnName
 * @param {array} backlogArray
 * @returns
 */
function getMeThatColumn(columnName, backlogArray) {
  for (var col = 1; col < backlogArray[0].length; col++) {
    if (backlogArray[0][col].match(columnName)) {
      return col;
    } else if (col === backlogArray[0].length) {
      throw 'getMeThatColumn() could not find: ' + columnName;
    }
  }
}

/**
 *
 *
 * @param {String} columnName
 * @param {array} backlogArray
 * @returns
 */
function getMeThatIndexOf(columnName, backlogArray) {
  var col;
  if (backlogArray[0].indexOf(columnName)) {
    col = backlogArray[0].indexOf(columnName);
    return col;
  } else if (col === backlogArray[0].length) {
    throw 'getMeThatColumn() could not find: ' + columnName;
  }  
}