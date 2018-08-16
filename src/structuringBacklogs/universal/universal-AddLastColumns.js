/* exported
addLastColumns
debugAddLastColumns
debugUpdateOldData
*/

/* global
ServiceMasterBacklog
*/
function debugUpdateOldData() {
  var masterBacklogs = new MasterBacklogSheets();
  var overRide = 1;
  uni_addLastColumns(masterBacklogs.Collection[overRide]);
  return;
}

/**
 *
 * 
 * @param {any} backlogArray 
 */
function uni_addLastColumns(backlogArray) {
  var columnsToAdd = ["PRIORITY", "STATUS", "NOTES", "LAST UPDATE", "INITIAL DATE"];
  for (var column = 0; column < columnsToAdd.length; column++) {
    backlogArray[0].push(columnsToAdd[column]);
  }
  for (var row = 1; row < backlogArray.length; row++) {
    for (var column = 0; column < columnsToAdd.length; column++) {
      backlogArray[row].push("");
    }
  }
  return backlogArray;
}