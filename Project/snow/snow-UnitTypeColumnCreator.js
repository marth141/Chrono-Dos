/* exported
debugSnowUnitType
*/

/* global
ServiceMasterBacklog
SpreadsheetApp
getBacklogArray
getDimensions
*/

function debugSnowUnitType() {
  var masterBacklogs = new ServiceMasterBacklog();
  snow_UnitTypeMarker(masterBacklogs.Collection);
  return;
}

/**
 *
 *
 * @param {any} propBacklog
 * @returns 
 */
function snow_UnitTypeMarker(propBacklog) {
  var dim = getDimensions(propBacklog);
  var backlogArray = getBacklogArray(propBacklog, dim);
  backlogArray = snow_MarkUnits(backlogArray, dim);
  // Above is a set up, below is an action.
  propBacklog.getRange(1, 1, dim[0], dim[1] + 1).setValues(backlogArray);
  SpreadsheetApp.flush();
  return;
}

/**
 *
 *
 * @param {array} backlogArray
 * @param {array} dim
 * @returns 
 */
function snow_MarkUnits(backlogArray, dim) {
  backlogArray[0][dim[1]] = 'Unit Type';
  for (var sNumberRow = 1; sNumberRow <= backlogArray.length; sNumberRow++) {
    backlogArray[sNumberRow][dim[1]] = 'SNOW PROP';
  }
  return backlogArray;
}
