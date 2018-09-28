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

  // Try to update dev backlog
  try {
    updateJSON.dev2Update
      .getRange(
        1,
        1,
        dimensionsJSON.source.arrayDimensions[0],
        dimensionsJSON.source.arrayDimensions[1]
      )
      .setValues(dimensionsJSON.source.data);
    SpreadsheetApp.flush();
    console.log('Updated ' + updateJSON.identity.team + ' ' + updateJSON.backlog2Update.getName());
  } catch (e) {
    console.log('No dev to move');
  }
}

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
