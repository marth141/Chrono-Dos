/* exported
addLastColumns
debugAddLastColumns
*/

/* global
ServiceMasterBacklog
SpreadsheetApp
getDimensions
*/
function debugAddLastColumns() {
  var masterBacklogs = new ServiceMasterBacklog();
  var overRide = 1;
  uni_addLastColumns(masterBacklogs.Collection[overRide]);
  return;
}

/**
 *
 * 
 * @param {any} stagingBacklog 
 */
function uni_addLastColumns(stagingBacklog) {
  var dim = getDimensions(stagingBacklog);
  var columnsToAdd = ['Assigned', 'Priority', 'Status', 'Notes', 'Last Update'];
  var addColumnOrigin = dim[1] + 1;
  var lastColToAdd = dim[1] + columnsToAdd.length;
  var toAddIndex = 0;
  for (var addHere = addColumnOrigin; addHere <= lastColToAdd; addHere++) {
    stagingBacklog.getRange(1, addHere).setValue(columnsToAdd[toAddIndex]);
    toAddIndex++;
  }
  SpreadsheetApp.flush();
}
