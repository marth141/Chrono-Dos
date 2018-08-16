/* exported
debugPriority
*/

/* global
ServiceMasterBacklog
getMeThatColumn
getStagingArray
getUpdateArray
matchClass
*/
function debugPriority() {
  var masterBacklogs = new MasterBacklogSheets();
  var overRide = 4;
  setupPriority(masterBacklogs.Collection[overRide]);
  return;
}
/**
 *
 *
 * @param {any} newBacklog
 */
function setupPriority(newBacklog) {
  var newBacklogArray = getStagingArray(newBacklog);
  var oldBacklogArray = getUpdateArray(newBacklog);
  workOnPriority(newBacklogArray, oldBacklogArray);
}

/**
 *
 *
 * @param {array} newBacklogArray
 * @param {array} oldBacklogArray
 * @returns
 */
function workOnPriority(newBacklogArray, oldBacklogArray) {
  var newAssignedCol = getMeThatColumn("Priority", newBacklogArray);
  var oldAssignedCol = getMeThatColumn("Priority", oldBacklogArray);

  var newArrayPostUnit = setLastPriority(newBacklogArray, oldBacklogArray, newAssignedCol, oldAssignedCol);

  console.log(newArrayPostUnit);
  console.log(newBacklogArray);
  console.log(oldBacklogArray);
  return;
}
/**
 *
 *
 * @param {array} newBacklogArray
 * @param {array} oldBacklogArray
 * @param {number} newAssignedCol
 * @param {number} oldAssignedCol
 */
function setLastPriority(newBacklogArray, oldBacklogArray, newAssignedCol, oldAssignedCol) {
  var CheckThat = new matchClass();
  for (var oldServiceNumber = 1; oldServiceNumber < oldBacklogArray.length; oldServiceNumber++) {
    for (var newServiceNumber = 1; newServiceNumber < newBacklogArray.length; newServiceNumber++) {
      var updateServiceNumber = oldBacklogArray[oldServiceNumber][0];
      var stagingServiceNumber = newBacklogArray[newServiceNumber][0];
      var oldNotes = oldBacklogArray[oldServiceNumber][oldAssignedCol];

      if (CheckThat.serviceNumberMatch(updateServiceNumber, stagingServiceNumber) === true) {
        newBacklogArray[newServiceNumber][newAssignedCol] = oldNotes;
      }
    }
  }
  return newBacklogArray;
}
