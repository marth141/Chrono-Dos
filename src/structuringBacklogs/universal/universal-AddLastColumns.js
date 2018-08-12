/**
 * @param {*} backlogArray
 * @return {*} backlogArray
 */
function uni_addLastColumns(backlogArray) {
  var columnsToAdd = [
    'PRIORITY',
    'STATUS',
    'NOTES',
    'LAST UPDATE',
    'INITIAL DATE'
  ];
  for (var column = 0; column < columnsToAdd.length; column++) {
    backlogArray[0].push(columnsToAdd[column]);
  }
  for (var row = 1; row < backlogArray.length; row++) {
    for (var column = 0; column < columnsToAdd.length; column++) {
      backlogArray[row].push('');
    }
  }
  return backlogArray;
}
