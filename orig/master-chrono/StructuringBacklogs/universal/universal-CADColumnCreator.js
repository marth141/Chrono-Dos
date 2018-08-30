/* exported
debugUniCadName
*/

/* global
ServiceMasterBacklog
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
function uni_CadNameColCreator(backlogArray) {
  
  var cadNameArray = uni_FillCadNameCol(backlogArray);
  return cadNameArray;
}

/**
 *
 * 
 * @param {array} backlogArray
 * @param {array} dim
 * @param {number} cadNameCol 
 * @returns 
 */
function uni_FillCadNameCol(backlogArray) {
  // Create Header for CAD OBJECT column. Always after SP Column
  backlogArray[0].splice(3, 0, "CAD OBJECT");
  for (var row = 1; row < backlogArray.length; row++) {
    backlogArray[row].splice(3, 0, "-");
  }
  return backlogArray;
}
