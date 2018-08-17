/**
 * Creates backlogs
 * @constructor
 */
function Backlog() {
  /**
   * @param {GoogleAppsScript.Spreadsheet.Sheet} reportSheet
   * @return {Array[]}
   */
  this.reportBacklog = function(reportSheet) {
    var reportRange = reportSheet.getRange('G2:W');
    var backlogArray = reportRange.getValues();
    // .filter(function(value) {
    //   var serviceNumber = value[0];
    //   var serviceNumberRegex = new RegExp(/S-[0-9]{7}/);
    //   var filteredValue = serviceNumber.match(serviceNumberRegex);
    //   return filteredValue;
    // });
    return backlogArray;
  };
  /**
   * @param {GoogleAppsScript.Spreadsheet.Sheet} permitSheet
   * @return {Array[]}
   */
  this.permitBacklog = function(permitSheet) {
    var dim = getDimensions(permitSheet);
    var backlogArray = getBacklogArray(permitSheet, dim);
    // .filter(function(
    //   value
    // ) {
    //   var serviceNumber = value[0];
    //   var serviceNumberRegex = new RegExp(/S-[0-9]{7}/);
    //   var filteredValue = serviceNumber.match(serviceNumberRegex);
    //   return filteredValue;
    // });
    return backlogArray;
  };
  /**
   * @param {GoogleAppsScript.Spreadsheet.Sheet} redesignSheet
   * @return {Array[]}
   */
  this.redesignBacklog = function(redesignSheet) {
    var dim = getDimensions(redesignSheet);
    var backlogArray = getBacklogArray(redesignSheet, dim);
    // .filter(function(
    //   value
    // ) {
    //   var serviceNumber = value[0];
    //   var serviceNumberRegex = new RegExp(/S-[0-9]{7}/);
    //   var filteredValue = serviceNumber.match(serviceNumberRegex);
    //   return filteredValue;
    // });
    return backlogArray;
  };
}

/**
 * Gets dimensions of google sheet
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet
 * @return {Array}
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
    var getDimensionsError =
      'getDimensions() has a null; backlogSheet: ' + sheet;
    throw getDimensionsError;
  }
}

/**
 * Used to make an array from a google sheet
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet
 * @param {Array} dimensions
 * @return {Array[]}
 */
function getBacklogArray(sheet, dimensions) {
  if (sheet !== null) {
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
  } else {
    var getBacklogArrayError =
      'getBacklogArray() has a null; backlogSheet: ' + sheet;
    throw getBacklogArrayError;
  }
}
