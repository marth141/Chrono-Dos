/* exported
addLastColumns
debugAddLastColumns
debugUpdateOldData
*/

/* global
ServiceMasterBacklog
*/
function debugUpdateOldData() {
  var masterBacklogs = new ServiceMasterBacklog();
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
  var columnsToAdd = ["PRIORITY", "STATUS", "NOTES", "LAST UPDATE"];
  for (var add in columnsToAdd) {
    backlogArray[0].push(columnsToAdd[add]);
  }
  for (var row = 1; row < backlogArray.length; row++) {
    for (add in columnsToAdd) {
      backlogArray[row].push("");
    }
  }
  return backlogArray;
}