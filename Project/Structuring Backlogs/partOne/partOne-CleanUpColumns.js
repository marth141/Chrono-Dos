/* exported
debugPropCleanUpColumns
partOne_CleanUpColumns
partOne_RemoveColumns
*/

/* global
getMeThatColumn
prop_RemoveColumns
*/

/**
 *
 * 
 * @param {any} backlogArray 
 * @returns backlogArray
 */
function partOne_CleanUpColumns(backlogArray) {
  
  var projectIDCol = getMeThatColumn("Project: Solar Project ID", backlogArray);
  // Put index"s to remove in array and sort to insure order, remove from end (right to left) to not interupt index"s
  var removeValFromIndex = [projectIDCol].sort(function(a,b){ return b - a; });
  
  var cleanBacklogArray = prop_RemoveColumns(backlogArray, removeValFromIndex);
  return cleanBacklogArray;
}

/**
 *
 * 
 * @param {array} backlogArray
 * @returns backlogArray
 */
function partOne_RemoveColumns(backlogArray, removeValFromIndex) {
  // Remove all index"s in removeValFromIndex from each row
  for (var row in backlogArray) {
    for (var index in removeValFromIndex)
      backlogArray[row].splice(removeValFromIndex[index],1);
  }
  return backlogArray;
}
