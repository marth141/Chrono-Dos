/**
 *
 * @param {*} backlogArray
 * @return {Array[]}
 */
function pp_UnitTypeMarker(backlogArray) {
  var officeCol = getMeThatColumn(
    'Service: Regional Operating Center',
    backlogArray
  );
  var opporTypeCol = getMeThatColumn('Opportunity: Type', backlogArray);
  var dueDateCol = getMeThatColumn('DUE DATE', backlogArray);
  var assignCol = getMeThatColumn(
    'Phase: PV Design Completed By',
    backlogArray
  );

  var primaryDateCol = getMeThatColumn(
    'Primary CAD: Permit Packet QA Completed',
    backlogArray
  );
  var srNeededCol = getMeThatColumn(
    'Phase: Structural Review Completed',
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
 * @param {*} backlogArray
 * @param {*} officeCol
 * @param {*} opporTypeCol
 * @param {*} dueDateCol
 * @param {*} assignCol
 * @param {*} primaryDateCol
 * @param {*} srNeededCol
 * @return {Array[]}
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
  backlogArray[0].splice(opporTypeCol, 0, 'UNIT TYPE');
  var designPathString;
  for (var row = 1; row < backlogArray.length; row++) {
    /** @type Array<String|Date> */
    var account = backlogArray[row];
    /** @type String */
    var serviceNumber = account[0];

    var debug_thisServiceNumber = serviceNumber === 'S-5920785';
    if (debug_thisServiceNumber) {
      // debugger;
    }

    // If the opportunity type is add-on, or the offices are az, ny-09, or il
    // Then set design path string as permit
    // All else set as outsource
    // Then set design path string as outsource
    /** @type String */
    var accountOppType = account[opporTypeCol];
    var accountOffice = account[officeCol];

    var isAddon = accountOppType.match(/add/i) !== null;
    var isNewInst = accountOppType.match(/new/i) !== null;

    var isAZ = accountOffice.match(/az-/i) !== null;
    var isNY09 = accountOffice.match(/ny-09/i) !== null;
    var isIL = accountOffice.match(/il-/i) !== null;

    // If it is a new installation...
    if (isNewInst) {
      // and if it's not AZ, NY-09, and IL
      if (!isNY09 && !isIL) {
        // Be outsource
        designPathString = 'OUTSOURCE';
        if (
          testDate(account[primaryDateCol]) &&
          !testDate(account[srNeededCol])
        ) {
          // Unless SR
          designPathString = 'SR';
        }
        // If it is a new install and is AZ, NY-09, or IL
      } else if (isNY09 || isIL) {
        // Be permit
        designPathString = 'PERMIT';
      } else {
        // ! there be trouble in these parts
        var errorMessage = serviceNumber + ' does not fit as a new install.';
        throw errorMessage;
      }
      // If it's any addon
    } else if (isAddon) {
      // be permit
      designPathString = 'PERMIT';
    } else {
      // ! there be trouble in these parts
      errorMessage = serviceNumber + ' does not fit in the unit type system.';
      throw errorMessage;
    }
    backlogArray[row].splice(opporTypeCol, 0, designPathString);
  }
  return backlogArray;
}

/**
 *
 * @param {Date} date
 * @return {Date}
 */
function testDate(date) {
  return date instanceof Date;
}
