/**
 * For debugging unitTypeMarker().
 * 
 * @returns void
 */
function debugUnitType() {
  var masterBacklogs = new master_Backlogs();
  prop_UnitTypeMarker(masterBacklogs.Collection);
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
function prop_UnitTypeMarker(propBacklog) {
  var dim = getDimensions(propBacklog);
  var backlogArray = getBacklogArray(propBacklog, dim);
  // Above is a set up, below is an action.
  var designPathCol = getMeThatColumn('Opportunity: Design Path', backlogArray, dim);
  var opporTypeCol = getMeThatColumn('Opportunity: Type', backlogArray, dim);
  var markedUnits = prop_MarkUnits(backlogArray, designPathCol, opporTypeCol, dim);
  // Above is a set up, below is an action.
  propBacklog.getRange(1, 1, dim[0], dim[1] + 1).setValues(markedUnits);
  propBacklog.deleteColumn(designPathCol + 1);
  propBacklog.deleteColumn(opporTypeCol + 1);
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
function prop_MarkUnits(backlogArray, designPathCol, opporTypeCol, dim) {
  backlogArray[0][dim[1]] = 'Unit Type';
  var adjustedArray;
  var designPathString;
  for (var sNumberRow = 1; sNumberRow <= dim[0] - 1; sNumberRow++) {
    if (backlogArray[sNumberRow][designPathCol].match(/GSR/i)) {
      designPathString = 'GSR';
      adjustedArray = prop_OtsMarker(backlogArray, opporTypeCol, sNumberRow, dim, designPathString);
    } else if (backlogArray[sNumberRow][designPathCol].match(/AURORA/i) ||
      backlogArray[sNumberRow][designPathCol].match(/ADDRESS NOT FOUND/i)) {
      designPathString = 'AURORA';
      adjustedArray = prop_OtsMarker(backlogArray, opporTypeCol, sNumberRow, dim, designPathString);
    }
  }
  return adjustedArray;
}

/**
 * Used to mark OTS designs as long as they follow a
 * criteria defined in the function. They must be a lease,
 * smud, add-on, and not Southwest. Then it is OTS.
 * If not, it'll just write the design path.
 * 
 * @param {Sheet} backlogArray The backlog to be acted on.
 * @param {Number} opporTypeCol The opportunity type column.
 * @param {Number} sNumberRow The service number row to be acted on.
 * @param {Array} dim The dimensions of the backlog sheet.
 * @param {String} designPathString The design path adjusted for workflow.
 */
function prop_OtsMarker(backlogArray, opporTypeCol, sNumberRow, dim, designPathString) {
  var contractCol = getMeThatColumn('Project: Contract Type', backlogArray, dim);
  var utilityCol = getMeThatColumn('Project: Utility', backlogArray, dim);
  var regionCol = getMeThatColumn('Region', backlogArray, dim);
  var serviceNumber = backlogArray[sNumberRow];

  if (serviceNumber[contractCol].match(/lease/i) &&
    serviceNumber[utilityCol].match(/smud/i) &&
    serviceNumber[opporTypeCol].match(/add-on/i) &&
    serviceNumber[regionCol].match(/southwest/i) !== null) {
    backlogArray[sNumberRow][dim[1]] = 'OTS ' + designPathString;
    return backlogArray;
  } else {
    backlogArray[sNumberRow][dim[1]] = designPathString;
    return backlogArray;
  }
}
