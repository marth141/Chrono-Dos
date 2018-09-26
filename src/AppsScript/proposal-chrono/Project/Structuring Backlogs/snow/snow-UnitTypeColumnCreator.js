/* exported
debugSnowUnitType
*/

/* global
ServiceMasterBacklog
getMeThatColumn
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
function snow_UnitTypeMarker(backlogArray) {

  var assingCol = getMeThatColumn("CAD Design Completed By: Vivint Employee Name", backlogArray);
  backlogArray = snow_MarkUnits(backlogArray, assingCol);
  
  return backlogArray;
}

/**
 *
 *
 * @param {array} backlogArray
 * @param {array} dim
 * @returns 
 */
function snow_MarkUnits(backlogArray, assingCol) {
  // Add Unit Type Column before Opportunity: Type Column
  backlogArray[0].splice(assingCol, 0, "Unit Type");
  for (var row = 1; row < backlogArray.length; row++) {
    // Place Unit Type
    backlogArray[row].splice(assingCol, 0, "SNOW PROP");
  }
  return backlogArray;
}
