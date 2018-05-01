/* exported
debugLastUpdate
*/

/* global
ServiceMasterBacklog
getMeThatColumn
getStagingArray
getUpdateArray
matchClass
*/
function debugLastUpdate() {
  var masterBacklogs = new ServiceMasterBacklog();
  var overRide = 4;
  setupLastUpdateArrays(masterBacklogs.Collection[overRide]);
  return;
}
/**
 *
 *
 * @param {any} newBacklog
 */
function setupLastUpdateArrays(newBacklog) {
  var newBacklogArray = getStagingArray(newBacklog);
  var oldBacklogArray = getUpdateArray(newBacklog);
  workOnLastUpdate(newBacklogArray, oldBacklogArray);
}

/**
 *
 *
 * @param {array} newBacklogArray
 * @param {array} oldBacklogArray
 * @returns
 */
function workOnLastUpdate(newBacklogArray, oldBacklogArray) {
  var newLastUpdateCol = getMeThatColumn('Last Update', newBacklogArray);
  var oldLastUpdateCol = getMeThatColumn('Last Update', oldBacklogArray);

  var newArrayPostUnit = setLastUpdate(newBacklogArray, oldBacklogArray, newLastUpdateCol, oldLastUpdateCol);

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
 * @param {number} newLastUpdateCol
 * @param {number} oldLastUpdateCol
 */
function setLastUpdate(newBacklogArray, oldBacklogArray, newLastUpdateCol, oldLastUpdateCol) {
  var CheckThat = new matchClass();
  for (var oldServiceNumber = 1; oldServiceNumber < oldBacklogArray.length; oldServiceNumber++) {
    for (var newServiceNumber = 1; newServiceNumber < newBacklogArray.length; newServiceNumber++) {
      var updateServiceNumber = oldBacklogArray[oldServiceNumber][0];
      var stagingServiceNumber = newBacklogArray[newServiceNumber][0];
      var oldLastUpdate = oldBacklogArray[oldServiceNumber][oldLastUpdateCol];

      if (CheckThat.serviceNumberMatch(updateServiceNumber, stagingServiceNumber) === true) {
        newBacklogArray[newServiceNumber][newLastUpdateCol] = oldLastUpdate;
      }
    }
  }
  return newBacklogArray;
}
