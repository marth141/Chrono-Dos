/**
 *
 * @param {Array[]} backlogArray
 * @return {Array[]}
 */
function pp_CleanUpColumns(backlogArray) {
  var projectIDCol = getColumnIndex('Project: Solar Project ID', backlogArray);
  var opporTypeCol = getColumnIndex('Opportunity: Type', backlogArray);
  var PermitCompletedCol = getColumnIndex(
    'Primary CAD: Permit Packet QA Completed',
    backlogArray
  );
  var structuralCompletedCol = getColumnIndex(
    'Phase: Structural Review Completed',
    backlogArray
  );
  /**
   * Put index's to remove in array and sort to insure order,
   * remove from end (right to left) to not interupt index's
   */
  var removeValFromIndex = [
    projectIDCol,
    opporTypeCol,
    PermitCompletedCol,
    structuralCompletedCol
  ].sort(function(a, b) {
    return b - a;
  });

  var cleanBacklogArray = pp_RemoveColumns(backlogArray, removeValFromIndex);
  return cleanBacklogArray;
}

/**
 *
 * @param {Array[]} backlogArray
 * @param {Array} removeValFromIndex
 * @return {Array[]}
 */
function pp_RemoveColumns(backlogArray, removeValFromIndex) {
  // Remove all index"s in removeValFromIndex from each row
  for (var row = 0; row < backlogArray.length; row++) {
    var debug = backlogArray[row];
    for (var index = 0; index < removeValFromIndex.length; index++) {
      backlogArray[row].splice(removeValFromIndex[index], 1);
    }
  }
  return backlogArray;
}
