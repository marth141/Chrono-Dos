/**
 * For debugging dateOperations().
 * 
 * @returns void
 */
function debugCadName() {
  var masterBacklogs = new master_Backlogs();
  cadNameColCreator(masterBacklogs.Collection);
  return;
}

/**
 * Begins the process for filtering dates in backlogs.
 * Currently will locate "DEPT Proposal", may make a universal
 * backlog process junction.
 * 
 * @param {Sheet[]} masterBacklogs Master Backlog's sheet collection.
 */
function cadNameColCreator(masterBacklogs) {
  for (var backlog in masterBacklogs) {
    if (masterBacklogs[backlog].getName() === 'DEPT Proposal') {
      var propBacklog = masterBacklogs[backlog];
      gatherVariables(propBacklog);
    }
  }
}

function gatherVariables(propBacklog) {
  var dim = getDimensions(propBacklog);
  var backlogArray = getBacklogArray(propBacklog, dim);
  var solarProjCol = getMeThatColumn('Project: Project Name', backlogArray, dim);
  propBacklog.insertColumnAfter(solarProjCol + 1);
  dim = getDimensions(propBacklog);
  backlogArray = getBacklogArray(propBacklog, dim);
  var newCol = solarProjCol + 1;
  var cadNameArray = fillCadNameCol(backlogArray, dim, newCol);
  propBacklog.getRange(1, 1, dim[0], dim[1]).setValues(cadNameArray);
  SpreadsheetApp.flush();
  console.log(cadNameArray);
  return;
}

function fillCadNameCol(backlogArray, dim, newCol) {
  backlogArray[0][newCol] = 'CAD NAME';
  for (var row = 1; row <= dim[0] - 1; row++) {
    backlogArray[row][newCol] = '-';
  }
  return backlogArray;
}
