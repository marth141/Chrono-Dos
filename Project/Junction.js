/* exported
debugJunction
*/

/* global
ServiceMasterBacklog
cprd_DateCleaner
cprd_LinkCreator
cprd_UnitTypeMarker
partOne_UnitTypeMarker
partone_DateCleaner
prop_DateCleaner
prop_UnitTypeMarker
snow_UnitTypeMarker
uni_CadNameColCreator
uni_RegionMarker
uni_SolProjLinkCreator
*/
function debugJunction() {
  var masterBacklogs = new ServiceMasterBacklog();
  var override = undefined;
  backlogProcessJunction(masterBacklogs.Collection, override);
  return;
}

function overrideIfDebugging(override) {
  if (override === undefined) {
    var backlog = override;
    return backlog;
  } else {
    console.log('No override in junction.');
  }
}

function backlogProcessJunction(backlogSheetArray, override) {
  for (var backlog in backlogSheetArray) {
    if (override !== undefined) {
      backlog = overrideIfDebugging(override);
    }
    var workThisBacklog;
    if (backlogSheetArray[backlog].getName() === 'staging_DEPT PROPOSAL BACKLOG') {
      workThisBacklog = backlogSheetArray[backlog];
      prop_DateCleaner(workThisBacklog);
      uni_RegionMarker(workThisBacklog);
      prop_UnitTypeMarker(workThisBacklog);
      uni_CadNameColCreator(workThisBacklog);
      uni_SolProjLinkCreator(workThisBacklog);
      addLastColumns(workThisBacklog);
      continue;
    } else if (backlogSheetArray[backlog].getName() === 'staging_DEPT SNOW PROPOSAL BACKLOG') {
      workThisBacklog = backlogSheetArray[backlog];
      uni_RegionMarker(workThisBacklog);
      snow_UnitTypeMarker(workThisBacklog);
      uni_CadNameColCreator(workThisBacklog);
      uni_SolProjLinkCreator(workThisBacklog);
      addLastColumns(workThisBacklog);
      continue;
    } else if (backlogSheetArray[backlog].getName() === 'staging_DEPT CP RD BACKLOG') {
      workThisBacklog = backlogSheetArray[backlog];
      uni_RegionMarker(workThisBacklog);
      cprd_UnitTypeMarker(workThisBacklog);
      cprd_DateCleaner(workThisBacklog);
      cprd_LinkCreator(workThisBacklog);
      addLastColumns(workThisBacklog);
      continue;
    } else if (backlogSheetArray[backlog].getName() === 'staging_DEPT PART 1 BACKLOG') {
      workThisBacklog = backlogSheetArray[backlog];
      uni_RegionMarker(workThisBacklog);
      partOne_UnitTypeMarker(workThisBacklog);
      partone_DateCleaner(workThisBacklog);
      uni_CadNameColCreator(workThisBacklog);
      uni_SolProjLinkCreator(workThisBacklog);
      addLastColumns(workThisBacklog);
      continue;
    } else if (backlogSheetArray[backlog] === null) {
      throw 'The backlog was null in dateOperations()';
    } else {
      console.log('This backlog: ' + backlogSheetArray[backlog].getName() + ' is not being worked.');
      continue;
    }
  }
}

// function gimmieDaJson(workThisBacklog) {
//   var dim = getDimensions(workThisBacklog);
//   var backlogArray = getBacklogArray(workThisBacklog, dim);
//   var json = JSON.parse(backlogArray);
//   console.log(json);
//   return;
// }
