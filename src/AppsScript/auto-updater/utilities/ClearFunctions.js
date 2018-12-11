/**
 * Used to clear QCD Destination
 */
function qcd_Clear_Destination() {
  if (updateJSON.identity.sheetNames.normal === 'Props Complete') {
    try {
      updateJSON.backlog2Update
        .getRange(
          1,
          1,
          dimensionsJSON.destination.sheetDimensions[0],
          dimensionsJSON.source.arrayDimensions[1]
        )
        .clear();
      SpreadsheetApp.flush();
      return;
    } catch (e) {
      throw e;
    }
  } else {
    try {
      updateJSON.backlog2Update
        .getRange(
          1,
          1,
          dimensionsJSON.destination.sheetDimensions[0],
          dimensionsJSON.source.sheetDimensions[1]
        )
        .clear();
      SpreadsheetApp.flush();
      return;
    } catch (e) {
      var clearError =
        'Check Input!A5:A6 & A14:A15. The Master Backlog does not have a sheet for this report.';
      throw clearError;
    }
  }
}

/**
 * Used to clear inputter
 * @param {*} inputSheet
 */
function clear_Source(inputSheet) {
  inputSheet.clearContents();
  SpreadsheetApp.flush();
}
