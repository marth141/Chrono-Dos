/* exported
debugCPRDUnitType
*/

/* global
ServiceMasterBacklog
SpreadsheetApp
getBacklogArray
getDimensions
*/

function debugCPRDUnitType() {
  var masterBacklogs = new ServiceMasterBacklog();
  cprd_UnitTypeMarker(masterBacklogs.Collection);
  return;
}

/**
 *
 *
 * @param {any} propBacklog
 * @returns 
 */
function cprd_UnitTypeMarker(propBacklog) {
  var dim = getDimensions(propBacklog);
  var backlogArray = getBacklogArray(propBacklog, dim);
  backlogArray = cprd_MarkUnits(backlogArray, dim);
  // Above is a set up, below is an action.
  propBacklog.getRange(1, 1, dim[0], dim[1] + 1).setValues(backlogArray);
  SpreadsheetApp.flush();
  return;
}

/**
 *
 * 
 * @param {any} backlogArray 
 * @param {any} dim 
 * @returns 
 */
function cprd_MarkUnits(backlogArray, dim) {
  backlogArray[0][dim[1]] = 'Unit Type';
  for (var sNumberRow = 1; sNumberRow <= dim[0] - 1; sNumberRow++) {
    backlogArray[sNumberRow][dim[1]] = 'CP RD';
  }
  return backlogArray;
}
