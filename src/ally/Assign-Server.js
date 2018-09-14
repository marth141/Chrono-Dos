/**
 * finds next account in-line, assigns designer to account, returns account designer is assigned to
 * @param {*} designer
 * @return {*}
 */
function getAssignment(designer) {
  // For checking how the designer is configured.
  console.log('Assign: ' + JSON.stringify(designer));

  // Get accounts in personal Queue
  var que = myQueue(designer);
  console.log('In Que: ' + que + ' *****Designer***** ' + JSON.stringify(designer));
  if (que.length < 1) {
    return 0;
  }

  // count how many times account is not set due to report running
  var reportRunningCount = 0;

  // loop through each account until we assign one successfully
  for (var b in que) {
    if (que[b][1].indexOf('S-') == -1) {
      continue;
    }

    // attempt assigning account in chrono
    var pass = assign(que[b], designer);
    console.log(
      'Que Assigning Pass: ' +
        pass +
        ' ACCOUNT: ' +
        que[b] +
        ' *****Designer***** ' +
        JSON.stringify(designer)
    );
    // check fail/pass for assigning account
    if (pass == -1) {
      // add count of report running on this account
      reportRunningCount++;
      // If reach over 5 accounts caught during running report return -1
      if (reportRunningCount > 5) {
        return -1;
      }
      continue;
    } else if (pass == 0) {
      continue;
    } else if (pass == 1) {
      break;
    }
  }

  if (pass !== 1) {
    console.log(
      'Last Attempt Account Assigned: ' + pass + ' *****Designer***** ' + JSON.stringify(designer)
    );
    return -1;
  }

  console.log(
    'Return Account Assigned: ' + que[b] + ' *****Designer***** ' + JSON.stringify(designer)
  );
  var accountInfo = {
    'serviceNumber': que[b][1],
    'spNumber': que[b][2],
    'office': que[b][4],
    'unitType': que[b][9],
    'contractType': que[b][7],
    'dueIn': getDueIn(que[b][6]),
    'mercury':
      '<a href=\'https://mercury.vivintsolar.com/#!/account/' +
      this.serviceNumber +
      '/schedule\' target=\'_blank\'>Mercury</a>',
    'notes': que[b][13]
  };

  // Send account to time tracker
  timeTracker(accountInfo, designer);
  return accountInfo;
}

/**
 * find account in chrono and assign to designer
 * @param {*} accountInfo
 * @param {*} designer
 * @return {*}
 */
function assign(accountInfo, designer) {
  var keyId, CHRONO_REPORT;
  // get Chrono Id for account
  keyId = getChronoId(accountInfo[0], designer.dept)[1];
  CHRONO_REPORT = SpreadsheetApp.openById(keyId).getSheetByName('Report');

  // Check for SF Name
  if (designer.sfName === '') {
    var name = designer.name;
  } else {
    name = designer.sfName;
  }

  // If chrono is running report return -1
  if (check_ChronoUpdating(CHRONO_REPORT)) {
    return -1;
  }

  // Finds the Service Number and marks the designers name on the Chrono Report
  // if there is no value in the assigned column
  var header = CHRONO_REPORT.getRange('2:2').getValues();
  var headerCollection = {
    'serviceCol': header[0].lastIndexOf('SERVICE'),
    'assignedCol': header[0].indexOf('ASSIGNED'),
    'statusCol': header[0].indexOf('STATUS'),
    'lastUpdateCol': header[0].indexOf('LAST UPDATE'),
    'initialAssignCol': header[0].indexOf('INITIAL DATE'),
    'notesCol': header[0].indexOf('NOTES')
  };
  var data = CHRONO_REPORT.getRange(
    3,
    headerCollection.serviceCol + 1,
    CHRONO_REPORT.getLastRow(),
    1
  )
    .getValues()
    .filter(function(value) {
      return value[0] !== '';
    });
  for (var j in data) {
    if (accountInfo[1] == data[j][0]) {
      j = parseInt(j) + 3;
      var assignRange = CHRONO_REPORT.getRange(j, headerCollection.assignedCol + 1);
      SpreadsheetApp.flush();
      var check = assignRange.getValue();
      if (assignRange.getValue() !== '') {
        return 0;
      }

      assignRange.setValue(name); // Column of Assigned
      SpreadsheetApp.flush();
      Utilities.sleep(800);
      var test = assignRange.getValue();
      if (test === name) {
        // Column of Status
        CHRONO_REPORT.getRange(j, headerCollection.statusCol + 1).setValue('In Progress');

        CHRONO_REPORT.getRange(j, headerCollection.lastUpdateCol + 1).setValue(new Date());
        if (headerCollection.initialAssignCol !== -1) {
          CHRONO_REPORT.getRange(j, headerCollection.initialAssignCol + 1).setValue(new Date());
          SpreadsheetApp.flush();
          return 1;
        }
      } else {
        // console.log('The attempted account has already been assigned, try again!!');
        return 0;
      }
    }
  }
}

