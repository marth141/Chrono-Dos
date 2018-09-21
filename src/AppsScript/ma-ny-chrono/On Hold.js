/**
 * Gets the on hold accounts
 */
function getOnHold() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ssOnHold = ss.getSheetByName(ONHOLD_SHEET);
  // Dev: 1r06cw7MtVKolZY6pXkmuoxcWPUeqtdm8Tu9sc5ljBkg
  // Prod: 121UKskNpiVK2ocT8pFIx9uO6suw3o7S7C4VhiIaqzI0
  var ssReport = SpreadsheetApp.openById(
    MASTER_CHRONO
  ).getSheetByName(REPORT_SHEET);
  var completeBacklog = [];

  var header = ssReport.getRange('2:2').getValues()[0];
  var dueInCol = header.indexOf('DUE IN: (hh:mm)');
  var solarProjectCol = header.indexOf('SOLAR PROJECT') - dueInCol;
  var officeCol = header.indexOf('OFFICE') - dueInCol;
  var statusCol = header.indexOf('STATUS') - dueInCol;
  var notesCol = header.indexOf('NOTES') - dueInCol;
  var redesignCol = header.indexOf('REDESIGN ASSIGNMENT') - dueInCol;
  var lastRow = ssReport.getLastRow() - 1;
  var range = ssReport.getRange(3, dueInCol + 1, lastRow, redesignCol + 1);
  var formulas = range.getFormulas();
  completeBacklog = range.getValues().filter(function(row, index) {
    var foundState = [
      'fl-',
      'ma-',
      'nh-',
      'nj-',
      'ny-',
      'pa-',
      'ri-',
      'sc-',
      'vt-',
      'hi-'
    ].some(function(state) {
      return row[officeCol].toLowerCase().indexOf(state) > -1;
    });
    var foundNYBool = ['ny-09'].some(function(state) {
      return (
        row[officeCol].toLowerCase().indexOf(state) > -1 ||
        row[notesCol].toLowerCase().indexOf(state) > -1
      );
    });
    if (!foundState || foundNYBool) {
      return false;
    } else {
      row[solarProjectCol] = formulas[index][solarProjectCol];
      return row[statusCol].match(/on hold/i);
    }
  }); // 3,dueInCol,stageCol,lastRow

  lastRow = ssOnHold.getLastRow() - 1;
  var lastCol = ssOnHold.getLastColumn();
  ssOnHold.getRange(3, 4, lastRow, lastCol - 3).clearContent();

  var rowNeeded = completeBacklog.length;
  if (rowNeeded > 0) {
    var colNeeded = completeBacklog[0].length;
    ssOnHold.getRange(3, 4, rowNeeded, colNeeded).setValues(completeBacklog);
  }
  return;
}
