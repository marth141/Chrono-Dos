/**
* For debugging dateOperations().
* 
* @returns void
*/
function debugJunction() {
  var masterBacklogs = new master_Backlogs();
  backlogProcessJunction(masterBacklogs.Collection);
  return;
}

/**
* The backlog Junction. This will simply
* determine which backlog is going be updated.
* After, it'll go to it's unique process.
* The process is organized to best describe what
* is happening.
* 
* For each backlog in the spreadsheet,
* If the sheet is one of the defined,
* create a variable for the sheet and run
* operations on the backlog.
* 
* If the sheet is null, that's a problem and the
* script should let us know with the throw.
* 
* If there is a sheet for it, but it has no
* process, let me know what it is.
* 
* @param {any} masterBacklogs The constructor of the backlogs contained in this spreadsheet.
*/
function backlogProcessJunction(masterBacklogs) {
  var workThisBacklog;
  for (var backlog in masterBacklogs) {
    var backlog = 4; // For debugging
    if (masterBacklogs[backlog].getName() === 'DEPT PROPOSAL BACKLOG') {
      workThisBacklog = masterBacklogs[backlog];
      prop_DateCleaner(workThisBacklog);
      regionMarker(workThisBacklog);
      prop_UnitTypeMarker(workThisBacklog);
      uni_CadNameColCreator(workThisBacklog);
      solProjLinkCreator(workThisBacklog);
      continue;
    } else if (masterBacklogs[backlog].getName() === 'DEPT SNOW PROPOSAL BACKLOG') {
      workThisBacklog = masterBacklogs[backlog];
      regionMarker(workThisBacklog);
      snow_UnitTypeMarker(workThisBacklog);
      uni_CadNameColCreator(workThisBacklog);
      solProjLinkCreator(workThisBacklog);
      continue;
    } else if (masterBacklogs[backlog].getName() === 'DEPT CP RD BACKLOG') {
      workThisBacklog = masterBacklogs[backlog];
      regionMarker(workThisBacklog);
      cprd_UnitTypeMarker(workThisBacklog);
      cprd_LinkCreator(workThisBacklog);
      //solProjLinkCreator(workThisBacklog); // Not necessary.
      continue;
    } else if (masterBacklogs[backlog].getName() === 'DEPT PART 1 BACKLOG') {
      workThisBacklog = masterBacklogs[backlog];
      regionMarker(workThisBacklog);
      lite_UnitTypeMarker(workThisBacklog);
      partone_DateCleaner(workThisBacklog);
      uni_CadNameColCreator(workThisBacklog);
      solProjLinkCreator(workThisBacklog);
      continue;
    } else if (masterBacklogs[backlog] === null) {
      throw 'The backlog was null in dateOperations()';
    } else {
      console.log('This backlog: ' + masterBacklogs[backlog].getName() + ' is not being worked.');
      continue;
    }
  }
}
