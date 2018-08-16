/* exported
debugCPRDUnitType
*/

/* global
ServiceMasterBacklog
getMeThatColumn
*/

function debugRDUnitType() {
  var masterBacklogs = new MasterBacklogSheets();
  rd_UnitTypeMarker(masterBacklogs.Collection);
  return;
}

/**
 *
 *
 * @param {any} propBacklog
 * @returns
 */
function rd_UnitTypeMarker(backlogArray) {

  var recordTypeCol = getMeThatColumnNoValidate("Record Type", backlogArray);
  var primaryReasonCol = getMeThatColumnNoValidate("Redesign Primary Reason", backlogArray);
  backlogArray = rd_MarkUnits(backlogArray, recordTypeCol, primaryReasonCol);

  return backlogArray;
}

/**
 *
 * 
 * @param {array} backlogArray
 * @param {array} dim
 * @returns
 */
function rd_MarkUnits(backlogArray, recordTypeCol, primaryReasonCol) {

  // Add Unit Type Column before Opportunity: Type Column
  backlogArray[0].splice(recordTypeCol, 0, "UNIT TYPE");
  for (var row = 1; row < backlogArray.length; row++) {
    // check if designer error
    if (backlogArray[row][primaryReasonCol].match(/Design Errors/i)) {
      // Place Unit Type
      backlogArray[row].splice(recordTypeCol, 0, "DE RD");
    }
    // Check if CP MATCH 
    else if (backlogArray[row][recordTypeCol].match(/proposal/i)) {
      // Place Unit Type
      backlogArray[row].splice(recordTypeCol, 0, "CP MATCH");
    }
    else {
      // Place Unit Type
      backlogArray[row].splice(recordTypeCol, 0, "PERMIT RD");
    }
  }
  return backlogArray;
}
