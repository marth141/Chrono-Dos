/**
 * For debugging dateOperations().
 * 
 * @returns void
 */
function debugCadName() {
  var masterBacklogs = new master_Backlogs();
  prop_CadNameColCreator(masterBacklogs.Collection);
  return;
}

function prop_CadNameColCreator(propBacklog) {
  var dim = getDimensions(propBacklog);
  var backlogArray = getBacklogArray(propBacklog, dim);
  var solarProjCol = getMeThatColumn('Project: Project Name', backlogArray, dim);
  propBacklog.insertColumnAfter(solarProjCol + 1);
  dim = getDimensions(propBacklog);
  backlogArray = getBacklogArray(propBacklog, dim);
  var newCol = solarProjCol + 1;
  var cadNameArray = prop_FillCadNameCol(backlogArray, dim, newCol);
  propBacklog.getRange(1, 1, dim[0], dim[1]).setValues(cadNameArray);
  SpreadsheetApp.flush();
  console.log(cadNameArray);
  return;
}

function prop_FillCadNameCol(backlogArray, dim, newCol) {
  backlogArray[0][newCol] = 'CAD NAME';
  for (var row = 1; row <= dim[0] - 1; row++) {
    backlogArray[row][newCol] = '-';
  }
  return backlogArray;
}
