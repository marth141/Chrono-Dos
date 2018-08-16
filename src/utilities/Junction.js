// @flow
/**
 * Backbone of Chrono
 * @param {MasterBacklogSheets} masterBacklogSheets
 * @param {PermitColumns} permitColumns
 * @param {RedesignColumns} redesignColumns
 * @param {ReportPageColumns} reportColumns
 */
function backlogProcessJunction(
  masterBacklogSheets,
  permitColumns,
  redesignColumns,
  reportColumns
) {
  // -------------------- Comment out below for debugging without lock --------------------
  // var lock = LockService.getScriptLock();
  // try {
  //   lock.waitLock(10000);
  // } catch (e) {
  //   throw 'Could not acquire lock. Someone else is updating the backlog, please wait.';
  // }
  // if (lock.hasLock()) {
  // -------------------- Comment out above for debugging without lock --------------------
  reportRunning(masterBacklogSheets.Report);
  /** @type GoogleAppsScript.Spreadsheet.Sheet */
  var backlog;
  var completeBacklog = [];
  var oldData = uni_GetOldData(masterBacklogSheets.Report, reportColumns);
  debugger;

  for (backlog in masterBacklogSheets) {
    /** @type GoogleAppsScript.Spreadsheet.Sheet */
    var sheet = masterBacklogSheets[backlog];
    /** @type Array[] */
    var backlogArray;

    var backlogName = sheet.getName();
    if (
      backlogName !== 'PERMIT BACKLOG' &&
      backlogName !== 'PERMIT RD BACKLOG'
    ) {
      continue;
    }
    if (backlogName === 'PERMIT BACKLOG') {
      backlogArray = uni_LinkCreator(sheet);
      backlogArray = uni_CadNameColCreator(backlogArray);
      backlogArray = pp_DateCleaner(backlogArray, oldData);
      backlogArray = pp_UnitTypeMarker(backlogArray); // Cleaning
      backlogArray = pp_CleanUpColumns(backlogArray);
      backlogArray = uni_addLastColumns(backlogArray);
      backlogArray = uni_UpdateOldData(
        masterBacklogSheets.FilterSettings,
        backlogArray,
        oldData
      );
      backlogArray = pp_underTweleveHours(backlogArray, sheet);
      completeBacklog = uni_AddToCompleteBacklog(backlogArray, completeBacklog);
      continue;
    } else if (masterBacklogSheets[backlog].getName() === 'PERMIT RD BACKLOG') {
      backlogArray = uni_LinkCreator(sheet);
      backlogArray = rd_DateCleaner(backlogArray, oldData);
      backlogArray = rd_UnitTypeMarker(backlogArray);
      backlogArray = rd_CleanUpColumns(backlogArray);
      backlogArray = uni_addLastColumns(backlogArray);
      backlogArray = uni_UpdateOldData(
        masterBacklogSheets.FilterSettings,
        backlogArray,
        oldData
      );
      completeBacklog = uni_AddToCompleteBacklog(backlogArray, completeBacklog);
      continue;
    } else if (masterBacklogSheets[backlog] === null) {
      throw 'The backlog was null in dateOperations()';
    } else {
      console.log(
        'This backlog: ' +
          masterBacklogSheets[backlog].getName() +
          ' is not being worked.'
      );
      continue;
    }
  }
  // return;
  completeBacklog = sortCompleteBacklog(
    completeBacklog,
    masterBacklogSheets.Report
  );
  setCompleteBacklog(completeBacklog, masterBacklogSheets.Report);
  updateLastRefresh(masterBacklogSheets.Report);
  removeReportRunning(masterBacklogSheets.Report);
  // -------------------- Comment out below for debugging without lock --------------------
  //   lock.releaseLock();
  // } else {
  //   throw 'The lock was somehow lost. Someone else is updating the backlog, please wait.';
  // }
  // -------------------- Comment out above for debugging without lock --------------------
}
