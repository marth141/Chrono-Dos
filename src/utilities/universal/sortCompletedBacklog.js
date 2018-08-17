/* globals
getHeader
getMeThatColumn
*/

/* exported
sortCompleteBacklog
*/

/**
 *
 *
 * @param {any} sheet
 * @returns
 */
function sortCompleteBacklog(backlog, Report) {
  var header = getHeader(Report);
  var serviceCol = getMeThatColumn('SERVICE', header);
  var priorityCol = getMeThatColumn('PRIORITY', header) - serviceCol;
  var dueDateCol = getMeThatColumn('DUE DATE', header) - serviceCol;
  var backlogDateCol = getMeThatColumn('BACKLOG DATE', header) - serviceCol;

  // does it need to be in a variable?
  var sortedByName = sortByProperty(
    backlog,
    priorityCol,
    dueDateCol,
    backlogDateCol
  );
  return sortedByName;
}

/**
 *
 *
 * @param {any} sheet
 * @returns
 */
function sortByProperty(backlog, priorityCol, dueDateCol, backlogDateCol) {
  var len = backlog.length;
  for (var i = len - 1; i >= 0; i--) {
    for (var j = 1; j <= i; j++) {
      if (
        backlog[j - 1][priorityCol] !== '' ||
        backlog[j][priorityCol] !== ''
      ) {
        var x = 0;
      }
      var row1 = backlog[j - 1];
      var row2 = backlog[j];

      if (row1[0] === 'S-5920692' || row2[0] === 'S-5920692') {
        var x = 0;
      }

      var check1 = checkPriority(
        backlog[j - 1][priorityCol],
        backlog[j][priorityCol]
      );
      if (check1) {
        backlog = swap(backlog, j - 1, j);
      } else if (
        check1 === 0 &&
        checkDueDates(
          backlog[j - 1][dueDateCol],
          backlog[j][dueDateCol],
          backlog[j - 1][backlogDateCol],
          backlog[j][backlogDateCol]
        )
      ) {
        backlog = swap(backlog, j - 1, j);
      }
    }
  }
  return backlog;
}

/**
 *
 *
 * @param {any} a
 * @param {any} b
 * @returns
 */
function checkPriority(a, b) {
  if (a < b) {
    return 1;
  }
  if (a === b) {
    return 0;
  }
  return false;
}

/**
 *
 *
 * @param {Date} a
 * @param {Date} b
 * @param {Date} c
 * @param {Date} d
 * @return {Boolean}
 */
function checkDueDates(a, b, c, d) {
  var isOverDue = a < new Date() || b < new Date();
  var isFriday = new Date().getDay() === 5;
  var isDueFriday = a.getDay() === 5 || b.getDay() === 5;
  if (isFriday) {
    return (a > b && isOverDue) || (a > b && isDueFriday) || a > b;
  } else {
    return (a > b && isOverDue) || a > b;
  }
}

/**
 *
 *
 * @param {any} a
 * @param {any} b
 * @returns
 */
function swap(array, i, j) {
  var temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  return array;
}
