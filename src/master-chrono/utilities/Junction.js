/**
 * The backbone of the code. Backlogs will always come back here
 * after operations have been performed on them.
 * @param {*} backlogSheetArray
 * @param {*} override
 */
function backlogProcessJunction(backlogSheetArray, override) {
  // -------------------- Comment out below for debugging without lock --------------------
  //  var lock = LockService.getScriptLock();
  //  try {
  //    lock.waitLock(10000)
  //  } catch (e) {
  //    throw "Could not acquire lock. Someone else is updating the backlog, please wait."
  //  }
  //  if (lock.hasLock()) {
  // -------------------- Comment out above for debugging without lock --------------------
  reportRunning(backlogSheetArray.Report);
  var oldData = uni_GetOldData(backlogSheetArray.Report);
  var completeBacklog = [];

  for (var backlog in backlogSheetArray) {
    var backlogArray;
    var backlogName = backlogSheetArray[backlog].getName();
    if (
      backlogName !== 'PERMIT BACKLOG' &&
      backlogName !== 'PERMIT RD BACKLOG'
    ) {
      continue;
    }
    var workThisBacklog;
    if (backlogSheetArray[backlog].getName() === 'PERMIT BACKLOG') {
      workThisBacklog = backlogSheetArray[backlog];
      backlogArray = uni_LinkCreator(workThisBacklog);
      backlogArray = uni_CadNameColCreator(backlogArray);
      backlogArray = pp_DateCleaner(backlogArray, oldData);
      backlogArray = pp_UnitTypeMarker(backlogArray);
      backlogArray = pp_CleanUpColumns(backlogArray);
      backlogArray = uni_addLastColumns(backlogArray);
      backlogArray = uni_UpdateOldData(
        backlogSheetArray.FilterSettings,
        backlogArray,
        oldData
      );
      // ! Turned off by request
      // backlogArray = pp_underTweleveHours(backlogArray, workThisBacklog);
      completeBacklog = uni_AddToCompleteBacklog(backlogArray, completeBacklog);
      continue;
    } else if (backlogSheetArray[backlog].getName() === 'PERMIT RD BACKLOG') {
      workThisBacklog = backlogSheetArray[backlog];
      backlogArray = uni_LinkCreator(workThisBacklog);
      backlogArray = rd_DateCleaner(backlogArray, oldData);
      backlogArray = rd_UnitTypeMarker(backlogArray);
      backlogArray = rd_CleanUpColumns(backlogArray);
      backlogArray = uni_addLastColumns(backlogArray);
      backlogArray = uni_UpdateOldData(
        backlogSheetArray.FilterSettings,
        backlogArray,
        oldData
      );
      completeBacklog = uni_AddToCompleteBacklog(backlogArray, completeBacklog);
      continue;
    } else if (backlogSheetArray[backlog] === null) {
      var errorMessage = 'The backlog was null in dateOperations()';
      throw errorMessage;
    } else {
      console.log(
        'This backlog: ' +
          backlogSheetArray[backlog].getName() +
          ' is not being worked.'
      );
      continue;
    }
  }
  // * NEW: Adds priority to defined accounts
  completeBacklog = uni_priorityMarker(completeBacklog);
  completeBacklog = sortCompleteBacklog(
    completeBacklog,
    backlogSheetArray.Report
  );
  setCompleteBacklog(completeBacklog, backlogSheetArray.Report);
  updateLastRefresh(backlogSheetArray.Report);
  removeReportRunning(backlogSheetArray.Report);
  // -------------------- Comment out below for debugging without lock --------------------
  //    lock.releaseLock();
  //  } else {
  //    throw "The lock was somehow lost. Someone else is updating the backlog, please wait."
  //  }
  // -------------------- Comment out above for debugging without lock --------------------
}
