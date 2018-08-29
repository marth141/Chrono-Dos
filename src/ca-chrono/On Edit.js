// Event object matches Apps Script documentation for edit sheet event

/**
 * Used to update the master
 * @param {Object} e
 * @param {GoogleAppsScript.Script.AuthMode} e.authMode
 * @param {*} e.oldValue
 * @param {GoogleAppsScript.Spreadsheet.Range} e.range
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} e.source
 * @param {Number} e.triggerUid
 * @param {String} e.user
 * @param {*} e.value
 */
function onEdit(e) {
  // POPULATES THE APPROPRIATE ACCOUNT INFORMATION WHEN THE SERVICE NUMBER IS CHANGED IN
  // REQUIREMENTS!C2
  var headers = new ChronoHeaders();

  var editedSheet = e.source.getActiveSheet();
  var sheetName = editedSheet.getName();

  var column = e.range.getColumn();
  var row = e.range.getRow();
  // Check if edited sheet was On Hold or Report
  if (sheetName === 'On Hold' || sheetName === 'Report') {
    // Check if value is there. Will not be there is more than 1 cell was edited.
    var editedColumnIsNotes = column === headers.notes;
    var editedColumnIsAssigned = column === headers.assigned;
    var editedColumnIsPriority = column === headers.priority;
    var editedColumnIsStatus = column === headers.status;
    var editedCanBeBlank =
      editedColumnIsAssigned || editedColumnIsPriority || editedColumnIsStatus;
    if (e.value === undefined && editedColumnIsNotes) {
      e.value = 'Deleted by lead or supervisor';
    } else if (
      e.value === undefined &&
      !(
        editedColumnIsAssigned ||
        editedColumnIsPriority ||
        editedColumnIsStatus
      )
    ) {
      var alertMessage =
        'Leaving anything but notes blank will not ' +
        'update the master chrono. This is a Google problem and cannot be resolved.';
      SpreadsheetApp.getActiveSpreadsheet().toast(alertMessage, 'Alert', 60);
      getReport();
      return;
    }

    var editIsBetweenUnitType = column >= headers.unitType;
    var editNotBeyondNotes = column <= headers.notes;
    var isNotInHeaderRow = row > 2;
    if (editIsBetweenUnitType && editNotBeyondNotes && isNotInHeaderRow) {
      var serviceNumber = editedSheet.getRange(row, headers.service).getValue();
      var unitType = editedSheet.getRange(row, headers.unitType).getValue();
      var region = editedSheet.getRange(row, headers.region).getValue();
      var pass = makeEdits(
        serviceNumber,
        headers.service,
        unitType,
        headers.lastUpdate,
        column,
        e.value,
        editedCanBeBlank
      );
      if (!pass) {
        return;
      }
      editedSheet.getRange(row, lastUpdateCol).setValue(new Date());
    } else {
      Browser.msgBox('Can not edit those columns');
    }
  } // End of sheet check
}

/**
 *
 * @param {String} teamChronoServiceNumber
 * @param {Number} servicenNumCol
 * @param {String} unitType
 * @param {Number} lastUpdateCol
 * @param {Number} column
 * @param {*} value
 * @param {Boolean} editedCanBeBlank
 * @return {*}
 */
function makeEdits(
  teamChronoServiceNumber,
  servicenNumCol,
  unitType,
  lastUpdateCol,
  column,
  value,
  editedCanBeBlank
) {
  var foundRow;
  // Dev: 1r06cw7MtVKolZY6pXkmuoxcWPUeqtdm8Tu9sc5ljBkg
  // Prod: 121UKskNpiVK2ocT8pFIx9uO6suw3o7S7C4VhiIaqzI0
  var masterReport = SpreadsheetApp.openById(
    '1r06cw7MtVKolZY6pXkmuoxcWPUeqtdm8Tu9sc5ljBkg'
  ).getSheetByName('Report');
  var backlogRowStart = 3;
  var masterReportsLastRow = masterReport.getLastRow() - 1;

  var test = masterReport
    .getRange(
      backlogRowStart,
      servicenNumCol,
      masterReportsLastRow,
      lastUpdateCol
    )
    .getValues()
    .some(function(row, index) {
      var masterReportServiceNumber = row[0];
      var masterReportUnitType = row[8];

      var masterTeamServiceNumbersMatch =
        masterReportServiceNumber === teamChronoServiceNumber;
      var masterTeamUnitTypeMatch = masterReportUnitType === unitType;

      if (masterTeamServiceNumbersMatch) {
        foundRow = index + 2;
        return true;
      } else {
        return false;
      }
    });

  if (foundRow === undefined) {
    SpreadsheetApp.getActiveSpreadsheet().toast(
      'Could not find a matching service number, refreshing this chrono',
      'Error'
    );
    getReport();
    return false;
  } else if (foundRow !== undefined) {
    if (value === undefined && editedCanBeBlank) {
      masterReport.getRange(foundRow + 1, column).clearContent();
      masterReport.getRange(foundRow + 1, lastUpdateCol).setValue(new Date());
    } else {
      masterReport.getRange(foundRow + 1, column).setValue(value);
      masterReport.getRange(foundRow + 1, lastUpdateCol).setValue(new Date());
    }
  } else {
    var findingRowInMasterError = 'Error in finding row';
    throw findingRowInMasterError;
  }
}

/**
 * Testing
 */
function test() {
  makeEdits('S-5962801', 7, 'OUTSOURCE', 17, 20, 'PRIORITY');
}
