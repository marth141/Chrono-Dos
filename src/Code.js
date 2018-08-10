/**
 * Main
 * * Used in the Vivint Solar Button on the report page.
 */
function main() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var masterBacklogs = new ChronoDOSSheets(ss);
  backlogProcessJunction(masterBacklogs, undefined);
  return;
}

/**
 * callMain
 * * Used in external calls to this Chrono from other sheets.
 * @param {String} backlogName Used to know which backlog is coming in.
 */
function callMain(backlogName) {
  // GOOGLE LOCK SERVICE ENGAGES
  var lock = LockService.getDocumentLock();
  try {
    lock.waitLock(10000);
  } catch (e) {
    var lockErrorMessage =
      'Could not acquire lock. Someone else is updating the backlog, please wait.';
    throw lockErrorMessage;
  }
  if (lock.hasLock()) {
    // GOOGLE LOCK SERVICE BREAK

    if (backlogName.match(/DOS/i)) {
      var chronoDOS = SpreadsheetApp.openById(
        '121UKskNpiVK2ocT8pFIx9uO6suw3o7S7C4VhiIaqzI0'
      );
    } else {
      var wrongBacklogMessage = 'Wrong script for this report type';
      throw wrongBacklogMessage;
    }
    var dosSheets = new ChronoDOSSheets(chronoDOS);
    backlogProcessJunction(dosSheets);

    // GOOGLE LOCK SERVICE RESUME
  } else {
    var lostLockMessage =
      'The lock was somehow lost. Someone else is updating the backlog, please wait.';
    throw lostLockMessage;
  }
  // GOOGLE LOCK SERVICE DISENGAGE
  return;
}

/**
 * callUpdateReportData
 * ! Not sure where this is being used.
 */
function callUpdateReportData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var masterBacklogs = new ChronoDOSSheets(ss);
  updateReportData(masterBacklogs, undefined);
  return;
}

/**
 * replaceOld
 * ! Not sure where this is being used.
 */
function replaceOld() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var report = ss.getSheetByName('Report');
  var testReport = SpreadsheetApp.openById(
    '11P_RjuFahwmWj9rHxT1QHJrfGfIezFzl-cqUlcCsi_g'
  ).getSheetByName('Report');

  var oldData = testReport
    .getRange('L3:Y')
    .getValues()
    .filter(function(value) {
      return value[0].indexOf('S-') > -1;
    });

  for (var i = report.getLastRow() - 855; i > 1; i--) {
    var serviceNum = report.getRange(i, 7).getValue();
    var unitType = report.getRange(i, 15).getValue();
    for (var row in oldData) {
      var oldServiceNum = oldData[row][0];
      var oldUnitType = oldData[row][0];
      if (serviceNum !== oldServiceNum && unitType !== oldUnitType) continue;

      report.getRange(i, 21).setValue(oldData[row][13]);
      SpreadsheetApp.flush();
    }
  }
  SpreadsheetApp.flush();
}
