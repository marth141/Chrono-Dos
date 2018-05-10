// Will need edit to check states.

/* exported
debugPropUnitType
*/

/* global
ServiceMasterBacklog
getMeThatColumn
ServiceOfficeCollection
*/

function debugPropUnitType() {
  var masterBacklogs = new ServiceMasterBacklog();
  prop_UnitTypeMarker(masterBacklogs.Collection);
  return;
}

/**
 *
 *
 * @param {any} propBacklog
 * @returns 
 */
function prop_UnitTypeMarker(backlogArray) {

  var designPathCol = getMeThatColumn("Opportunity: Design Path", backlogArray);
  var opporTypeCol = getMeThatColumn("Opportunity: Type", backlogArray);
  backlogArray = prop_MarkUnits(backlogArray, designPathCol, opporTypeCol); // Thins get started
  return backlogArray;
}

/**
 *
 *
 * @param {array} backlogArray
 * @param {number} designPathCol
 * @param {number} opporTypeCol
 * @param {array} dim
 * @returns
 */
function prop_MarkUnits(backlogArray, designPathCol, opporTypeCol) {
  // Add Unit Type Column before Opportunity: Type Column
  backlogArray[0].splice(opporTypeCol, 0, "Unit Type");
  var designPathString;
  for (var sNumberRow = 1; sNumberRow < backlogArray.length; sNumberRow++) {
    if (backlogArray[sNumberRow][designPathCol].match(/AURORA/i)) {
      designPathString = "AURORA";
    } else {
      designPathString = "GSR";
    }
    if (prop_OtsMarker(backlogArray, sNumberRow, opporTypeCol, designPathString))
      designPathString = "OTS " + designPathString;
    // Place Unit Type before Opportunity: Type Column
    backlogArray[sNumberRow].splice(opporTypeCol, 0, designPathString);
    // Delete both "Opportunity: Type", and "Opportunity: Design Path" columns
    //    backlogArray[sNumberRow].splice(opporTypeCol, 2); // * I"ll delete all column sin another function *
  }
  // Delete both "Opportunity: Type", and "Opportunity: Design Path" columns
  //  backlogArray[0].splice(opporTypeCol, 2); // * I"ll delete all column sin another function *
  return backlogArray;
}

/**
 *
 *
 * @param {array} backlogArray
 * @param {number} opporTypeCol
 * @param {number} sNumberRow
 * @param {array} dim
 * @param {string} designPathString
 * @returns
 */
function prop_OtsMarker(backlogArray, sNumberRow, opporTypeCol) {

  var contractCol = getMeThatColumn("Project: Contract Type", backlogArray);
  var utilityCol = getMeThatColumn("Project: Utility", backlogArray);
  var regionCol = getMeThatColumn("Service: Regional Operating Center", backlogArray);
  var serviceNumber = backlogArray[sNumberRow];
  var offices = new ServiceOfficeCollection();

  if (serviceNumber[utilityCol].match(/smud/i) ||
    serviceNumber[opporTypeCol].match(/add-on/i) ||
    offices.Outsource.some(function (state) { return serviceNumber[regionCol].indexOf(state) > -1; })) {
    return false;
  } else {
    return true;
  }
}
