/**
 * For debugging unitTypeMarker().
 * 
 * @returns void
 */
function debugSnowUnitType() {
  var masterBacklogs = new master_Backlogs();
  snow_UnitTypeMarker(masterBacklogs.Collection);
  return;
}

/**
 * Used for setting the variables in the unit type
 * marking process. The variable passed in will be
 * the backlog sheet.
 * 
 * @param {any} propBacklog The sheet to act on.
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
 * Goes through a backlog array and marks Unit Type.
 * Matches GSR, Aurora, and Address Not Found case insensitive
 * via RegEx.
 * 
 * @param {Array} backlogArray The backlog's data in an array.
 * @param {Number} designPathCol The design path Column to work on.
 * @param {Number} opporTypeCol The opportunity Column to work on.
 * @param {Array} dim The sheet dimensions of the backlog.
 * @returns A new backlog array with Unit Type's marked.
 */
function snow_MarkUnits(backlogArray, dim) {
  backlogArray[0][dim[1]] = 'Unit Type';
  for (var sNumberRow = 1; sNumberRow <= dim[0] - 1; sNumberRow++) {
    backlogArray[sNumberRow][dim[1]] = 'SNOW PROP';
  }
  return backlogArray;
}
