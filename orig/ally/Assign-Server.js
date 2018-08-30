//**********************************************************************************************************************************************************************
// finds next account in-line, assigns designer to account, returns account designer is assigned to
//**********************************************************************************************************************************************************************
function getAssignment(designer) {
  // For checking how the designer is configured.
  console.log("Assign: " + JSON.stringify(designer));

  // Get accounts in personal Queue
  var que = myQueue(designer);
  console.log("In Que: " + que + " *****Designer***** " + JSON.stringify(designer));
  if (que.length < 1) {
    return 0;
  }

  // count how many times account is not set due to report running 
  var reportRunningCount = 0;

  // loop through each account until we assign one successfully
  for (var b in que) {
    if (que[b][1].indexOf("S-") == -1) {
      continue;
    }

    // attempt assigning account in chrono
    var pass = assign(que[b], designer);
    console.log("Que Assigning Pass: " + pass + " ACCOUNT: " + que[b] + " *****Designer***** " + JSON.stringify(designer));
    // check fail/pass for assigning account
    if (pass == -1) {
      // add count of report running on this account
      reportRunningCount++;
      // If reach over 5 accounts caught during running report return -1
      if (reportRunningCount > 5) {
        return -1;
      }
      continue;
    }
    else if (pass == 0) {
      continue;
    }
    else if (pass == 1) {
      break;
    }
  }

  if (pass !== 1) {
    console.log("Last Attempt Account Assigned: " + pass + " *****Designer***** " + JSON.stringify(designer));
    return -1;
  }

  console.log("Return Account Assigned: " + que[b] + " *****Designer***** " + JSON.stringify(designer));
  var accountInfo = {
    serviceNumber: que[b][1],
    spNumber: que[b][2],
    office: que[b][4],
    unitType: que[b][9],
    contractType: que[b][7],
    dueIn: getDueIn(que[b][6]),
    notes: que[b][13]
  };

  // Send account to time tracker
  timeTracker(accountInfo, designer);
  //"<a href='"+que[b][2].match(/=hyperlink\("([^"]+)"/i)[1]+"'/schedule' target='_blank' >"+que[b][2].match(/=hyperlink\("([^"]+)"/i)[0]+"</a>",
  return accountInfo;
}

//**********************************************************************************************************************************************************************
// find account in chrono and assign to designer
//**********************************************************************************************************************************************************************
function assign(accountInfo, designer) {
  var keyId, CHRONO_REPORT;
  // get Chrono Id for account
  keyId = getChronoId(accountInfo[0], designer.dept)[1];
  CHRONO_REPORT = SpreadsheetApp.openById(keyId).getSheetByName("Report");

  // Check for SF Name
  if (designer.sfName === "") {
    var name = designer.name;
  } else {
    name = designer.sfName;
  }

  // If chrono is running report return -1
  if (check_ChronoUpdating(CHRONO_REPORT)) {
    return -1;
  }

  //***********************************************************************************************************************
  //Finds the Service Number and marks the designers name on the Chrono Report if there is no value in the assigned column
  //***********************************************************************************************************************
  var header = CHRONO_REPORT.getRange("2:2").getValues();
  var headerCollection = {
    serviceCol: header[0].lastIndexOf("SERVICE"),
    assignedCol: header[0].indexOf("ASSIGNED"),
    statusCol: header[0].indexOf("STATUS"),
    lastUpdateCol: header[0].indexOf("LAST UPDATE"),
    initialAssignCol: header[0].indexOf("INITIAL DATE"),
    notesCol: header[0].indexOf("NOTES")
  };
  var data = CHRONO_REPORT.getRange(
    3, headerCollection.serviceCol + 1,
    CHRONO_REPORT.getLastRow(), 1)
    .getValues().filter(function (value) {
      return value[0] !== "";
    });
  for (var j in data) {
    if (accountInfo[1] == data[j][0]) {
      j = parseInt(j) + 3;
      var assignRange = CHRONO_REPORT.getRange(j, (headerCollection.assignedCol + 1));
      SpreadsheetApp.flush();
      var check = assignRange.getValue();
      if (assignRange.getValue() !== "") {
        // console.log("The attempted account has already been assigned, try again: " + accountInfo + " *****Designer***** " + JSON.stringify(designer));
        return 0;
      }

      assignRange.setValue(name);  // Column of Assigned
      SpreadsheetApp.flush();
      Utilities.sleep(800);
      var test = assignRange.getValue();
      if (test === name) {
        CHRONO_REPORT.getRange(j, (headerCollection.statusCol + 1)).setValue("In Progress");  // Column of Status
        CHRONO_REPORT.getRange(j, (headerCollection.lastUpdateCol + 1)).setValue(new Date());
        if (headerCollection.initialAssignCol !== -1)
          CHRONO_REPORT.getRange(j, (headerCollection.initialAssignCol + 1)).setValue(new Date());
        SpreadsheetApp.flush();
        return 1;
      } else {
        // console.log('The attempted account has already been assigned, try again!!');
        return 0;
      }
    }
  }
}

