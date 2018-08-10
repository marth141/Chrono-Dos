/**
 * getDimensions
 * @param {Sheet} sheet
 * @return {Array} dimensions
 */
function getDimensions(sheet) {
  if (sheet === null) {
    var getDimensionsErrorMsg = 'getDimensions() input is null';
    throw getDimensionsErrorMsg;
  }
  var dimensions = [];
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  dimensions.push(lastRow);
  dimensions.push(lastCol);
  return dimensions;
}

/**
 * getBacklogArray
 * @param {Sheet} sheet
 * @param {Array} dimensions
 * @return {Array} backlogData
 */
function getBacklogArray(sheet, dimensions) {
  if (sheet === null) {
    var getBacklogArrayError = 'getBacklogArray() sheet input is null';
    throw getBacklogArrayError;
  }
  var backlogData = sheet
    .getRange(1, 1, dimensions[0], dimensions[1])
    .getValues()
    .filter(function(value) {
      return (
        value[0].match(/^S-[0-9]/i) ||
        value[0].match(/^Service:/i) ||
        value[0].match(/^Project:/i) ||
        value[0].match(/^Opportunity:/i)
      );
    });
  return backlogData;
}

/**
 * getHeader
 * @param {Sheet} Report
 * @return {Array} header
 */
function getHeadersFromSheet(Report) {
  var header = Report.getRange('2:2').getValues();
  return header;
}

/**
 * getUsers
 * @param {Sheet} FilterSettings
 * @return {*} users
 */
function getUsers(FilterSettings) {
  var users = FilterSettings.getRange('B4:D')
    .getValues()
    .filter(function(row) {
      return row[0] !== '' || row[2] !== '';
    });
  return users;
}

/**
 * getMeThatColumn
 * ! Used to only get column index that are dates
 * ! Don't use
 * @param {String} columnName
 * @param {Array} backlogArray
 * @return {Number} foundColumnIndex
 */
function getMeThatColumn(columnName, backlogArray) {
  validateHeader(columnName, backlogArray);
  var foundColumnIndex = backlogArray[0].indexOf(columnName);
  return foundColumnIndex;
}

/**
 * getMeThatColumnNoValidate
 * * Used to only get column index without validating the data type
 * @param {String} columnName
 * @param {Array} backlogArray
 * @return {Number} foundColumnIndex
 */
function getMeThatColumnNoValidate(columnName, backlogArray) {
  var foundColumnIndex = backlogArray[0].indexOf(columnName);
  return foundColumnIndex;
}

/**
 * getMeThatIndexOf
 * @param {String} columnName
 * @param {Array} backlogArray
 * @return {Number} columnIndex
 */
function getMeThatIndexOf(columnName, backlogArray) {
  var regexColumnName = '/' + columnName + '/i';
  if (backlogArray[0].length === 0) {
    var getMeThatIndexOfErrorMsg =
      'getMeThatIndexOf could not find: ' + columnName;
    throw getMeThatIndexOfErrorMsg;
  } else if (backlogArray[0].match(regexColumnName)) {
    var columnIndex = backlogArray[0].indexOf(columnName);
    return columnIndex;
  }
}

/**
 * setCompleteBacklog
 * @param {*} completeBacklog
 * @param {*} Report
 */
function setCompleteBacklog(completeBacklog, Report) {
  var header = getHeadersFromSheet(Report);
  var serviceCol = getMeThatColumn('SERVICE', header);
  var initialUpdateCol = getMeThatColumn('INITIAL DATE', header) - serviceCol;
  Report.getRange(
    3,
    serviceCol + 1,
    Report.getLastRow() - 2,
    initialUpdateCol
  ).clearContent();
  var rowNeeded = completeBacklog.length;
  if (rowNeeded > 0) {
    var colNeeded = completeBacklog[0].length;
    Report.getRange(3, 7, rowNeeded, colNeeded).setValues(completeBacklog);
    SpreadsheetApp.flush();
  }
  return;
}

/**
 * getLiveReportBacklog
 * @param {*} Report
 * @return {*} backlogArray
 */
function getLiveReportBacklog(Report) {
  var header = getHeadersFromSheet(Report);
  var serviceCol = getMeThatColumn('SERVICE', header);
  var initialUpdateCol = getMeThatColumn('INITIAL DATE', header) - serviceCol;
  var backlogArray = Report.getRange(
    2,
    serviceCol + 1,
    Report.getLastRow() - 2,
    initialUpdateCol
  ).getValues();
  return backlogArray;
}

/**
 * updateLastRefresh
 * @param {*} Report
 */
function updateLastRefresh(Report) {
  Report.getRange('B2').setValue(new Date());
  return;
}

/**
 * reportRunning
 * @param {*} Report
 */
function setReportRunning(Report) {
  //  var checkReportStatus = Report.getRange("G1").getValue();
  //  if(checkReportStatus !== "") {
  //    throw "Report Already Running";
  //  }
  Report.getRange('G1').setValue('REPORT RUNNING');
  SpreadsheetApp.flush();
  return;
}

/**
 * removeReportRunning
 * @param {*} Report
 */
function removeReportRunning(Report) {
  Report.getRange('G1').setValue('');
  SpreadsheetApp.flush();
  return;
}
