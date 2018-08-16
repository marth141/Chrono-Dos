// @flow
/**
 * Gets the chrono's report page data
 * @param {GoogleAppsScript.Spreadsheet.Sheet} report
 * @param {ReportPageColumns} reportColumns
 * @return {Array[]} oldData
 */
function uni_GetOldData(report, reportColumns) {
  var oldData = reportColumns.reportRange.getValues().filter(function(value) {
    var serviceNumber = value[0];
    var serviceNumberRegex = new RegExp(/S-[0-9]{7}/);
    var filteredValue = serviceNumber.match(serviceNumberRegex);
    return filteredValue;

    /**
     * Use for debugging
     * ! if ('S-5920503' === serviceNumber) var test = 0;
     */
  });
  return oldData;
}