//**********************************************************************************************************************************************************************
// finds all accounts in que
//**********************************************************************************************************************************************************************
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
  if (designer.dept === "PP"
    && designer.team.toUpperCase() !== "OUTSOURCE"
    && check_Throttle_PP(designer)) {
    settings['OUTSOURCE'] = 0;
  }

  // Nate: Removed happy hour check for CP Teams.

  // Loop through all chrono's in settings. 
  for (var r in regions) {
    keyId = getChronoId(regions[r], designer.dept);
    if (regions[r] == "" || keyId == undefined || keyId.length < 1) {
      continue;
    }

    // get spreadsheet from id
    var ss = SpreadsheetApp.openById(keyId[1]).getSheetByName("Report");
    var range;
    // Sets the index number of each entry into it's own individual/unique variable.
    var header = ss.getRange("2:2").getValues()[0]; // Header array is first row and all columns of D2:W range in backlog report sheets. "D2:X2"
    var dueInColOffset = header.indexOf("DUE IN: (hh:mm)"); //=> header
    var headerCollection = {
      dueInCol: header.indexOf("DUE IN: (hh:mm)"), //=> header
      dueStatusCol: header.indexOf("DUE STATUS") - dueInColOffset, //=> header
      officeCol: header.indexOf("OFFICE") - dueInColOffset, //=> header
      backlogDateCol: header.indexOf("BACKLOG DATE") - dueInColOffset, //=> header
      dueDateCol: header.indexOf("DUE DATE") - dueInColOffset, //=> header
      regionCol: header.indexOf("REGION") - dueInColOffset, //=> header
      utilityCol: header.indexOf("UTILITY COMPANY") - dueInColOffset, //=> header
      unitTypeCol: header.indexOf("UNIT TYPE") - dueInColOffset, //=> header
      priorityCol: header.indexOf("PRIORITY") - dueInColOffset, //=> header
      serviceCol: header.indexOf("SERVICE") - dueInColOffset, //=> header
      spCol: header.indexOf("SOLAR PROJECT") - dueInColOffset, //=> header
      assignedCol: header.indexOf("ASSIGNED") - dueInColOffset, //=> header
      notesCol: header.indexOf("NOTES") - dueInColOffset, //=> header
      statusCol: header.indexOf("STATUS") - dueInColOffset, //=> header
      lastUpdateCol: header.indexOf("LAST UPDATE") - dueInColOffset, //=> header
      redesignCol: header.indexOf("REDESIGN ASSIGNMENT") - dueInColOffset, //=> header
      percentCol: header.indexOf("PERCENT") - dueInColOffset //=> header
    };

    // Get Redesigns originally designed by designer for PERMIT
    //    if(designer.dept === "PP" && designer.team.toUpperCase() !== "OUTSOURCE") {
    //      
    //      ss.getRange(3, dueInCol+1, ss.getLastRow(), redesignCol+1).getValues().filter(function(value) {  // "D3:X"
    //        var check1 = value[serviceCol];
    //        var check2 = value[assignedCol];
    //        var check3 = value[notesCol];
    //        var check4 = value[redesignCol];
    //        if(check4 != "")
    //          var x = 0;
    //        if(value[serviceCol] !== "" && value[assignedCol] === "" && (value[redesignCol].indexOf(designer.name) > -1 || value[redesignCol].indexOf(designer.sfName) > -1)) {
    //          value.splice(0, regionCol);
    //          redesigns.push(value);
    //        }
    //      });
    //    }

    var lastCol = ss.getLastColumn() - headerCollection.dueInCol;
    range = ss.getRange(3, headerCollection.dueInCol + 1, ss.getLastRow(), lastCol);

    // Get backlog and filter accounts that pass
    range.getValues().filter(function (value, index) {
      // if the service number exists and...
      // if the service number isn't assigned and...
      // if settings unitType is not 0 and...
      // if name of designer is not in status column as Unassigned
      if (value[headerCollection.serviceCol] !== ""
        && value[headerCollection.assignedCol] === ""
        && settings[value[headerCollection.unitTypeCol]]
        && value[headerCollection.statusCol].indexOf(designer.name) === -1) {
        // Filter in or out the filterRegions
        if (filterRegions.exclude || filterRegions.include) {
          var inculdedBool = filterRegions.includeOffices.some(function (office, index) {
            return value[headerCollection.officeCol].toLowerCase().indexOf(office.toString().toLowerCase()) > -1
              || value[headerCollection.utilityCol].toLowerCase() === office.toString().toLowerCase();
          });
          var excludedBool = filterRegions.excludeOffices.some(function (office, index) {
            return value[headerCollection.officeCol].toLowerCase().indexOf(office.toString().toLowerCase()) > -1
              || value[headerCollection.utilityCol].toLowerCase() === office.toString().toLowerCase();
          });
          if (filterRegions.include) {
            if (!inculdedBool) {
              return false;
            }
            else if (excludedBool) {
              return false;
            }
          }
          else if (excludedBool) {
            return false;
          }
        }
        // Nate: Removed CP OUTSOURCE check as it's not needed anymore.
        // If PP Outsource team and account SR NEEDED or priority
        if (designer.team.toUpperCase() === "OUTSOURCE"
          && designer.dept === "PP"
          && value[headerCollection.priorityCol] !== "") {
          return false;
        }
        // PERMIT Redesign ownership
        // If name is no longer assigned to orignal designer or set as priority add to que
        // if (designer.dept == "PP"
        //   && designer.team.toUpperCase() !== "OUTSOURCE"
        //   && (value[unitTypeCol].match(/permit rd/i)
        //     || value[unitTypeCol].match(/de rd/i))
        //   && !(value[redesignCol] === ""
        //     || value[redesignCol] === "-"
        //     || value[priorityCol].toLowerCase().indexOf("priority") > -1)) {
        //   return false;
        // }

        // Nate: Removed happy hour stuff because it was CP only.
        // Add to Dealer backlog if dealer account
        if (regions[r].match(/dealer/i)) {
          dealerBacklog.push(value);
        }
        // remove unneeded/repeated columns
        // From the start of the array up to the region column
        value.splice(0, headerCollection.regionCol);
        backlog.push(value);

        // Get SP link
        // var SPNum = ss.getRange(index + 3, spCol + 4).getFormula();
        // if (SPNum.match(/=hyperlink\("([^"]+)"/i)) {
        //   value[spCol] = SPNum;
        // }
      } else {
        var debuggingcheck1 = value[headerCollection.serviceCol];
        var debuggingcheck2 = value[headerCollection.assignedCol];
        var debuggingcheck3 = settings;
        var debuggingcheck4 = value[headerCollection.statusCol];
        console.log({
          "Service Number": debuggingcheck1,
          "Assignee": debuggingcheck2,
          "Weird": debuggingcheck3,
          "Status": debuggingcheck4
        });
      }
    });
  }
  // sort to for PP outsource
  var regionColOffset = headerCollection.regionCol;
  if (designer.dept === "PP" && designer.team.toUpperCase() === "OUTSOURCE") {
    backlog = sortPPOutsourceBacklog(
      backlog,
      headerCollection.priorityCol - regionColOffset,
      headerCollection.backlogDateCol - regionColOffset,
      headerCollection.dueDateCol - regionColOffset,
      headerCollection.unitTypeCol - regionColOffset,
      headerCollection.percentCol - regionColOffset,
      settings
    );
  } else {
    // sort to by priority first then unit type then oldest account
    backlog = sortBacklog(
      backlog,
      headerCollection.priorityCol - regionColOffset,
      headerCollection.backlogDateCol - regionColOffset,
      headerCollection.dueDateCol - regionColOffset,
      headerCollection.unitTypeCol - regionColOffset,
      settings
    );
  }

  // Nate: Removed Happy Hour due to CP only.
  // Nate: Removed Dealer due to CP only.

  // check redesigns are empty
  // if (redesigns !== undefined && redesigns !== null && redesigns.length > 0) {
  //   // sort to by priority first then unit type then oldest account
  //   redesigns = sortBacklog(
  //     redesigns,
  //     priorityCol - regionCol,
  //     backlogDateCol - regionCol,
  //     dueDateCol - regionCol,
  //     unitTypeCol - regionCol,
  //     settings
  //   );
  //   for (var row = redesigns.length - 1; row >= 0; row--) {
  //     backlog.unshift(redesigns[row]);
  //   }
  // }

  // console.log("My Que: " + backlog);
  return backlog;
}


