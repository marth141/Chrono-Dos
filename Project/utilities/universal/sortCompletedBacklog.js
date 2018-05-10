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
  var priorityCol = getMeThatColumn("PRIORITY", header);
  var unitTypeCol = getMeThatColumn("UNIT TYPE", header);
  var dueDateCol = getMeThatColumn("DUE DATE", header);
  var backlogDateCol = getMeThatColumn("BACKLOG DATE", header);

  // does it need to be in a variable?
  var sortedByName = sortByProperty(backlog, priorityCol, unitTypeCol, dueDateCol, backlogDateCol);
  return backlog;
}


/**
 *
 *
 * @param {any} sheet
 * @returns 
 */
function sortByProperty(backlog, priorityCol, unitTypeCol, dueDateCol, backlogDateCol) {
  // sort to by priority first then oldest account
  return backlog.sort(function (a, b) {
    if (checkPriority(a[priorityCol], b[priorityCol])) {
      var x = a[priorityCol].toLowerCase(), y = b[priorityCol].toLowerCase();
      return x < y ? 1 : x > y ? -1 : 0;
    }
    if (checkRejected(a[unitTypeCol], b[unitTypeCol])) {
      if (a[unitTypeCol] === "REJECTED" && b[unitTypeCol] === "REJECTED")
        return 0;
      else if (a[unitTypeCol] === "REJECTED")
        return -1;
      else
        return 1;
    }
    return a[dueDateCol] - b[dueDateCol] || a[backlogDateCol] - b[backlogDateCol];
  });
}

/**
 *
 *
 * @param {any} a
 * @param {any} b
 * @returns 
 */
function checkPriority(a, b) {
  return (a !== "" || b !== "") && a !== b;
}

/**
 *
 *
 * @param {any} a
 * @param {any} b
 * @returns 
 */
function checkRejected(a, b) {
  return (a === "REJECTED" || b === "REJECTED") && a !== b;
}