// @flow
/**
 * The backbone of the Chrono
 * @param {ServiceMasterBacklog} masterBacklog
 */
function backlogProcessJunction(masterBacklog) {
  // -------------------- Comment out below for debugging without lock --------------------
  // var lock = LockService.getScriptLock();
  // try {
  //   lock.waitLock(10000);
  // } catch (e) {
  //   throw 'Could not acquire lock. Someone else is updating the backlog, please wait.';
  // }
  // if (lock.hasLock()) {
  // -------------------- Comment out above for debugging without lock --------------------
  reportRunning(masterBacklog.Report);
  /** @type GoogleAppsScript.Spreadsheet.Sheet */
  var backlog;
  var completeBacklog = [];
  var oldData = uni_GetOldData(masterBacklog.Report);

  for (backlog in masterBacklog) {
    /** @type GoogleAppsScript.Spreadsheet.Sheet */
    var sheet = masterBacklog[backlog];
    var backlogArray;
    var workThisBacklog;

    var backlogName = sheet.getName();
    if (
      backlogName !== 'PERMIT BACKLOG' &&
      backlogName !== 'PERMIT RD BACKLOG'
    ) {
      continue;
    }
    if (backlogName === 'PERMIT BACKLOG') {
      workThisBacklog = sheet;
      backlogArray = uni_LinkCreator(workThisBacklog);
      backlogArray = uni_CadNameColCreator(backlogArray);
      backlogArray = pp_DateCleaner(backlogArray, oldData);
      backlogArray = pp_UnitTypeMarker(backlogArray);
      backlogArray = pp_CleanUpColumns(backlogArray);
      backlogArray = uni_addLastColumns(backlogArray);
      backlogArray = uni_UpdateOldData(
        masterBacklog.FilterSettings,
        backlogArray,
        oldData
      );
      backlogArray = pp_underTweleveHours(backlogArray, workThisBacklog);
      completeBacklog = uni_AddToCompleteBacklog(backlogArray, completeBacklog);
      continue;
    } else if (masterBacklog[backlog].getName() === 'PERMIT RD BACKLOG') {
      workThisBacklog = masterBacklog[backlog];
      backlogArray = uni_LinkCreator(workThisBacklog);
      backlogArray = rd_DateCleaner(backlogArray, oldData);
      backlogArray = rd_UnitTypeMarker(backlogArray);
      backlogArray = rd_CleanUpColumns(backlogArray);
      backlogArray = uni_addLastColumns(backlogArray);
      backlogArray = uni_UpdateOldData(
        masterBacklog.FilterSettings,
        backlogArray,
        oldData
      );
      completeBacklog = uni_AddToCompleteBacklog(backlogArray, completeBacklog);
      continue;
    } else if (masterBacklog[backlog] === null) {
      throw 'The backlog was null in dateOperations()';
    } else {
      console.log(
        'This backlog: ' +
          masterBacklog[backlog].getName() +
          ' is not being worked.'
      );
      continue;
    }
  }
  // return;
  completeBacklog = sortCompleteBacklog(completeBacklog, masterBacklog.Report);
  setCompleteBacklog(completeBacklog, masterBacklog.Report);
  updateLastRefresh(masterBacklog.Report);
  removeReportRunning(masterBacklog.Report);
  // -------------------- Comment out below for debugging without lock --------------------
  //   lock.releaseLock();
  // } else {
  //   throw 'The lock was somehow lost. Someone else is updating the backlog, please wait.';
  // }
  // -------------------- Comment out above for debugging without lock --------------------
}
