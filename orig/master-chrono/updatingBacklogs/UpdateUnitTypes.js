/* exported
debugCompare
*/

/* global
ServiceMasterBacklog
getMeThatColumn
getStagingArray
getUpdateArray
matchClass
*/
function debugCompare() {
  var masterBacklogs = new ServiceMasterBacklog();
  var overRide = 4;
  setupUnitTypeArrays(masterBacklogs.Collection[overRide]);
  return;
}
/**
 *
 *
 * @param {any} newBacklog
 */
function setupUnitTypeArrays(newBacklog) {
  var newBacklogArray = getStagingArray(newBacklog);
  var oldBacklogArray = getUpdateArray(newBacklog);
  workOnUnitType(newBacklogArray, oldBacklogArray);
}

/**
 *
 *
 * @param {array} newBacklogArray
 * @param {array} oldBacklogArray
 * @returns
 */
function workOnUnitType(newBacklogArray, oldBacklogArray) {
  var newUnitTypeCol = getMeThatColumn("UNIT TYPE", newBacklogArray);
  var oldUnitTypeCol = getMeThatColumn("UNIT TYPE", oldBacklogArray);

  var newArrayPostUnit = compareUnitTypes(newBacklogArray, oldBacklogArray, newUnitTypeCol, oldUnitTypeCol);

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
 * @param {number} newUnitTypeCol
 * @param {number} oldUnitTypeCol
 */
function compareUnitTypes(newBacklogArray, oldBacklogArray, newUnitTypeCol, oldUnitTypeCol) {
  var CheckThat = new matchClass();
  for (var oldServiceNumber = 1; oldServiceNumber < oldBacklogArray.length; oldServiceNumber++) {
    for (var newServiceNumber = 1; newServiceNumber < newBacklogArray.length; newServiceNumber++) {
      var updateServiceNumber = oldBacklogArray[oldServiceNumber][0];
      var stagingServiceNumber = newBacklogArray[newServiceNumber][0];
      var oldUnitType = oldBacklogArray[oldServiceNumber][oldUnitTypeCol];
      var newUnitType = newBacklogArray[newServiceNumber][newUnitTypeCol];

      if (CheckThat.serviceNumberMatch(updateServiceNumber, stagingServiceNumber) === true) {
        if (CheckThat.unitColMatch(oldUnitType, newUnitType) !== true) {
          if (oldUnitType !== "GSR" || "AURORA") {
            newBacklogArray[newServiceNumber][newUnitTypeCol] = oldUnitType;
          }
        } else if (CheckThat.unitColMatch(oldUnitType, newUnitType) !== true) {
          continue;
        }
      }
    }
  }
  return newBacklogArray;
}
