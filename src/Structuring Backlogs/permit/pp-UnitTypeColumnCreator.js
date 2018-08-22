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
    var account = backlogArray[row];
    if ('S-5920785' === backlogArray[row][0]) {
      var x = 0;
    }

    // If the opportunity type is add-on, or the offices are az, ny-09, or il
    // Then set design path string as permit
    // All else set as outsource
    // Then set design path string as outsource
    /** @type String */
    var accountOppType = backlogArray[row][opporTypeCol];
    var accountOffice = backlogArray[row][officeCol];

    if (account[0].match(/S-5967276/i)) {
      var isAddon = accountOppType.match(/add/i) !== null;
      var isNewInst = accountOppType.match(/new/i) !== null;
      var isAZ = accountOffice.match(/az-/i) !== null;
      var isNY09 = accountOffice.match(/ny-09/i) !== null;
      var isIL = accountOffice.match(/il-/i) !== null;
      // debugger;
    }
    if (isAddon && (isAZ === true || isNY09 === true || isIL === true)) {
      // For debugging a specific service number.
      if (backlogArray[row][0].match(/S-5967276/)) {
        console.error('Here it is @ Permit!');
        var errorAccount = backlogArray[row];
        debugger;
      }

      designPathString = 'PERMIT';
    } else if (
      isNewInst &&
      (isAZ === false && isNY09 === false && isIL === false)
    ) {
      // For debugging a specific service number.
      if (backlogArray[row][0].match(/S-5967276/)) {
        console.error('Here it is @ Outsource!');
        var errorAccount = backlogArray[row];
        debugger;
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
 * @return {Date}
 */
function testDate(date) {
  return date instanceof Date;
}
