/**
 * Moves backlog to destination Chrono
 */
function move_ToDestination() {
  updateJSON.backlog2Update
    .getRange(
      1,
      1,
      dimensionsJSON.source.arrayDimensions[0],
      dimensionsJSON.source.arrayDimensions[1]
    )
    .setValues(dimensionsJSON.source.data);
  SpreadsheetApp.flush();
  console.log('Updated ' + updateJSON.identity.team + ' ' + updateJSON.backlog2Update.getName());
}

/**
 * Moves for QCD
 */
function qcd_Move() {
  updateJSON.backlog2Update
    .getRange(
      1,
      1,
      dimensionsJSON.source.sheetDimensions[0],
      dimensionsJSON.source.sheetDimensions[1]
    )
    .setValues(dimensionsJSON.source.data);
  SpreadsheetApp.flush();
  console.log('Updated ' + updateJSON.identity.team + ' ' + updateJSON.backlog2Update.getName());
}