//**********************************************************************************************************************************************************************
// Sort backlog
//**********************************************************************************************************************************************************************
function sortBacklog(backlog, priorityCol, backlogDateCol, dueDateCol, unitTypeCol, settings) {

  // sort to by priority first then oldest account
  backlog.sort(function (a, b) {
    var check1 = a[dueDateCol];
    var check2 = b[dueDateCol];
    var test = a[dueDateCol] - b[dueDateCol];

    if ((a[priorityCol] != '' || b[priorityCol] != '') && a[priorityCol] !== b[priorityCol]) {
      var x = a[priorityCol].toLowerCase(), y = b[priorityCol].toLowerCase();
      var test = x > y;
      if (a[priorityCol] !== '' && b[priorityCol] !== '')
        return y < x ? 1 : y > x ? -1 : 0;
      return x < y ? 1 : x > y ? -1 : 0;
    }
    if (a[unitTypeCol] !== b[unitTypeCol] && settings[a[unitTypeCol]] !== settings[b[unitTypeCol]]) {
      return settings[b[unitTypeCol]] - settings[a[unitTypeCol]];
    }

    if (a[dueDateCol] !== b[dueDateCol]) {
      return a[dueDateCol] - b[dueDateCol]
    }

    return b[backlogDateCol] - a[backlogDateCol];

  });

  return backlog;
}

