/* exported
debugAssigned
*/

/* global
ServiceMasterBacklog
getMeThatColumn
getStagingArray
getUpdateArray
matchClass
*/
function debugAssigned() {
  var masterBacklogs = new MasterBacklogSheets();
  var overRide = 4;
  setupAssigned(masterBacklogs.Collection[overRide]);
  return;
}
/**
 *
 *
 * @param {any} newBacklog
 */
function setupAssigned(newBacklog) {
  var newBacklogArray = getStagingArray(newBacklog);
  var oldBacklogArray = getUpdateArray(newBacklog);
  workOnAssigned(newBacklogArray, oldBacklogArray);
}

/**
 *
 *
 * @param {array} newBacklogArray
 * @param {array} oldBacklogArray
 * @returns
 */
function workOnAssigned(newBacklogArray, oldBacklogArray) {
  var newAssignedCol = getColumnIndex("Assigned", newBacklogArray);
  var oldAssignedCol = getColumnIndex("Assigned", oldBacklogArray);

  var newArrayPostUnit = setLastAssigned(newBacklogArray, oldBacklogArray, newAssignedCol, oldAssignedCol);

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
function setLastAssigned(newBacklogArray, oldBacklogArray, newAssignedCol, oldAssignedCol) {
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
