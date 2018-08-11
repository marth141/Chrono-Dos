/**
 * @param {Array} backlogArray
 * @return {Array} backlogArray
 */
function pp_UnitTypeMarker(backlogArray) {
  var columns = {
    officeCol: getMeThatColumn(
      'Service: Regional Operating Center',
      backlogArray
    ),
    opporTypeCol: getMeThatColumn('Opportunity: Type', backlogArray),
    dueDateCol: getMeThatColumn('DUE DATE', backlogArray),
    assignCol: undgetMeThatColumn(
      'Phase: PV Design Completed By',
      backlogArray
    ),
    primaryDateCol: getMeThatColumn(
      'Primary CAD: Permit Packet QA Completed',
      backlogArray
    ),
    srNeededCol: getMeThatColumn(
      'Phase: Structural Review Completed',
      backlogArray
    )
  };

  backlogArray = pp_MarkUnits(backlogArray, columns);
  return backlogArray;
}

/**
 * @param {Array} backlogArray
 * @param {Object} columns
 * @return {Array} backlogArray
 */
function pp_MarkUnits(backlogArray, columns) {
  var {
    officeCol,
    opporTypeCol,
    dueDateCol,
    assignCol,
    primaryDateCol,
    srNeededCol
  } = columns;
  var backlogArrayHeaders = backlogArray[0];

  // Add Unit Type Column before Opportunity Type Column
  backlogArrayHeaders.splice(opporTypeCol, 0, 'UNIT TYPE');
  var designPathString;
  for (var row = 1; row < backlogArray.length; row++) {
    var account = backlogArray[row];

    /**
     * * Description of upcoming block *
     * Checks account unit type for
     * add-on, or arizona, or ny-09,
     * or illinois, or ca-02.
     *
     * If it is any of that,
     * designPathString will be permit.
     *
     * If it is a new installation,
     * designPathString will be outsource.
     * The outsource may become SR if it qualifies.
     *
     * Duggers are added for convenience.
     */
    if (
      account[opporTypeCol].match(/add/i) ||
      account[officeCol].match(/az-/i) ||
      account[officeCol].match(/ny-09/i) ||
      account[officeCol].match(/il-/i) ||
      account[officeCol].match(/ca-02/i)
    ) {
      designPathString = 'PERMIT';

      /**
       * !For debugging service number in permit
       */
      if (account[0].match(/S-5958052/)) {
        console.error('Here it is @ Permit!');
        console.info(account);
      }
    } else if (account[opporTypeCol].match(/new/i)) {
      designPathString = 'OUTSOURCE';

      /**
       * Test if outsource should be SR
       */
      if (
        testDate(account[primaryDateCol]) &&
        !testDate(account[srNeededCol])
      ) {
        designPathString = 'SR';

        /**
         * !For debugging service number in SR
         */
        if (account[0].match(/S-5958052/)) {
          console.error('Here it is @ SR!');
          console.info(account);
        }
      }

      /**
       * !For debugging if outsource is actually addon
       * !Will email Nathan Casados if so.
       */
      if (account[opporTypeCol].match(/add/i)) {
        console.error('Add-on passed into Outsource');
        console.error(account);
        MailApp.sendEmail(
          'nathan.casados@vivintsolar.com',
          'Chrono Error found - Add-on passed to Outsource',
          account + '\r\nWas found being passed to outsource in error.'
        );
        var unitTypeMarkingError =
          'Add-on becoming outsource. Please report this issue.';
        throw unitTypeMarkingError;
      }
    }
    account.splice(opporTypeCol, 0, designPathString);
  }
  return backlogArray;
}

/**
 * @param {Date} date
 * @return {Boolean} result
 */
function testDate(date) {
  var result = date instanceof Date;
  return result;
}
