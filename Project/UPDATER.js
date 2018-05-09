/* globals
SpreadsheetApp
getDimensions
getBacklogArray
*/

/* exported
updateReport
*/

function updateReport() {
  var reportType;
  var ActiveSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var updateInputSheet = ActiveSpreadsheet.getSheetByName("Updater");
  var inputRawData = updateInputSheet.getRange("A:A").getValues();
  for (var row in inputRawData) {
    if (inputRawData[row][0].match(/Proposal$/i) ||
      inputRawData[row][0].match(/Snow Prop$/i) ||
      inputRawData[row][0].match(/Part 1$/i) ||
      inputRawData[row][0].match(/CP RD$/i)) {
      reportType = inputRawData[row][0];
      break;
    }
  }

  var inputSheetDimensions = getDimensions(updateInputSheet);
  var inputDataArray = getBacklogArray(updateInputSheet, inputSheetDimensions);

  var updateDestination;
  if (reportType.match(/Proposal/i)) {
    updateDestination = ActiveSpreadsheet.getSheetByName("PROPOSAL BACKLOG");
  }
  else if (reportType.match(/Snow Prop/i)) {
    updateDestination = ActiveSpreadsheet.getSheetByName("SNOW PROPOSAL BACKLOG");
  }
  else if (reportType.match(/Part 1/i)) {
    updateDestination = ActiveSpreadsheet.getSheetByName("PART 1 BACKLOG");
  }
  else if (reportType.match(/CP RD/i)) {
    updateDestination = ActiveSpreadsheet.getSheetByName("CP RD BACKLOG");
  }

  var updateDestinationDim = getDimensions(updateDestination);
  updateDestination.getRange("G2:T").clearContent();
  if (updateDestinationDim[0] > 3) {
    updateDestination.deleteRows(3, updateDestinationDim[0] - 3);
  }

  var rowNeeded = inputDataArray.length;
  if (rowNeeded > 0) {
    var colNeeded = inputDataArray[0].length;
    updateDestination.getRange(1, 1, rowNeeded, colNeeded).setValues(inputDataArray);
    SpreadsheetApp.flush();
  }

  updateInputSheet.getRange("G2:T").clearContent();
  if (inputSheetDimensions[0] > 3) {
    updateInputSheet.deleteRows(3, inputSheetDimensions[0] - 3);
  }
  return;
}
