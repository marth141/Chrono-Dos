// @flow strict
/**
 * Gets the chrono's report page data
 * @param {GoogleAppsScript.Spreadsheet.Sheet} Report
 * @return {Array[]} oldData
 */
function uni_GetOldData(Report) {
  var header = getHeader(Report);
  var serviceCol = getMeThatColumnNoValidate('SERVICE', header);
  var stageCol = getMeThatColumnNoValidate('STAGE', header) - serviceCol;
  var lastRow = Report.getLastRow();

  var oldData = Report.getRange(3, serviceCol + 1, lastRow, stageCol + 1)
    .getValues()
    .filter(function(value) {
      var serviceNumber = value[0];
      /**
       * Use for debugging
       * *if ('S-5920503' === serviceNumber) var test = 0;
       */
      var filteredValue = serviceNumber.indexOf('S-') > -1;
      return filteredValue;
    });
  return oldData;
}
