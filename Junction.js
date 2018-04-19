/**
* Used for debugging.
*
* @returns
*/
function debugJunction() {
  var masterBacklogs = new serviceMasterBacklog();
  var overRide;
  backlogProcessJunction(masterBacklogs.Collection, overRide);
  return;
}

/**
* Used to go through each sheet and their
* unique backlog process.
*
* For debugging, an override variable
* can be set in function debugJunction().
*
* @param {Sheet[]} masterBacklogs
* @param {Number} overRide
*/
function backlogProcessJunction(masterBacklogs, overRide) {
  var workThisBacklog;
  for (var backlog in masterBacklogs) {      
    if (overRide !== undefined) {
      backlog = overRide;
    }
    if (masterBacklogs[backlog].getName() === 'DEPT PROPOSAL BACKLOG') {
      workThisBacklog = masterBacklogs[backlog];
      prop_DateCleaner(workThisBacklog);
      uni_RegionMarker(workThisBacklog);
      prop_UnitTypeMarker(workThisBacklog);
      uni_CadNameColCreator(workThisBacklog);
      uni_SolProjLinkCreator(workThisBacklog);
      continue;
    } else if (masterBacklogs[backlog].getName() === 'DEPT SNOW PROPOSAL BACKLOG') {
      workThisBacklog = masterBacklogs[backlog];
      uni_RegionMarker(workThisBacklog);
      snow_UnitTypeMarker(workThisBacklog);
      uni_CadNameColCreator(workThisBacklog);
      uni_SolProjLinkCreator(workThisBacklog);
      continue;
    } else if (masterBacklogs[backlog].getName() === 'DEPT CP RD BACKLOG') {
      workThisBacklog = masterBacklogs[backlog];
      uni_RegionMarker(workThisBacklog);
      cprd_UnitTypeMarker(workThisBacklog);
      cprd_DateCleaner(workThisBacklog);
      cprd_LinkCreator(workThisBacklog);
      continue;
    } else if (masterBacklogs[backlog].getName() === 'DEPT PART 1 BACKLOG') {
      workThisBacklog = masterBacklogs[backlog];
      uni_RegionMarker(workThisBacklog);
      partOne_UnitTypeMarker(workThisBacklog);
      partone_DateCleaner(workThisBacklog);
      uni_CadNameColCreator(workThisBacklog);
      uni_SolProjLinkCreator(workThisBacklog);
      continue;
    } else if (masterBacklogs[backlog] === null) {
      throw 'The backlog was null in dateOperations()';
    } else {
      console.log('This backlog: ' + masterBacklogs[backlog].getName() + ' is not being worked.');
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