//**********************************************************************************************************************************************************************
// sort backlog for pp outsource including the percent to even distribution
//**********************************************************************************************************************************************************************
function sortPPOutsourceBacklog(backlog, priorityCol, backlogDateCol, dueDateCol, unitTypeCol, percentCol, settings) {
  // sort to by priority first then oldest account
  backlog.sort(function (a, b) {
    var check1 = a[dueDateCol];
    var check2 = b[dueDateCol];
    var test = a[dueDateCol] - b[dueDateCol];

    if (a[percentCol] !== b[percentCol]) {
      return b[percentCol] - a[percentCol];
    }

    if ((a[priorityCol] != '' || b[priorityCol] != '') && a[priorityCol] !== b[priorityCol]) {
      var x = a[priorityCol].toLowerCase(), y = b[priorityCol].toLowerCase();
      var test = x > y;
      if (a[priorityCol] !== '' && b[priorityCol] !== '')
        return y < x ? 1 : y > x ? -1 : 0;
      return x < y ? 1 : x > y ? -1 : 0;
    }
    if (a[unitTypeCol] !== b[unitTypeCol] && settings[a[unitTypeCol]] !== settings[b[unitTypeCol]]) {
      return settings[b[unitTypeCol]] - settings[a[unitTypeCol]];
    }

    if (a[dueDateCol] !== b[dueDateCol]) {
      return a[dueDateCol] - b[dueDateCol];
    }

    return b[backlogDateCol] - a[backlogDateCol];

  });

  return backlog;
}

//**********************************************************************************************************************************************************************
// find account in chrono and assign to designer
//**********************************************************************************************************************************************************************
function getChronoId(chrono, dept) {
  if (dept === "CP") {
    var chronoIds = cpChronoIds;
  }
  else {
    var chronoIds = ppChronoIds;
  }
  var keyId = chronoIds.filter(function (office) { return office[0].toUpperCase() == chrono.toUpperCase() });
  return keyId[0];
}



