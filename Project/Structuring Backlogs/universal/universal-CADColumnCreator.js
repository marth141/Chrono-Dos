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

function debugUniCadName() {
  var masterBacklogs = new ServiceMasterBacklog();
  uni_CadNameColCreator(masterBacklogs.Collection);
  return;
}

/**
 *
 * 
 * @param {any} propBacklog 
 * @returns 
 */
function uni_CadNameColCreator(propBacklog) {
  var dim = getDimensions(propBacklog);
  var backlogArray = getBacklogArray(propBacklog, dim);
  var solarProjCol = getMeThatColumn('Project Name', backlogArray);
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
 *
 * 
 * @param {array} backlogArray
 * @param {array} dim
 * @param {number} cadNameCol 
 * @returns 
 */
function uni_FillCadNameCol(backlogArray, dim, cadNameCol) {
  backlogArray[0][cadNameCol] = 'CAD Name';
  for (var row = 1; row <= dim[0] - 1; row++) {
    backlogArray[row][cadNameCol] = '-';
  }
  return backlogArray;
}
