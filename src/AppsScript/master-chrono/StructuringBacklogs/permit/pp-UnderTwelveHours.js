/**
 *
 * @param {*} backlogArray
 * @param {*} Report
 * @return {Array[]}
 */
function pp_underTweleveHours(backlogArray, Report) {
  var unitTypeCol = getMeThatColumn('UNIT TYPE', backlogArray);
  var dueDateCol = getMeThatColumn('DUE DATE', backlogArray);
  var assignCol = getMeThatColumnNoValidate(
    'Phase: PV Design Completed By',
    backlogArray
  );
  if (assignCol === -1) {
    assignCol = getMeThatColumn('ASSIGNED', backlogArray);
  }
  var lastUpdateDate = Report.getRange('B2').getValue();
  backlogArray = changeUnitType(
    backlogArray,
    dueDateCol,
    unitTypeCol,
    assignCol,
    lastUpdateDate
  );
  return backlogArray;
}

/**
 *
 * @param {*} backlogArray
 * @param {*} dueDateCol
 * @param {*} unitTypeCol
 * @param {*} assignCol
 * @param {*} lastUpdateDate
 * @return {Array[]}
 */
function changeUnitType(
  backlogArray,
  dueDateCol,
  unitTypeCol,
  assignCol,
  lastUpdateDate
) {
  for (var row = 1; row < backlogArray.length; row++) {
    var designPathString;
    if (
      backlogArray[row][unitTypeCol].match(/outsource/gi) &&
      backlogArray[row][assignCol] === '' &&
      checkUnderTweleve(backlogArray[row][dueDateCol], lastUpdateDate)
    ) {
      backlogArray[row].splice(unitTypeCol, 1, 'PERMIT');
    }
  }
  return backlogArray;
}

/**
 *
 * @param {*} dueDate
 * @param {*} lastUpdateDate
 * @return {Boolean}
 */
function checkUnderTweleve(dueDate, lastUpdateDate) {
  var hours = (dueDate - new Date()) / 36e5;
  var updateHours = (lastUpdateDate - new Date()) / 36e5;
  return hours < 12;
}
