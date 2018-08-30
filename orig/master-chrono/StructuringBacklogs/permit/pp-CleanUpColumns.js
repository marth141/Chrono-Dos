/* exported
debugPropCleanUpColumns
prop_CleanUpColumns
*/

/* global
ServiceMasterBacklog
getMeThatColumn
uni_RemoveColumns
*/

function debugPermitCleanUpColumns() {
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
function pp_CleanUpColumns(backlogArray) {
  
  var projectIDCol = getMeThatColumn("Project: Solar Project ID", backlogArray);
  var opporTypeCol = getMeThatColumn("Opportunity: Type", backlogArray);
  var PermitCompletedCol = getMeThatColumn("Primary CAD: Permit Packet QA Completed", backlogArray);
  var structuralCompletedCol = getMeThatColumn("Phase: Structural Review Completed", backlogArray);
  // Put index"s to remove in array and sort to insure order, remove from end (right to left) to not interupt index"s
  var removeValFromIndex = [projectIDCol,opporTypeCol,PermitCompletedCol,structuralCompletedCol].sort(function(a,b){ return b - a; });
  
  var cleanBacklogArray = pp_RemoveColumns(backlogArray, removeValFromIndex);
  return cleanBacklogArray;
}

/**
 *
 * 
 * @param {array} backlogArray
 * @returns backlogArray
 */
function pp_RemoveColumns(backlogArray, removeValFromIndex) {
  // Remove all index"s in removeValFromIndex from each row
  for (var row = 0; row < backlogArray.length; row++) {
    var debug = backlogArray[row];
    for (var index = 0; index < removeValFromIndex.length; index++) {
      backlogArray[row].splice(removeValFromIndex[index],1);
    }
  }
  return backlogArray;
}
