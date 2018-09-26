/* exported
debugJunction
*/

/* global
ServiceMasterBacklog
cprd_CleanUpColumns
cprd_DateCleaner
cprd_UnitTypeMarker
partOne_CleanUpColumns
partOne_DateCleaner
partOne_UnitTypeMarker
prop_CleanUpColumns
prop_DateCleaner
prop_UnitTypeMarker
setCompleteBacklog
snow_CleanUpColumns
snow_DateCleaner
snow_UnitTypeMarker
sortCompleteBacklog
uni_AddToCompleteBacklog
uni_CadNameColCreator
uni_GetOldData
uni_LinkCreator
uni_UpdateOldData
uni_addLastColumns
updateLastRefresh
*/

function debugJunction() {
  var masterBacklogs = new ServiceMasterBacklog();
  var override = 4;
  backlogProcessJunction(masterBacklogs.Collection, override);
  return;
}

function overrideIfDebugging(override) {
  var backlog = override;
  return backlog;
}

function backlogProcessJunction(backlogSheetArray, override) {
  reportRunning(backlogSheetArray.Report);
  var oldData = uni_GetOldData(backlogSheetArray.Report),
    completeBacklog = [];

  for (var backlog in backlogSheetArray) {
    var backlogName = backlogSheetArray[backlog].getName();
    console.log(backlogName);
    if (override !== undefined) {
      backlog = overrideIfDebugging(override);
    }
    var workThisBacklog, backlogArray = [];
    if (backlogSheetArray[backlog].getName() === "DEPT PROPOSAL BACKLOG") {
      workThisBacklog = backlogSheetArray[backlog];
      backlogArray = uni_LinkCreator(workThisBacklog);
      backlogArray = uni_CadNameColCreator(backlogArray);
      backlogArray = prop_DateCleaner(backlogArray);
      backlogArray = prop_UnitTypeMarker(backlogArray);
      backlogArray = prop_CleanUpColumns(backlogArray);
      backlogArray = uni_addLastColumns(backlogArray);
      backlogArray = uni_UpdateOldData(backlogArray, oldData);
      completeBacklog = uni_AddToCompleteBacklog(backlogArray, completeBacklog);
      continue;
    }
    else if (backlogSheetArray[backlog].getName() === "DEPT SNOW PROP BACKLOG") {
      workThisBacklog = backlogSheetArray[backlog];
      backlogArray = uni_LinkCreator(workThisBacklog);
      backlogArray = uni_CadNameColCreator(backlogArray);
      backlogArray = snow_DateCleaner(backlogArray);
      backlogArray = snow_UnitTypeMarker(backlogArray);
      backlogArray = snow_CleanUpColumns(backlogArray);
      backlogArray = uni_addLastColumns(backlogArray);
      backlogArray = uni_UpdateOldData(backlogArray, oldData);
      completeBacklog = uni_AddToCompleteBacklog(backlogArray, completeBacklog);
      continue;
    }
    else if (backlogSheetArray[backlog].getName() === "DEPT CP RD BACKLOG") {
      workThisBacklog = backlogSheetArray[backlog];
      backlogArray = uni_LinkCreator(workThisBacklog);
      backlogArray = cprd_UnitTypeMarker(backlogArray);
      backlogArray = cprd_DateCleaner(backlogArray);
      backlogArray = cprd_CleanUpColumns(backlogArray);
      backlogArray = uni_addLastColumns(backlogArray);
      backlogArray = uni_UpdateOldData(backlogArray, oldData);
      completeBacklog = uni_AddToCompleteBacklog(backlogArray, completeBacklog);
      continue;
    }
    else if (backlogSheetArray[backlog].getName() === "DEPT PART 1 BACKLOG") {
      workThisBacklog = backlogSheetArray[backlog];
      backlogArray = uni_LinkCreator(workThisBacklog);
      backlogArray = partOne_UnitTypeMarker(backlogArray);
      backlogArray = partOne_DateCleaner(backlogArray);
      backlogArray = uni_CadNameColCreator(backlogArray);
      backlogArray = partOne_CleanUpColumns(backlogArray);
      backlogArray = uni_addLastColumns(backlogArray);
      backlogArray = uni_UpdateOldData(backlogArray, oldData);
      completeBacklog = uni_AddToCompleteBacklog(backlogArray, completeBacklog);
      continue;
    }
    else if (backlogSheetArray[backlog] === null) {
      throw "The backlog was null in dateOperations()";
    }
    else {
      console.log("This backlog: " + backlogSheetArray[backlog].getName() + " is not being worked.");
      continue;
    }
  }
  completeBacklog = sortCompleteBacklog(completeBacklog, backlogSheetArray.Report);
  setCompleteBacklog(completeBacklog, backlogSheetArray.Report);
  updateLastRefresh(backlogSheetArray.Report);
  removeReportRunning(backlogSheetArray.Report);
}