// @flow strict
/**
 * Main entry point for Chrono
 * * Is also used in updater
 */
function main() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var masterBacklogs = new ServiceMasterBacklog(ss);
  backlogProcessJunction(masterBacklogs);
  return;
}

function callMain(backlogName) {
  var lock = LockService.getDocumentLock();
  try {
    lock.waitLock(10000);
  } catch (e) {
    throw 'Could not acquire lock. Someone else is updating the backlog, please wait.';
  }
  if (lock.hasLock()) {
    if (backlogName.match(/DOS/i)) {
      var ss = SpreadsheetApp.openById(
        '121UKskNpiVK2ocT8pFIx9uO6suw3o7S7C4VhiIaqzI0'
      );
    } else {
      throw 'Wrong script for this report type';
    }
    var masterBacklogs = new ServiceMasterBacklog(ss);
    backlogProcessJunction(masterBacklogs, undefined);
  } else {
    throw 'The lock was somehow lost. Someone else is updating the backlog, please wait.';
  }
  return;
}

function callUpdateReportData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var masterBacklogs = new ServiceMasterBacklog(ss);
  updateReportData(masterBacklogs, undefined);
  return;
}

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

  //  var rowNeeded = backlog.length;
  //  if (rowNeeded > 0) {
  //    var colNeeded = backlog[0].length;
  //    testReport.getRange(3, 4, rowNeeded, colNeeded).setValues(backlog);
  //  }
  SpreadsheetApp.flush();
}
