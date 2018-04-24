/* exported
debugPropUnitType
*/

/* global
ServiceMasterBacklog
SpreadsheetApp
getBacklogArray
getDimensions
getMeThatColumn
*/

function debugPropUnitType() {
  var masterBacklogs = new ServiceMasterBacklog();
  prop_UnitTypeMarker(masterBacklogs.Collection);
  return;
}

function prop_UnitTypeMarker(propBacklog) {
  var dim = getDimensions(propBacklog);
  var backlogArray = getBacklogArray(propBacklog, dim);
  // Above is a set up, below is an action.
  var designPathCol = getMeThatColumn('Opportunity: Design Path', backlogArray);
  var opporTypeCol = getMeThatColumn('Opportunity: Type', backlogArray);
  var markedUnits = prop_MarkUnits(backlogArray, designPathCol, opporTypeCol, dim);
  // Above is a set up, below is an action.
  propBacklog.getRange(1, 1, dim[0], dim[1] + 1).setValues(markedUnits);
  propBacklog.deleteColumn(designPathCol + 1);
  propBacklog.deleteColumn(opporTypeCol + 1);
  SpreadsheetApp.flush();
  return;
}

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
