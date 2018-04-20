/* exported addLastColumns */
function debugAddLastColumns() {
  var masterBacklogs = new serviceMasterBacklog();
  var overRide = 1;
  addLastColumns(masterBacklogs.Collection[overRide]);
  return;
}

function addLastColumns(stagingBacklog) {
  var dim = getDimensions(stagingBacklog);
  var addColumnOrigin = dim[1] + 1;
  var lastColToAdd = dim[1] + 3;
  var columnsToAdd = ['Assigned', 'Priority', 'Status'];
  var toAddIndex = 0;
  for (var addHere = addColumnOrigin; addHere <= lastColToAdd; addHere++) {
    stagingBacklog.getRange(1, addHere).setValue(columnsToAdd[toAddIndex]);
    toAddIndex++;
  }
  SpreadsheetApp.flush();
}