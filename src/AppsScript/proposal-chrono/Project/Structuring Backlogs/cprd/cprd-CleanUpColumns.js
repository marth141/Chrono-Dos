/* exported
debugPropCleanUpColumns
cprd_CleanUpColumns
cprd_RemoveColumns
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
function cprd_CleanUpColumns(backlogArray) {
  
  var projectIDCol = getMeThatColumn("Solar Project ID", backlogArray);
  var cadIDCol = getMeThatColumn("Solar CAD ID", backlogArray);
  // Put index"s to remove in array and sort to insure order, remove from end (right to left) to not interupt index"s
  var removeValFromIndex = [projectIDCol, cadIDCol].sort(function(a,b){ return b - a; });
  
  var cleanBacklogArray = prop_RemoveColumns(backlogArray, removeValFromIndex);
  return cleanBacklogArray;
}

/**
 *
 * 
 * @param {array} backlogArray
 * @returns backlogArray
 */
function cprd_RemoveColumns(backlogArray, removeValFromIndex) {
  // Remove all index"s in removeValFromIndex from each row
  for (var row in backlogArray) {
    for (var index in removeValFromIndex)
      backlogArray[row].splice(removeValFromIndex[index],1);
  }
  return backlogArray;
}
