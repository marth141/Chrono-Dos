// @flow
/**
 * Will add the CAD Object column
 * with some default data
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
  var headers = backlogArray[0];
  var solarProjectCol = 3;
  var columnsToRemove = 0;
  var headerToAdd = 'CAD OBJECT';
  var headerToAdd_Data = '-';
  headers.splice(solarProjectCol, columnsToRemove, headerToAdd);
  for (var row = 1; row < backlogArray.length; row++) {
    var account = backlogArray[row];
    account.splice(solarProjectCol, columnsToRemove, headerToAdd_Data);
  }
  return backlogArray;
}
