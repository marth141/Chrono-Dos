/* exported
debugPartOneUnitType
*/

/* global
ServiceMasterBacklog
SpreadsheetApp
getBacklogArray
getDimensions
*/

function debugPartOneUnitType() {
  var masterBacklogs = new ServiceMasterBacklog();
  partOne_UnitTypeMarker(masterBacklogs.Collection);
  return;
}

function partOne_UnitTypeMarker(propBacklog) {
  var dim = getDimensions(propBacklog);
  var backlogArray = getBacklogArray(propBacklog, dim);
  backlogArray = lite_MarkUnits(backlogArray, dim);
  // Above is a set up, below is an action.
  propBacklog.getRange(1, 1, dim[0], dim[1] + 1).setValues(backlogArray);
  SpreadsheetApp.flush();
  return;
}

function lite_MarkUnits(backlogArray, dim) {
  backlogArray[0][dim[1]] = 'Unit Type';
  for (var sNumberRow = 1; sNumberRow <= dim[0] - 1; sNumberRow++) {
    backlogArray[sNumberRow][dim[1]] = 'PART 1';
  }
  return backlogArray;
}
