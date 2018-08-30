/* exported
debugNotes
*/

/* global
ServiceMasterBacklog
getMeThatColumn
getStagingArray
getUpdateArray
matchClass
*/
function debugNotes() {
  var masterBacklogs = new ServiceMasterBacklog();
  var overRide = 4;
  setupNotes(masterBacklogs.Collection[overRide]);
  return;
}
/**
 *
 *
 * @param {any} newBacklog
 */
function setupNotes(newBacklog) {
  var newBacklogArray = getStagingArray(newBacklog);
  var oldBacklogArray = getUpdateArray(newBacklog);
  workOnNotes(newBacklogArray, oldBacklogArray);
}

/**
 *
 *
 * @param {array} newBacklogArray
 * @param {array} oldBacklogArray
 * @returns
 */
function workOnNotes(newBacklogArray, oldBacklogArray) {
  var newNotesCol = getMeThatColumn("Notes", newBacklogArray);
  var oldNotesCol = getMeThatColumn("Notes", oldBacklogArray);

  var newArrayPostUnit = setLastUpdate(newBacklogArray, oldBacklogArray, newNotesCol, oldNotesCol);

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
      var oldNotes = oldBacklogArray[oldServiceNumber][oldLastUpdateCol];

      if (CheckThat.serviceNumberMatch(updateServiceNumber, stagingServiceNumber) === true) {
        newBacklogArray[newServiceNumber][newLastUpdateCol] = oldNotes;
      }
    }
  }
  return newBacklogArray;
}
