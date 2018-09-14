/**
 * Used to get report
 */
function getReport() {
  var ssThis = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Report');
  var ssFilterSettings = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Filter Settings');
  var ssReport = SpreadsheetApp.openById(
    '121UKskNpiVK2ocT8pFIx9uO6suw3o7S7C4VhiIaqzI0'
  ).getSheetByName('Report');
  var completeBacklog = [];
  var outsourceTeam = ssFilterSettings
    .getRange('B6:D')
    .getValues()
    .filter(function(row) {
      return row[0] !== '' || row[2] !== '';
    });

  var header = ssReport.getRange('2:2').getValues()[0];
  var dueInCol = header.indexOf('DUE IN: (hh:mm)');
  var solarProjectCol = header.indexOf('SOLAR PROJECT') - dueInCol;
  var cadObjCol = header.indexOf('CAD OBJECT') - dueInCol;
  var unitTypeCol = header.indexOf('UNIT TYPE') - dueInCol;
  var assignedCol = header.indexOf('ASSIGNED') - dueInCol;
  var statusCol = header.indexOf('STATUS') - dueInCol;
  var notesCol = header.indexOf('NOTES') - dueInCol;
  var redesignCol = header.indexOf('REDESIGN ASSIGNMENT') - dueInCol;
  var lastRow = ssReport.getLastRow() - 1;
  var range = ssReport.getRange(3, dueInCol + 1, lastRow, redesignCol + 1);
  var formulas = range.getFormulas();
  completeBacklog = range.getValues().filter(function(row, index) {
    if (row[3] === 'S-5925465') {
      var x = 0;
    }

    var foundMemeberBool = outsourceTeam.some(function(state) {
      return (
        row[assignedCol].toLowerCase().indexOf(state[0].toLowerCase()) > -1 ||
        row[assignedCol].toLowerCase().indexOf(state[2].toLowerCase()) > -1
      );
    });
    var onHoldBool = row[statusCol].match(/on hold/i) !== null;
    var outsourceBool = row[unitTypeCol].match(/outsource/i) !== null;
    var otsBool = row[unitTypeCol].match(/ots/i) !== null;
    var unassigned = row[assignedCol] === '';

    if (
      (foundMemeberBool || (outsourceBool && unassigned) || (otsBool && unassigned)) &&
      !onHoldBool
    ) {
      row[solarProjectCol] = formulas[index][solarProjectCol];
      row[cadObjCol] = formulas[index][cadObjCol];
      return true;
    } else {
      return false;
    }
  });

  setBacklog(ssThis, completeBacklog);

  return;
}

/**
 * Used to set the backlog
 * @param {*} ss
 * @param {*} backlog
 */
function setBacklog(ss, backlog) {
  var lastRow = ss.getLastRow() - 1;
  var rowNeeded = backlog.length;
  if (rowNeeded > 0) {
    var colNeeded = backlog[0].length;
    ss.getRange(3, 4, lastRow, colNeeded).clearContent();
    ss.getRange(3, 4, rowNeeded, colNeeded).setValues(backlog);
  }
}
