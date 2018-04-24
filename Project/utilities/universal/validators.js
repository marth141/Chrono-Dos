/* exported
validateHeader
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
function validateHeader(header, backlogArray) {
  if (validateDates(header, backlogArray)) {
    return true;
  } else {
    throw 'validateHeader cannot find: ' + header;
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
  for (var col = 0; col <= backlogArray[0].length; col++) {
    if (backlogArray[0][col].match(searchString)) {
      if (backlogArray[1][col] instanceof Date) {
        return true;
      } else {
        throw 'The backlog has a date column but no date in first row. Is it corrupted?';
      }
    } else if (col === backlogArray[0].length) {
      throw 'The column \'' + searchString + '\' string could not be found.';
    }
  }
}
