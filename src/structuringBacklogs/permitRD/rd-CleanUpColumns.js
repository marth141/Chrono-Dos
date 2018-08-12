/**
 *
 * @param {*} backlogArray
 * @return {*}
 */
function rd_CleanUpColumns(backlogArray) {
  var projectIDCol = getMeThatColumn('Solar Project ID', backlogArray);
  var cadIDCol = getMeThatColumn('Solar CAD ID', backlogArray);
  var recordTypeCol = getMeThatColumn('Record Type', backlogArray);
  var primaryReasonCol = getMeThatColumn(
    'Redesign Primary Reason',
    backlogArray
  );
  var permitCompletedByCol = getMeThatColumn(
    'Primary CAD: Permit Packet Completed By',
    backlogArray
  );

  /**
   * Put index"s to remove in array and sort to insure order,
   * remove from end (right to left) to not interupt index's
   */
  var removeValFromIndex = [
    projectIDCol,
    cadIDCol,
    recordTypeCol,
    primaryReasonCol,
    permitCompletedByCol
  ].sort(function(a, b) {
    return b - a;
  });

  var cleanBacklogArray = rd_RemoveColumns(backlogArray, removeValFromIndex);
  return cleanBacklogArray;
}

/**
 *
 * @param {*} backlogArray
 * @param {*} removeValFromIndex
 * @return {*} backlogArray
 */
function rd_RemoveColumns(backlogArray, removeValFromIndex) {
  // Remove all index"s in removeValFromIndex from each row
  for (var row = 0; row < backlogArray.length; row++) {
    var debug = backlogArray[row];
    for (var index = 0; index < removeValFromIndex.length; index++) {
      backlogArray[row].splice(removeValFromIndex[index], 1);
    }
  }
  return backlogArray;
}
