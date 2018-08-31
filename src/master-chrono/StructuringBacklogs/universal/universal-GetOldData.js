/* exported
debugUniSolProj
uni_GetOldData
*/

/* global
SpreadsheetApp
*/


/**
 *
 * 
 * @param {any} propBacklog 
 * @returns 
 */
function uni_GetOldData(Report) {

  var header = getHeader(Report);
  var serviceCol = getMeThatColumn("SERVICE", header);
  var stageCol = getMeThatColumn("STAGE", header) -serviceCol;
  var lastRow = Report.getLastRow();
  
  var oldData = Report.getRange(3, serviceCol+1, lastRow, stageCol+1).getValues().filter(function(value){ 
    if("S-5920503" === value[0])
      var test = 0;
    return value[0].indexOf("S-") > -1; });
  return oldData;
}


