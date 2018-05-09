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
function uni_GetOldData() {

  var Report = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Report");
  var oldData = Report.getRange("G2:T").getValues().filter(function(value){ return value[0].indexOf("S-") > -1; });
  
  return oldData;
}


