/**
 *
 * @param {Array[]} backlogArray
 * @return {Array[]}
 */
function uni_CadNameColCreator(backlogArray) {
  var cadNameArray = uni_FillCadNameCol(backlogArray);
  return cadNameArray;
}

/**
 *
 * @param {Array[]} backlogArray
 * @return {Array[]}
 */
function uni_FillCadNameCol(backlogArray) {
  // Create Header for CAD OBJECT column. Always after SP Column
  backlogArray[0].splice(3, 0, 'CAD OBJECT');
  for (var row = 1; row < backlogArray.length; row++) {
    backlogArray[row].splice(3, 0, '-');
  }
  return backlogArray;
}
