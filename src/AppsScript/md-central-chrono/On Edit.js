// Event object matches Apps Script documentation for edit sheet event

/**
 * Used to update the master
 * * Used on Triggers: onEdit
 * @param {Object} e
 * @param {GoogleAppsScript.Script.AuthMode} e.authMode
 * @param {*} e.oldValue
 * @param {GoogleAppsScript.Spreadsheet.Range} e.range
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} e.source
 * @param {Number} e.triggerUid
 * @param {String} e.user
 * @param {*} e.value
 */
function mdCen_onEdit(e) {
  // POPULATES THE APPROPRIATE ACCOUNT INFORMATION WHEN THE SERVICE NUMBER IS CHANGED IN
  // REQUIREMENTS!C2
  var headers = new ChronoHeaders();

  var editedSheet = e.source.getActiveSheet();
  var sheetName = editedSheet.getName();

  var column = e.range.getColumn();
  var row = e.range.getRow();
  // Check if edited sheet was On Hold or Report
  if (sheetName === ONHOLD_SHEET || sheetName === REPORT_SHEET) {
    // Check if value is there. Will not be there is more than 1 cell was edited.
    var editedColumnIsUnitType = column === headers.unitType;
    var editedColumnIsAssigned = column === headers.assigned;
    var editedColumnIsPriority = column === headers.priority;
    var editedColumnIsStatus = column === headers.status;
    var editedColumnIsNotes = column === headers.notes;

    if (
      e.value === undefined &&
      (editedColumnIsAssigned ||
        editedColumnIsPriority ||
        editedColumnIsStatus ||
        editedColumnIsNotes)
    ) {
      var editedCanBeBlank = true;
    } else if (
      e.value === undefined &&
      !(
        editedColumnIsAssigned ||
        editedColumnIsPriority ||
        editedColumnIsStatus
      )
    ) {
      var alertMessage =
        'Only Assigned, Priority, and Status can be left blank.';
      SpreadsheetApp.getActiveSpreadsheet().toast(alertMessage, 'Alert', 60);
      getReport();
      return;
    } else if (
      (e.value !== undefined || e.value === undefined) &&
      !(
        editedColumnIsUnitType ||
        editedColumnIsAssigned ||
        editedColumnIsPriority ||
        editedColumnIsStatus ||
        editedColumnIsNotes
      )
    ) {
      var alertMessage =
        'Cannot edit anything but Unit Type, Assigned, Priority, Status, or notes. ' +
        'This Chrono will refresh to fix itself.';
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
  }
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
  var masterReport = SpreadsheetApp.openById(MASTER_CHRONO).getSheetByName(
    REPORT_SHEET
  );
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