/**
 * Finds all accounts in queue
 * @param {*} designer
 * @return {*}
 */
function myQueue(designer) {
  //  console.log("Settings: "+ designer.settings);
  var backlog = [],
    redesigns = [],
    dealerBacklog = [],
    keyId,
    settings = designer.settings,
    filterRegions = designer.filterRegions,
    regions = designer.regions;

  // If not Outsource, and no accounts are left over from Outsource que projection
  // Set OTS unit types to zero so they don't get assigned out
  // Nate: Removed CP OUTSOURCE check because no longer necessary. CP is on QTask.
  if (
    designer.dept === 'PP' &&
    designer.team.toUpperCase() !== 'OUTSOURCE' &&
    check_Throttle_PP(designer)
  ) {
    settings['OUTSOURCE'] = 0;
  }

  // Nate: Removed happy hour check for CP Teams.

  // Loop through all chrono's in settings.
  for (var r in regions) {
    keyId = getChronoId(regions[r], designer.dept);
    if (regions[r] == '' || keyId == undefined || keyId.length < 1) {
      continue;
    }

    // get spreadsheet from id
    var ss = SpreadsheetApp.openById(keyId[1]).getSheetByName('Report');
    var range;
    // Sets the index number of each entry into it's own individual/unique variable.
    // Header array is first row and all columns of D2:W range in backlog report sheets. "D2:X2"
    var header = ss.getRange('2:2').getValues()[0];
    var dueInColOffset = header.indexOf('DUE IN: (hh:mm)'); // => header
    var hc = new HeaderCollection(header, dueInColOffset);

    var lastCol = ss.getLastColumn() - hc.dueInCol;
    range = ss.getRange(3, hc.dueInCol + 1, ss.getLastRow(), lastCol);

    // Get backlog and filter accounts that pass
    range.getValues().filter(function(value, index) {
      // if the service number exists and...
      // if the service number isn't assigned and...
      // if settings unitType is not 0 and...
      // if name of designer is not in status column as Unassigned
      if (
        value[hc.serviceCol] !== '' &&
        value[hc.assignedCol] === '' &&
        settings[value[hc.unitTypeCol]] &&
        value[hc.statusCol].indexOf(designer.name) === -1
      ) {
        // Filter in or out the filterRegions
        if (filterRegions.exclude || filterRegions.include) {
          var inculdedBool = filterRegions.includeOffices.some(function(office, index) {
            return (
              value[hc.officeCol].toLowerCase().indexOf(office.toString().toLowerCase()) > -1 ||
              value[hc.utilityCol].toLowerCase() === office.toString().toLowerCase()
            );
          });
          var excludedBool = filterRegions.excludeOffices.some(function(office, index) {
            return (
              value[hc.officeCol].toLowerCase().indexOf(office.toString().toLowerCase()) > -1 ||
              value[hc.utilityCol].toLowerCase() === office.toString().toLowerCase()
            );
          });
          if (filterRegions.include) {
            if (!inculdedBool) {
              return false;
            } else if (excludedBool) {
              return false;
            }
          } else if (excludedBool) {
            return false;
          }
        }
        // Nate: Removed CP OUTSOURCE check as it's not needed anymore.
        // If PP Outsource team and account SR NEEDED or priority
        if (
          designer.team.toUpperCase() === 'OUTSOURCE' &&
          designer.dept === 'PP' &&
          value[hc.priorityCol] !== ''
        ) {
          return false;
        }

        // Nate: Removed happy hour stuff because it was CP only.
        // Add to Dealer backlog if dealer account
        if (regions[r].match(/dealer/i)) {
          dealerBacklog.push(value);
        }
        // remove unneeded/repeated columns
        // From the start of the array up to the region column
        value.splice(0, hc.regionCol);
        backlog.push(value);
      } else {
        var debuggingcheck1 = value[hc.serviceCol];
        var debuggingcheck2 = value[hc.assignedCol];
        var debuggingcheck3 = settings;
        var debuggingcheck4 = value[hc.statusCol];
        console.log({
          'Service Number': debuggingcheck1,
          'Assignee': debuggingcheck2,
          'Weird': debuggingcheck3,
          'Status': debuggingcheck4
        });
      }
    });
  }

  // console.log("My Que: " + backlog);
  return backlog;
}

