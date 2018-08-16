// Will need edit to check states.

/* exported
debugPropUnitType
*/

/* global
ServiceMasterBacklog
getMeThatColumn
ServiceOfficeCollection
*/

function debugPermitUnitType() {
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
function pp_UnitTypeMarker(backlogArray) {
  var officeCol = getMeThatColumn(
    "Service: Regional Operating Center",
    backlogArray
  );
  var opporTypeCol = getMeThatColumn("Opportunity: Type", backlogArray);
  var dueDateCol = getMeThatColumn("DUE DATE", backlogArray);
  var assignCol = getMeThatColumn(
    "Phase: PV Design Completed By",
    backlogArray
  );

  var primaryDateCol = getMeThatColumn(
    "Primary CAD: Permit Packet QA Completed",
    backlogArray
  );
  var srNeededCol = getMeThatColumn(
    "Phase: Structural Review Completed",
    backlogArray
  );

  backlogArray = pp_MarkUnits(
    backlogArray,
    officeCol,
    opporTypeCol,
    dueDateCol,
    assignCol,
    primaryDateCol,
    srNeededCol
  );
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
function pp_MarkUnits(
  backlogArray,
  officeCol,
  opporTypeCol,
  dueDateCol,
  assignCol,
  primaryDateCol,
  srNeededCol
) {
  // Add Unit Type Column before Opportunity: Type Column
  backlogArray[0].splice(opporTypeCol, 0, "UNIT TYPE");
  var designPathString;
  for (var row = 1; row < backlogArray.length; row++) {
    var account = backlogArray[row];
    if ("S-5920785" === backlogArray[row][0]) {
      var x = 0;
    }

    // If the opportunity type is add-on, or the offices are az, ny-09, or il
    // Then set design path string as permit
    // All else set as outsource
    // Then set design path string as outsource
    if (
      backlogArray[row][opporTypeCol].match(/add/i) ||
      backlogArray[row][officeCol].match(/az-/i) ||
      backlogArray[row][officeCol].match(/ny-09/i) ||
      backlogArray[row][officeCol].match(/il-/i) ||
      backlogArray[row][officeCol].match(/ca-02/i)
    ) {
      // For debugging a specific service number.
      // if (backlogArray[row][0].match(/S-5958052/)) {
      //   console.error("Here it is @ Permit!");
      //   console.info(backlogArray[row]);
      // }
      
      designPathString = "PERMIT";
    } else if (backlogArray[row][opporTypeCol].match(/new/i)) {
      // For debugging a specific service number.
      // if (backlogArray[row][0].match(/S-5958052/)) {
      //   console.error("Here it is @ Outsource!");
      //   console.info(backlogArray[row]);
      // }
      
      // For debugging a specific service number.
      if (backlogArray[row][opporTypeCol].match(/add/i)) {
        console.error("Add-on passed into Outsource");
        console.error(backlogArray[row]);
        MailApp.sendEmail(
          "nathan.casados@vivintsolar.com",
          "Chrono Error found - Add-on passed to Outsource",
          backlogArray[row] +
            "\r\nWas found being passed to outsource in error."
        );
        throw "Add-on becoming outsource. Please report this issue.";
      }
      designPathString = "OUTSOURCE";
      if (
        testDate(backlogArray[row][primaryDateCol]) &&
        !testDate(backlogArray[row][srNeededCol])
      ) {
        // For debugging a specific service number.
        // if (backlogArray[row][0].match(/S-5958052/)) {
        //   console.error("Here it is @ SR!");
        //   console.info(backlogArray[row]);
        // }
        designPathString = "SR";
      }
    }
    backlogArray[row].splice(opporTypeCol, 0, designPathString);
  }
  return backlogArray;
}

function testDate(date) {
  return date instanceof Date;
}
