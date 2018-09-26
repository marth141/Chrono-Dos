/* exported
debugCPRDUnitType
*/

/* global
ServiceMasterBacklog
getMeThatColumn
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
function cprd_UnitTypeMarker(backlogArray) {

  var assingCol = getMeThatColumn("Redesign Completed By: Vivint Employee Name", backlogArray);
  backlogArray = cprd_MarkUnits(backlogArray, assingCol);
  
  return backlogArray;
}

/**
 *
 * 
 * @param {array} backlogArray
 * @param {array} dim
 * @returns
 */
function cprd_MarkUnits(backlogArray, assingCol) {

  // Add Unit Type Column before Opportunity: Type Column
  backlogArray[0].splice(assingCol, 0, "Unit Type");
  for (var row = 1; row < backlogArray.length; row++) {
    // Place Unit Type
    backlogArray[row].splice(assingCol, 0, "CP RD");
  }
  return backlogArray;
}
