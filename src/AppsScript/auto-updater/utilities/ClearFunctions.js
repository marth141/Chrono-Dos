/**
 * Used to clear QCD Destination
 */
function qcd_Clear_Destination() {
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

    // Try to clear dev backlog
    try {
      updateJson.dev2Update
        .getRange(
          1,
          1,
          dimensionsJSON.destination.sheetDimensions[0],
          dimensionsJSON.source.sheetDimensions[1]
        )
        .clear();
      SpreadsheetApp.flush();
    } catch (e) {
      console.info('No dev to clear');
      return;
    }

    return;
  } catch (e) {
    throw 'Check Input!A5:A6 & A14:A15. The Master Backlog does not have a sheet for this report.';
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
