/* exported debugJunction */
function debugJunction() {
  var masterBacklogs = new serviceMasterBacklog();
  var override = 1;
  backlogProcessJunction(masterBacklogs.Collection, override);
  return;
}

function overrideIfDebugging(override) {
  if (override !== undefined){
    backlog = override;
  }
  return backlog;
}

function backlogProcessJunction(backlogSheetArray, override) {
  for (var backlog in backlogSheetArray) {
    backlog = overrideIfDebugging(override);
    var workThisBacklog;
    if (backlogSheetArray[backlog].getName() === 'staging_DEPT PROPOSAL BACKLOG') {
      workThisBacklog = backlogSheetArray[backlog];
      prop_DateCleaner(workThisBacklog);
      uni_RegionMarker(workThisBacklog);
      prop_UnitTypeMarker(workThisBacklog);
      uni_CadNameColCreator(workThisBacklog);
      uni_SolProjLinkCreator(workThisBacklog);
      addLastColumns(workThisBacklog);
      compareBacklogs(workThisBacklog);
      break;
    } else if (backlogSheetArray[backlog].getName() === 'staging_DEPT SNOW PROPOSAL BACKLOG') {
      workThisBacklog = backlogSheetArray[backlog];
      uni_RegionMarker(workThisBacklog);
      snow_UnitTypeMarker(workThisBacklog);
      uni_CadNameColCreator(workThisBacklog);
      uni_SolProjLinkCreator(workThisBacklog);
      continue;
    } else if (backlogSheetArray[backlog].getName() === 'staging_DEPT CP RD BACKLOG') {
      workThisBacklog = backlogSheetArray[backlog];
      uni_RegionMarker(workThisBacklog);
      cprd_UnitTypeMarker(workThisBacklog);
      cprd_DateCleaner(workThisBacklog);
      cprd_LinkCreator(workThisBacklog);
      continue;
    } else if (backlogSheetArray[backlog].getName() === 'staging_DEPT PART 1 BACKLOG') {
      workThisBacklog = backlogSheetArray[backlog];
      uni_RegionMarker(workThisBacklog);
      partOne_UnitTypeMarker(workThisBacklog);
      partone_DateCleaner(workThisBacklog);
      uni_CadNameColCreator(workThisBacklog);
      uni_SolProjLinkCreator(workThisBacklog);
      continue;
    } else if (backlogSheetArray[backlog] === null) {
      throw 'The backlog was null in dateOperations()';
    } else {
      console.log('This backlog: ' + backlogSheetArray[backlog].getName() + ' is not being worked.');
      continue;
    }
  }
}

function gimmieDaJson(workThisBacklog) {
  var dim = getDimensions(workThisBacklog);
  var backlogArray = getBacklogArray(workThisBacklog, dim);
  var json = JSON.parse(backlogArray);
  console.log(json);
  return;
}
