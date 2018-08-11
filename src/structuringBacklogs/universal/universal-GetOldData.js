/**
 * @param {*} reportSheet
 * @return {Array} oldData
 */
function uni_GetOldData(reportSheet) {
  var headers = getHeadersFromSheet(reportSheet);
  var serviceCol = getMeThatColumn('SERVICE', headers);
  var stageCol = getMeThatColumn('STAGE', headers) - serviceCol;
  var lastRow = reportSheet.getLastRow();
  var recordsStartRow = 3;

  var oldData = reportSheet
    .getRange(recordsStartRow, serviceCol + 1, lastRow, stageCol + 1)
    .getValues()
    .filter(function(value) {
      if (value[0].indexOf('S-') > -1) {
        var filteredValue = value[0].indexOf('S-');
        return filteredValue;
      }
    });
  return oldData;
}
