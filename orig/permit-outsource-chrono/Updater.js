/* exported
updateReport
*/

function updateReport() {
  var reportType, refreshQueue = false;
  var ActiveSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var updateInputSheet = ActiveSpreadsheet.getSheetByName("Updater Audit");
  var inputRawData = updateInputSheet.getRange("A:A").getValues();
  for (var row in inputRawData) {
    if (inputRawData[row][0].match(/CAD\/INS Packet Missing$/i)
        || inputRawData[row][0].match(/Shading Mismatch$/i)
        || inputRawData[row][0].match(/Placard Missing$/i)
      ){
      reportType = inputRawData[row][0];
      break;
    }
  }
  if(reportType === undefined) {
    throw "Unidentified Report";
  }
    
  var inputSheetDimensions = getDimensions(updateInputSheet);
  var inputDataArray = getBacklogArray(updateInputSheet, inputSheetDimensions);

  var updateDestination = ActiveSpreadsheet.getSheetByName(reportType);

  var updateDestinationDim = getDimensions(updateDestination);
  updateDestination.getRange("A:I").clearContent();
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

  if (reportType === "Shading Mismatch") {
    errorQue();
  }

  return;
}