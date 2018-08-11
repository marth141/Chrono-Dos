/* exported
validateHeader
validateDates
*/

/* global
*/

/**
 *
 *
 * @param {string} header
 * @param {array} backlogArray
 * @returns
 */
function validateHeader(searchString, backlogArray) {
  if (backlogArray[0].indexOf(searchString) > -1) {
    return true;
  } else {
    throw "The column \"" + searchString + "\" string could not be found.";
  }
}

/**
 *
 *
 * @param {string} searchString
 * @param {array} backlogArray
 * @returns 
 */
function validateDates(searchString, backlogArray) {
  if (backlogArray[0].indexOf(searchString) > -1) {
    if (backlogArray[1][backlogArray[0].indexOf(searchString)] instanceof Date) {
      return true;
    } else {
      throw "The backlog has a date column but no date in first row. Is it corrupted?";
    }
  } else if (backlogArray[0].indexOf(searchString) === -1) {
    throw "The column \"" + searchString + "\" string could not be found.";
  }
}
