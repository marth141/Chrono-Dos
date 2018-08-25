// @flow strict
/**
 *
 * @param {Array[]} backlogArray
 * @return {Array[]}
 */
function pp_UnitTypeMarker(backlogArray) {
  var columns = new PermitUnitTypeColumns(backlogArray);
  backlogArray = pp_MarkUnits(backlogArray, columns);
  return backlogArray;
}

/**
 *
 * @param {Array[]} backlogArray
 * @param {PermitUnitTypeColumns} columns
 * @return {Array[]}
 */
function pp_MarkUnits(backlogArray, columns) {
  // Add Unit Type Column before Opportunity: Type Column
  var headers = backlogArray[0];
  var opporTypeCol = columns.opporTypeCol,
    officeCol = columns.officeCol,
    primaryDateCol = columns.primaryDateCol,
    srNeededCol = columns.srNeededCol;

  headers.splice(opporTypeCol, 0, 'UNIT TYPE');
  var designPathString;
  for (var row = 1; row < backlogArray.length; row++) {
    var account = backlogArray[row];
    if ('S-5920785' === backlogArray[row][0]) {
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

      designPathString = 'PERMIT';
    } else if (backlogArray[row][opporTypeCol].match(/new/i)) {
      // For debugging a specific service number.
      // if (backlogArray[row][0].match(/S-5958052/)) {
      //   console.error("Here it is @ Outsource!");
      //   console.info(backlogArray[row]);
      // }

      // For debugging a specific service number.
      if (backlogArray[row][opporTypeCol].match(/add/i)) {
        console.error('Add-on passed into Outsource');
        console.error(backlogArray[row]);
        MailApp.sendEmail(
          'nathan.casados@vivintsolar.com',
          'Chrono Error found - Add-on passed to Outsource',
          backlogArray[row] +
            '\r\nWas found being passed to outsource in error.'
        );
        var addonErrorMsg =
          'Add-on becoming outsource. Please report this issue.';
        throw addonErrorMsg;
      }
      designPathString = 'OUTSOURCE';
      if (
        testDate(backlogArray[row][primaryDateCol]) &&
        !testDate(backlogArray[row][srNeededCol])
      ) {
        // For debugging a specific service number.
        // if (backlogArray[row][0].match(/S-5958052/)) {
        //   console.error("Here it is @ SR!");
        //   console.info(backlogArray[row]);
        // }
        designPathString = 'SR';
      }
    }
    backlogArray[row].splice(opporTypeCol, 0, designPathString);
  }
  return backlogArray;
}

/**
 *
 * @param {Date} date
 * @return {Boolean}
 */
function testDate(date) {
  return date instanceof Date;
}
