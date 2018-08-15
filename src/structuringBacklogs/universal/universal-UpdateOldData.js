/**
 *
 * @param {GoogleAppsScript.Spreadsheet.Sheet} FilterSettings
 * @param {Array[]} backlogArray
 * @param {Array[]} oldData
 * @return {Array[]}
 */
function uni_UpdateOldData(FilterSettings, backlogArray, oldData) {
  var columns = new UpdateDataColumns(backlogArray);

  var updatedBacklog = replaceOldInfo(
    FilterSettings,
    backlogArray,
    oldData,
    columns
  );
  return updatedBacklog;
}

/**
 *
 * @param {GoogleAppsScript.Spreadsheet.Sheet} FilterSettings
 * @param {Array[]} incomingBacklog
 * @param {Array[]} liveBacklog
 * @param {UpdateDataColumns} columns
 * @return {*}
 */
function replaceOldInfo(FilterSettings, incomingBacklog, liveBacklog, columns) {
  var checkServiceNumber = 'S-5954011';
  // Remove all indexes in removeValFromIndex from each row
  for (var liveIndex = 0; liveIndex < liveBacklog.length; liveIndex++) {
    for (
      var incomingIndex = 0;
      incomingIndex < incomingBacklog.length;
      incomingIndex++
    ) {
      var liveAccount = new AccountRecord(liveBacklog, liveIndex, columns);
      var incomingUpdate = new AccountRecord(
        incomingBacklog,
        incomingIndex,
        columns
      );
      var serviceNumbersMatch = checkServiceNumbersMatch(
        liveAccount.serviceNumber,
        incomingUpdate.serviceNumber
      );
      var unitTypesMatch = checkUnitTypeMatch(
        liveAccount.unitType,
        incomingUpdate.unitType
      );
      var incomingIsAssigned = checkSRAssigned(
        incomingUpdate.unitType,
        incomingUpdate.assigned,
        FilterSettings
      );
      var liveIsAssigned = checkSRAssigned(
        incomingUpdate.unitType,
        liveAccount.assigned,
        FilterSettings
      );
      var priorityMismatchAndLiveNotBlank = checkMismatchAndNotBlank(
        liveAccount.priority,
        incomingUpdate.priority
      );
      var assignedInLive_NotInIncoming = checkAssigned(
        liveAccount.assigned,
        incomingUpdate.assigned
      );

      /**
       * If service number's are the
       * same and unit types match
       */
      if (serviceNumbersMatch) {
        var liveUnitTypeNotBlank = liveAccount.unitType !== '';
        if (unitTypesMatch) {
          var incomingUpdateIsNotSR = incomingUpdate.unitType !== 'SR';
          if (incomingUpdateIsNotSR) {
            incomingUpdate.unitType = liveAccount.unitType;
          }
        } else if (liveUnitTypeNotBlank && !unitTypesMatch) {
          continue;
        }
        // Set incoming account backlog date to existing backlog date
        incomingUpdate.backlogDate = liveAccount.backlogDate;
        // Set incoming account due date to existing due date
        incomingUpdate.dueDate = liveAccount.dueDate;
        // Set incoming notes to existing notes
        incomingUpdate.notes = liveAccount.notes;
        // set incoming last update date to existing last update date
        incomingUpdate.lastUpdate = liveAccount.lastUpdate;
        // set incoming initial update date to existing initial update date
        incomingUpdate.initialUpdate = liveAccount.initialUpdate;

        if (priorityMismatchAndLiveNotBlank) {
          // Set incoming priority to existing priority
          incomingUpdate.priority = liveAccount.priority;
        }

        if (incomingIsAssigned) {
          if (liveIsAssigned) {
            incomingUpdate.assigned = '';
            incomingUpdate.status = '';
            incomingUpdate.initialUpdate = '';
            liveAccount.status = '';
            liveAccount.initialUpdate = '';
          } else {
            incomingUpdate.assigned = liveAccount.assigned;
          }
        } else if (assignedInLive_NotInIncoming) {
          /**
           * If incoming has no assignee but live does
           * set the incoming assignee as the live assignee
           */
          incomingUpdate.assigned = liveAccount.assigned;
        }

        var statusMismatchAndLiveNotBlank = checkMismatchAndNotBlank(
          liveAccount.status,
          incomingUpdate.status
        );
        if (statusMismatchAndLiveNotBlank) {
          // Set incoming update status to live status
          incomingUpdate.status = liveAccount.status;
        }
      } else {
        /**
         * ! If service number's are not the same
         * ! the else will be skipped
         */
        continue;
      } // End of matching service number jobs
    } // End of incoming account for loop
  } // End of live account for loop
  return incomingBacklog;
}

/**
 *
 * @param {String} oldServiceNumber
 * @param {String} currentServiceNumber
 * @return {Boolean} service numbers match
 */
function checkServiceNumbersMatch(oldServiceNumber, currentServiceNumber) {
  var result = oldServiceNumber === currentServiceNumber;
  return result;
}

/**
 *
 * @param {String} oldUnitType
 * @param {String} incomingUnitType
 * @return {Boolean}
 */
function checkUnitTypeMatch(oldUnitType, incomingUnitType) {
  if (incomingUnitType === 'SR' && (oldUnitType !== 'PERMIT RD' || 'DE RD')) {
    return true;
  } else {
    // Checks if unit type is not permit
    var falseTerms = ['PERMIT RD', 'DE RD', 'CP MATCH', 'SR'];
    var currentSomeResult = falseTerms.some(function(term) {
      return incomingUnitType.indexOf(term) > -1;
    });
    var oldSomeResult = falseTerms.some(function(term) {
      var termIsFalse = oldUnitType.indexOf(term) > -1;
      return oldUnitType.indexOf(term) > -1;
    });
    var unitTypePermitBool =
      oldUnitType !== incomingUnitType &&
      oldUnitType !== '' &&
      !(currentSomeResult || oldSomeResult);
    return unitTypePermitBool;
  }
}

/**
 *
 * @param {String} liveAssignment
 * @param {String} incomingAssignment
 * @return {Boolean}
 */
function checkAssigned(liveAssignment, incomingAssignment) {
  var result = liveAssignment !== '' && incomingAssignment === '';
  return result;
}

/**
 * Checks if account is assigned
 * @param {String} unitType
 * @param {String} assigned
 * @param {GoogleAppsScript.Spreadsheet.Sheet} FilterSettings
 * @return {*}
 */
function checkSRAssigned(unitType, assigned, FilterSettings) {
  if (unitType === 'SR') {
    var foundDesigner = getUsers(FilterSettings).some(function(designer) {
      var name = designer[0],
        email = designer[1],
        sfName = designer[2];
      return name === assigned || sfName === assigned;
    });
    if (!foundDesigner) {
      return true;
    }
  }
}

/**
 * Checks that the live and incoming status
 * do not match and that the live status
 * is not blank
 * @param {String} notBlankMatch
 * @param {String} match
 * @return {Boolean}
 */
function checkMismatchAndNotBlank(notBlankMatch, match) {
  var result = notBlankMatch !== match && notBlankMatch !== '';
  return result;
}

/**
 * ! For Debugging
 * if (
 *   checkServiceNumber === backlogArray[salesForceAccount][serviceCol]
 * ) {
 *   console.error('Here it is @ update start!');
 *   console.log(backlogArray[salesForceAccount]);
 *   console.log(backlogArray[oldDataAccount]);
 * }
 */