//**********************************************************************************************************************************************************************
// find account in chrono and assign to designer
//**********************************************************************************************************************************************************************
function check_ChronoUpdating(CHRONO_REPORT) {
  if (CHRONO_REPORT.getRange('G1').getValue() !== "") {
    //        alert('The Chrono Report is currently being updated, try again in a minute!');
    return -1;
  }
}


//**********************************************************************************************************************************************************************
// See if time now is during happy hour settings
//**********************************************************************************************************************************************************************
function check_Happy_Hour(designer) {
  // Get the left over number of accounts available
  var deptReport = SpreadsheetApp.openById("13NS3RBEC18NZXv-3KLKYE8pW4GCfQKE-vtvsDnrLdO0");
  var off = "ON" !== deptReport.getSheetByName("Analysis").getRange("C20").getValue().toUpperCase();
  var now = new Date();
  //  now.setHours(8,00,00);
  // If not between the hours set, return 0 to not filter
  if (off || now.getHours() < 7 || now.getHours() >= 18) {
    return false;
  }
  var east = ["NJ-", "NY-", "PA-", "FL-", "MD-", "SC-", "VA-", "CT-", "MA-", "NH-", "RI-", "VT-"];
  var west = ["CA-", "AZ-", "CO-", "HI-", "NM-", "NV-", "TX-", "UT-"];
  var remove = [];
  if (designer.team.toUpperCase() === "OUTSOURCE") {
    //2:15
    if (now.getHours() < 12 || now.getHours() > 16 || (now.getHours() === 16 && now.getMinutes() > 15)) {
      remove = west;
    } else {
      remove = east;
    }
  } else {
    if (now.getHours() < 16 || (now.getHours() === 16 && now.getMinutes() <= 15)) {
      remove = west;
    } else {
      remove = east;
    }
  }

  // add regions to exclude on other time zone
  designer.filterRegions.happyHour = remove;
  return true;
}

//**********************************************************************************************************************************************************************
// See if OTS acocunts available in CP chrono
//**********************************************************************************************************************************************************************
function check_Throttle_CP() {
  // Get the left over number of accounts available
  var deptReport = SpreadsheetApp.openById("1Y5BOKyCE2DD0UFQWrfki6gOVAc1WKCgICC96jVglKYg");
  var off = deptReport.getSheetByName("Analysis").getRange("B16").getValue().toLowerCase() == "off";
  if (off)
    return 1;
  var projection = deptReport.getSheetByName("Analysis").getRange("C18").getValue();

  return projection <= 0;
}


//**********************************************************************************************************************************************************************
// see if OTS accounts available in PP Chrono
//**********************************************************************************************************************************************************************
function check_Throttle_PP(designer) {
  //check if single metric designer
  if (designer.singleMetric) {
    return false;
  }
  // Get the left over number of accounts available
  var deptReport = SpreadsheetApp.openById("1JrzvzUQpag3l1d-uXlt_qe_TAu5rlZCbQi4jrBxRqvo");
  var off = deptReport.getSheetByName("Analysis").getRange("B16").getValue().toLowerCase() == "off";
  if (off) {
    return 1;
  }
  var projection = deptReport.getSheetByName("Analysis").getRange("C18").getValue();

  return projection < 0;
}

//**********************************************************************************************************************************************************************
// get the time deifference from now and date in hours : minutes
//**********************************************************************************************************************************************************************
function getDueIn(dueDate) {
  var now = Date.now();
  var dueIn = now - dueDate;
  var diffHrs = Math.floor((dueIn % 86400000) / 3600000); // hours
  var diffMins = Math.round(((dueIn % 86400000) % 3600000) / 60000); // minutes
  return diffHrs + ":" + diffMins;
}

function debugGetAssignment() {
  var designer = {
    dept: "PP",
    email: "nathan.casados@vivintsolar.com",
    filterRegions: {
      exclude: false,
      excludeOffices: [],
      include: false,
      includeOffices: [],
    },
    master: false,
    name: "Nathan Casados",
    regions: ["PERMIT"],
    settings: {
      "CP MATCH": "",
      "DE RD": null,
      "OUTSOUCE": 0,
      "PERMIT": "",
      "PERMIT RD": ""
    },
    sfName: "Nathan Casados (200354)",
    team: "Outsource",
  };
  getAssignment(designer);
}