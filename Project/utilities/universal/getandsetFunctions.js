/* exported
getBacklogArray
getDimensions
getHeader
getMeThatColumn
getMeThatColumnNoValidate
getMeThatIndexOf
setCompleteBacklog
updateLastRefresh
*/

/* global
SpreadsheetApp
validateHeader
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
    throw "getDimensions() has a null; backlogSheet: " + sheet;
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
    var backlogData = sheet.getRange(1, 1, dimensions[0], dimensions[1]).getValues().filter(function (value) {
      return value[0].match(/^S-[0-9]/i) ||
        value[0].match(/^Service:/i) ||
        value[0].match(/^Project:/i) ||
        value[0].match(/^Opportunity:/i);
    });
    return backlogData;
  } else {
    throw "getBacklogArray() has a null; backlogSheet: " + sheet;
  }
}

/**
 *
 *
 * @returns header
 */
function getHeader(Report) {
  var header = Report.getRange("G2:2").getValues();
  return header;
}

/**
 *
 *
 * @param {RegExp|String} columnName
 * @param {array} backlogArray
 * @returns
 */
function getMeThatColumn(columnName, backlogArray) {
  validateHeader(columnName, backlogArray);
  return backlogArray[0].indexOf(columnName);
}

/**
 *
 *
 * @param {RegExp|String} columnName
 * @param {array} backlogArray
 * @returns
 */
function getMeThatColumnNoValidate(columnName, backlogArray) {
  return backlogArray[0].indexOf(columnName);
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
    throw "getMeThatColumn() could not find: " + columnName;
  }
}

/**
 *
 * 
 * @param {any} completeBacklog
 * @returns 
 */
function setCompleteBacklog(completeBacklog, Report) {
  Report.getRange("G3:T").clearContent();
  var rowNeeded = completeBacklog.length;
  if (rowNeeded > 0) {
    var colNeeded = completeBacklog[0].length;
    Report.getRange(3, 7, rowNeeded, colNeeded).setValues(completeBacklog);
    SpreadsheetApp.flush();
  }
  return;
}

/**
 *
 *
 * @returns
 */
function updateLastRefresh(Report) {
  Report.getRange("B2").setValue(new Date());
  return;
}