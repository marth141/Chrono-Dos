/* exported
debugPropCleanUpColumns
prop_CleanUpColumns
*/

/* global
ServiceMasterBacklog
getMeThatColumn
uni_RemoveColumns
*/

function debugPropCleanUpColumns() {
  var masterBacklogs = new ServiceMasterBacklog();
  uni_RemoveColumns(masterBacklogs.Collection);
  return;
}

/**
 *
 * 
 * @param {any} backlogArray 
 * @returns backlogArray
 */
function prop_CleanUpColumns(backlogArray) {
  
  var projectIDCol = getMeThatColumn("Project: Solar Project ID", backlogArray);
  var officeNameCol = getMeThatColumn("Opportunity: Office: Office Name", backlogArray);
  var designPathCol = getMeThatColumn("Opportunity: Design Path", backlogArray);
  var opporTypeCol = getMeThatColumn("Opportunity: Type", backlogArray);
  // Put index"s to remove in array and sort to insure order, remove from end (right to left) to not interupt index"s
  var removeValFromIndex = [projectIDCol,officeNameCol,designPathCol,opporTypeCol].sort(function(a,b){ return b - a; });
  
  var cleanBacklogArray = prop_RemoveColumns(backlogArray, removeValFromIndex);
  return cleanBacklogArray;
}

/**
 *
 * 
 * @param {array} backlogArray
 * @returns backlogArray
 */
function prop_RemoveColumns(backlogArray, removeValFromIndex) {
  // Remove all index"s in removeValFromIndex from each row
  for (var row in backlogArray) {
    for (var index in removeValFromIndex)
      backlogArray[row].splice(removeValFromIndex[index],1);
  }
  return backlogArray;
}
