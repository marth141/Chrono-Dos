/* exported
debugCompare
*/

/* global
ServiceMasterBacklog
getMeThatColumn
getStagingArray
getUpdateArray
getUpdateSheet
*/
function debugCompare() {
  var masterBacklogs = new ServiceMasterBacklog();
  var overRide = 4;
  updateBacklog(masterBacklogs.Collection[overRide]);
  return;
}
/**
 *
 *
 * @param {any} newBacklog
 */
function updateBacklog(newBacklog) {
  var newSheet = newBacklog;
  var oldSheet = getUpdateSheet(newBacklog);
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
  var newUnitTypeCol = getMeThatColumn('Unit Type', newBacklogArray);
  var oldUnitTypeCol = getMeThatColumn('Unit Type', oldBacklogArray);

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
  var CheckThat = new UnitTypeCompareClass();
  for (var updateRow = 1; updateRow < oldBacklogArray.length; updateRow++) {
    for (var stagingRow = 1; stagingRow < newBacklogArray.length; stagingRow++) {
      var updateServiceNumber = oldBacklogArray[updateRow][0];
      var stagingServiceNumber = newBacklogArray[stagingRow][0];
      var oldUnitType = oldBacklogArray[updateRow][oldUnitTypeCol];
      var newUnitType = newBacklogArray[stagingRow][newUnitTypeCol];

      if (CheckThat.serviceNumberMatch(updateServiceNumber, stagingServiceNumber) === true) {
        if (CheckThat.unitColMatch(oldUnitType, newUnitType) !== true) {
          if (oldUnitType !== 'GSR' || 'AURORA') {
            newBacklogArray[stagingRow][newUnitTypeCol] = oldUnitType;
          }
        } else if (CheckThat.unitColMatch(oldUnitType, newUnitType) !== true) {
          continue;
        }
      }
    }
  }
  return newBacklogArray;
}

var UnitTypeCompareClass = function () {
  this.serviceNumberMatch = function (updateServiceNumber, stagingServiceNumber) {
    if (updateServiceNumber === stagingServiceNumber) {
      return true;
    } else {
      return false;
    }
  };
  this.unitColMatch = function (oldUnitType, newUnitType) {
    if (oldUnitType === newUnitType) {
      return true;
    } else {
      return false;
    }
  };
};
