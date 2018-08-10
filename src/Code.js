/* exported
main
*/

/* global
ServiceMasterBacklog
backlogProcessJunction
*/

/**
 * Main
 * * Used in the Vivint Solar Button on the report page.
 */
function main() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var masterBacklogs = new ServiceMasterBacklog(ss);
  backlogProcessJunction(masterBacklogs, undefined);
  return;
}

/**
 * callMain
 * * Used in external calls to this Chrono from other sheets.
 * @param {String} backlogName Used to know which backlog is coming in.
 */
function callMain(backlogName) {
  var lock = LockService.getDocumentLock();
  try {
    lock.waitLock(10000);
  } catch (e) {
    throw "Could not acquire lock. Someone else is updating the backlog, please wait.";
  }
  if (lock.hasLock()) {
    if (backlogName.match(/DOS/i)) {
      var ss = SpreadsheetApp.openById(
        "121UKskNpiVK2ocT8pFIx9uO6suw3o7S7C4VhiIaqzI0"
      );
    } else {
      throw "Wrong script for this report type";
    }
    var masterBacklogs = new ServiceMasterBacklog(ss);
    backlogProcessJunction(masterBacklogs, undefined);
  } else {
    throw "The lock was somehow lost. Someone else is updating the backlog, please wait.";
  }
  return;
}

/**
 * callUpdateReportData
 * ! Not sure where this is being used.
 */
function callUpdateReportData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var masterBacklogs = new ServiceMasterBacklog(ss);
  updateReportData(masterBacklogs, undefined);
  return;
}

/**
 * replaceOld
 * ! Not sure where this is being used.
 */
function replaceOld() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var report = ss.getSheetByName("Report");
  var testReport = SpreadsheetApp.openById(
    "11P_RjuFahwmWj9rHxT1QHJrfGfIezFzl-cqUlcCsi_g"
  ).getSheetByName("Report");

  var oldData = testReport
    .getRange("L3:Y")
    .getValues()
    .filter(function(value) {
      return value[0].indexOf("S-") > -1;
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
