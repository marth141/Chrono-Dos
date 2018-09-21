/**
 * A function that runs on spreadsheet open
 */
function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var menu = [
    { name: 'Refresh Queue', functionName: 'refreshQueue' },
    { name: 'Clear Tabs', functionName: 'clearTabs' }
  ];
  ss.addMenu('SCRIPTS', menu);
}

/**
 * Used to get accounts
 * @param {*} ss
 */
function getAccounts(ss) {
  var RP = ss.getSheetByName('Report');
  var backlog = ss.getSheetByName('Backlog');
  // var nonFullProcess = ss.getSheetByName("Non Full Process");

  // Check each tab to assure the backlog reports have been pasted in
  if (backlog.getRange('C2').getValue() == '') {
    Browser.msgBox(
      'Please input the backlog report in its respective tab. ' +
        '(Cell C2 in the tab should not be left blank after pasting in the reports)'
    );
    return;
  }
  if (RP.getRange('G2').getValue() == '') {
    RP.getRange('G2').setValue('REPORT BEING RUN');
  }

  // THIS CLEARS THE DUMMY TAB THEN COPIES THE NEW DATA TO IT
  ss.getRange('Dummy Page!A1:N').clearContent();
  var oldData = ss
    .getRange('Report!C6:O')
    .getValues()
    .filter(function(value) {
      return value[1].indexOf('S-') > -1;
    });
  if (oldData.length > 0) {
    ss.getSheetByName('Dummy Page')
      .getRange(1, 1, oldData.length, oldData[0].length)
      .setValues(oldData);
  }

  var data, office, sNum;
  var backlogDate = new Date();

  var backlogData = backlog
    .getRange('A:L')
    .getValues()
    .filter(function(value) {
      if (value[2].toString().indexOf('S-') > -1) {
        var concat =
          '=HYPERLINK("https://vivintsolar.my.salesforce.com/' +
          value[4] +
          '","' +
          value[3] +
          '")';
        value.splice(3, 2, concat);
        concat =
          '=HYPERLINK("https://vivintsolar.my.salesforce.com/' +
          value[5] +
          '","' +
          value[4] +
          '")';
        value.splice(4, 2, concat);
        return true;
      }
    }); // filter out non serivice numbers

  // THIS ACTUALLY GETS THE ACCOUNTS FROM ALL OF THE TABS AND SORTS THEM FROM OLDEST TO NEWEST
  var backlog = new Array();
  // All fields that need to be cleared before the information is re-entered
  RP.getRange('C6:O').clearContent();

  for (var i = 0; i < 1; i++) {
    if (i == 0) {
      data = backlogData;
    }
    if (i == 1) {
      data = nonFullProcessData;
    }
    var index = 0;
    //    for (var d in backlogData)
    for (var d = 0; d < data.length; d++) {
      sNum = data[d][2];
      if (sNum == 'S-5883871') var test = 0;
      if (sNum.indexOf('S-') > -1) {
        // if derate case, use initial permit completed date
        if (
          data[d][1] !== '-' &&
          (data[d][5].toLowerCase() === 'derate' ||
            data[d][5].toLowerCase() === 'load calc' ||
            data[d][5].toLowerCase() === 'de-rate')
        )
          data[d][0] = data[d][1];
        // Remove Initial Permit Completed Date column
        data[d].splice(1, 1);
        data[d][0] = calcDueDate(data[d][0], data[d][4]); // Add hours (depending on type) to make due date
        data[d][9] = ''; // set Assigned
        data[d][10] = ''; // set Status
        data[d][11] = ''; // set Notes
        data[d][12] = ''; // set Last Modified

        for (var k in oldData) {
          if (sNum == oldData[k][1]) {
            // Checks if s-numbers are the same
            data[d][9] = oldData[k][9]; // Get old Assigned
            data[d][10] = oldData[k][10]; // Get old Status
            data[d][11] = oldData[k][11]; // Get old Notes
            data[d][12] = oldData[k][12]; // Get old Last Modified
            break;
          }
        }

        var row = data[d];
        backlog.push(row);
        index++;
      }
    }
  }

  var rowNeeded = backlog.length;
  if (rowNeeded > 0) {
    var colNeeded = backlog[0].length;
    // This is the row and column of where the first account will be backlog with Column A being 0
    RP.getRange(6, 3, rowNeeded, colNeeded).setValues(backlog);
  }

  // The range here should be all of the data that is getting pulled from the Reports AND the Type column
  var sortRange = RP.getRange('C6:O');
  // This should sort by the date column.
  // The column number is numbered from the left starting with Column A being 1
  // {column: 4, ascending: true},{column: 21, ascending: true},{column: 14, ascending: true}
  sortRange.sort({ column: 3, ascending: true });

  // Stamps when chrono was last updated
  var timeZone = Session.getTimeZone();
  var date = Utilities.formatDate(new Date(), timeZone, 'MM/dd/yy hh:mm a');
  RP.getRange(4, 2).setValue(date);
  RP.getRange('G2').setValue(''); // Erases the "Report Being Run" text
}

/**
 * Returns index of 2d array
 * @param {*} vals
 * @param {*} search
 * @return {*}
 */
function findIndex(vals, search) {
  for (var i = 0; i < vals.length; i++) if (vals[i] == search) return i;

  return -1;
}

// Moves index element from one position to next
Array.prototype.move = function(from, to) {
  this.splice(to, 0, this.splice(from, 1)[0]);
};

// Add hours to date object
Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + h * 60 * 60 * 1000);
  return this;
};

/**
 * Returns new due date.
 * @param {*} dueDate
 * @param {*} type
 * @return {*}
 */
function calcDueDate(dueDate, type) {
  var newDate = new Date(dueDate.getTime());
  var diff, hour, state;

  switch (type) {
    case 'Non Full Process':
      hour = 6;
      break;
    default:
      hour = 24;
      break;
  }

  newDate.addHours(hour);

  return newDate;
}

/**
 * Used to refresh the Electrical Escalations Queue
 */
function refreshQueue() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  getAccounts(ss);
}
