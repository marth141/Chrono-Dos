/* exported
debugUniCadName
*/

/* global
ServiceMasterBacklog
SpreadsheetApp
getBacklogArray
getDimensions
getMeThatColumn
*/

/**
* For debugging dateOperations().
*
* @returns void
*/
function debugUniCadName() {
  var masterBacklogs = new ServiceMasterBacklog();
  uni_CadNameColCreator(masterBacklogs.Collection);
  return;
}

/**
* Creates the CAD Name Column. Currently it all is created
* as blank. At a later point, when redesigns are added,
* the blanks will be replaced with CAD names.
* 
* @param {Sheet} propBacklog The backlog sheet to gain information.
* @returns 
*/
function uni_CadNameColCreator(propBacklog) {
  var dim = getDimensions(propBacklog);
  var backlogArray = getBacklogArray(propBacklog, dim);
  var solarProjCol = getMeThatColumn('Project Name', backlogArray, dim);
  propBacklog.insertColumnAfter(solarProjCol + 1);
  dim = getDimensions(propBacklog);
  backlogArray = getBacklogArray(propBacklog, dim);
  var cadNameCol = solarProjCol + 1;
  var cadNameArray = uni_FillCadNameCol(backlogArray, dim, cadNameCol);
  propBacklog.getRange(1, 1, dim[0], dim[1]).setValues(cadNameArray);
  SpreadsheetApp.flush();
  console.log(cadNameArray);
  return;
}

/**
* Fills in the CAD Name column with the blanks.
* 
* @param {Array} backlogArray The backlog array to add new column
* @param {Array} dim The dimensions of the backlog sheet.
* @param {Number} cadNameCol The location of the CAD Name column.
* @returns The backlog array with the new CAD Name column.
*/
function uni_FillCadNameCol(backlogArray, dim, cadNameCol) {
  backlogArray[0][cadNameCol] = 'CAD Name';
  for (var row = 1; row <= dim[0] - 1; row++) {
    backlogArray[row][cadNameCol] = '-';
  }
  return backlogArray;
}
