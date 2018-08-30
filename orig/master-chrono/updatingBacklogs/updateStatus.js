/* exported
debugStatus
*/

/* global
ServiceMasterBacklog
getMeThatIndexOf
getStagingArray
getUpdateArray
matchClass
*/
function debugStatus() {
  var masterBacklogs = new ServiceMasterBacklog();
  var overRide = 4;
  setupStatus(masterBacklogs.Collection[overRide]);
  return;
}
/**
 *
 *
 * @param {any} newBacklog
 */
function setupStatus(newBacklog) {
  var newBacklogArray = getStagingArray(newBacklog);
  var oldBacklogArray = getUpdateArray(newBacklog);
  workOnStatus(newBacklogArray, oldBacklogArray);
}

/**
 *
 *
 * @param {array} newBacklogArray
 * @param {array} oldBacklogArray
 * @returns
 */
function workOnStatus(newBacklogArray, oldBacklogArray) {
  var newStatusCol = getMeThatIndexOf("Status", newBacklogArray);
  var oldStatusCol = getMeThatIndexOf("Status", oldBacklogArray);

  var newArrayPostUnit = setStatus(newBacklogArray, oldBacklogArray, newStatusCol, oldStatusCol);

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
 * @param {number} newStatusCol
 * @param {number} oldStatusCol
 */
function setStatus(newBacklogArray, oldBacklogArray, newStatusCol, oldStatusCol) {
  var CheckThat = new matchClass();
  for (var oldServiceNumber = 1; oldServiceNumber < oldBacklogArray.length; oldServiceNumber++) {
    for (var newServiceNumber = 1; newServiceNumber < newBacklogArray.length; newServiceNumber++) {
      var updateServiceNumber = oldBacklogArray[oldServiceNumber][0];
      var stagingServiceNumber = newBacklogArray[newServiceNumber][0];
      var oldStatus = oldBacklogArray[oldServiceNumber][oldStatusCol];

      if (CheckThat.serviceNumberMatch(updateServiceNumber, stagingServiceNumber) === true) {
        newBacklogArray[newServiceNumber][newStatusCol] = oldStatus;
      }
    }
  }
  return newBacklogArray;
}
