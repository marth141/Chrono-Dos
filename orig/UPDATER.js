/* globals
SpreadsheetApp
getBacklogArray
getDimensions
main
*/

/* exported
updateReport
*/

function updateReport() {
  var lock = LockService.getDocumentLock();
  try {
    lock.waitLock(10000)
  } catch (e) {
    throw "Could not acquire lock. Someone else is updating the backlog, please wait."
  }
  if (lock.hasLock()) {
    var reportType, refreshQueue = false;
    var ActiveSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var updateInputSheet = ActiveSpreadsheet.getSheetByName("Updater");
    var inputRawData = updateInputSheet.getRange("A:A").getValues();
    for (var row in inputRawData) {
      if (inputRawData[row][0].match(/permit$/i) ||
          inputRawData[row][0].match(/permit rd$/i) ){
        reportType = inputRawData[row][0];
        break;
      }
    }
    if(reportType === undefined) {
      throw "Unidentified Report";
    }
    
    var inputSheetDimensions = getDimensions(updateInputSheet);
    var inputDataArray = getBacklogArray(updateInputSheet, inputSheetDimensions);
    
    var updateDestination;
    if (reportType.match(/permit$/i)) {
      updateDestination = ActiveSpreadsheet.getSheetByName("PERMIT BACKLOG");
    }
    else if (reportType.match(/permit rd$/i)) {
      updateDestination = ActiveSpreadsheet.getSheetByName("PERMIT RD BACKLOG");
      refreshQueue = true;
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
    
    if (refreshQueue) {
      main();
    }
  } else {
    throw "Lock was lost. Someone else is updating backlog, please wait."
  }  
  return;
}
