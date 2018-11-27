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

    /** @type Array[] */
    var outsourceTeam2 = SpreadsheetApp.openById(
      '121UKskNpiVK2ocT8pFIx9uO6suw3o7S7C4VhiIaqzI0'
    )
      .getSheetByName('Filter Settings')
      .getRange('D82:D107')
      .getValues().filter(
        function(value) {
          return value[0] !== "";
        });

    // If the opportunity type is add-on, or the offices are az, ny-09, or il
    // Then set design path string as permit
    // All else set as outsource
    // Then set design path string as outsource
    /** @type String */
    var accountOppType = account[opporTypeCol];
    var accountOffice = account[officeCol];

    var accountAssigned = account[assignCol];

    var isAddon = accountOppType.match(/add/i) !== null;
    var isNewInst = accountOppType.match(/new/i) !== null;

    var isAZ = accountOffice.match(/az-/i) !== null;
    var isNY09 = accountOffice.match(/ny-09/i) !== null;
    var isIL = accountOffice.match(/il-/i) !== null;

    var isAustin = accountAssigned.match(/Austin Seawright/i) !== null;
    var isShaun = accountAssigned.match(/Shaun Oaks/i) !== null;

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
        // Check if Outsource Team 2
        for (var i = 0; i < outsourceTeam2.length; i++) {
          var listMember = outsourceTeam2[i][0];
          var inList = accountAssigned === listMember;
          if (inList) {
            designPathString = 'PERMIT';
          }
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
      var errorHint =
        'Please check the PERMIT BACKLOG sheet for "' +
        serviceNumber +
        '" ' +
        'and remove that row from the PERMIT BACKLOG sheet. ' +
        'This message will stay for 5 minutes.';
      SpreadsheetApp.getActiveSpreadsheet().toast(errorHint, 'Error Help', 300);
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