/**
 * find account in chrono and assign to designer
 * @param {*} chrono
 * @param {*} dept
 * @return {*}
 */
function getChronoId(chrono, dept) {
  if (dept === 'CP') {
    var chronoIds = cpChronoIds;
  } else {
    var chronoIds = ppChronoIds;
  }
  var keyId = chronoIds.filter(function(office) {
    return office[0].toUpperCase() == chrono.toUpperCase();
  });
  return keyId[0];
}

/**
 * Checks if chrono is updating
 * @param {*} CHRONO_REPORT
 * @return {*}
 */
function check_ChronoUpdating(CHRONO_REPORT) {
  if (CHRONO_REPORT.getRange('G1').getValue() !== '') {
    //        alert('The Chrono Report is currently being updated, try again in a minute!');
    return -1;
  }
}

/**
 * see if OTS accounts available in PP Chrono
 * @param {*} designer
 * @return {*}
 */
function check_Throttle_PP(designer) {
  // check if single metric designer
  if (designer.singleMetric) {
    return false;
  }
  // Get the left over number of accounts available
  var deptReport = SpreadsheetApp.openById('1JrzvzUQpag3l1d-uXlt_qe_TAu5rlZCbQi4jrBxRqvo');
  var off =
    deptReport
      .getSheetByName('Analysis')
      .getRange('B16')
      .getValue()
      .toLowerCase() == 'off';
  if (off) {
    return 1;
  }
  var projection = deptReport
    .getSheetByName('Analysis')
    .getRange('C18')
    .getValue();

  return projection < 0;
}

/**
 * get the time deifference from now and date in hours : minutes
 * @param {*} dueDate
 * @return {*}
 */
function getDueIn(dueDate) {
  var now = Date.now();
  var dueIn = now - dueDate;
  var diffHrs = Math.floor((dueIn % 86400000) / 3600000); // hours
  var diffMins = Math.round(((dueIn % 86400000) % 3600000) / 60000); // minutes
  return diffHrs + ':' + diffMins;
}

/**
 * Used to debug since code is dependant on values gotten from webpage
 */
function debugGetAssignment() {
  var designer = {
    'dept': 'PP',
    'email': 'nathan.casados@vivintsolar.com',
    'filterRegions': {
      'exclude': false,
      'excludeOffices': [],
      'include': false,
      'includeOffices': []
    },
    'master': false,
    'name': 'Nathan Casados',
    'regions': ['PERMIT'],
    'settings': {
      'CP MATCH': 0,
      'DE RD': 0,
      'OTS': null,
      'OUTSOUCE': 1,
      'PERMIT': 0,
      'PERMIT RD': 0
    },
    'sfName': 'Nathan Casados (200354)',
    'team': 'PP'
  };
  getAssignment(designer);
}
