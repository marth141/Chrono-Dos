/**
 * backlogProcessJunction
 * * Used as the backbone of the Chrono process.
 * @param {*} dosSheets
 */
function backlogProcessJunction(dosSheets) {
  // -------------------- Comment out below for debugging without lock --------------------
  // var lock = LockService.getScriptLock();
  // try {
  //   lock.waitLock(10000);
  // } catch (e) {
  //   var lockErrorMessage =
  //     'Could not acquire lock. Someone else is updating the backlog, please wait.';
  //   throw lockErrorMessage;
  // }
  // if (lock.hasLock()) {
  // -------------------- Comment out above for debugging without lock --------------------
  setReportRunning(dosSheets.Report);
  var oldData = uni_GetOldData(dosSheets.Report);
  var completeBacklog = [];

  var sheet;
  var workThisBacklog;
  var backlogArray;
  for (sheet in dosSheets) {
    var backlogName = dosSheets[sheet].getName();
    if (backlogName.match(/PERMIT BACKLOG/i)) {
      workThisBacklog = dosSheets[sheet];
      backlogArray = uni_LinkCreator(workThisBacklog);
      backlogArray = uni_CadNameColCreator(backlogArray);
      backlogArray = pp_DateCleaner(backlogArray, oldData);
      backlogArray = pp_UnitTypeMarker(backlogArray);
      backlogArray = pp_CleanUpColumns(backlogArray);
      backlogArray = uni_addLastColumns(backlogArray);
      backlogArray = uni_UpdateOldData(
        dosSheets.FilterSettings,
        backlogArray,
        oldData
      );
      backlogArray = pp_underTweleveHours(backlogArray, workThisBacklog);
      completeBacklog = uni_AddToCompleteBacklog(backlogArray, completeBacklog);
      continue;
    } else if (backlogName.match(/PERMIT RD BACKLOG/i)) {
      workThisBacklog = dosSheets[sheet];
      backlogArray = uni_LinkCreator(workThisBacklog);
      backlogArray = rd_DateCleaner(backlogArray, oldData);
      backlogArray = rd_UnitTypeMarker(backlogArray);
      backlogArray = rd_CleanUpColumns(backlogArray);
      backlogArray = uni_addLastColumns(backlogArray);
      backlogArray = uni_UpdateOldData(
        dosSheets.FilterSettings,
        backlogArray,
        oldData
      );
      completeBacklog = uni_AddToCompleteBacklog(backlogArray, completeBacklog);
      continue;
    } else if (dosSheets[sheet] === null) {
      var backlogNullMessage = 'The backlog was null in dateOperations()';
      throw backlogNullMessage;
    } else {
      console.log('This backlog: ' + backlogName + ' is not being worked.');
      continue;
    }
  }
  completeBacklog = sortCompleteBacklog(completeBacklog, dosSheets.Report);
  setCompleteBacklog(completeBacklog, dosSheets.Report);
  updateLastRefresh(dosSheets.Report);
  removeReportRunning(dosSheets.Report);
  // -------------------- Comment out below for debugging without lock --------------------
  //   lock.releaseLock();
  // } else {
  //   var lockLostMessage =
  //     'The lock was somehow lost. Someone else is updating the backlog, please wait.';
  //   throw lockLostMessage;
  // }
  // -------------------- Comment out above for debugging without lock --------------------
}
