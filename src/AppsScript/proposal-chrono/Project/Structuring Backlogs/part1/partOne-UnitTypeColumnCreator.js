/* exported
debugPartOneUnitType
*/

/* global
ServiceMasterBacklog
getMeThatColumn
*/

function debugPartOneUnitType() {
  var masterBacklogs = new ServiceMasterBacklog();
  partOne_UnitTypeMarker(masterBacklogs.Collection);
  return;
}

/**
 *
 * 
 * @param {any} propBacklog 
 * @returns 
 */
function partOne_UnitTypeMarker(backlogArray) {

  var assingCol = getMeThatColumn("Phase: CAD Design Completed By", backlogArray);
  backlogArray = partOne_MarkUnits(backlogArray, assingCol);
  
  return backlogArray;
}

/**
 *
 * 
 * @param {array} backlogArray
 * @param {array} dim
 * @returns 
 */
function partOne_MarkUnits(backlogArray, assingCol) {
  // Add Unit Type Column before Opportunity: Type Column
  backlogArray[0].splice(assingCol, 0, "Unit Type");
  for (var row = 1; row < backlogArray.length; row++) {
    // Place Unit Type
    backlogArray[row].splice(assingCol, 0, "PART 1");
  }
  return backlogArray;
}
