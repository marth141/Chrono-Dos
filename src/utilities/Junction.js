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
  var reportSheet = masterBacklogSheets.Report;
  var permitSheet = masterBacklogSheets.Permit;
  var redesignSheet = masterBacklogSheets.PermitRD;
  reportRunning(reportSheet);
  /** @type GoogleAppsScript.Spreadsheet.Sheet */
  var backlog;
  var completeBacklog = [];
  var reportBacklog = new Backlog().reportBacklog(reportSheet);
  var permitBacklog = new Backlog().permitBacklog(permitSheet);
  var redesignBacklog = new Backlog().redesignBacklog(redesignSheet);
  // UPDATE PERMIT BACKLOG
  // Size 14 columns
  permitBacklog = new BacklogWithLinks().permitSolLinks(
    permitBacklog,
    permitColumns
  );
  // Size 15 columns
  permitBacklog = new BacklogWithCADColumn(permitBacklog, permitColumns);
  permitColumns = new PermitColumns(undefined, permitBacklog);
  permitBacklog = new BacklogWithDateColumns(permitBacklog, permitColumns, reportBacklog);
  permitColumns = new PermitColumns(undefined, permitBacklog);
  // UPDATE REDESIGN BACKLOG
  // Size 14 columns
  redesignBacklog = new BacklogWithLinks().redesignCADLinks(
    redesignBacklog,
    redesignColumns
  );
  // Size 15 columns
  redesignBacklog = new BacklogWithCADColumn(redesignBacklog, redesignColumns);
  redesignColumns = new RedesignColumns(undefined, redesignBacklog);
  debugger; // CURRENTLY WORKING HERE

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
      backlogArray = pp_DateCleaner(backlogArray, reportBacklog);
      backlogArray = pp_UnitTypeMarker(backlogArray); // Cleaning
      backlogArray = pp_CleanUpColumns(backlogArray);
      backlogArray = uni_addLastColumns(backlogArray);
      backlogArray = uni_UpdateOldData(
        masterBacklogSheets.FilterSettings,
        backlogArray,
        reportBacklog
      );
      backlogArray = pp_underTweleveHours(backlogArray, sheet);
      completeBacklog = uni_AddToCompleteBacklog(backlogArray, completeBacklog);
      continue;
    } else if (masterBacklogSheets[backlog].getName() === 'PERMIT RD BACKLOG') {
      backlogArray = uni_LinkCreator(sheet);
      backlogArray = rd_DateCleaner(backlogArray, reportBacklog);
      backlogArray = rd_UnitTypeMarker(backlogArray);
      backlogArray = rd_CleanUpColumns(backlogArray);
      backlogArray = uni_addLastColumns(backlogArray);
      backlogArray = uni_UpdateOldData(
        masterBacklogSheets.FilterSettings,
        backlogArray,
        reportBacklog
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
