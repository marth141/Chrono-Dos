/**
 * uni_CadNameColCreator
 * @param {any} backlogArray
 * @return {Array} cadNameArray
 */
function uni_CadNameColCreator(backlogArray) {
  var cadNameArray = uni_FillCadNameCol(backlogArray);
  return cadNameArray;
}

/**
 * uni_FillCadNameCol
 * @param {array} backlogArray
 * @return {Array} backlogArray
 */
function uni_FillCadNameCol(backlogArray) {
  // Create Header for CAD OBJECT column. Always after SP Column
  var cadObjectColumn = 3;
  backlogArray[0].splice(cadObjectColumn, 0, 'CAD OBJECT');
  for (var row = 1; row < backlogArray.length; row++) {
    backlogArray[row].splice(cadObjectColumn, 0, '-');
  }
  return backlogArray;
}
