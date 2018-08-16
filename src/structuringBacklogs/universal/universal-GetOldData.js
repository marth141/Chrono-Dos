// @flow
/**
 * Gets the chrono's report page data
 * @param {ReportPageColumns} reportColumns
 * @return {Array[]} oldData
 */
function uni_GetOldData(reportColumns) {
  var reportRange = report.getRange('G3:W');
  var oldData = reportRange.getValues().filter(function(value) {
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
